export default function (req, res, next) {
  // const paths = ['/admin', '/admin/', 'admin/', 'admin']
  const paths = ["/"]
  console.log(req.originalUrl)
  if (paths.includes(req.originalUrl)) {
    res.spa = true
  }

  next()
}
