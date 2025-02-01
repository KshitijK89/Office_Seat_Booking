import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const BookingModal = ({ seat, onClose, onConfirm }) => {
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Book Seat {seat.seatNumber}</h2>
        <div>
          <label>Start Time:</label>
          <DatePicker
            selected={startTime}
            onChange={(date) => setStartTime(date)}
            showTimeSelect
          />
        </div>
        <div>
          <label>End Time:</label>
          <DatePicker
            selected={endTime}
            onChange={(date) => setEndTime(date)}
            showTimeSelect
          />
        </div>
        <button onClick={onClose}>Cancel</button>
        <button onClick={() => onConfirm({ startTime, endTime })}>
          Confirm Booking
        </button>
      </div>
    </div>
  );
};

export default BookingModal;