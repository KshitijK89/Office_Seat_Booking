// import React from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { Toaster } from 'react-hot-toast';
// import Login from './pages/Login';
// import AdminDashboard from './pages/AdminDashboard';
// import EmployeeDashboard from './pages/EmployeeDashboard';
// import SeatBooking from './pages/SeatBooking';
// import Layout from './components/Layout';
// import ProtectedRoute from './components/ProtectedRoute';

// function App() {
//   return (
//     <BrowserRouter>
//       <Toaster position="top-right" />
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route element={<Layout />}>
//           <Route path="/admin" element={
//             <ProtectedRoute role="admin">
//               <AdminDashboard />
//             </ProtectedRoute>
//           } />
//           <Route path="/dashboard" element={
//             <ProtectedRoute>
//               <EmployeeDashboard />
//             </ProtectedRoute>
//           } />
//           <Route path="/book-seat" element={
//             <ProtectedRoute>
//               <SeatBooking />
//             </ProtectedRoute>
//           } />
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import SeatBooking from './pages/SeatBooking';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<Layout />}>
          <Route path="/admin-dashboard" element={
            <ProtectedRoute role="Admin">
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/employee-dashboard" element={
            <ProtectedRoute>
              <EmployeeDashboard />
            </ProtectedRoute>
          } />
          <Route path="/book-seat" element={
            <ProtectedRoute>
              <SeatBooking />
            </ProtectedRoute>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;