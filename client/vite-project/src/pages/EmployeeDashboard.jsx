import { useState, useEffect } from 'react';
import SeatGrid from '../components/Seat';
import BookingModal from '../components/BookingModal';
import seatService from '../services/seatService';

const EmployeeDashboard = () => {
  const [seats, setSeats] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState(null);

  useEffect(() => {
    const fetchSeats = async () => {
      const data = await seatService.getSeats();
      setSeats(data);
    };
    fetchSeats();
  }, []);

  return (
    <div>
      <h1>Office Seat Map</h1>
      <SeatGrid
        seats={seats}
        onSelect={(seat) => setSelectedSeat(seat)}
      />
      {selectedSeat && (
        <BookingModal
          seat={selectedSeat}
          onClose={() => setSelectedSeat(null)}
          onConfirm={async (timeSlot) => {
            await seatService.bookSeat(selectedSeat.id, timeSlot);
            setSelectedSeat(null);
          }}
        />
      )}
    </div>
  );
};

export default EmployeeDashboard;