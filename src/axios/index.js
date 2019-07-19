import JsonP from 'jsonp';
import axios from 'axios';
import { Modal } from 'antd';
export default class Axios{
    static jsonp(options){
        return new Promise((resolve,reject)=>{
            JsonP(options.url,{
                param:'callback'
            },function(error,response){
                if(response.status==='success'){
                    resolve(response);
                }else{
                    reject(response.message);
                }
            })
        })
    }
    static ajax(options){
        let loading;
        if(options.data && options.data.isShowLoading!== false){
            loading=document.getElementById('ajaxLoading');
            loading.style.display= "block"
        }
        let baseApi='https://www.easy-mock.com/mock/5ce0ba27f2500f2f38c05b85/mockapi';
        return new Promise((resolve,reject)=>{
            
           axios({
               url:options.url,
               method:'get',
               baseURL:baseApi,
               timeout:5000,
               params:(options.data && options.data.params) || '' 

           }).then((response)=>{
            if(options.data && options.data.isShowLoading!== false){
                loading=document.getElementById('ajaxLoading');
                loading.style.display= "none"
            }
               if(response.status=='200'){
                    let res = response.data;
                    if(res.code== '0'){
                        resolve(res);
                    }else{
                        Modal.info({
                            title:'提示',
                            content:res.msg
                        })
                    }
               }else{
                reject(response.data);
               }
           })

        }) 
    }
}



//.then里的response
//config: {adapter: ƒ, transformRequest: {…}, transformResponse: {…}, timeout: 5000, xsrfCookieName: "XSRF-TOKEN", …}
//data: {code: 0, msg: "您当前未登录", result: Array(10)}
//headers: {content-type: "application/json; charset=utf-8"}
//request: XMLHttpRequest {onreadystatechange: ƒ, readyState: 4, timeout: 5000, withCredentials: false, upload: XMLHttpRequestUpload, …}
//status: 200
//statusText: "OK"
//__proto__: Object