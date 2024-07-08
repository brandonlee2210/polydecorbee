// errorHandler.js
export const errorHandler = (err, req, res, next) => {
  console.error(err.stack); // Log the error stack for debugging

  // Set the response status code and send an error message
  res.status(500).json({ error: "An unexpected error occurred!" });
};
