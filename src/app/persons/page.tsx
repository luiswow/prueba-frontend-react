'use client';

import { useState, useEffect } from 'react';
import { PersonForm } from '@/components/PersonForm';
import { PersonList } from '@/components/PersonList';
import Swal from 'sweetalert2';

interface PersonData {
    personId: string;
  email: string;
  age: number;
  address: string;
  phoneNumber: string;
  country: string;
}

export default function PersonsPage() {
  const [persons, setPersons] = useState<PersonData[]>([]);
  const [editingPerson, setEditingPerson] = useState<PersonData | null>(null);
  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/person`;
  

  useEffect(() => {
    fetchPersons();
  }, []);

  const fetchPersons = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setPersons(data);
    } catch (error) {
      console.error('Error fetching persons:', error);
    }
  };

  const handleCreate = async (personData: Omit<PersonData, 'personId'>) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(personData),
      });
      if (response.ok) {
        const newPerson = await response.json();
        setPersons(prevPersons => [...prevPersons, newPerson]);
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Person created successfully',
          timer: 1500
        });
      }
    } catch  {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error creating person'
      });
    }
  };

  const handleUpdate = async (personData: Omit<PersonData, 'personId'>) => {
    try {
      const response = await fetch(`${API_URL}/${editingPerson?.personId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(personData),
      });
      if (response.ok) {
        const updatedPerson = await response.json();
        setPersons(prevPersons => 
          prevPersons.map(person => 
            person.personId === editingPerson?.personId ? updatedPerson : person
          )
        );
        setEditingPerson(null);
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Person updated successfully',
          timer: 1500
        });
      }
    } catch  {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error updating person'
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      });

      if (result.isConfirmed) {
        const response = await fetch(`${API_URL}/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setPersons(prevPersons => prevPersons.filter(person => person.personId !== id));
          Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: 'Person has been deleted.',
            timer: 1500
          });
        }
      }
    } catch  {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error deleting person'
      });
    }
  };

  return (
    <div className="container mx-auto py-8">
      <PersonForm
        onSubmit={editingPerson ? handleUpdate : handleCreate}
        initialData={editingPerson as PersonData}
        isEditing={!!editingPerson}
      />
      <PersonList
        persons={persons}
        onEdit={(person) => {
            console.log("Editing person:", person); // Add this to debug
            setEditingPerson(person);
          }}        onDelete={handleDelete}
      />
    </div>
  );
} 