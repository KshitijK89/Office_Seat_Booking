// import api from './api';

const seatService = {
  getSeats: async () => {
    const response = await api.get('/seats');
    return response.data;
  },

  bookSeat: async (seatId, timeSlot) => {
    const response = await api.post('/bookings', {
      seatId,
      timeSlot,
    });
    return response.data;
  },
};

export default seatService;