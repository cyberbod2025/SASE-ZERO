import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { GroupsScreen } from './GroupsScreen'
import type { Grupo, RolActivoDocente } from './types'

const rolActivo: RolActivoDocente = {
  role: 'DOCENTE',
  docenteId: 'docente-1',
  institucionId: 'inst-1',
  nombre: 'Docente Demo',
}

const grupos: Grupo[] = [
  { id: 'g1', nombre: '1A Demo', institucion_id: 'inst-1' },
  { id: 'g2', nombre: '1B Demo', institucion_id: 'inst-1' },
]

describe('GroupsScreen', () => {
  it('lists the groups assigned to the teacher and shows the active role', () => {
    render(
      <GroupsScreen
        rolActivo={rolActivo}
        grupos={grupos}
        cargando={false}
        error={null}
        onSeleccionarGrupo={vi.fn()}
        onReintentar={vi.fn()}
        onCerrarSesion={vi.fn()}
      />,
    )

    expect(screen.getByText(/DOCENTE · Docente Demo/)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '1A Demo' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '1B Demo' })).toBeInTheDocument()
  })

  it('calls onSeleccionarGrupo with the chosen group', async () => {
    const onSeleccionarGrupo = vi.fn()
    const user = userEvent.setup()
    render(
      <GroupsScreen
        rolActivo={rolActivo}
        grupos={grupos}
        cargando={false}
        error={null}
        onSeleccionarGrupo={onSeleccionarGrupo}
        onReintentar={vi.fn()}
        onCerrarSesion={vi.fn()}
      />,
    )

    await user.click(screen.getByRole('button', { name: '1B Demo' }))
    expect(onSeleccionarGrupo).toHaveBeenCalledWith(grupos[1])
  })

  it('shows a useful empty state when the teacher has no groups', () => {
    render(
      <GroupsScreen
        rolActivo={rolActivo}
        grupos={[]}
        cargando={false}
        error={null}
        onSeleccionarGrupo={vi.fn()}
        onReintentar={vi.fn()}
        onCerrarSesion={vi.fn()}
      />,
    )

    expect(screen.getByText(/todavía no tienes grupos asignados/i)).toBeInTheDocument()
  })

  it('shows a recoverable error state with a retry action', async () => {
    const onReintentar = vi.fn()
    const user = userEvent.setup()
    render(
      <GroupsScreen
        rolActivo={rolActivo}
        grupos={[]}
        cargando={false}
        error="No se pudieron cargar tus grupos."
        onSeleccionarGrupo={vi.fn()}
        onReintentar={onReintentar}
        onCerrarSesion={vi.fn()}
      />,
    )

    expect(screen.getByRole('alert')).toHaveTextContent('No se pudieron cargar tus grupos.')
    await user.click(screen.getByRole('button', { name: 'Reintentar' }))
    expect(onReintentar).toHaveBeenCalled()
  })
})
