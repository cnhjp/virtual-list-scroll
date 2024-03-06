export function throttle(func: Function, delay: number) {
    let lastCall = 0;
    return function (this: any, ...args: any[]) {
        const now = new Date().getTime();
        if (now - lastCall < delay) {
            return;
        }
        lastCall = now;
        return func.apply(this, args);
    };
}