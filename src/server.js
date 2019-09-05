import app from './app';

const port = 3333;

app.listen(port, () => {
  console.log(`Server running at port ${port}. Press CTRL+C to stop. `);
});
