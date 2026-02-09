const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`)
  next(error)
}

const errorHandler = (err, req, res, next) => {
  const statusCode =
    res.statusCode && res.statusCode !== 200
      ? res.statusCode
      : 500

  if (res.headersSent) {
    return next(err) // prevents double-send
  }

  res.status(statusCode).json({
    message: err.message || "Internal Server Error",
  })
}

export { notFound, errorHandler }
