import { app } from './app';

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.clear();
  console.log(`-> Server is running at: http://localhost:${PORT}`);
  console.log(`-> API Documentation: http://localhost:${PORT}/api-docs`);
});
