import { Request, Response, NextFunction } from "express";

export function protect(request: Request, response: Response, next: NextFunction) {
    if (request.session?.loggedIn)
        return next();
    response.status(403).send("Not permitted");
}
