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
	import Vue from 'vue';
	Vue.http.options.emulateHTTP = true;
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
				
				//登录
				if(false){
					this.$http.post("/user/signin.do",{
						email:this.email,
						password:this.password,
					},{
					  emulateJSON: true
					}).then(function (res) {
			              if(res.data.success){
			              	console.log('登录')
			              }else{
			              	Toast(res.data.msg)
			              }
			            }
			        );
		        }
		        //修改用户简介
				if(false){
					this.$http.post("/user/modifyProfile.do",{
						profile:'my name is fengjie.liu',
					},{
					  emulateJSON: true
					}).then(function (res) {
			              if(res.data.success){
			              	console.log('修改用户简介')
			              	Toast('修改成功')
			              }else{
			              	Toast(res.data.msg)
			              }
			            }
			        );
		        }
		        //创建项目
				if(false){
					this.$http.post("/project/createProject.do",{
						name:'my first project',
						profile:'my name is fengjie.liu',
					},{
					  emulateJSON: true
					}).then(function (res) {
			              if(res.data.success){
			              	console.log('创建项目')
			              	//Toast('修改成功')
			              }else{
			              	Toast(res.data.msg)
			              }
			            }
			        );
		        }
		        //获得用户加入的项目(应该传id)
				if(false){
					this.$http.post("/project/getUserJoinedProject.do"
					// 	,{
					// 	name:'my first project',
					// 	profile:'my name is fengjie.liu',
					// },{
					//   emulateJSON: true
					// }
					).then(function (res) {
			              if(res.data.success){
			              	console.log('创建项目')
			              	//Toast('修改成功')
			              }else{
			              	Toast(res.data.msg)
			              }
			            }
			        );
		        }
		        //获得一个项目的信息
				if(false){
					this.$http.post("/project/getProjectInfo.do",{
						id:5,//debug
					},{
					  emulateJSON: true
					}
					).then(function (res) {
			              if(res.data.success){
			              	console.log('创建项目')
			              	//Toast('修改成功')
			              }else{
			              	Toast(res.data.msg)
			              }
			            }
			        );
		        }
		        //获得项目的成员
				if(false){
					this.$http.post("/project/getProjectMemeber.do",{
						id:5,//debug
					},{
					  emulateJSON: true
					}
					).then(function (res) {
			              if(res.data.success){
			              	console.log('创建项目')
			              	//Toast('修改成功')
			              }else{
			              	Toast(res.data.msg)
			              }
			            }
			        );
		        }
		        //为一个项目添加标签
				if(!false){
					this.$http.post("/project/addLabelForProject.do",{
						id:5,//debug
						labelId:8//debug
					},{
					  emulateJSON: true
					}
					).then(function (res) {
			              if(res.data.success){
			              	console.log('创建项目')
			              	//Toast('修改成功')
			              }else{
			              	Toast(res.data.msg)
			              }
			            }
			        );
		        }
		        //获得一个标签下的项目 debug
				if(false){
					this.$http.post("/project/getProjectInLabel.do",{
						labelId:5//debug
					},{
					  emulateJSON: true
					}
					).then(function (res) {
			              if(res.data.success){
			              	console.log('创建项目')
			              	//Toast('修改成功')
			              }else{
			              	Toast(res.data.msg)
			              }
			            }
			        );
		        }
		        //获得某个项目关联的标签 debug
				if(false){
					this.$http.post("/project/getProjectLabel.do",{
						id:5
					},{
					  emulateJSON: true
					}
					).then(function (res) {
			              if(res.data.success){
			              	console.log('创建项目')
			              	//Toast('修改成功')
			              }else{
			              	Toast(res.data.msg)
			              }
			            }
			        );
		        }
		        //创建标签
				if(false){
					this.$http.post("/label/createLabel.do",{
						name:'my forth label',
						isPublic:0,
					},{
					  emulateJSON: true
					}
					).then(function (res) {
			              if(res.data.success){
			              	console.log('创建项目')
			              	//Toast('修改成功')
			              }else{
			              	Toast(res.data.msg)
			              }
			            }
			        );
		        }
		        //删除标签
				if(false){
					this.$http.post("/label/deleteLabel.do",{
						id:4,
					},{
					  emulateJSON: true
					}
					).then(function (res) {
			              if(res.data.success){
			              	console.log('创建项目')
			              	//Toast('修改成功')
			              }else{
			              	Toast(res.data.msg)
			              }
			            }
			        );
		        }
		         //获得标签信息
				if(false){
					this.$http.post("/label/getLableInfo.do",{
						id:5,
					},{
					  emulateJSON: true
					}
					).then(function (res) {
			              if(res.data.success){
			              	console.log('创建项目')
			              	//Toast('修改成功')
			              }else{
			              	Toast(res.data.msg)
			              }
			            }
			        );
		        }
		        //获得一个用户的所有标签（用户id）
				if(false){
					this.$http.post("/label/getUserLabel.do"
					// ,{
					// 	id:5,
					// },{
					//   emulateJSON: true
					// }
					).then(function (res) {
			              if(res.data.success){
			              	console.log('创建项目')
			              	//Toast('修改成功')
			              }else{
			              	Toast(res.data.msg)
			              }
			            }
			        );
		        }
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

