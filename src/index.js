import 'dotenv/config';
import express from 'express';
import morgan from "morgan";
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import errorHandler from './middlewares/errorHandler.js';
import authenticate from './middlewares/authenticate.js';
import movieRoutes from "./routes/movie.routes.js";

const app = express();

const PORT = 3000;


app.use(express.json());
app.use(morgan("dev"));

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to HETIC users management!!'
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/users", authenticate, userRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});