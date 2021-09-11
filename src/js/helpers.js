import { TIMEOUT_SEC } from './config';
const timeout = function (s) {
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
};
export const getJson = async function (url) {
    try {
        const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);

        const data = await res.json();
        if (!res.ok) throw new Error(`${data.message} (${res.status})`);
        return data;
    } catch (err) {


        throw err;
    }
};
export const sendJson = async function (url, uploadData) {
    try {
        const res = await Promise.race([fetch(url, {
            method: 'POST',
            //headers are the information about the request
            headers: {
                'Content-Type': 'application/json'//tell the api that we are sending data in json format

            },
            body: JSON.stringify(uploadData)
        }), timeout(TIMEOUT_SEC)]);

        const data = await res.json();
        if (!res.ok) throw new Error(`${data.message} (${res.status})`);
        return data;
    } catch (err) {


        throw err;
    }
};
