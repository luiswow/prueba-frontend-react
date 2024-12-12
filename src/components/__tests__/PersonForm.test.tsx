/// <reference types="@testing-library/jest-dom" />

import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { PersonForm } from '../PersonForm'

describe('PersonForm', () => {
  const mockSubmit = vi.fn()

  it('renders create form by default', () => {
    render(<PersonForm onSubmit={mockSubmit} />)
    
    expect(screen.getByText('Create New Person')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Age')).toBeInTheDocument()
    expect(screen.getByLabelText('Address')).toBeInTheDocument()
    expect(screen.getByLabelText('Phone Number')).toBeInTheDocument()
    expect(screen.getByLabelText('Country')).toBeInTheDocument()
  })

  it('submits form with correct data', async () => {
    render(<PersonForm onSubmit={mockSubmit} />)
    
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'test@example.com' },
    })
    fireEvent.change(screen.getByLabelText('Age'), {
      target: { value: '25' },
    })
    fireEvent.change(screen.getByLabelText('Address'), {
      target: { value: '123 Test St' },
    })
    fireEvent.change(screen.getByLabelText('Phone Number'), {
      target: { value: '1234567890' },
    })
    fireEvent.change(screen.getByLabelText('Country'), {
      target: { value: 'TestLand' },
    })

    fireEvent.submit(screen.getByRole('button', { name: /create person/i }))

    expect(mockSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
      age: 25,
      address: '123 Test St',
      phoneNumber: '1234567890',
      country: 'TestLand',
    })
  })

  it('renders edit form when isEditing is true', () => {
    const initialData = {
      personId: '1',
      email: 'test@example.com',
      age: 25,
      address: '123 Test St',
      phoneNumber: '1234567890',
      country: 'TestLand',
    }

    render(<PersonForm onSubmit={mockSubmit} initialData={initialData} isEditing={true} />)
    
    expect(screen.getByText('Edit Person')).toBeInTheDocument()
    expect(screen.getByDisplayValue('test@example.com')).toBeInTheDocument()
    expect(screen.getByDisplayValue('25')).toBeInTheDocument()
    expect(screen.getByDisplayValue('123 Test St')).toBeInTheDocument()
    expect(screen.getByDisplayValue('1234567890')).toBeInTheDocument()
    expect(screen.getByDisplayValue('TestLand')).toBeInTheDocument()
  })
}) 