import { useCallback, useEffect, useState } from 'react'
import { LoginForm, type LoginFormValues } from './features/auth/LoginForm'
import { useSession } from './features/auth/useSession'
import { AttendanceScreen } from './features/attendance/AttendanceScreen'
import { GroupsScreen } from './features/attendance/GroupsScreen'
import { listarGruposDelDocente, obtenerRolActivoDocente } from './features/attendance/api'
import type { Grupo, RolActivoDocente } from './features/attendance/types'
import { supabase } from './lib/supabaseClient'

function App() {
  const { session, cargando: cargandoSesion } = useSession()

  const [iniciandoSesion, setIniciandoSesion] = useState(false)
  const [errorLogin, setErrorLogin] = useState<string | null>(null)

  const [rolActivo, setRolActivo] = useState<RolActivoDocente | null>(null)
  const [cargandoRol, setCargandoRol] = useState(false)
  const [errorRol, setErrorRol] = useState<string | null>(null)

  const [grupos, setGrupos] = useState<Grupo[]>([])
  const [cargandoGrupos, setCargandoGrupos] = useState(false)
  const [errorGrupos, setErrorGrupos] = useState<string | null>(null)

  const [grupoSeleccionado, setGrupoSeleccionado] = useState<Grupo | null>(null)

  const userId = session?.user.id ?? null

  const cargarRolYGrupos = useCallback(async (uid: string) => {
    setCargandoRol(true)
    setErrorRol(null)
    try {
      const rol = await obtenerRolActivoDocente(uid)
      setRolActivo(rol)
      setCargandoRol(false)

      if (!rol) return

      setCargandoGrupos(true)
      setErrorGrupos(null)
      try {
        const listaGrupos = await listarGruposDelDocente(rol.docenteId)
        setGrupos(listaGrupos)
      } catch (err) {
        setErrorGrupos(
          err instanceof Error
            ? `No se pudieron cargar tus grupos: ${err.message}`
            : 'No se pudieron cargar tus grupos. Intenta de nuevo.',
        )
      } finally {
        setCargandoGrupos(false)
      }
    } catch (err) {
      setErrorRol(
        err instanceof Error
          ? `No se pudo verificar tu rol: ${err.message}`
          : 'No se pudo verificar tu rol. Intenta de nuevo.',
      )
      setCargandoRol(false)
    }
  }, [])

  useEffect(() => {
    if (userId) {
      cargarRolYGrupos(userId)
    } else {
      setRolActivo(null)
      setGrupos([])
      setGrupoSeleccionado(null)
    }
  }, [userId, cargarRolYGrupos])

  async function handleLogin(values: LoginFormValues) {
    if (iniciandoSesion) return
    setIniciandoSesion(true)
    setErrorLogin(null)
    const { error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    })
    setIniciandoSesion(false)
    if (error) {
      setErrorLogin(
        error.message === 'Invalid login credentials'
          ? 'Correo o contraseña incorrectos.'
          : `No se pudo iniciar sesión: ${error.message}`,
      )
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    setGrupoSeleccionado(null)
  }

  if (cargandoSesion) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white text-gray-900">
        <p role="status" className="text-sm text-gray-600">
          Cargando…
        </p>
      </main>
    )
  }

  if (!session) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-8 bg-white text-gray-900">
        <div className="text-center">
          <h1 className="text-2xl font-semibold">SASE Zero</h1>
          <p className="mt-2 text-gray-600">Asistencia por clase y grupo</p>
        </div>
        <LoginForm onSubmit={handleLogin} submitting={iniciandoSesion} submitError={errorLogin} />
      </main>
    )
  }

  if (cargandoRol) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white text-gray-900">
        <p role="status" className="text-sm text-gray-600">
          Verificando tu rol…
        </p>
      </main>
    )
  }

  if (errorRol) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-white p-6 text-center text-gray-900">
        <p role="alert" className="text-sm text-red-700">
          {errorRol}
        </p>
        <button
          onClick={() => userId && cargarRolYGrupos(userId)}
          className="rounded bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
        >
          Reintentar
        </button>
        <button onClick={handleLogout} className="text-sm text-gray-600 underline">
          Cerrar sesión
        </button>
      </main>
    )
  }

  if (!rolActivo) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-white p-6 text-center text-gray-900">
        <p className="text-sm text-gray-700">
          Tu cuenta no tiene un rol de docente asignado en esta institución todavía.
        </p>
        <button onClick={handleLogout} className="text-sm text-gray-600 underline">
          Cerrar sesión
        </button>
      </main>
    )
  }

  if (grupoSeleccionado) {
    return (
      <AttendanceScreen
        rolActivo={rolActivo}
        grupo={grupoSeleccionado}
        userId={session.user.id}
        onVolver={() => setGrupoSeleccionado(null)}
      />
    )
  }

  return (
    <GroupsScreen
      rolActivo={rolActivo}
      grupos={grupos}
      cargando={cargandoGrupos}
      error={errorGrupos}
      onSeleccionarGrupo={setGrupoSeleccionado}
      onReintentar={() => userId && cargarRolYGrupos(userId)}
      onCerrarSesion={handleLogout}
    />
  )
}

export default App
