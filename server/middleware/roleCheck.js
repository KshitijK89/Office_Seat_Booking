// Middleware to check if the user is a Team Leader
export const isTeamLeader = (req, res, next) => {
    if (req.user.role !== 'Team Leader') {
      return res.status(403).json({ message: 'Team Leader access required' });
    }
    next();
  };
  
  // Middleware to check if the user is an Employee
  export const isEmployee = (req, res, next) => {
    if (req.user.role !== 'Employee') {
      return res.status(403).json({ message: 'Employee access required' });
    }
    next();
  };