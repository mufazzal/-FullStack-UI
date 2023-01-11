const app = require('./app')

const port = 3100

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
  app.emit('appStarted')
})
