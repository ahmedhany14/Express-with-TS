import { Request, Response, NextFunction } from "express";
import { Get } from "./Decorators/routes";
import { Controller } from "./Decorators/controller";


@Controller('')
class RootController {
    @Get('/')
    public home(request: Request, response: Response) {
        if (request.session?.loggedIn)
            response.send(`
                <div>
                    <div>You are logged in</div>
                    <a href="/auth/logout">Logout</a>
                </div>
            `);
        else
            response.send(`
                <div>
                    <div>You are not logged in</div>
                    <a href="/auth/login">Login</a>
                </div>
            `);
    }
}