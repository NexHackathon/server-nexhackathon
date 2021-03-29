import express from 'express';

const app = express();

const port = process.env.PORT || 3333

app.use(express.json());

app.get('/', (request, response) => {
  return response.json({ hello: 'world' });
});

app.listen(port, () => console.log(`Server is running on port:${port}`));