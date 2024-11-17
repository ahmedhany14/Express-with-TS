import 'reflect-metadata';
import { methods } from './methods';
import { metadataKeys } from './MetaData';
// here we have a issue, which is we have a function only for Get method, but we need to have for Post, Put, Delete, etc.
/*
all these functions will have the same signature, so we can create a function that will return a function that will have the same signature as the Get function
but we will pass the method as an argument to the function that will return the function
*/

function routeBinder(method: string) {
    return function (path: string) {
        return function (target: any, key: string) {
            Reflect.defineMetadata(metadataKeys.path, path, target, key);
            Reflect.defineMetadata(metadataKeys.method, method, target, key);
        }
    }
}

export const Get = routeBinder(methods.get);
export const Post = routeBinder(methods.post);
export const Put = routeBinder(methods.put);
export const Delete = routeBinder(methods.delete);
export const Patch = routeBinder(methods.patch);