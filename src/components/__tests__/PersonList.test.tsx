import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { PersonList } from '../PersonList'

describe('PersonList', () => {
  const mockOnEdit = vi.fn()
  const mockOnDelete = vi.fn()
  
  const mockPersons = [
    {
      personId: '1',
      email: 'test@example.com',
      age: 25,
      address: '123 Test St',
      phoneNumber: '1234567890',
      country: 'TestLand',
    }
  ]

  it('renders person list correctly', () => {
    render(
      <PersonList 
        persons={mockPersons} 
        onEdit={mockOnEdit} 
        onDelete={mockOnDelete} 
      />
    )

    expect(screen.getByText('People List')).toBeInTheDocument()
    expect(screen.getByText('test@example.com')).toBeInTheDocument()
    expect(screen.getByText('25')).toBeInTheDocument()
    expect(screen.getByText('123 Test St')).toBeInTheDocument()
    expect(screen.getByText('1234567890')).toBeInTheDocument()
    expect(screen.getByText('TestLand')).toBeInTheDocument()
  })

  it('calls onEdit when edit button is clicked', () => {
    render(
      <PersonList 
        persons={mockPersons} 
        onEdit={mockOnEdit} 
        onDelete={mockOnDelete} 
      />
    )

    fireEvent.click(screen.getByText('Edit'))
    expect(mockOnEdit).toHaveBeenCalledWith(mockPersons[0])
  })

  it('calls onDelete when delete button is clicked', () => {
    render(
      <PersonList 
        persons={mockPersons} 
        onEdit={mockOnEdit} 
        onDelete={mockOnDelete} 
      />
    )

    fireEvent.click(screen.getByText('Delete'))
    expect(mockOnDelete).toHaveBeenCalledWith(mockPersons[0].personId)
  })
}) 