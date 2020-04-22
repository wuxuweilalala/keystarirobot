import axios from 'axios';

axios.defaults.timeout = 180000;

axios.defaults.baseURL ="http://192.168.15.167:18809";
axios.interceptors.request.use(
    config => {
        config.headers = {
            Authorization:localStorage.getItem('Authorization'),
        };
        if(config.method === 'post') {
            config.headers = {
                'Content-Type': 'application/x-www-form-urlencoded',
            };
        }



        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function get(url, params = {}) {
    return new Promise((resolve, reject) => {
        axios
            .get(url, {
                params: {
                    ...params,
                    t: Date.now()
                }
            })
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err);
            });
    });
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.post(url, data).then(
            response => {
                resolve(response.data);
            },
            err => {
                reject(err);
            }
        );
    });
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.patch(url, data).then(
            response => {
                resolve(response.data);
            },
            err => {
                reject(err);
            }
        );
    });
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.put(url, data).then(
            response => {
                resolve(response.data);
            },
            err => {
                reject(err);
            }
        );
    });
}

/**
 * 封装delete请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function del(
    url,
    data = {
        data: {}
    }
) {
    return new Promise((resolve, reject) => {
        axios.delete(url, { data }).then(
            response => {
                resolve(response.data);
            },
            err => {
                reject(err);
            }
        );
    });
}
