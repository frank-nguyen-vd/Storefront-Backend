import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';
import productsController from './controllers/products.controller';

const app = express();
export default app;

const port = 5000;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/api', (req, res) => {
  res.send('Hello World');
});

app.use('/api/products', productsController);

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Listening on port ${port}!`));
