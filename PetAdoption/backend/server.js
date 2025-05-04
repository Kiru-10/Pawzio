import app from './app.js';
import { pool } from './db.js';

const PORT = process.env.PORT || 5000;

pool.query('SELECT NOW()')
  .then(() => {
    console.log('Database connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('Database connection failed', err);
    process.exit(1);
  });