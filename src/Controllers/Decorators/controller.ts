import { AppRouter } from "../../routes/appRouter";
import { methods } from "./methods";

const router = AppRouter.getInstance();

export function Controller(routePrefix: string) {
    return function (target: Function) {
        const routeHandlers = Object.getOwnPropertyNames(target.prototype)

        for (let key of routeHandlers) {
            const path = Reflect.getMetadata('path', target.prototype, key);
            const method: methods = Reflect.getMetadata('method', target.prototype, key);
            if (path)
                router[method](`${routePrefix}${path}`, target.prototype[key]);
        }
    }
}