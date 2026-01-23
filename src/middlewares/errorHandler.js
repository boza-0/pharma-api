export function errorHandler(err, req, res, next) {
  if (err.message === 'NOT_FOUND') {
    return res.status(404).json({ error: 'Resource not found' });
  }

  console.error(err);

  res.status(500).json({
    error: 'Internal server error'
  });
}
