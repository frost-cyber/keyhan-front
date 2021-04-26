export default function (req, res, next) {
  const paths = process.env.SSR_PAGES_OFF.split(',')
  req.headers.upgrade = ''
  paths.forEach(path => req.originalUrl.startsWith(path) ? res.spa = true : res.spa = false)
  next()
}
