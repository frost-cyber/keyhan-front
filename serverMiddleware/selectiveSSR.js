export default function (req, res, next) {
  // const paths = ['/admin', '/admin/', 'admin/', 'admin']
  const paths = ["/"]
  if (paths.includes(req.originalUrl)) {
    res.spa = true
  }
  res.spa = true
  next()
}
