import 'reflect-metadata';
export function Get(path: string) {
    return function (target: any, key: string) {
        Reflect.defineMetadata('path', path, target, key);
    }
}