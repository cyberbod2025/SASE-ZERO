import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  guardarAsistencia,
  listarAlumnosDelGrupo,
  listarAsistenciaDeSesion,
  obtenerOCrearSesionDeHoy,
} from './api'
import type { Alumno, AsistenciaEstado, Grupo, RolActivoDocente, SesionClase } from './types'

interface AttendanceScreenProps {
  rolActivo: RolActivoDocente
  grupo: Grupo
  userId: string
  onVolver: () => void
}

type EstadoPorAlumno = Record<string, AsistenciaEstado>

const ESTADOS: AsistenciaEstado[] = ['PRESENTE', 'RETARDO', 'AUSENTE']

const ETIQUETAS: Record<AsistenciaEstado, string> = {
  PRESENTE: 'Presente',
  RETARDO: 'Retardo',
  AUSENTE: 'Ausente',
}

const ESTILOS_BOTON: Record<AsistenciaEstado, string> = {
  PRESENTE: 'bg-green-600 text-white border-green-600',
  RETARDO: 'bg-amber-500 text-white border-amber-500',
  AUSENTE: 'bg-red-600 text-white border-red-600',
}

function hoyISO(): string {
  return new Date().toISOString().slice(0, 10)
}

export function AttendanceScreen({ rolActivo, grupo, userId, onVolver }: AttendanceScreenProps) {
  const [cargando, setCargando] = useState(true)
  const [errorCarga, setErrorCarga] = useState<string | null>(null)
  const [alumnos, setAlumnos] = useState<Alumno[]>([])
  const [sesion, setSesion] = useState<SesionClase | null>(null)
  const [guardado, setGuardado] = useState<EstadoPorAlumno>({})
  const [enPantalla, setEnPantalla] = useState<EstadoPorAlumno>({})
  const [guardando, setGuardando] = useState(false)
  const [errorGuardado, setErrorGuardado] = useState<string | null>(null)
  const [exito, setExito] = useState(false)

  const cargar = useCallback(async () => {
    setCargando(true)
    setErrorCarga(null)
    setExito(false)
    setErrorGuardado(null)
    try {
      const fecha = hoyISO()
      const [listaAlumnos, sesionActual] = await Promise.all([
        listarAlumnosDelGrupo(grupo.id),
        obtenerOCrearSesionDeHoy(grupo.id, rolActivo.docenteId, fecha),
      ])
      const registros = await listarAsistenciaDeSesion(sesionActual.id)

      const base: EstadoPorAlumno = {}
      for (const alumno of listaAlumnos) {
        base[alumno.id] = 'PRESENTE'
      }
      for (const registro of registros) {
        base[registro.alumno_id] = registro.estado
      }

      setAlumnos(listaAlumnos)
      setSesion(sesionActual)
      setGuardado(base)
      setEnPantalla(base)
    } catch (err) {
      setErrorCarga(
        err instanceof Error
          ? `No se pudo cargar la clase: ${err.message}`
          : 'No se pudo cargar la clase. Verifica tu conexión e intenta de nuevo.',
      )
    } finally {
      setCargando(false)
    }
  }, [grupo.id, rolActivo.docenteId])

  useEffect(() => {
    cargar()
  }, [cargar])

  const hayCambiosSinGuardar = useMemo(() => {
    return alumnos.some((alumno) => enPantalla[alumno.id] !== guardado[alumno.id])
  }, [alumnos, enPantalla, guardado])

  function marcar(alumnoId: string, estado: AsistenciaEstado) {
    setExito(false)
    setEnPantalla((previo) => ({ ...previo, [alumnoId]: estado }))
  }

  async function guardar() {
    if (!sesion || guardando || !hayCambiosSinGuardar) return
    setGuardando(true)
    setErrorGuardado(null)
    try {
      // Se guarda el roster completo (no solo el diff): si el docente deja a todos en
      // "Presente" sin tocar nada, esa captura debe quedar persistida igual que cualquier
      // excepción, o el reporte de asistencia mostraria cero registros para ese dia.
      const registros = alumnos.map((alumno) => ({
        alumnoId: alumno.id,
        estado: enPantalla[alumno.id] ?? 'PRESENTE',
      }))

      await guardarAsistencia(sesion.id, userId, registros)

      setGuardado(enPantalla)
      setExito(true)
    } catch (err) {
      setErrorGuardado(
        err instanceof Error
          ? `No se pudo guardar: ${err.message}`
          : 'No se pudo guardar la asistencia. Tus cambios siguen en pantalla, intenta de nuevo.',
      )
    } finally {
      setGuardando(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-900">
      <header className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
        <button onClick={onVolver} className="text-sm text-gray-600 hover:text-gray-900">
          ← Grupos
        </button>
        <div className="text-right">
          <p className="text-sm font-semibold">{grupo.nombre}</p>
          <p className="text-xs text-gray-500">{hoyISO()}</p>
        </div>
      </header>

      <main className="flex-1 px-4 py-4 pb-28">
        {cargando && (
          <p role="status" className="text-sm text-gray-600">
            Cargando clase del día…
          </p>
        )}

        {!cargando && errorCarga && (
          <div className="flex flex-col gap-3 rounded border border-red-200 bg-red-50 p-4">
            <p role="alert" className="text-sm text-red-700">
              {errorCarga}
            </p>
            <button
              onClick={cargar}
              className="self-start rounded bg-gray-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-gray-700"
            >
              Reintentar
            </button>
          </div>
        )}

        {!cargando && !errorCarga && alumnos.length === 0 && (
          <div className="rounded border border-gray-200 bg-gray-50 p-6 text-center">
            <p className="text-sm text-gray-700">Este grupo todavía no tiene alumnos registrados.</p>
          </div>
        )}

        {!cargando && !errorCarga && alumnos.length > 0 && (
          <ul className="flex flex-col gap-2">
            {alumnos.map((alumno) => {
              const estado = enPantalla[alumno.id] ?? 'PRESENTE'
              return (
                <li
                  key={alumno.id}
                  className="flex flex-col gap-2 rounded border border-gray-200 p-3 sm:flex-row sm:items-center sm:justify-between"
                >
                  <span className="text-sm font-medium">{alumno.nombre_completo}</span>
                  <div className="flex gap-2" role="group" aria-label={`Estado de ${alumno.nombre_completo}`}>
                    {ESTADOS.map((opcion) => {
                      const activo = estado === opcion
                      return (
                        <button
                          key={opcion}
                          type="button"
                          aria-pressed={activo}
                          onClick={() => marcar(alumno.id, opcion)}
                          className={`flex-1 rounded border px-3 py-2 text-xs font-semibold sm:flex-none ${
                            activo ? ESTILOS_BOTON[opcion] : 'border-gray-300 bg-white text-gray-700'
                          }`}
                        >
                          {ETIQUETAS[opcion]}
                        </button>
                      )
                    })}
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </main>

      {!cargando && !errorCarga && alumnos.length > 0 && (
        <footer className="fixed inset-x-0 bottom-0 border-t border-gray-200 bg-white px-4 py-3">
          <div className="mx-auto flex max-w-2xl flex-col gap-2">
            {errorGuardado && (
              <p role="alert" className="text-sm text-red-600">
                {errorGuardado}
              </p>
            )}
            {exito && !hayCambiosSinGuardar && (
              <p role="status" className="text-sm text-green-700">
                Asistencia guardada.
              </p>
            )}
            {hayCambiosSinGuardar && !guardando && (
              <p className="text-sm text-amber-700">Tienes cambios sin guardar.</p>
            )}
            <button
              onClick={guardar}
              disabled={!hayCambiosSinGuardar || guardando}
              className="w-full rounded bg-gray-900 px-4 py-3 text-sm font-semibold text-white hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {guardando ? 'Guardando…' : 'Guardar asistencia'}
            </button>
          </div>
        </footer>
      )}
    </div>
  )
}
