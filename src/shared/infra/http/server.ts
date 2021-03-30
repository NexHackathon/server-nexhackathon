import express from 'express';

import '@shared/infra/typeorm';

import '@shared/container';
import { router } from './routes';

const app = express();

const port = process.env.PORT || 3333;

app.use(express.json());

app.use(router);

app.listen(port, () => console.log(`Server is running on port:${port}`));
