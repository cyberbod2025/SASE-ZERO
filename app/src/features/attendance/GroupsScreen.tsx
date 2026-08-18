import type { Grupo, RolActivoDocente } from './types'

interface GroupsScreenProps {
  rolActivo: RolActivoDocente
  grupos: Grupo[]
  cargando: boolean
  error: string | null
  onSeleccionarGrupo: (grupo: Grupo) => void
  onReintentar: () => void
  onCerrarSesion: () => void
}

export function GroupsScreen({
  rolActivo,
  grupos,
  cargando,
  error,
  onSeleccionarGrupo,
  onReintentar,
  onCerrarSesion,
}: GroupsScreenProps) {
  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-900">
      <header className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
        <div>
          <p className="text-xs uppercase tracking-wide text-gray-500">Rol activo</p>
          <p className="text-sm font-medium">{rolActivo.role} · {rolActivo.nombre}</p>
        </div>
        <button
          onClick={onCerrarSesion}
          className="rounded border border-gray-300 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
        >
          Cerrar sesión
        </button>
      </header>

      <main className="flex-1 px-4 py-6">
        <h1 className="mb-4 text-lg font-semibold">Mis grupos</h1>

        {cargando && (
          <p role="status" className="text-sm text-gray-600">
            Cargando grupos…
          </p>
        )}

        {!cargando && error && (
          <div className="flex flex-col gap-3 rounded border border-red-200 bg-red-50 p-4">
            <p role="alert" className="text-sm text-red-700">
              {error}
            </p>
            <button
              onClick={onReintentar}
              className="self-start rounded bg-gray-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-gray-700"
            >
              Reintentar
            </button>
          </div>
        )}

        {!cargando && !error && grupos.length === 0 && (
          <div className="rounded border border-gray-200 bg-gray-50 p-6 text-center">
            <p className="text-sm text-gray-700">
              Todavía no tienes grupos asignados. Cuando la institución te asigne un grupo,
              aparecerá aquí.
            </p>
          </div>
        )}

        {!cargando && !error && grupos.length > 0 && (
          <ul className="flex flex-col gap-2">
            {grupos.map((grupo) => (
              <li key={grupo.id}>
                <button
                  onClick={() => onSeleccionarGrupo(grupo)}
                  className="w-full rounded border border-gray-200 px-4 py-4 text-left text-base font-medium hover:border-gray-400 hover:bg-gray-50"
                >
                  {grupo.nombre}
                </button>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  )
}
