import styles from '../styles/Seat.module.css';

const Seat = ({ seat, onSelect, isSelected }) => {
  return (
    <div
      className={`${styles.seat} ${seat.status === 'available' ? styles.available : styles.occupied} ${isSelected ? styles.selected : ''}`}
      onClick={() => seat.status === 'available' && onSelect(seat)}
    >
      {seat.seatNumber}
    </div>
  );
};

export default Seat;