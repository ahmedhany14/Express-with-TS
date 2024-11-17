
import { Request, Response, NextFunction } from 'express';
export const testUSE = (req: Request, res: Response, next: NextFunction) => {
    console.log('ana just ba test el middleware, ok!');
    next();
}