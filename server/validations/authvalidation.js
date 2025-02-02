import { z } from 'zod';

// Schema for registration
export const registerSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  role: z.enum(['Employee', 'Team Leader', 'Admin']).default('Employee'),
});

// Schema for login
export const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
});

// Schema for adding seats
export const addSeatsSchema = z.object({
  floorId: z.string().min(1, { message: 'Floor ID is required' }),
  numberOfSeats: z.number().int().positive({ message: 'Number of seats must be a positive integer' }),
});

// Schema for booking a seat
export const bookSeatSchema = z.object({
  seatId: z.string().min(1, { message: 'Seat ID is required' }),
});

// Schema for booking seats for a team
export const bookSeatsForTeamSchema = z.object({
  seatIds: z.array(z.string().min(1, { message: 'Seat ID is required' })),
  employeeIds: z.array(z.string().min(1, { message: 'Employee ID is required' })),
});