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
.wrapper-project-label{
	display: flex;
	display: -webkit-flex; /* Safari */
	flex-direction: row ;
	justify-content: space-between;
	color: #000;
	font-size: 14px;
	padding-top: 20px;
	padding-bottom: 10px;
}
.wrapper-project-label li:last-child{
	font-size: 12px;
	color: #3C96FF;
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
			<div class="mint-checklist label-lists">
				<ul class="wrapper-project-label">
			   		<li class="project-label">标签</li>
			   		<li @click="editProjectLabelsLink()">编辑</li>
			   </ul>
			   <!-- label -->
				<div v-if="labels.length">
					<a href="javascript:;" v-for="label in labels">{{label.name}}</a>
				</div>
				<!-- /label -->
				<!-- no label -->
				<div v-else>
					没有相关标签,请编辑标签
				</div>
				<!-- /no label -->
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
import { Toast } from 'mint-ui';
export default {
	name: 'me',
	data() {
		return {
			username:'',
			desc:'',
			labels:[],
			projectInfo:{},
		}
	},

	created(){
		this.getUserLabel();
	},
	methods:{
		//获得一个用户的所有标签
		getUserLabel(){
			this.$http.post("/label/getUserLabel.do").then(function (res) {
	              if(res.data.success){
	              	let data = res.data;
	              	this.labels = data.list;
	              }
	            }
	        );
		},

		//修改用户简介
		submit(){
			if(!this.desc){
				Toast('个人简介不能为空！');
				return false;
			}

			this.$http.post("/user/modifyProfile.do",{
				profile:this.desc,
			},{
			  emulateJSON: true
			}).then(function (res) {
	              if(res.data.success){
	              	Toast('修改成功')
	              }else{
	              	Toast(res.data.msg)
	              }
	            }
	        );
		},

		//editProjectLabelsLink
		//当前项目并未创立成功，而为该项目添加标签需要传项目id
		editProjectLabelsLink(){
			location.href="/lables_edit/"+this.$route.params.id;
		},
	},
};
</script>

