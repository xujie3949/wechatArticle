import { fetchMethod, createFetch } from '../fetch/fetch'
import appConfig from '../constants/appConfig'

const api = {
    login: (parameter)=> createFetch(
        `${appConfig.serviceRoot}app/login`,
        fetchMethod.Get,
        {parameter: parameter}
    )
};

async function callApi(api, success, fail) {
    try {
        const response = await api;
        if (!response.ok) {
            throw new Error(`网络错误:${response.status}`);
        }

        const jsonResult = await response.json();

        if (jsonResult.errcode === 0) {
            if (success) {
                const data = jsonResult.data;
                success(data);
            }
        } else {
            throw new Error(`服务器错误:${jsonResult.errmsg}`);
        }
    } catch (error) {
        if (fail) {
            fail(error.message);
        }
    }
}

export {
    api,
    callApi
};

