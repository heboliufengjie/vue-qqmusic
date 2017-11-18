<style scoped>
.page{
	background-color: #fff;
}
.inner-page{
	padding: 0 15px;
}
.wrapper-project-name{
	display: flex;
	display: -webkit-flex; /* Safari */
	flex-direction: row ;
	justify-content: space-between;
	color: #000;
	font-size: 14px;
	padding-top: 20px;
	padding-bottom: 10px;
}
.wrapper-project-name a{
	text-decoration: none;
	font-size: 12px;
	color: #0076FF;
}
.project-desc {
	font-size: 14px;
	color: #626262;
}
.project-labels{
 margin-bottom: 20px;
 margin-top: 20px;
}
.project-labels a{
	display: inline-block;
	color: #000;
	font-size: 12px;
	padding: 6px 8px;
	margin-right: 5px;
	margin-bottom: 5px;
	text-decoration: none;
	background: #EFEFEF;
	border-radius: 64.8px;
}

.project-labels p{
    font-size: 12px;
    color: #ccc;
}

.project-number{
 	display: flex;
	display: -webkit-flex; /* Safari */
	flex-direction: row ;
	align-items: center;
}
.project-number a{
	width: 34px;
	height: 34px;
	border-radius: 50%;
}
.project-number img{
	width: 100%;
}
.project-number span{
	margin-left: 6px;
}
.project-pic{
	display: inline-block;
	margin-top: 20px;
}
.project-pic img{
	width: 100%;
}
</style>
<template>
	<div class="page">
		<div class="inner-page">
		   <!--  project name-->
		   <ul class="wrapper-project-name">
		   	<li class="project-name">{{projectInfo.name}}</li>
		   	<li><a :href="editProjectLink(projectInfo)">编辑项目</a></li>
		   </ul>
		   <!--  /project name-->
		   <!--  项目简介-->
		   <div class="project-desc">{{projectInfo.profile}}</div>
		   <!--  ／项目简介-->
		   <!-- labels -->
		   <div class="project-labels">
				<a href="javascript:;" v-for="label in labels" v-if="labels.length">{{label.name}}</a>
				<p v-if="!labels.length">暂时没有关联标签，请添加标签</p>
			</div>
			<!-- /labels -->
			<!-- project-number -->
			<div class="project-number">
			  <a href="javascript:;" v-for="(item,index) in projectNumbers">
			  	<img :src="(item.avatarUrl||'/static/avatar01.png')">
			  </a>
			  <span v-if="(projectNumbers.length>10)" >+10</span>
			</div>
		   <!-- /project-number -->
		   <!-- project img -->
		   <div class="project-pic">
		   		<img src="/static/project_bg.png">
		   </div>
		   <!-- /project img -->
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
			labels:[],
			projectInfo:{},
			projectNumbers:[],
		}
	},
	created(){
		this.getProjectInfo();
		this.getProjectMemeber();
		this.getProjectLabel();
	},
	
	methods:{
		//get project label
		getProjectLabel(){
			this.$http.post("/project/getProjectLabel.do",{
				id:this.$route.params.id
			},{
			  emulateJSON: true
			}
			).then(function (res) {
	              if(res.data.success){
	              	let data = res.data;
	              	this.labels = data.list;
	              }
	            }
	        );
		},

		//获得项目的成员
		getProjectMemeber(){
			this.$http.post("/project/getProjectMemeber.do",{
				id:this.$route.params.id
			},{
			  emulateJSON: true
			}).then(function (res) {
	              if(res.data.success){
	              	let data = res.data.list;
	              	this.projectNumbers = data;
	              	console.log('获得项目的成员>>>>>',this.projectNumbers);
	              }else{
	              	//Toast(res.data.msg)
	              }
	            }
	        );
		},

		//获得一个项目的信息
		getProjectInfo(){
			this.$http.post("/project/getProjectInfo.do",{
				id:this.$route.params.id
			},{
			  emulateJSON: true
			}).then(function (res) {
	              if(res.data.success){
	              	let data = res.data;
	              	this.projectInfo = data.project;
	              	console.log('this.projectInfo>>',this.projectInfo);
	              }else{
	              	Toast(res.data.msg)
	              }
	            }
	        );
		},

		//edit project link
		editProjectLink(data){
			return '/item_edit/'+data.id;
		},
	},
};
</script>

