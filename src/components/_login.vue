<style scoped>
.page {
    padding: 0 15px;
    background-color: #fff;
}

.logo {
    width: 115px;
    height: 60px;
    margin: 0 auto;
    background: url('/static/logo.png') no-repeat center;
    background-size: cover;
    margin-top: calc(30px);
    margin-bottom: 16px;
}

.mint-checklist-title {
    margin-left: 0;
    margin-bottom: 0;
}

.mint-field-core {
    border-bottom: 1px solid #ccc;
    width: calc(100%);
    margin: 8px;
    margin-left: 0;
    margin-top: 0;
}

.mint-button--primary {
    color: #fff;
    background-color: #26a2ff;
    margin-top: 30px;
}

.mint-checklist {
    position: relative;
}

.find-psw {
    position: absolute;
    right: 10px;
    bottom: 16px;
    font-size: 12px;
}

.find-psw a {
    text-decoration: none;
    color: #888;
}

.other {
    margin-top: 18px;
    margin-right: 0;
}

.other span {
    display: inline-block;
}

.other .register {
    float: right;
}

.other a {
    color: #000;
    text-decoration: none;
}

a.logon_wx {
    color: #54a037;
}

input {
    user-select: auto;
}

</style>
<template>
    <div class="page">
        <p class="logo"></p>
        <div class="mint-checklist">
            <label class="mint-checklist-title">邮箱</label>
            <input type="text" v-model.trim="email" @blur="blur(email,'email')" class="mint-field-core">
        </div>
        <div class="mint-checklist">
            <label class="mint-checklist-title">密码</label>
            <input type="password" v-model.trim="password" @blur="blur(password,'password')" class="mint-field-core">
            <label class="find-psw"><a href="/password_find">忘记密码</a></label>
        </div>
        <mt-button size="large" class="mint-button--primary" @click="submit()">登录</mt-button>
        <label class="mint-checklist-title other">
            <!-- <span><a href="#" class="logon_wx">微信登录</a></span> -->
            <span class='register'>还没有账号<a href="/register">去注册</a></span>
        </label>
    </div>
</template>
<script>
import Vue from 'vue';
import store from '../store';
import { Toast } from 'mint-ui';
Vue.http.options.emulateHTTP = true;

function isEmail(str) {
    var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/;
    return reg.test(str);
}

export default {
    name: 'login',
    data() {
        return {
            email: '',
            password: '',
        }
    },
    // created() {
    //     let storage = window.localStorage;
    //     let storageItem = storage.getItem("teamUp");
    //     // console.log('created', storageItem)
    //     if (storageItem && storageItem.id) {
    //         //localStorage 已经存有数据
    //         location.href = '/lists';
    //     } else {
    //         //localStorage 没有存数据
    //         //console.log('storageItem02', storageItem)
    //     }
    // },
    methods: {
        submit() {
            if (!this.email) {
                Toast('邮箱不能为空！');
                return false;
            }
            if (!this.password) {
                Toast('密码不能为空！');
                return false;
            }

            this.$http.post("/user/signin.do", {
                email: this.email,
                password: this.password,
            }, {
                emulateJSON: true
            }).then(function(res) {
                // this.$http({
                //           url: "/user/signin.do",
                //           method: 'POST',
                //           // 请求体重发送的数据
                //           params: {
                //               email:this.email,
                //               password:this.password,
                //           },
                //           // 设置请求头
                //           // headers: {
                //           //     'Content-Type': 'x-www-from-urlencoded'
                //           // }
                //       }).then(function () {
                if (res.data.success) {
                    let data = res.data;

                    //存入localStorage
                    store.dispatch('localStorage/setItem', data)
                    this.$router.push("lists")
                } else {
                    Toast(res.data.msg)
                }
            });

            //获得一个标签下的项目 debug
            if (false) {
                this.$http.post("/project/getProjectInLabel.do", {
                    labelId: 5 //debug
                }, {
                    emulateJSON: true
                }).then(function(res) {
                    if (res.data.success) {
                        console.log('创建项目')
                        //Toast('修改成功')
                    } else {
                        Toast(res.data.msg)
                    }
                });
            }


            //获得标签信息
            if (false) {
                this.$http.post("/label/getLableInfo.do", {
                    id: 5,
                }, {
                    emulateJSON: true
                }).then(function(res) {
                    if (res.data.success) {
                        console.log('创建项目')
                        //Toast('修改成功')
                    } else {
                        Toast(res.data.msg)
                    }
                });
            }

        },
        blur(data, type) {
            if (type === 'email') {
                if (!data) {
                    Toast(' 邮箱不能为空！');
                } else if (!isEmail(data)) {
                    Toast(' 请重新填写邮箱！');
                    return false;
                }
            } else if (type === 'password') {
                if (!data) {
                    Toast(' 密码不能为空！');
                }
            }
        }
    },
};

</script>
