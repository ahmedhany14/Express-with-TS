import { AppRouter } from "../../routes/appRouter";
import { metadataKeys } from "./MetaData";
import { methods } from "./methods";
import { CheckBody } from './../middlewares/CheckBody';
const router = AppRouter.getInstance();

export function Controller(routePrefix: string) {
    return function (target: Function) {
        const routeHandlers = Object.getOwnPropertyNames(target.prototype)

        for (let key of routeHandlers) {
            const functionHandler = target.prototype[key];

            const path = Reflect.getMetadata(metadataKeys.path, target.prototype, key);
            const method: methods = Reflect.getMetadata(metadataKeys.method, target.prototype, key);
            const middlewares = Reflect.getMetadata(metadataKeys.middleware, target.prototype, key) || [];
            const body = Reflect.getMetadata(metadataKeys.validator, target.prototype, key) || [];


            if (path) {
                router[method](
                    `${routePrefix}${path}`,
                    ...middlewares,
                    CheckBody(body), // middleware to check if the body has the required fields
                    functionHandler
                );
            }
        }
    }
}