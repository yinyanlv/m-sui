export function debounce(fn: any, time: number): (...args: any[]) => any {

    let timer: NodeJS.Timeout;

    return (...args: any[]): any => {
       
        if (timer) {
            clearTimeout(timer);
        }

        timer = setTimeout(() => {
            fn && fn(...args);
        }, time);
    };
}