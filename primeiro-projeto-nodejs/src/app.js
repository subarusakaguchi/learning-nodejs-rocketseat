const express = require('express')
const app = express()
const router = require('./routes/routerApi')
const PORT = 4000

app.use('/api', router)

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta: ${PORT}`)
})