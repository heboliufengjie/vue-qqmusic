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
.wrapper-project-name a,
.wrapper-project-name span{
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
	overflow: hidden;
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
.project-detail {
	font-size: 14px;
	color: #626262;
	margin-top: 14px;
}
</style>
<template>
	<div class="page">
		<div class="inner-page">
		   <!--  project name-->
		   <ul class="wrapper-project-name">
		   	<li class="project-name">{{projectInfo.name}}</li>
		   	<li v-if="role=='0'"><a :href="editProjectLink(projectInfo)">编辑项目</a></li>
		   	<li v-if="role=='2'"><span @click="joinProject()">加入项目</span></li>
		   	<li v-if="role=='1'"><span @click="quitProject()">退出项目</span></li>
		   </ul>
		   <!--  /project name-->
		   <!--  项目简介-->
		   <div class="project-desc">{{projectInfo.profile}}</div>
		   <!--  ／项目简介-->
		   <!-- labels -->
		   <div class="project-labels">
				<a href="javascript:;" v-for="label in labels" v-if="labels.length">{{label.name}}</a>
				<p v-if="!labels.length">暂时没有关联标签</p>
			</div>
			<!-- /labels -->
			<!-- project-number -->
			<div class="project-number">
			  <a :href="LinkToSystemRecommendUser(item)" target="_blank" v-for="(item,index) in projectNumbers" :key="item.id">
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
		  <!-- detail -->
		  <div class="project-detail" v-if="projectInfo.detail">
		  	{{projectInfo.detail}}
		  </div>
		  <!-- /detail -->
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
			role:'',
		}
	},
	created(){
		this.getProjectInfo();
		this.getProjectMemeber();
		this.getProjectLabel();
		this.getProjectRole();

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
	              }else{
	              	Toast(res.data.msg)
	              }
	            }
	        );
		},

		//joinProject
		joinProject(){
			this.$http.post("/project/joinProject.do",{
				id:this.$route.params.id
			},{
			  emulateJSON: true
			}).then(function (res) {
	              if(res.data.success){
	              	Toast('加入项目成功')
	              }else{
	              	Toast(res.data.msg)
	              }
	            }
	        );
		},

		//quitProject
		quitProject(){
			this.$http.post("/project/quitProject.do",{
				id:this.$route.params.id
			},{
			  emulateJSON: true
			}).then(function (res) {
	              if(res.data.success){
	              	Toast('退出项目成功')
	              }else{
	              	Toast(res.data.msg)
	              }
	            }
	        );
		},

		//getProjectRole
		getProjectRole(){
			var storage=window.localStorage;
	        var json=storage.getItem("teamUp");
	        var jsonObj=JSON.parse(json);

			this.$http.post("/project/getProjectRole.do",{
				id:this.$route.params.id,
				userId:jsonObj.id,
				//userId:1
			},{
			  emulateJSON: true
			}).then(function (res) {
	              if(res.data.success){
	              	let data = res.data;
	              	this.role = data.role;
	              }
	            }
	        );
		},

		//edit project link
		editProjectLink(data){
			return '/item_edit/'+data.id;
		},

		//LinkToSystemRecommendUser
		LinkToSystemRecommendUser(data){
			return '/systemRecommendUser/'+data.id;
		},
	},
};
</script>

