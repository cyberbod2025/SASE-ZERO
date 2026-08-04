export type AsistenciaEstado = 'PRESENTE' | 'AUSENTE' | 'RETARDO'

export interface Grupo {
  id: string
  nombre: string
  institucion_id: string
}

export interface Alumno {
  id: string
  nombre_completo: string
  grupo_id: string
}

export interface SesionClase {
  id: string
  grupo_id: string
  docente_id: string
  fecha: string
}

export interface AsistenciaRegistro {
  id: string
  sesion_id: string
  alumno_id: string
  estado: AsistenciaEstado
}

/** Rol activo explicito del usuario en la sesion actual (ADR-0002). */
export interface RolActivoDocente {
  role: 'DOCENTE'
  docenteId: string
  institucionId: string
  nombre: string
}
