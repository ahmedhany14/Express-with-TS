import express from 'express';
import dotenv from 'dotenv';
import cookieSession from 'cookie-session';

import { AppRouter } from './routes/appRouter';

import './Controllers/LoginController';
import './Controllers/RootRouter';
import './Controllers/MeRouter';
import bodyParser = require('body-parser');
dotenv.config({ path: ".config.env" });

const app = express();

// middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({
    keys: ['mysecretkey'],
    maxAge: 60000,
}));
app.use(express.json());


app.use('/', AppRouter.getInstance());


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}, HIT http://localhost:${PORT}`);
});
