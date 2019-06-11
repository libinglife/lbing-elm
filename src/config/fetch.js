import { baseUrl } from "./env.js";

export default async(url = '', data = {}, type = 'GET', method = "fetch") => {

    type = type.toUpperCase();
    url = baseUrl + url;

    if (type == 'GET') {
        let dataStr = ''; //参数字符串拼接
        Object.keys(data).forEach(key => {
            dataStr += key + '=' + data[key] + '&'
        });

        if (dataStr !== "") {
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

        let avatarConfig = {
            credentials: 'include',
            method: type,
        }

        if (type == 'POST' && !(url.indexOf("avatar") > -1)) {
            Object.defineProperty(requestConfig, 'body', {
                value: JSON.stringify(data)
            })
        } else if (url.indexOf("avatar") > -1) { //上传头像
            Object.defineProperty(avatarConfig, 'body', {
                value: data.files
            })
        }

        try {
            let response;
            if (url.indexOf("avatar") > -1) {
                response = await fetch(url, avatarConfig);
            } else {
                response = await fetch(url, requestConfig);
            }


            const responseJson = await response.json();

            return responseJson;

        } catch (error) {

            throw new Error(error);
        }
    } else { //不支持 使用ajax
        return new Promise((resolve, reject) => {
            let requestObj;
            if (window.XMLHttpRequest) {
                requestObj = new XMLHttpRequest();
            } else {
                requestObj = new ActiveXObject;
            }


            let sendData = "";
            if (type == "POST") {
                sendData = JSON.stringify(data);
            };

            requestObj.open(type, url, true);
            requestObj.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            requestObj.send(sendData);

            requestObj.onreadystatechange = () => {
                if (requestObj.readyState == 4) {
                    if (requestObj.status == 200) {
                        let obj = requestObj.response;
                        if (typeof obj !== 'object') {
                            obj = JSON.parse(obj);
                        }
                        resolve(obj);
                    } else {
                        reject(requestObj)
                    }

                }
            }
        })
    }
}