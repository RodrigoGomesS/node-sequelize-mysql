import express from "express";

const app = express();

app.use(express.json());

const port = 3000;

app.get('/teste', (req, res) => {
    res.status(200).send({mensage: 'Conexão concluída'});
})

app.listen(port, () => {
    console.log(`Servidor está rodando na porta: ${port}`);
})

export default app;