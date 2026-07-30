import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { LoginForm } from './LoginForm'

describe('LoginForm', () => {
  it('renders email, password and submit button', () => {
    render(<LoginForm onSubmit={vi.fn()} />)

    expect(screen.getByLabelText('Correo institucional')).toBeInTheDocument()
    expect(screen.getByLabelText('Contraseña')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Iniciar sesión' })).toBeInTheDocument()
  })

  it('rejects an invalid email and does not call onSubmit', async () => {
    const onSubmit = vi.fn()
    const user = userEvent.setup()
    render(<LoginForm onSubmit={onSubmit} />)

    await user.type(screen.getByLabelText('Correo institucional'), 'no-es-un-correo')
    await user.type(screen.getByLabelText('Contraseña'), 'algo')
    await user.click(screen.getByRole('button', { name: 'Iniciar sesión' }))

    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('calls onSubmit with the entered values when valid', async () => {
    const onSubmit = vi.fn()
    const user = userEvent.setup()
    render(<LoginForm onSubmit={onSubmit} />)

    await user.type(screen.getByLabelText('Correo institucional'), 'docente.a@ficticio.test')
    await user.type(screen.getByLabelText('Contraseña'), 'contraseña-ficticia')
    await user.click(screen.getByRole('button', { name: 'Iniciar sesión' }))

    expect(onSubmit).toHaveBeenCalledWith({
      email: 'docente.a@ficticio.test',
      password: 'contraseña-ficticia',
    })
  })
})
