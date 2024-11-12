import express, { Request, Response } from "express";

interface reqBody extends Request {
    body: {
        email: string;
        password: string;
    }
}

function requireAuth(request: Request, response: Response, next: Function) {
    if (request.session?.loggedIn)
        return next();

    response.status(403).send("Not permitted");
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
        if (!email || !password || !(email === "ahmed@hotmail.com" && password === "1234"))
            response.send("Email or password is incorrect");

        request.session = { loggedIn: true };
        response.redirect("/");
    })


router.route("/logout")
    .get((request: Request, response: Response) => {
        request.session = undefined;
        response.redirect("/");
    })

router.route("/protected")
    .get(requireAuth, (request: Request, response: Response) => {
        response.send("Welcome to protected route, logged in user");
    });
export { router as LogInRouter };