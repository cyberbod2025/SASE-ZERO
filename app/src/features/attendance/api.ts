import { supabase } from '../../lib/supabaseClient'
import type {
  Alumno,
  AsistenciaEstado,
  AsistenciaRegistro,
  Grupo,
  RolActivoDocente,
  SesionClase,
} from './types'

/** Resuelve el rol activo de DOCENTE del usuario autenticado (ADR-0002: contexto de accion explicito). */
export async function obtenerRolActivoDocente(userId: string): Promise<RolActivoDocente | null> {
  const { data, error } = await supabase
    .from('docentes')
    .select('id, institucion_id, nombre')
    .eq('user_id', userId)
    .maybeSingle()

  if (error) throw error
  if (!data) return null

  return {
    role: 'DOCENTE',
    docenteId: data.id,
    institucionId: data.institucion_id,
    nombre: data.nombre,
  }
}

export async function listarGruposDelDocente(docenteId: string): Promise<Grupo[]> {
  const { data, error } = await supabase
    .from('grupos')
    .select('id, nombre, institucion_id, docente_grupos!inner(docente_id)')
    .eq('docente_grupos.docente_id', docenteId)
    .order('nombre', { ascending: true })

  if (error) throw error

  return (data ?? []).map(({ id, nombre, institucion_id }) => ({ id, nombre, institucion_id }))
}

export async function listarAlumnosDelGrupo(grupoId: string): Promise<Alumno[]> {
  const { data, error } = await supabase
    .from('alumnos')
    .select('id, nombre_completo, grupo_id')
    .eq('grupo_id', grupoId)
    .order('nombre_completo', { ascending: true })

  if (error) throw error
  return data ?? []
}

/** Obtiene la sesion de clase de hoy para el grupo/docente, o la crea si no existe. */
export async function obtenerOCrearSesionDeHoy(
  grupoId: string,
  docenteId: string,
  fecha: string,
): Promise<SesionClase> {
  const { data: existente, error: errorLectura } = await supabase
    .from('sesiones_clase')
    .select('id, grupo_id, docente_id, fecha')
    .eq('grupo_id', grupoId)
    .eq('docente_id', docenteId)
    .eq('fecha', fecha)
    .maybeSingle()

  if (errorLectura) throw errorLectura
  if (existente) return existente

  const { data: creada, error: errorInsercion } = await supabase
    .from('sesiones_clase')
    .insert({ grupo_id: grupoId, docente_id: docenteId, fecha })
    .select('id, grupo_id, docente_id, fecha')
    .single()

  if (errorInsercion) throw errorInsercion
  return creada
}

export async function listarAsistenciaDeSesion(sesionId: string): Promise<AsistenciaRegistro[]> {
  const { data, error } = await supabase
    .from('asistencias')
    .select('id, sesion_id, alumno_id, estado')
    .eq('sesion_id', sesionId)

  if (error) throw error
  return data ?? []
}

export interface AsistenciaAGuardar {
  alumnoId: string
  estado: AsistenciaEstado
}

/**
 * Guarda toda la lista de asistencia de una sesion en una sola operacion logica (upsert),
 * sin generar duplicados: la restriccion unica (sesion_id, alumno_id) resuelve create vs update.
 */
export async function guardarAsistencia(
  sesionId: string,
  userId: string,
  registros: AsistenciaAGuardar[],
): Promise<void> {
  if (registros.length === 0) return

  const filas = registros.map((r) => ({
    sesion_id: sesionId,
    alumno_id: r.alumnoId,
    estado: r.estado,
    created_by: userId,
    updated_by: userId,
  }))

  const { error } = await supabase
    .from('asistencias')
    .upsert(filas, { onConflict: 'sesion_id,alumno_id' })

  if (error) throw error
}
