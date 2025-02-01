import React, { useState } from 'react';
import { UserPlus } from 'lucide-react';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const [employees, setEmployees] = useState([
    { name: 'John Doe', email: 'john@example.com', role: 'employee' }
  ]);
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    email: '',
    password: '',
    role: 'employee'
  });

  const handleAddEmployee = (e) => {
    e.preventDefault();
    setEmployees([...employees, newEmployee]);
    setNewEmployee({ name: '', email: '', password: '', role: 'employee' });
    toast.success('Employee added successfully');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Add New Employee</h2>
        <form onSubmit={handleAddEmployee} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Name"
              className="px-4 py-2 border rounded-md"
              value={newEmployee.name}
              onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="px-4 py-2 border rounded-md"
              value={newEmployee.email}
              onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="px-4 py-2 border rounded-md"
              value={newEmployee.password}
              onChange={(e) => setNewEmployee({ ...newEmployee, password: e.target.value })}
              required
            />
            <select
              className="px-4 py-2 border rounded-md"
              value={newEmployee.role}
              onChange={(e) => setNewEmployee({ ...newEmployee, role: e.target.value })}
            >
              <option value="employee">Employee</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button
            type="submit"
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <UserPlus className="h-5 w-5 mr-2" />
            Add Employee
          </button>
        </form>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Employee List</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {employees.map((employee, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">{employee.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{employee.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{employee.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;