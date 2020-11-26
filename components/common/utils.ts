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

export function stopPropagation(e: React.MouseEvent) {
    e.stopPropagation();
}

export function addClass(node: HTMLElement, cls: string): void {
    const list = Array.from(node.classList);

    if (!list.includes(cls)) {
        list.push(cls);
        node.className = list.join(' ');
    }
}

export function removeClass(node: HTMLElement, cls: string): void {
    let list = Array.from(node.classList);

    if (list.includes(cls)) {
        list = list.filter((item) => {
            return item !== cls;
        });
        node.className = list.join(' ');
    }
}

export function getImage(url: string) {
    if (url) {
        return `../../public/images/${url}`;
    } else {
        return '';
    }
}