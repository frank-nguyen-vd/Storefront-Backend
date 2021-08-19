import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';
import productsController from './controllers/products.controller';
import usersController from './controllers/users.controller';
import ordersController from './controllers/orders.controller';

const app = express();
export default app;

const port = 5000;

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/api', (req, res) => {
  res.send('Hello World');
});

app.use('/api/products', productsController);
app.use('/api/users', usersController);
app.use('/api/orders', ordersController);

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Listening on port ${port}!`));
