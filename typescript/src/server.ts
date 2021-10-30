import express from 'express'
const app = express()

app.get('/', (req, res) => {
  return res.json({ msg: "Olá mundo!"})
})

app.listen(3000, () => console.log('Server running on port 3000'))