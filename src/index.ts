import express from 'express';
import dotenv from 'dotenv';
import cookieSession from 'cookie-session';

import { LogInRouter } from './routes/LoginRoutes';
import { AppRouter } from './routes/appRouter';

import './Controllers/LoginController';
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

app.get('/',
    (request: express.Request, response: express.Response) => {
        if (request.session?.loggedIn)
            response.send(`
                <div>
                    <div>You are logged in</div>
                    <a href="/logout">Logout</a>
                </div>
            `);
        else
            response.send(`
                <div>
                    <div>You are not logged in</div>
                    <a href="/login">Login</a>
                </div>
            `);
    });
app.use("/", LogInRouter);

app.use('/', AppRouter.getInstance());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}, HIT http://localhost:${PORT}`);
});
