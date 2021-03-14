export default function (req, res, next) {
  // const paths = ['/admin', '/admin/', 'admin/', 'admin']
  req.headers.upgrade = ''
  // const paths = ["/"]
  // if (paths.includes(req.originalUrl)) {
  //   res.spa = false
  // }
  // res.spa = false
  next()
}
