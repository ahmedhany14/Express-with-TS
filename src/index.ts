import express from 'express';
import dotenv from 'dotenv';
import { LogInRouter } from './routes/LoginRoutes';
import bodyParser = require('body-parser');
dotenv.config({ path: ".config.env" });

const app = express();

// middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());


app.use("/", LogInRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}, HIT http://localhost:${PORT}`);
});
