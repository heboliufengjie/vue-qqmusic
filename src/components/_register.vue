<style scoped>
 .page{
 	padding: 0 15px;
 	background-color: #fff;
 }
 .logo{
 	width: 115px;
 	height: 60px;
 	margin: 0 auto;
 	background: url('/static/logo.png') no-repeat center;
 	background-size: cover;
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
}

.other{
	margin-right: 0;
	margin-top: 16px;
}
.other span{
	display: inline-block;
}
.other .register{
	float: right;
}

input{
	user-select:auto; 
}


</style>
<template>
	<div class="page">
		<div class="logo"></div>
		<!-- <div class="mint-checklist">
			<label class="mint-checklist-title">用户名</label>
			<input type="text"  v-model.trim="username" @blur="blur(username,'username')" class="mint-field-core">
		</div> -->
		<div class="mint-checklist">
			<label class="mint-checklist-title">邮箱</label>
			<input type="text"  v-model.trim="email" @blur="blur(email,'email')" class="mint-field-core">
		</div>
		<div class="mint-checklist">
			<label class="mint-checklist-title">密码</label>
			<input type="password"  v-model.trim="password" @blur="blur(password,'password')"  class="mint-field-core">
		</div>
		<mt-button size="large" class="mint-button--primary" @click="submit()">注册</mt-button>
		<label class="mint-checklist-title other">
			<span class='register'>已有账号? <a href="/">登录</a></span>
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
			}
		},
		methods:{
			submit(){
				// if(!this.username){
				// 	Toast('用户名不能为空！');
				// 	return false;
				// }
				if(!this.email){
					Toast('邮箱不能为空！');
					return false;
				}
				if(!this.password){
					Toast('密码不能为空！');
					return false;
				}
				console.log('password1',this.password);
				this.$http.post("/user/signup.do",{
					email:this.email,
					password:this.password,
				},{
				  emulateJSON: true
				}).then(function (res) {
		              if(res.data.success){
		              	Toast('注册成功');
		              	setTimeout(()=>{
		              		location.href="/lists"
		              	},500);
		              }else{
		              	Toast(res.data.msg);
		              }
		            }
		        );
				//console.log('email',isEmail(this.email));
				console.log('password',this.password);
			},
			blur(data,type){
				if(type ==='username'){
					if(!data){
						Toast(' 用户名不能为空！');
						return false;
					}
				}else if(type ==='email'){
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
				}
			}
		},
	};
</script>

