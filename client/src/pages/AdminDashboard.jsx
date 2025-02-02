


// import React, { useState, useEffect } from 'react';
// import { UserPlus } from 'lucide-react';
// import toast, { Toaster } from 'react-hot-toast';
// import axios from 'axios';

// const AdminDashboard = () => {
//   const [employees, setEmployees] = useState([]);
//   const [newEmployee, setNewEmployee] = useState({
//     name: '',
//     email: '',
//     password: '',
//     role: 'Employee'
//   });

//   const [userRole, setUserRole] = useState(null); // State to store current user's role

//   useEffect(() => {
//     // Simulating a check for current user role (you might need an actual authentication method)
//     const currentUser = JSON.parse(localStorage.getItem('currentUser')); // Assuming the role is stored in localStorage
//     if (currentUser?.role === 'Admin') {
//       setUserRole('Admin');
//     } else {
//       setUserRole('Employee'); // Default role if not Admin
//     }
//   }, []);

//   useEffect(() => {
//     const fetchEmployees = async () => {
//       if (userRole !== 'Admin') {
//         toast.error('You are not authorized to view this page');
//         return;
//       }

//       try {
//         const res = await axios.get('http://localhost:5000/api/employees');
//         const filteredEmployees = res.data.filter(employee => employee.role === 'Employee');
//         setEmployees(filteredEmployees || []);
//       } catch (error) {
//         console.log(error);
//         toast.error('Failed to fetch employees');
//       }
//     };

//     if (userRole === 'Admin') {
//       fetchEmployees();
//     }
//   }, [userRole]);

//   const handleAddEmployee = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post(
//         'http://localhost:5000/api/auth/register',
//         newEmployee,
//         {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         }
//       );
//       if (res.status === 201 && res.data?.user) {
//         setEmployees([...employees, res.data.user]);
//         setNewEmployee({ name: '', email: '', password: '', role: 'Employee' });
//         toast.success('Registered successfully');
//       } else {
//         throw new Error('Invalid response from server');
//       }
//     } catch (error) {
//       toast.error(error?.response?.data?.message || 'Failed to register employee');
//       console.log('Error during employee registration:', error.response?.data || error);
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <Toaster position="top-right" reverseOrder={false} />
//       <div className="bg-white shadow-md rounded-lg p-6">
//         <h2 className="text-2xl font-bold mb-4">Add New Employee</h2>
//         <form onSubmit={handleAddEmployee} className="space-y-4">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <input
//               type="text"
//               placeholder="Name"
//               className="px-4 py-2 border rounded-md"
//               value={newEmployee.name}
//               onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
//               required
//             />
//             <input
//               type="email"
//               placeholder="Email"
//               className="px-4 py-2 border rounded-md"
//               value={newEmployee.email}
//               onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
//               required
//             />
//             <input
//               type="password"
//               placeholder="Password"
//               className="px-4 py-2 border rounded-md"
//               value={newEmployee.password}
//               onChange={(e) => setNewEmployee({ ...newEmployee, password: e.target.value })}
//               required
//             />
//             <select
//               className="px-4 py-2 border rounded-md"
//               value={newEmployee.role}
//               onChange={(e) => setNewEmployee({ ...newEmployee, role: e.target.value })}
//             >
//               <option value="Employee">Employee</option>
//               <option value="Admin">Admin</option>
//             </select>
//           </div>
//           <button
//             type="submit"
//             className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//           >
//             <UserPlus className="h-5 w-5 mr-2" />
//             Add Employee
//           </button>
//         </form>
//       </div>

//       {userRole === 'Admin' ? (
//         <div className="bg-white shadow-md rounded-lg p-6">
//           <h2 className="text-2xl font-bold mb-4">Employee List</h2>
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead>
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Name
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Email
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Role
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {employees.length > 0 ? (
//                   employees.map((employee, index) => (
//                     <tr key={index}>
//                       <td className="px-6 py-4 whitespace-nowrap">{employee.name || 'N/A'}</td>
//                       <td className="px-6 py-4 whitespace-nowrap">{employee.email || 'N/A'}</td>
//                       <td className="px-6 py-4 whitespace-nowrap">{employee.role || 'N/A'}</td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="3" className="px-6 py-4 text-center">No employees found</td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       ) : (
//         <div className="bg-white shadow-md rounded-lg p-6 text-center">
//           <p className="text-lg text-red-500">You are not authorized to view this page</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminDashboard;
import React, { useState, useEffect } from 'react';
import { UserPlus } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

const AdminDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Employee'
  });

  const [userRole, setUserRole] = useState(null); // State to store current user's role
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('user')); // Get user data from localStorage
    if (!currentUser) {
      toast.error('User not found. Please log in again.');
      return;
    }
    setUserData(currentUser); // Set user data
    if (currentUser.role === 'Admin') {
      setUserRole('Admin'); // Set user role if the user is an Admin
    } else {
      setUserRole('Employee'); // Set user role as Employee if not Admin
    }
  }, []);

  useEffect(() => {
    const fetchEmployees = async () => {
      if (userRole !== 'Admin') {
        toast.error('You are not authorized to view this page');
        return;
      }

      try {
        const token = localStorage.getItem('token'); // Get the token from localStorage
        if (!token) {
          toast.error('No token found. Please log in again.');
          return;
        }

        const res = await axios.get('http://localhost:5000/api/employees', {
          headers: {
            'Authorization': `Bearer ${token}`, // Add token to Authorization header
          },
        });

        const filteredEmployees = res.data.filter(employee => employee.role === 'Employee');
        setEmployees(filteredEmployees || []);
      } catch (error) {
        console.log(error);
        toast.error('Failed to fetch employees');
      }
    };

    if (userRole === 'Admin') {
      fetchEmployees();
    }
  }, [userRole]);

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'http://localhost:5000/api/auth/register',
        newEmployee,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (res.status === 201 && res.data?.user) {
        setEmployees([...employees, res.data.user]);
        setNewEmployee({ name: '', email: '', password: '', role: 'Employee' });
        toast.success('Registered successfully');
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to register employee');
      console.log('Error during employee registration:', error.response?.data || error);
    }
  };

  return (
    <div className="space-y-6">
      <Toaster position="top-right" reverseOrder={false} />
      {userData ? (
        <>
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
                  <option value="Employee">Employee</option>
                  <option value="Admin">Admin</option>
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

          {userRole === 'Admin' ? (
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
                    {employees.length > 0 ? (
                      employees.map((employee, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap">{employee.name || 'N/A'}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{employee.email || 'N/A'}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{employee.role || 'N/A'}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3" className="px-6 py-4 text-center">No employees found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="bg-white shadow-md rounded-lg p-6 text-center">
              <p className="text-lg text-red-500">You are not authorized to view this page</p>
            </div>
          )}
        </>
      ) : (
        <div>Loading...</div> // Handle loading state
      )}
    </div>
  );
};

export default AdminDashboard;
