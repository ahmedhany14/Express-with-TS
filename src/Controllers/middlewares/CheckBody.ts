
import { Request, Response, NextFunction } from "express";

export const CheckBody = (Body: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        for (let key of Body) {
            if (!req.body[key]) {
                res.status(422).send(`Missing property ${key}`);
                return;
            }
        }
        next();
    }
}

