import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { AttendanceScreen } from './AttendanceScreen'
import * as api from './api'
import type { Grupo, RolActivoDocente } from './types'

vi.mock('./api')

const rolActivo: RolActivoDocente = {
  role: 'DOCENTE',
  docenteId: 'docente-1',
  institucionId: 'inst-1',
  nombre: 'Docente Demo',
}

const grupo: Grupo = { id: 'g1', nombre: '1A Demo', institucion_id: 'inst-1' }

const alumnos = [
  { id: 'a1', nombre_completo: 'Alumno Uno', grupo_id: 'g1' },
  { id: 'a2', nombre_completo: 'Alumno Dos', grupo_id: 'g1' },
]

const sesion = { id: 's1', grupo_id: 'g1', docente_id: 'docente-1', fecha: '2026-08-04' }

function mockApi(registrosExistentes: Array<{ id: string; sesion_id: string; alumno_id: string; estado: 'PRESENTE' | 'AUSENTE' | 'RETARDO' }> = []) {
  vi.mocked(api.listarAlumnosDelGrupo).mockResolvedValue(alumnos)
  vi.mocked(api.obtenerOCrearSesionDeHoy).mockResolvedValue(sesion)
  vi.mocked(api.listarAsistenciaDeSesion).mockResolvedValue(registrosExistentes)
  vi.mocked(api.guardarAsistencia).mockResolvedValue(undefined)
}

describe('AttendanceScreen', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('lists the full roster of the group, defaulting to PRESENTE', async () => {
    mockApi()
    render(<AttendanceScreen rolActivo={rolActivo} grupo={grupo} userId="user-1" onVolver={vi.fn()} />)

    expect(await screen.findByText('Alumno Uno')).toBeInTheDocument()
    expect(screen.getByText('Alumno Dos')).toBeInTheDocument()

    const filaUno = screen.getByText('Alumno Uno').closest('li') as HTMLElement
    expect(within(filaUno).getByRole('button', { name: 'Presente' })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
  })

  it('changes a student status and shows the unsaved-changes indicator', async () => {
    mockApi()
    const user = userEvent.setup()
    render(<AttendanceScreen rolActivo={rolActivo} grupo={grupo} userId="user-1" onVolver={vi.fn()} />)

    await screen.findByText('Alumno Uno')
    const filaUno = screen.getByText('Alumno Uno').closest('li') as HTMLElement
    await user.click(within(filaUno).getByRole('button', { name: 'Ausente' }))

    expect(within(filaUno).getByRole('button', { name: 'Ausente' })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
    expect(screen.getByText(/cambios sin guardar/i)).toBeInTheDocument()
  })

  it('saves in a single operation and confirms success without duplicating records', async () => {
    mockApi()
    const user = userEvent.setup()
    render(<AttendanceScreen rolActivo={rolActivo} grupo={grupo} userId="user-1" onVolver={vi.fn()} />)

    await screen.findByText('Alumno Uno')
    const filaDos = screen.getByText('Alumno Dos').closest('li') as HTMLElement
    await user.click(within(filaDos).getByRole('button', { name: 'Retardo' }))

    await user.click(screen.getByRole('button', { name: 'Guardar asistencia' }))

    await waitFor(() => expect(api.guardarAsistencia).toHaveBeenCalledTimes(1))
    // Se guarda el roster completo, no solo el alumno modificado: si el docente deja a
    // todos en "Presente" sin tocar nada, esa captura tambien debe quedar persistida.
    expect(api.guardarAsistencia).toHaveBeenCalledWith('s1', 'user-1', [
      { alumnoId: 'a1', estado: 'PRESENTE' },
      { alumnoId: 'a2', estado: 'RETARDO' },
    ])
    expect(await screen.findByText('Asistencia guardada.')).toBeInTheDocument()
  })

  it('reopens an existing session and shows the previously captured exceptions', async () => {
    mockApi([{ id: 'r1', sesion_id: 's1', alumno_id: 'a2', estado: 'AUSENTE' }])
    render(<AttendanceScreen rolActivo={rolActivo} grupo={grupo} userId="user-1" onVolver={vi.fn()} />)

    await screen.findByText('Alumno Dos')
    const filaDos = screen.getByText('Alumno Dos').closest('li') as HTMLElement
    expect(within(filaDos).getByRole('button', { name: 'Ausente' })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
  })
})
