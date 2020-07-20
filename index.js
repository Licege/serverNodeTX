const app = require('./app')
const config = require('config')
// const port = process.env.PORT || 9090
const PORT = config.get('port') || 9090

app.listen(PORT, () => console.log(`Server has been started on ${PORT}`))
