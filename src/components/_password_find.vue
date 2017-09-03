<style scoped>
 .page{
 	padding: 0 15px;
 	background-color: #fff;
 }
 .logo{
 	width: 115px;
 	height: 60px;
 	background: red;
 	margin: 0 auto;
 	margin-top: calc(30px);
 	margin-bottom: 16px;
 }
.mint-checklist-title{
	margin-left: 0;
	margin-bottom: 0;
}
 .mint-field-core{
 	border-bottom: 1px solid #ccc;
 	width: calc(100% );
 	margin: 8px;
 	margin-left: 0;
 	margin-top: 0;
 }

 .mint-button--primary {
    color: #fff;
    background-color: #26a2ff;
    margin-top: 30px;
    margin-bottom: 24px;
}

.other span{
	display: inline-block;
}
.other .register{
	float: right;
}
</style>
<template>
	<div class="page">
		<p class="logo">password_find</p>
		<div class="mint-checklist">
			<label class="mint-checklist-title">邮箱</label>
			<input type="text"  v-model.trim="email" @blur="blur(email,'email')" class="mint-field-core">
		</div>
		<div class="mint-checklist">
			<label class="mint-checklist-title">输入新密码</label>
			<input type="password"  v-model.trim="password" @blur="blur(password,'password')"  class="mint-field-core">
		</div>
		<div class="mint-checklist">
			<label class="mint-checklist-title">密码</label>
			<input type="password"  v-model.trim="password_old" @blur="blur(password_old,'password_old')"  class="mint-field-core">
		</div>
		<mt-button size="large" class="mint-button--primary" @click="submit()">重置密码</mt-button>
		<label class="mint-checklist-title other">
			<span><a href="/register">注册新账号</a></span>
			<span class='register'><a href="/">登录</a></span>
		</label>

	</div>
</template>
<script>
	import { Toast } from 'mint-ui';
	function isEmail(str){
	 var reg=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/;
	 return reg.test(str);
	}

	export default {
		name: 'login',
		data() {
			return {
				username:'',
				email:'',
				password:'',
				password_old:'',
			}
		},
		methods:{
			submit(){
				if(!this.email){
					Toast('邮箱不能为空！');
					return false;
				}
				if(!this.password){
					Toast('密码不能为空！');
					return false;
				}
				if(!this.password_old){
					Toast('密码不能为空！');
					return false;
				}
				if(this.password !== this.password_old){
					Toast('密码不一样，请重新填写！');
					return false;
				}
			},
			blur(data,type){
				//password_old
				if(type ==='email'){
					if(!data){
						Toast(' 邮箱不能为空！');
						return false;
					}else if(!isEmail(data)){
						Toast(' 请重新填写邮箱！');
						return false;
					}
				}else if(type ==='password'){
					if(!data){
						Toast(' 密码不能为空！');
						return false;
					}
				}else if(type ==='password_old'){
					if(!data){
						Toast(' 密码不能为空！');
						return false;
					}
				}
			}
		},
	};
</script>

