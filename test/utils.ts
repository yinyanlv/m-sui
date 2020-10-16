export function sleep(time: number): Promise<any> {

    return new Promise((resolve, reject) => {

        setTimeout(() => {
            resolve(true);
        }, time);
    });
}