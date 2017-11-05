<style scoped>
 .page{
 	background-color: #fff;
 }
 .inner-page{
 	padding: 0 15px;
 }
 .header{
 	position: relative;
 	width: 100%;
 	height: 75px;
 	background:#ccc;
 	margin-bottom: 16px;
 }
 .upload{
 	position: absolute;
 	right: 12px;
 	bottom: 12px;
 	font-size: 12px;
 	padding: 4px 6px;
	background: #3C96FF;
	border-radius: 100px;
	text-align: center;
	color: #fff;
}
.title{
	font-size: 14px;
	color: #000;
	height: 38px;
	line-height: 38px;
	background-color: #ccc;
}
.label-lists{}
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
.wrapper-project-label a{
	text-decoration: none;
	font-size: 12px;
	color: #3C96FF;
}

</style>
<template>
	<div class="page">
		<div class="header">
			<img src="" v-if="false">	
			<div class="upload">更改上传01</div>
		</div>
		<div class="inner-page">
			<div class="title">项目资料</div>
			<div class="mint-checklist">
				<label class="mint-checklist-title">项目名称</label>
				<input type="text"  v-model.trim="projectInfo.name"  placeholder="请输入项目名称" class="mint-field-core">
			</div>
			<div class="mint-checklist">
				<label class="mint-checklist-title">项目简介</label>
				<textarea v-model.trim="projectInfo.profile"  placeholder="请输入项目简介" class="mint-field-core"></textarea>
			</div>
			<!-- <div class="mint-checklist label-lists">
				<label class="mint-checklist-title">项目标签</label>
				<a href="javascript:;" v-for="label in labels">{{label.name}}</a>
			</div> -->
			<div class="mint-checklist label-lists">
				<!-- <label class="mint-checklist-title">项目标签</label> -->
				<ul class="wrapper-project-label">
			   		<li class="project-label">项目标签</li>
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
				<label class="mint-checklist-title">项目详细描述</label>
				<textarea v-model.trim="projectDetailDesc"  placeholder="请输入项目详细描述" class="mint-field-core"></textarea>
			</div>
			<mt-button size="large" class="mint-button--primary" @click="createProject()">确定</mt-button>
		</div>
	</div>
</template>
<script>
import { Toast } from 'mint-ui';
export default {
	name: 'addProject',
	data() {
		return {
			projectName:'',
			projectDesc:'',
			projectDetailDesc:'',
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
	
		//创建项目
		createProject(){
			if(!this.projectInfo.name){
				Toast('项目名称不能为空！');
				return false;
			}
			if(!this.projectInfo.profile){
				Toast('项目描述不能为空！');
				return false;
			}

			this.$http.post("/project/createProject.do",{
				name:this.projectInfo.name,//项目名称
				profile:this.projectInfo.profile,//项目描述
			},{
			  emulateJSON: true
			}).then(function (res) {
	              if(res.data.success){
	              	Toast('创建成功')
	              	
	              	setTimeout(()=>{
	              		location.href="/item_detail/"+ res.data.projectId;
	              	},500);

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

