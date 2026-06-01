import express from 'express';

const app = express();
const port = process.env.PORT || 3001;

app.get('/', (_req, res) => {
  res.send('Server is running');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
