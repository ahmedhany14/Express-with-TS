import 'reflect-metadata';

// here we have a issue, which is we have a function only for Get method, but we need to have for Post, Put, Delete, etc.
/*
all these functions will have the same signature, so we can create a function that will return a function that will have the same signature as the Get function
but we will pass the method as an argument to the function that will return the function
*/

function routeBinder(method: string) {
    return function (path: string) {
        return function (target: any, key: string) {
            Reflect.defineMetadata('path', path, target, key);
            Reflect.defineMetadata('method', method, target, key);
        }
    }
}

export const Get = routeBinder('get');
export const Post = routeBinder('post');
export const Put = routeBinder('put');
export const Delete = routeBinder('delete');
export const Patch = routeBinder('patch');