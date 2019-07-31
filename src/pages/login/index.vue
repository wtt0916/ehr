<template>
    <div id="login">
        <div class="login-wrap">
            <div class="login-left">
                <div class="t-c">
                    <img class="logo" src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAQEg8PEBAQDxAQEA8NDxAPDQ8NDw8PFREWFhURFRUYHSggGBolGxUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OFxAQGCsdIB0tLS0wLS0tLS0tLS0tLS0tLS0tLS0tLSstLS0tLS0tLS0tLS0tLS0tLSstLS0rLS0rLf/AABEIAJEBWgMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAACAAEDBAUGB//EADcQAAICAQIFAQYEBAYDAAAAAAABAhEDBCEFEjFBUWEGEyJxgZEyQqGxB3LB8BRDUmLR4SM0sv/EABoBAAIDAQEAAAAAAAAAAAAAAAECAAMEBQb/xAAnEQACAgICAgMAAQUBAAAAAAAAAQIRAyEEEjFBIjJRQhQzQ3GBE//aAAwDAQACEQMRAD8A8ojhmyaGgb6mo1XYjyTE7EopvRJDx06RNYmwNsZIieNeCOaomlIhyETI0QyAkSMBsdMVojAmyzk07pPsVM0GmMhSITYhhgBJjix4pS2im36bmhp+Came8cU2vlRKbJRRTCs2MPstqpf5TXz2FL2Z1S/y2Tq/wamZKEWp8MzxbUsc1X+1kPuZcyjTUm6p7Ap2Qk02l5rk7UVtt1b8Ivw0cVXOrfaH5V8/LLCxcvuYLpFPI67tbf1HzrevqdGGKMF42Z3JyGk/t2S2+RBllaa+pNHuQSXpsWSk6FSMdtptCeQmzYre1Otuq7dP0IZ434ZzbkjRSI2y3wrQT1GSOKHV9X2S8spUzsfZLWYsONunzzb5peK/KGLV/IkYt6R12j02LS4o44Vsrb7yflmPxHiDdqyDX8Sb6b338GJqNQDNm7aXg1Qiooj4tnuLOebLmvz3sUSuOkU5HbHsVgiDYg9isYRCD2MIRCCEIRCCEEoMdYyUQARMsQ/KkN1YLIVFhe6fgu4HHuWfgL4YFJXYjnXo1ZohlFBEU2c3Zr0RyaI3IKZGxgASkRyYUiNhSA2DJkEpEkyFjoVlvTarblf0FqMdlIsYst7MdMUgyYmiXT4ls3uWHG1QsWnaHitiM9L9jdHhlii1CKku/LFs6f3MV4+x5XwLj+TBJJU491SZ6TotdDLCMlOLbSbSd0wZJuKsuxNPRaqIE6/tDtr5g5PBmlyGjQo2V8sY+L+hS1fCsWZXLGuZXUkqkjRdImwST6fYOPmU1+kljTR53xLhzwTjbco8k0pOPL+ZOvmZ7xtvpt9l9Wek8U0KyRcWtn+hxPF+A5e0/h8JV9zof1cYxbn5MkuO2/iYWq1UYdZJvxHevqZubXN9I/K92vuaa4G/KI8vB5R6mKfOU35HXGkvRkTzzf8AbI+d+n2NOehrcgem6uhFlTI8TRS5vT90aPDMmS0ormhfxLa4+pXlhLegfIx+2iRjTL2aTRmajVVt3NTU/FFtdaOZk3e5Iqx8joU5WMIQ5QMOMIhBMQhrIQcQNishBx0AFHqAhYiGmCgqIpNDUODONj2OmWKSYjVEPK0Pzsnoag0/TJo32RZCzgx80kvLA4hi5JNGK90aK0UpMjsebI7HFBmRsKbImwgBmQSJJyImxkKxh4saxhgF7STt8vk3eH8FzZXSVR8so+ynD/fZVa2W7PVNLpVGklRqwY01cgVZg8L9kscPin8b9ehuYOD4obxjyv02NLHjJOQbLNVSRbCCRTWJro7+e5Flcl6l9RKmbJtL7HIzSivKNUY34OV1/tR7ufu/dtu63fc6jgcJuCnNcrkr5fCOKzaL3usxrzki3t6npvIo0l2RbDDjSU0invLs4tlbUKkc/r5Xt9DQ4zqOVfI4Pi/tO4OUccVJrrKW0V6erKM05Tl0gXRqC7SNeWlT3KGrwPoyhw72tTko5YJJ7c0dqOg1+HZSW6aME8c8cvkjRDJGa0ctqoVXjcghFVRo6/D2MySZpg7RXJbK+WFWVlqIp1ZPqJ7MznLb8vWuWnzfPpVfU3Yo9kYssurNjS5zJ4jh5Juuj+JEuhm+hPxSHNBS7xf6DrToj+UbMmxrGGHKQrGsYRCD2MIRCCEIRCCCx9QQ8QAlhMewRxRh0JjCIQJMfmBEOptAo6fT5OWSfhkXEMnNJyI3IhyyMyW7LW9UQTZEwpsjbLBAZMhnIlbIJhQGA2Cx2CxhRDCGCA9E/h/CPL6nd45I8s9kONRwtQa69z0fBmUkpX13HlyVCNUX44WavOqIveEMZBwZhny3ei9YiSMmyhr/ANy5OVdynxCPcy55dlZbjVM5fHk5dfpl1cpq/Q9Hyo860ekeTiOnfaN5H6Uj0fJ0Ohgd4UZZqsjOa43FtSS8M8n1mmpO1zPfbmcZc/SX1T7d0ey66CVt0vqcjxLhWDLJycbk+ri6b+xTjXSTbfkvnFziqR5vihK6rrtvFP8AfuehcOzT9zjhNPmUa3/T9A9FwTFBpqFS/wBUm5Nffoaj0yS8sTkTjkVB4+Ho7Od18Xta3T8GROL5qe1nXa7C+Xpb67dji9Xo8ksiUpum29nTrwVYor9LMsq8Kwc+k8lHJw7w/ua2XJ+Xxtb6lOU9zVilJIzZIxY2l0yhu3bqvQmyQUotdmmiHJk2IsWQsvdi0qox5xpteHQJb4jBKbrvuVC0zPQhDiCAYQ49EIMKghAINQWMahECTpisiTDTFoawrHBHRAjiEIhDcnIgyTHySIWVIZgSZGwpAMcUZkEydoCUAoDIASSUQKGFBGCodQDsAscnFprsdx7P+1CqOOe3RJnFLGHCNbjPjyyKqJHMoM9t0mVTipJ2ibJkUTgPZPjk4/BNNx8+DY45xuMYtc1WjHPhZIypo1x5MZK0LjvtIsco44u3aOhn/wCTFGS7xTPIc+pTnzU5O7TbPVeA6j3mlxyrdKmNy+NHHi07YOPllKbsbgmjS1SyXusco16to6zK9jnNFgk80Jx2Svm+R0mSNofjb46Dl1kZxvtDmbk481JdkYWDJUl37eDqON6FtuS3OfxaSXMk01vb+Rzs+R2djjuDxmrjhaTGkyzjjskRzw2YHkZS6K2pfw9qOI4pxfFDIkk5uLV8tUvqbPtPp9VKLhil8L61tJrwmcBl004PllFxfho6PDxRku0n/wAMHIySWkjqFlx51zY5fElcovaS+hnZcdN31K3C9LLmUt1Rp6jApPb+2adQdJlW2rZRlC0QQW5rQ0ioqa5qCruyyLt0hW6MjWTuTIKJZwa38g0XtVplN3sCh6DoQCA0PQ9D0QgNCoNRFQaIDQmgxu5KCJRCSHsFsIBMXMNQuUDQbCTHAHsWgmzOJE4lnNkiVZ5kVpMZsGUQOVAyygOTGoWyWTRE22TaSKblfixTVdB4xQrdFd4/IKgg5u2MWKKK3Jjcoi7ouHTyNdIxe9s2s2ihBJxUdlTflnQw4G1b0Z5SdmHpuG5JpSSqPl7Gni4bjhu3zP16E0NVSqillzSbNHwxrWwKLfkbUaiUX8Oy7JIjy5feLcOEG9mKWkcKl1QjTyeQ/TwUf8NJdNz1D2G1MXhWNv4l2OHwuLpJNvvS2Rf4Zq3ilcXfyZmzcLtFo0Yc6TPVdLhSdouWZvAM7yY1N9WaM1RzHF4o9Ubr7uyrqYWZebEvBoZMtMrZaOZmmpGiEXEz5KiNuizkor5GjH1RY2yOUU+pnazTRd/Cn80nRdllorZZIeMKdiSnow82lSey8kS0fejQz6iETH1/E62v7G2FsyyFrMscaruczr8jct/oW55XOVt2RauPc3YY9Sme0UWn0+pFRbxK39As+nX4l9TW8blHsUKSToppBcgaQVFVFpGkOE0NQaICKgqGohBqAfUOwYdwEHigqGY3MQATAY9jWEghCGFshekwbGYwgwmwWx2CwkJtK3bS7xaFCdbPp2Fo5pTTfTdfoNJBixJAyi1v5BJIz25ZdOz8ATjRdFlTLeDimSCUUotLyi7peKQn8M1yP5/CzEGZrhmmlVldKzpHp73W69A1pUYOk1+TF0drw90buj4piyKn8MvD7/I048sJedMjT9AayLhG4x5n+xky1+V7Nv7HT48kX0GeKL7L7Fk8fb6uhL/TP4TKU4tTVLs1tZNHh754rG+sl9u5bWOumxoez2jlPNHvW+40vjDYEraPQ+CafkxQX+1WWdQ9g8MGkkuyBzQdHm+Q7s7GLRjarMlJ2/oZOr4ml/Qm4jJrmVfE2/sctrJv4b2V8tt92ceS7M3rSNPJxVeSu+KXbRgvO8dxlvVr5kf+LV3Hp3Xaxo4Cqczfz8SXLb6szcnEr6dUZuo17ltX/RVlkd2aI4qRQ3bJNbq23Zmzk2W8eFzdtbK2TY9Js3WzdryXKUY6F/8AJyKGJULVS+EuTwJNr6lTWrY04nbKskXFEehjanLxSJJb7EOkz8sJKurB954OnD6pHPl5sbJCmCTOPdvfwQWVZsTjssx5L0OC0GhUUFxEE0FyiaBRCOiNErAaAwiiNIdIdoBALFYwmgEEKxCsIC42AwxmhBgGxrCaBaCAeL3JmQwhY0clOmFIDZMo3YN/lfTsySHoLJDemgp0LRBKNDEnTZ9OzI5KjRCVlTQzGEKyzyKWtPrpRpPdfqjWwcTtX+L9zn2KEmnadMeM5w+rJp+TrsWvjVvb9zrPYNyyTlNL4V38nlktXKVJpeLXXqe0+wOFR00KSV7/ADFz8ibjRbhxx7HVxXYizINMTlaOc5KaaNtU7Oa4hipyfc5Diun3af4ebmXod1xDG0/Q5Xi2NNteOjObJUbYuzkuJYqTv6O+piym0+pva/G7qinj4ZKTui/E0o7Mub7FfTK9y3DTubW3cucP4c73Wxbw4nCa9GxZz/CReizoeFcq38UR6zAo+iS38nSPH8CfoczxbMle5z05SmdKKXSzD1ck2Uc6uLJsrT3XqMlszsYdJHMzbbMuOyoYfM9wLOtHIqRy3DYXMCx6HSQXJMCVEalRJGQ0lZE00Z5RoujIsgNkfOElYjLAhnEJITAQCxSQ7QDJRLGcQR2wWKQTGFY1kIXhNBRQ7FGIqEoWGw8DqUW/9SIAbHjcWNqsF79zpeJcNUorJDrStGPlxbX9yxrqURn2MrBmcXT27WWHzN77vt6oDU6e90NpNS4v1XSxWOS1aIqrZ9OzJRONhTIV8uJx6gIvY2muWfT8r8FTLj5XRdCdiOIIwhFyYgWPqj2z+HudSwJL8u1+TxFHrf8ADHVQeP3abclu9tkV5fqW4fsd+0DMkI8iOPKfV6OklaK2oxc69TnNboncvvudLKVO/OwGq0ykn8iuajNWvRZBuLpnl/HcfJKFv8UlX3OjlwtR+ysp+0XA/fN71KK2v0N3hudZsOPIltKNNPepR+GS+6YkZRktehM6admXHTR39OpT1GCN3f8Afk3MmJK62sx9bGm0/wDgs66M3YuaPPKeLJFr4oNU/MWupwXHp1NpP5rwzr+Cykp5E3dQVNb7Ns5f2sp5FSry0qsz4klyGjb2bwWYsG+geeT5WWcelcY27t79OiINRLlTOrjpySMUnoyoxl4YVPwSrKwlJd2diOHHX2Oa5y/CJIdRRI5w8kcssfIJY4L+SCpSfoJAZI2A9QgHqDPKUfFliTBaJISI5TsUWUlqJlIVkbkCsl7AsJI5DWNyjqIQAtA0SMGgNAsGgQ2hqBQbLSEIQg4LFHqvmIQSHY4vwL+UxX+f5sQh5eEZcflmeu5Qy9RCF9F/stQCiIQCA5OgOXoIQ0fJH4IBIQi9CDnffw5/N8xCJP6sbH9j0XsRyEI5Gb2dCBBn6olxdBCK8X8hpejkfa38Ew/Y/wD9WH82X/6EIGPw/wDYM3ou5jI1/VfQQi4yMj4L+Of8r/cx+Ofjj80OIzx/vs0/4UBk7/L+hjcQ6DiN2LyZ34MpiEI0lILAYhACIJCEQI4SEIIAJixdRCB7CTiEIcQZgiEQImMIQCH/2Q==" alt>
                </div>
                <div class="login-tab">
                    <p class="form-title t-c">手机号登录</p>
                    <span class="form-title-divider"></span>
                </div>
                <ul class="form-list">
                    <li>
                        <el-input
                                placeholder="请输入手机号"
                                prefix-icon="el-icon-mobile-phone"
                                v-model="phone">
                        </el-input>
                    </li>
                    <li>
                        <el-input
                                class="left-input code"
                                placeholder="请输入图形验证码"
                                prefix-icon="el-icon-message"
                                v-model="code">
                            <i slot="suffix" class="el-input__icon el-icon-success enter-good"></i>
                        </el-input>
                        <img class="right-show" src="data:image/jpeg;base64,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" alt>
                    </li>
                    <li>
                        <el-input
                                class="left-input"
                                placeholder="请输入短信验证码"
                                prefix-icon="el-icon-message"
                                v-model="msgCode">
                            <i slot="suffix" class="el-input__icon el-icon-success enter-good"></i>
                        </el-input>
                        <el-button class="right-show">获取验证码</el-button>
                    </li>
                    <li>
                        <el-button class="button blue-button btn-login" type="primary">登录</el-button>
                    </li>
                </ul>
            </div>
            <div class="login-right">
                <!--<img src="../../assets/images/login-1.gif" alt="">-->
                <el-carousel height="355px" :interval="4000" indicator-position="none">
                    <el-carousel-item v-for="(item,index) in carouselItem" :key="index">
                        <div class="c-i t-c">
                            <img v-if="index==0" src="../../assets/images/login-1.gif" alt="">
                            <img v-if="index==1" src="../../assets/images/login-2.gif" alt="">
                            <img v-if="index==2" src="../../assets/images/login-3.gif" alt="">
                            <span class="desc">{{item.desc}}</span>
                            <p>
                                {{item.use}}
                                <span class="divider"></span>
                            </p>
                        </div>
                    </el-carousel-item>
                </el-carousel>
            </div>
        </div>
        <div class="c-info t-c">
            <span>帮助</span>
            <el-divider direction="vertical"></el-divider>
            <span>条款</span>
            <p>版权所有：北京佶象信息技术有限公司出品</p>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
          return{
              phone:'',
              code:'',
              msgCode:'',
              carouselItem:[
                  {
                      src:'../../assets/images/login-1.gif',
                      desc:'精准员工管理',
                      use:'使每个员工都是公司焦点·单独详细薪资方案'
                  },{
                      src:'../../assets/images/login-2.gif',
                      desc:'专项扣除模块',
                      use:'让公司税收福利不再迷惑'
                  },{
                      src:'../../assets/images/login-3.gif',
                      desc:'智能薪资算法',
                      use:'解决您的乱账难题'
                  }
              ]
          }
        },
        mounted(){

        }
    }
</script>
<style lang="less" scoped>
    @import "../../styles/colors";
    #login{
        position: relative;
        width: 100%;
        height: 100%;
        .login-wrap{
            width: 870px;
            height: 450px;
            position: absolute;
            margin: auto;
            left: 0;right: 0;bottom: 0;
            top: 0;
            /*top: 50%;*/
            /*left: 50%;*/
            /*transform: translate(-50%,-50%);*/
        }
        .login-left{
            width: 368px;
            display: inline-block;
            img.logo{
                width: 150px;
                height: 52px;
            }
            .login-tab{
                border-bottom: 1px solid #ddd;
                color: @base;
                font-size: 14px;
                position: relative;
                line-height: 24px;
                padding-bottom: 4px;
                margin: 30px 0;
                .form-title{
                    width: 100px
                }
                .form-title-divider{
                    width: 100px;
                    border-bottom: 2px solid @base;
                    position: absolute;
                    bottom: -1px;
                }
            }
            ul.form-list{
                li:not(:last-child){
                    margin-bottom: 15px;
                }
                li{
                    .code{
                        vertical-align: middle;
                    }
                    .left-input{
                        width: 258px;
                        margin-right: 3px;
                    }
                    .right-show{
                        width: 102px;
                        height: 40px;
                        color: @middle;
                        vertical-align: middle;
                        font-weight: normal;
                    }
                    .btn-login{
                        width: 100%;
                        height: 40px;
                    }
                    .enter-good{
                        color: @success;
                    }
                }
            }
        }
        .login-right{
            display: inline-block;
            margin-left: 80px;
            width: 400px;
            text-align: center;
            img{
                width: 300px;
                height: 304px;
                display: inline-block;
            }
            .c-i{
                font-size: 14px;
                color: @middle;
                span.desc{
                    display: block;
                    font-size:14px;
                    font-family:PingFangSC-Semibold;
                    font-weight:600;
                    line-height: 20px;
                    color: @base;
                    margin-bottom: 5px;
                }
                p{
                    font-size: 14px;
                    padding-top: 4px;
                    position: relative;
                    span.divider{
                        position: absolute;
                        top: 0;
                        left: 50%;
                        transform: translateX(-50%);
                        width: 46px;
                        height: 1px;
                        background: @light;
                    }
                }
            }
        }
        .c-info{
            position: fixed;
            bottom: 10px;
            font-size: 14px;
            color: #666;
            left: 50%;
            transform: translateX(-50%);
            p{
                margin-top: 10px;
            }
        }
    }
</style>