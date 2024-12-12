interface Person {
    personId: string;
    email: string;
    age: number;
    address: string;
    phoneNumber: string;
    country: string;
  }
  
  interface PersonListProps {
    persons: Person[];
    onEdit: (person: Person) => void;
    onDelete: (id: string) => void;
  }
  
  export function PersonList({ persons, onEdit, onDelete }: PersonListProps) {
    return (
      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">People List</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-white rounded-lg shadow">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Country</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {persons.map((person) => (
                <tr key={person.personId}>
                  <td className="px-6 py-4 whitespace-nowrap">{person.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{person.age}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{person.address}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{person.phoneNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{person.country}</td>
                  <td className="px-6 py-4 whitespace-nowrap space-x-2">
                    <button
                      key={`edit-${person.personId}`}
                      onClick={() => onEdit(person)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Edit
                    </button>
                    <button
                      key={`delete-${person.personId}`}
                      onClick={() => onDelete(person.personId)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }