import React, { useState } from 'react';
import { AirVent } from 'lucide-react';
import toast from 'react-hot-toast';

const SeatBooking = () => {
  const [seats, setSeats] = useState(Array(20).fill(false));
  const [acStatus, setAcStatus] = useState(Array(2).fill(false));

  const toggleSeat = (index) => {
    const newSeats = [...seats];
    newSeats[index] = !newSeats[index];
    setSeats(newSeats);

    // Check if seats near AC units are occupied
    const acUnit1Seats = [0, 1, 2, 3, 4];
    const acUnit2Seats = [10, 11, 12, 13, 14];

    const ac1Active = acUnit1Seats.some(seatIndex => newSeats[seatIndex]);
    const ac2Active = acUnit2Seats.some(seatIndex => newSeats[seatIndex]);

    setAcStatus([ac1Active, ac2Active]);

    if (newSeats[index]) {
      toast.success('Seat booked successfully!');
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Office Layout</h2>
        <div className="grid grid-cols-5 gap-4 mb-8">
          {seats.map((isOccupied, index) => (
            <button
              key={index}
              onClick={() => toggleSeat(index)}
              className={`p-4 rounded-lg ${
                isOccupied
                  ? 'bg-red-500 text-white'
                  : 'bg-green-100 hover:bg-green-200'
              }`}
            >
              Seat {index + 1}
            </button>
          ))}
        </div>

        <div className="flex justify-around p-4 bg-gray-50 rounded-lg">
          {acStatus.map((isActive, index) => (
            <div
              key={index}
              className={`flex items-center ${
                isActive ? 'text-blue-600' : 'text-gray-400'
              }`}
            >
              <AirVent className="h-6 w-6 mr-2" />
              <span>AC Unit {index + 1}: {isActive ? 'ON' : 'OFF'}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-xl font-bold mb-4">Legend</h3>
        <div className="flex space-x-4">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-100 rounded mr-2"></div>
            <span>Available</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
            <span>Occupied</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatBooking;