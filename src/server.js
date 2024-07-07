import  express from 'express';
import  dotenv from 'dotenv';
import  cors from 'cors';
import  userRoute from './routes/userRoutes.js';
import authRoute from './routes/authRoutes.js';
import organisationsRoute from "./routes/organisationRoute.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use('/api', userRoute);
app.use('/auth', authRoute)
app.use('/api', organisationsRoute);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} ☕💻🚀`);
});

export default { app, closeServer };