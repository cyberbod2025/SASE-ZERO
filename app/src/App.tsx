import { LoginForm, type LoginFormValues } from './features/auth/LoginForm'

function App() {
  // TODO: reemplazar por supabase.auth.signInWithPassword({ email, password })
  // en cuanto la migración/RLS pase el test local (app/supabase/tests/0001_rls_alumnos.sql).
  function handleLogin(values: LoginFormValues) {
    console.log('login pendiente de conectar a Supabase:', values.email)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 bg-white text-gray-900">
      <div className="text-center">
        <h1 className="text-2xl font-semibold">SASE Zero</h1>
        <p className="mt-2 text-gray-600">Rebanada vertical en construcción.</p>
      </div>
      <LoginForm onSubmit={handleLogin} />
    </main>
  )
}

export default App
