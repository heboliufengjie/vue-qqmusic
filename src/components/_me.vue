<style scoped>
 .page{
 	background-color: #fff;
 }
 .inner-page{
 	padding: 0 15px;
 }
 .header{
 	width: 100%;
 	height: 125px;
 	background:#ccc;
 	margin-bottom: 16px;
 }
.other{
	display: flex;
 	margin-right: 0;
}
.other span{
	width: calc(50%);
	display: inline-block;
}
.text-right{
	text-align:right;
	color: red;
}
.label-lists{

}
.label-lists a{
	display: inline-block;
	color: #000;
	font-size: 12px;
	padding: 6px 8px;
	border-radius: 15px;
	border: 1px solid #ccc;
	margin-right: 5px;
	margin-bottom: 5px;
	text-decoration: none;
}
.mint-checklist{
	border-bottom: 1px solid #ccc;
}
.mint-checklist-title{
	font-size: 14px;
	margin-left: 0;
}
.mint-checklist input,
.mint-checklist textarea{
	font-size: 12px;
}
.mint-button--primary{
	margin-top: 15px;
}
.upload{
	padding-top: 28px;
	margin:0 auto;
	width: 65px;
	font-size: 12px;
	text-align: center;
	color: #fff;
}
.palette{
	background-color: rgb(38, 162, 255);
	color: #fff;
	width: 65px;
	height: 65px;
	border-radius: 50%;
	text-align: center;
	line-height: 65px;
	font-size: 16px;
	margin-bottom: 5px;
}
</style>
<template>
	<div class="page">
		<div class="header">
			<div class="upload">
			 	<img src="" v-if="false">	
			 	<div class="palette">+</div>	
				<p>上传头像</p>
			</div>
		</div>
		<div class="inner-page">
			<label class="mint-checklist-title other">
				<span>标签</span>
				<span class="text-right" @click="linkEditLables()">编辑</span>
			</label>
			<div class="label-lists">
				<a href="javascript:;" v-for="label in labels">{{label.type}}</a>
			</div>
			<div class="mint-checklist">
				<label class="mint-checklist-title">用户名</label>
				<input type="text"  v-model.trim="username"  placeholder="请输入用户名" class="mint-field-core">
			</div>
			<div class="mint-checklist">
				<label class="mint-checklist-title">个人简介</label>
				<textarea v-model.trim="desc"  placeholder="请输入个人简介" class="mint-field-core"></textarea>
			</div>
			<mt-button size="large" class="mint-button--primary" @click="submit()">确定</mt-button>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'me',
		data() {
			return {
				username:'',
				desc:'',
				labels:[
				 	{
				 		type:'管理经验',
				 	},
				 	{
				 		type:'管理经验',
				 	},
				 	{
				 		type:'管理经验',
				 	},{
				 		type:'管理经验',
				 	},{
				 		type:'管理经验',
				 	},{
				 		type:'管理经验',
				 	},{
				 		type:'管理经验',
				 	},{
				 		type:'管理经验',
				 	},
				 ],
			}
		},
		methods:{
			submit(){
				console.log('submit')
			},
			linkEditLables(){
				location.href="/edit_lables";
			}
		},
	};
</script>

