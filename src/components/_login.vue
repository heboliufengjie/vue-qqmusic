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
}
.mint-checklist{
	position: relative;
}
.find-psw{
	position: absolute;
	right: 10px;
	bottom: 16px;
	font-size: 12px;
	
}
.find-psw a{
	text-decoration: none;
	color: #888;
}

.other{

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
		<p class="logo">logo</p>
		<div class="mint-checklist">
			<label class="mint-checklist-title">邮箱</label>
			<input type="text"  v-model.trim="email" @blur="blur(email,'email')" class="mint-field-core">
		</div>
		<div class="mint-checklist">
			<label class="mint-checklist-title">密码</label>
			<input type="password"  v-model.trim="password" @blur="blur(password,'password')"  class="mint-field-core">
			<label class="find-psw"><a href="/password_find">忘记密码</a></label>
		</div>
		<mt-button size="large" class="mint-button--primary" @click="submit()">登录</mt-button>
		<label class="mint-checklist-title other">
			<span><a href="#">微信登录</a></span>
			<span class='register'>还没有账号<a href="/register">去注册</a></span>
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
				email:'',
				password:'',
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
				
				console.log('password',this.password);
				this.$http.post("/user/signin.do",{
					email:this.email,
					password:this.password,
				}).then(
		            function (res) {
		                // 处理成功的结果
		                console.log('>>1',res);
		            },function (res) {
		            // 处理失败的结果
		            console.log('>>2',res);
		            }
		        );
			},
			blur(data,type){
				if(type ==='email'){
					if(!data){
						Toast(' 邮箱不能为空！');
					}else if(!isEmail(data)){
						Toast(' 请重新填写邮箱！');
						return false;
					}
				}else if(type ==='password'){
					if(!data){
						Toast(' 密码不能为空！');
					}
				}
			}
		},
	};
</script>

