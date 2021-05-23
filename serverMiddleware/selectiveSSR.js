export default async function (req, res, next) {
  const paths = process.env.SSR_PAGES_OFF.split(',')
  req.headers.upgrade += ""
  await paths.forEach(path => {
    if (req.originalUrl.startsWith(path)) {
      res.spa = true
    }
  })
  next()
}
