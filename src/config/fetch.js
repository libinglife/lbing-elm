import { baseUrl } from "./env.js";



export default async(url = '', data = {}, type = 'GET', method = "fetch") => {

    console.log(type);
    type = type.toUpperCase();
    url = baseUrl + url;

    if (type == 'GET') {
        let dataStr = ''; //参数字符串拼接
        Object.keys(data).forEach(key => {
            dataStr += key + '=' + data[key] + '&'
        });

        if (dataStr !== "") {
            // dataStr = dataStr.subStr(0, lastIndexOf("&"));
            dataStr = dataStr.substr(0, dataStr.lastIndexOf("&"));
            url = url + '?' + dataStr;
        }
    }


    if (window.fetch && method == 'fetch') {
        let requestConfig = {
            credentials: 'include',
            method: type,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            mode: "cors",
            cache: "force-cache"
        }

        if (type == 'POST') {
            Object.defineProperty(requestConfig, 'body', {
                value: JSON.stringify(data)
            })
        }

        try {
            const response = await fetch(url, requestConfig);
            console.log(response);
            const responseJson = await response.json();
            return responseJson;
        } catch (error) {

        }
    } else { //不支持 使用ajax

    }

}