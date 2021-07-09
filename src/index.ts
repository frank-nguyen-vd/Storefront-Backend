import express from 'express';

const app = express();
export default app;

const port = 5000;

app.get('/api', (req, res) => {
  res.send('Hello World');
});

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Listening on port ${port}!`));
