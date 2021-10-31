import express from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    return res.send('<h1>Olá Mundo!</h1>');
});

app.post('/courses', (req, res) => {
    const { name } = req.body;
    return res.json({ name });
});

app.listen(PORT, () => console.log(`Server is Running on port: ${PORT}`));
