export function debounce(fn: any, time: number): (...args: any[]) => any {

    let timer: ReturnType<typeof setTimeout>;

    return (...args: any[]): any => {
       
        if (timer) {
            clearTimeout(timer);
        }

        timer = setTimeout(() => {
            fn && fn(...args);
        }, time);
    };
}