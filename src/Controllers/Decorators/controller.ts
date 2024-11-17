import { AppRouter } from "../../routes/appRouter";

const router = AppRouter.getInstance();

export function Controller(routePrefix: string) {
    return function (target: Function) {
        const routeHandlers = Object.getOwnPropertyNames(target.prototype)

        for (let key of routeHandlers) {
            const path = Reflect.getMetadata('path', target.prototype, key);
            if (path)
                router.get(`${routePrefix}${path}`, target.prototype[key]);
        }
    }
}