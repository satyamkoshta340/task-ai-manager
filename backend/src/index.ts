import 'dotenv/config';
import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  console.log("helloe")
  res.send("Hello World");
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
