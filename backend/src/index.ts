import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import tasksRoutes from './routes/tasks.routes.js';

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Use morgan for HTTP request logging
app.use(morgan('dev'));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use('/tasks', tasksRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
