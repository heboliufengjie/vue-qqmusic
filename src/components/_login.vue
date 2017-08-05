<style scoped>
 .page{
 	background: url('../assets/bg.jpg');
 	padding: 0 15px 15px;
 }
 .logo{
 	width: 215px;
 	height: 30px;
 	background: red;
 	margin: 0 auto;
 	margin-top: calc(170px);
 }
 .page-button-group{
 	margin-top:calc(94%);
 	text-align:center;
 }
 .register{
  	border: 1px solid #fff;
  	color: #fff;
  	padding: 10px 42px;
  	border-radius: 4.8px;
 }
 .login{
  	border: 1px solid #fff;
  	color: #fff;
  	padding: 10px 42px;
  	background: #0C0C0C;
  	color: #fff;
	border-radius: 4.8px;
	opacity: 0.87;
 }

</style>
<template>
	<div class="page">
		<p class="logo">logo</p>
		<div class="page-button-group">
	      <mt-button plain class='register'>注册</mt-button>
	      <mt-button plain class='login'>登录</mt-button>
	    </div>
	</div>
</template>

<script>
	export default {
		name: 'login'
	};
</script>

