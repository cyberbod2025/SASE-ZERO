import { useEffect, useState } from 'react'
import type { Session } from '@supabase/supabase-js'
import { supabase } from '../../lib/supabaseClient'

/** Sesion real de Supabase Auth, sincronizada con cambios (login, logout, refresh). */
export function useSession() {
  const [session, setSession] = useState<Session | null>(null)
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    let activo = true

    supabase.auth.getSession().then(({ data }) => {
      if (!activo) return
      setSession(data.session)
      setCargando(false)
    })

    const { data: subscripcion } = supabase.auth.onAuthStateChange((_event, nuevaSession) => {
      setSession(nuevaSession)
      setCargando(false)
    })

    return () => {
      activo = false
      subscripcion.subscription.unsubscribe()
    }
  }, [])

  return { session, cargando }
}
