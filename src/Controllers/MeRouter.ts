import { Request, Response } from "express";
import { Get } from "./Decorators/routes";
import { use } from "./Decorators/use";
import { Controller } from "./Decorators/controller";
import { protect } from "./middlewares/protect";

@Controller('')
class userServers {

    @Get('/me')
    @use(protect)
    public me(request: Request, response: Response) {
        response.status(200).json({
            message: "You are logged",
        })
    }

}