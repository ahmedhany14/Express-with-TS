import { Request, Response } from 'express';
import { Get } from './Decorators/routes';
import { Controller } from './Decorators/controller';

@Controller('/auth')
class Login {
    @Get('/login')
    public login(request: Request, response: Response): void {
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
    }
} 