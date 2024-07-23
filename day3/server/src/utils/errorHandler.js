const handleError = (res, error, message) => {
  res.status(500).json({ message })
}