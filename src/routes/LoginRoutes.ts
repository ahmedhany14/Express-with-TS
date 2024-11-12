import express, { Request, Response } from "express";

interface reqBody extends Request {
    body: {
        email: string;
        password: string;
    }
}
const router = express.Router();
router.route("/login")
    .get((request, response) => {
        response.send(
            `
            <form action="/login" method="POST">
                <div>
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" />
                </div>
                <div>
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" />
                </div>
                <button type="submit">Submit</button>
            </form>
        `
        )
    })
    .post((request: reqBody, response): void => {
        const { email, password } = request.body;
        if (!email || !password)
            response.send("Email and Password are required");
        response.send(`Email: ${email}, Password: ${password}`);
    })


export { router as LogInRouter };