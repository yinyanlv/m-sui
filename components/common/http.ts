import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

// 每次请求携带cookies信息
axios.defaults.withCredentials = true;

export const instance: AxiosInstance = axios.create({
    timeout: 3 * 60 * 1000
});

export interface HttpConfig extends AxiosRequestConfig {
    mock: boolean | undefined;
    mockData: any;
    notCheckBody: boolean;
}

class Http {

    constructor() {
        this._setInterceptors();
    }

    private _setInterceptors(): void {

        instance.interceptors.request.use((config) => {
            return config;
        }, (err) => {
            return Promise.reject(err);
        });

        instance.interceptors.response.use((res) => {
            return res;
        }, (err) => {
            return Promise.reject(err);
        });
    }

    get(url: string, config?: HttpConfig): Promise<any> {

        return new Promise((resolve, reject) => {
            instance.get(url, config)
                .then((res) => {
                    const body = res.data;

                    if (config && config.notCheckBody) {
                        resolve(body);
                    } else if (body.success) {
                        if (body.result) {
                            resolve(body.result);
                        } else {
                            resolve(body);
                        }
                    } else {
                        reject(new Error(body.message || 'Network Error!'));
                    }
                })
                .catch((err) => {
                    if (config && config.mock) {
                        resolve(config.mockData);
                    } else {
                        reject(err);
                    }
                });
        });
    }

    post(url: string, params: any = null, config: HttpConfig): Promise<any> {

        return new Promise((resolve, reject) => {
            instance.post(url, params, config)
                .then((res) => {
                    const body = res.data;

                    if (config && config.notCheckBody) {
                        resolve(body);
                    } else if (body.success) {
                        if (body.result) {
                            resolve(body.result);
                        } else {
                            resolve(body);
                        }
                    } else {
                        reject(new Error(body.message || 'Network Error!'));
                    }
                })
                .catch((err) => {
                    if (config.mock) {
                        resolve(config.mockData);
                    } else {
                        reject(err);
                    }
                });
        });
    }
}

export const http = new Http();
