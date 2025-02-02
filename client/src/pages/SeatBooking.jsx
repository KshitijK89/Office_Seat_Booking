

// import React, { useState } from 'react';
// import { AirVent, Building } from 'lucide-react';
// import toast from 'react-hot-toast';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const SeatBooking = () => {
//   const navigate = useNavigate();
//   const [selectedFloor, setSelectedFloor] = useState(1);
//   const [selectedSeats, setSelectedSeats] = useState([]);
//   const [seats, setSeats] = useState(
//     Array(3).fill().map(() => Array(25).fill(false)) // 3 floors, 25 seats each
//   );
//   const [acStatus, setAcStatus] = useState(
//     Array(3).fill().map(() => [false, false]) // 3 floors, 2 ACs each
//   );
//   const [userRole, setUserRole] = useState('Employee'); // 'Employee' or 'Team Leader'

//   const floors = [1, 2, 3];

//   const handleSeatSelect = (floorIndex, seatIndex) => {
//     if (seats[floorIndex][seatIndex]) {
//       toast.error('This seat is already booked');
//       return;
//     }

//     const newSelectedSeats = selectedSeats.includes(`${floorIndex}-${seatIndex}`)
//       ? selectedSeats.filter(seat => seat !== `${floorIndex}-${seatIndex}`)
//       : [...selectedSeats, `${floorIndex}-${seatIndex}`];

//     setSelectedSeats(newSelectedSeats);
//   };

//   const confirmBooking = async () => {
//     if (selectedSeats.length === 0) {
//       toast.error('Please select at least one seat');
//       return;
//     }

//     const newSeats = [...seats];
//     const newAcStatus = [...acStatus];
//     const seatNumbers = [];

//     selectedSeats.forEach(seatId => {
//       const [floorIndex, seatIndex] = seatId.split('-').map(Number);
//       newSeats[floorIndex][seatIndex] = true;
//       seatNumbers.push(seatIndex + 1);

//       // Check AC status for the floor
//       const columnIndex = seatIndex % 5;
//       if (columnIndex < 3) {
//         newAcStatus[floorIndex][0] = true; // AC 1
//       } else {
//         newAcStatus[floorIndex][1] = true; // AC 2
//       }
//     });

//     setSeats(newSeats);
//     setAcStatus(newAcStatus);

//     try {
//       if (userRole === 'Employee') {
//         await axios.post('http://localhost:5000/api/seats/book', {
//           seats: seatNumbers,
//         });
//       } else if (userRole === 'Team Leader') {
//         await axios.post('http://localhost:5000/api/seats/book-team', {
//           seats: seatNumbers,
//         });
//       }
//       setSelectedSeats([]);
//       toast.success('Seats booked successfully!');
//       navigate('/booking-success', { state: { bookedSeats: seatNumbers } }); // Navigate to next page with booked seats
//     } catch (error) {
//       toast.error('Error booking seats');
//     }
//   };

//   return (
//     <div className="space-y-6">
//       {/* Floor Selection */}
//       <div className="bg-white shadow-md rounded-lg p-6">
//         <h2 className="text-2xl font-bold mb-4">Select Floor</h2>
//         <div className="grid grid-cols-3 gap-4">
//           {floors.map((floor) => (
//             <button
//               key={floor}
//               onClick={() => setSelectedFloor(floor)}
//               className={`p-4 rounded-lg flex items-center justify-center ${
//                 selectedFloor === floor
//                   ? 'bg-blue-500 text-white'
//                   : 'bg-gray-100 hover:bg-gray-200'
//               }`}
//             >
//               <Building className="h-6 w-6 mr-2" />
//               <span>Floor {floor}</span>
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Seat Layout */}
//       <div className="bg-white shadow-md rounded-lg p-6">
//         <h2 className="text-2xl font-bold mb-4">Floor {selectedFloor} Layout</h2>
//         <div className="grid grid-cols-5 gap-4 mb-8">
//           {seats[selectedFloor - 1].map((isOccupied, index) => (
//             <button
//               key={index}
//               onClick={() => handleSeatSelect(selectedFloor - 1, index)}
//               className={`p-4 rounded-lg ${
//                 isOccupied
//                   ? 'bg-red-500 text-white cursor-not-allowed'
//                   : selectedSeats.includes(`${selectedFloor - 1}-${index}`)
//                   ? 'bg-yellow-500 text-white'
//                   : 'bg-green-100 hover:bg-green-200'
//               }`}
//             >
//               Seat {index + 1}
//             </button>
//           ))}
//         </div>

//         {/* AC Status */}
//         <div className="flex justify-around p-4 bg-gray-50 rounded-lg mb-4">
//           {acStatus[selectedFloor - 1].map((isActive, index) => (
//             <div
//               key={index}
//               className={`flex items-center ${
//                 isActive ? 'text-blue-600' : 'text-gray-400'
//               }`}
//             >
//               <AirVent className="h-6 w-6 mr-2" />
//               <span>AC Unit {index + 1}: {isActive ? 'ON' : 'OFF'}</span>
//             </div>
//           ))}
//         </div>

//         {/* Confirm Booking Button */}
//         {selectedSeats.length > 0 && (
//           <button
//             onClick={confirmBooking}
//             className="w-full mt-4 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//           >
//             Confirm Booking ({selectedSeats.length} seats)
//           </button>
//         )}
//       </div>

//       {/* Legend */}
//       <div className="bg-white shadow-md rounded-lg p-6">
//         <h3 className="text-xl font-bold mb-4">Legend</h3>
//         <div className="flex space-x-4">
//           <div className="flex items-center">
//             <div className="w-4 h-4 bg-green-100 rounded mr-2"></div>
//             <span>Available</span>
//           </div>
//           <div className="flex items-center">
//             <div className="w-4 h-4 bg-yellow-500 rounded mr-2"></div>
//             <span>Selected</span>
//           </div>
//           <div className="flex items-center">
//             <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
//             <span>Occupied</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SeatBooking;
import React, { useState } from 'react';
import { AirVent, Building } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const SeatBooking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state?.user || JSON.parse(localStorage.getItem('user'));

  const [selectedFloor, setSelectedFloor] = useState(1);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seats, setSeats] = useState(
    Array(3).fill().map(() => Array(25).fill(false))
  );
  const [acStatus, setAcStatus] = useState(
    Array(3).fill().map(() => [false, false])
  );

  if (!user) {
    toast.error('User data not found. Please log in again.');
    navigate('/login');
    return null;
  }

  const handleSeatSelect = (floorIndex, seatIndex) => {
    if (seats[floorIndex][seatIndex]) {
      toast.error('This seat is already booked');
      return;
    }
    const newSelectedSeats = selectedSeats.includes(`${floorIndex}-${seatIndex}`)
      ? selectedSeats.filter(seat => seat !== `${floorIndex}-${seatIndex}`)
      : [...selectedSeats, `${floorIndex}-${seatIndex}`];
    setSelectedSeats(newSelectedSeats);
  };

  const confirmBooking = async () => {
    if (selectedSeats.length === 0) {
      toast.error('Please select at least one seat');
      return;
    }

    const seatNumbers = selectedSeats.map(seatId => {
      const [, seatIndex] = seatId.split(' ').map(Number);
      return seatIndex + 1;
    });

    try {
      const { id: userId } = user;
      console.log('User ID:', userId);
      console.log('Selected Seats:', seatNumbers);
    
      await axios.post('http://localhost:5000/api/seats/book', { userId, seats: seatNumbers });
    
      setSelectedSeats([]);
      toast.success('Seats booked successfully!');
      navigate('/booking-success', { state: { bookedSeats: seatNumbers } });
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error booking seats';
      console.error('Booking Error:', errorMessage);
      toast.error(errorMessage);
    }
    
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Select Floor</h2>
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3].map(floor => (
            <button
              key={floor}
              onClick={() => setSelectedFloor(floor)}
              className={`p-4 rounded-lg flex items-center justify-center ${
                selectedFloor === floor ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <Building className="h-6 w-6 mr-2" />
              <span>Floor {floor}</span>
            </button>
          ))}
        </div>
      </div>
      
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Floor {selectedFloor} Layout</h2>
        <div className="grid grid-cols-5 gap-4 mb-8">
          {seats[selectedFloor - 1].map((isOccupied, index) => (
            <button
              key={index}
              onClick={() => handleSeatSelect(selectedFloor - 1, index)}
              className={`p-4 rounded-lg ${
                isOccupied ? 'bg-red-500 text-white cursor-not-allowed' : 
                selectedSeats.includes(`${selectedFloor - 1}-${index}`) ? 'bg-yellow-500 text-white' : 'bg-green-100 hover:bg-green-200'
              }`}
            >
              Seat {index + 1}
            </button>
          ))}
        </div>

        <div className="flex justify-around p-4 bg-gray-50 rounded-lg mb-4">
          {acStatus[selectedFloor - 1].map((isActive, index) => (
            <div key={index} className={`flex items-center ${isActive ? 'text-blue-600' : 'text-gray-400'}`}>
              <AirVent className="h-6 w-6 mr-2" />
              <span>AC Unit {index + 1}: {isActive ? 'ON' : 'OFF'}</span>
            </div>
          ))}
        </div>

        {selectedSeats.length > 0 && (
          <button
            onClick={confirmBooking}
            className="w-full mt-4 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Confirm Booking ({selectedSeats.length} seats)
          </button>
        )}
      </div>
    </div>
  );
};

export default SeatBooking;