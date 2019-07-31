import Vue from 'vue'
import "babel-polyfill"
import axios from 'axios'
import store from '../store'
import { Message } from 'element-ui'

// let baseUrl = "",
// Vue.use(ElementUI);
const Service = {
  install (Vue) {
    this.vm = new Vue()
    this.init()
    Object.defineProperty(Vue.prototype, '$http', { value: this.axios })
  },
  vm: null,
  axios: null,
  init () {
    this.axios = axios.create({
        // baseURL:"http://192.168.3.59:3040/api",
        // baseURL:"http://127.0.0.1:8080",   //  本地环境
        // baseURL:"http://gateway.lvzheng.com",   //  线上环境
        // baseURL:"http://192.168.3.57:3040/api",   //  测试环境192.168.3.57:3040
        // baseURL:"http://192.168.3.59:3040/api",   //  测试环境192.168.3.57:3040
        baseURL:"http://gateway.testlvzheng.com/ehr-api",   //  测试环境
        // baseURL:"http://gateway.testlvzheng.com",   //  测试环境
        withCredentials: true,// 设置跨域携带cookie信息
       //timeout: 30000,
        headers: {
            post: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            }
        }
    })
    // this.axios.interceptors.request.use((config) => {
    //   // 在发送请求之前做某事
    //   let data = config.data || {}
    //     config.data = {
    //     //   bid: store.state.bid,
    //       body: data
    //     }
    //    console.log(config)
    //   return config
    // }, (error) => {
    //   // 请求错误时做些事
    //   return Promise.reject(error)
    // })
    // 返回状态判断
    // this.axios.interceptors.response.use((res) => {
    //     console.log(8888,data.data.code)
    //   let { data } = res
    //   if (data.data.code === 200) {
    //     return Promise.resolve(data)
    //   } else if (data.data.code === 250) {
    //     console.log(data.data.code)
    //      window.location.href='http://test.union.lvzheng.com/emp/checklog';
    //   } else {
    //     return Promise.reject(new Error(data.statusText))
    //   }
    // }, (error) => {
    //   let txt = error.message.indexOf('timeout') === -1 ? '网络发生错误!' : '网络请求超时!'
    //   return Promise.reject(new Error(txt))
    // })
    // http request 拦截器
    this.axios.interceptors.request.use(config => {
        console.log(config);
        // if (config.params) {
        //     if (config.params.bid) {
        //         config.headers.bid = config.params.bid;
        //         delete config.params.bid
        //     }
        // }
        // if (config.data) {
        //     if (config.data.bid) {
        //         config.headers.bid = config.data.bid
        //         delete config.data.bid
        //     }
        // }

        // if (config.data.bid) {   判断是否存在bid，如果存在的话，则每个http header都加上token
        //     config.headers.bid = config.data.bid;
        // }
        return config;
    },err => {
        Message.error({message: '请求超时!'});
        return Promise.reject(err);
    });
    this.axios.interceptors.response.use(
        response => {
            console.log(response);
            // store.state.bid = ''
            // 0为接口请求成功
            if (response.data.code == 0 || response.data.code == 200) {
                // return response.data;
                try{
                    return Promise.resolve(response.data)
                }
                catch(err){
                    console.log(err);
                }
            } else if (response.data.code == 110) {
                window.location.href='http://login.lvzheng.com';
            } else {
                Message({
                    message:response.data.message,
                    type: 'warning'
                })
                return Promise.reject(response.data)
            } 
            // return response
        },
        error => {
            // store.state.bid =''
            Message.error({message: '服务器端异常，请稍后重试'});
           return Promise.reject(error.response.data)   // 返回接口返回的错误信息
        });
    },
}
export default Service


