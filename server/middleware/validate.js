export const validate = (schema) => (req, res, next) => {
    try {
      // Validate the request body against the schema
      schema.parse(req.body);
      next();
    } catch (error) {
      // If validation fails, return a 400 error with the validation errors
      res.status(400).json({
        message: 'Validation failed',
        errors: error.errors,
      });
    }
  };