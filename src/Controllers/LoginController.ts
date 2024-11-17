import { Request, Response } from 'express';
import { Get, Post } from './Decorators/routes';
import { Controller } from './Decorators/controller';
import { validator } from './Decorators/validator';

interface RequestWithBody extends Request {
    user?: { email: string, password: string };
}
@Controller('/auth')
class Login {
    @Get('/login')
    public login(request: Request, response: Response): void {
        response.send(
            `
            <form method="POST">
                <div>
                <label>Email</label>
                <input name="email" />
                </div>
                <div>
                <label>Password</label>
                <input name="password" type="password" />
                </div>
                <button>Submit</button>
            </form>
        `
        )
    }

    @Post('/login')
    @validator('email', 'password')
    public postLogin(request: Request, response: Response): void {
        const { email, password } = request.body;
        if (!(email === "ahmed@hotmail.com" && password === "1234"))
            response.send("Email or password is incorrect");
        request.session = { loggedIn: true };
        response.redirect("/");
    }

    @Get('/logout')
    public logout(request: Request, response: Response): void {
        request.session = undefined;
        response.redirect("/");
    }
} 