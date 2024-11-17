import { Request, Response } from 'express';
import { Get, Post } from './Decorators/routes';
import { Controller } from './Decorators/controller';
import { testUSE } from './middlewares/logRequest';
import { use } from './Decorators/use';
import { validator } from './Decorators/validator';
import { CheckBody } from './middlewares/CheckBody';
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
} 