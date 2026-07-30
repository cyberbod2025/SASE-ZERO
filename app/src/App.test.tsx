import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('App', () => {
  it('renders the SASE Zero placeholder', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: 'SASE Zero' })).toBeInTheDocument()
  })
})
