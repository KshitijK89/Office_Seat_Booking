// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { MapPin, Users } from 'lucide-react';

// const EmployeeDashboard = () => {
//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem('user'));

//   return (
//     <div className="space-y-6">
//       <div className="bg-white shadow-md rounded-lg p-6">
//         <h2 className="text-2xl font-bold mb-4">Welcome, {user?.name}!</h2>
//         <p className="text-gray-600 mb-6">
//           Book your seat or view office occupancy status.
//         </p>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <button
//             onClick={() => navigate('/book-seat')}
//             className="flex items-center justify-center p-6 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
//           >
//             <MapPin className="h-6 w-6 text-blue-600 mr-2" />
//             <span className="text-lg font-medium text-blue-600">Book a Seat</span>
//           </button>
//           <div className="flex items-center justify-center p-6 bg-green-50 rounded-lg">
//             <Users className="h-6 w-6 text-green-600 mr-2" />
//             <span className="text-lg font-medium text-green-600">
//               Current Occupancy: 65%
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EmployeeDashboard;

import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MapPin, Users } from 'lucide-react';

const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state?.user || JSON.parse(localStorage.getItem('user'));

  return (
    <div className="space-y-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Welcome, {user?.name}!</h2>
        <p className="text-gray-600 mb-6">
          Book your seat or view office occupancy status.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button
            onClick={() => navigate('/book-seat', { state: { user } })}
            className="flex items-center justify-center p-6 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <MapPin className="h-6 w-6 text-blue-600 mr-2" />
            <span className="text-lg font-medium text-blue-600">Book a Seat</span>
          </button>
          <div className="flex items-center justify-center p-6 bg-green-50 rounded-lg">
            <Users className="h-6 w-6 text-green-600 mr-2" />
            <span className="text-lg font-medium text-green-600">
              Current Occupancy: 65%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
