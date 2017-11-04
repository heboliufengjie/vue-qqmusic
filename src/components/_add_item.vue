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
				<input type="text"  v-model.trim="projectName"  placeholder="请输入项目名称" class="mint-field-core">
			</div>
			<div class="mint-checklist">
				<label class="mint-checklist-title">项目简介</label>
				<textarea v-model.trim="projectDesc"  placeholder="请输入项目简介" class="mint-field-core"></textarea>
			</div>
			<div class="mint-checklist label-lists">
				<label class="mint-checklist-title">项目标签</label>
				<a href="javascript:;" v-for="label in labels">{{label.type}}</a>
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
	name: 'editProject',
	data() {
		return {
			projectName:'',
			projectDesc:'',
			projectDetailDesc:'',
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
		//创建项目
		createProject(){
			console.log('projectName',this.projectName);
			if(!this.projectName){
				Toast('项目名称不能为空！');
				return false;
			}
			if(!this.projectDesc){
				Toast('项目描述不能为空！');
				return false;
			}

			this.$http.post("/project/createProject.do",{
				name:this.projectName,//项目名称
				profile:this.projectDesc,//项目描述
			},{
			  emulateJSON: true
			}).then(function (res) {
	              if(res.data.success){
	              	Toast('创建成功')
	              	//
	              	setTimeout(()=>{
	              		location.href="/edit_item/"+ res.data.projectId;
	              	},500);

	              }else{
	              	Toast(res.data.msg)
	              }
	            }
	        );
		},
		linkEditLables(){
			location.href="/edit_lables";
		}
	},
};
</script>

