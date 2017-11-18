<style scoped>
.page{
 	background-color: #fff;
 }
 .inner-page{
 	padding: 16px 15px;
 }
 .project_bg{
 	position: relative;
 }
 .project_bg img{
 	width: auto;
 	height: 75px;
 	margin: 0 auto;
 	display: block;
 	background-size: contain;
 }
 .upload{
 	position: absolute;
 	right: 12px;
 	bottom: 6px;
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
	background-color: #f8f8f8;
	margin-top: 12px;
	padding-left: 14px;
}
.project_name,.project_desc,.label-lists{
	margin-top: 14px;
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
.labels_null{
	text-align: center;
	font-size: 12px;
	color: #ccc;
	padding: 20px;

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
}
.wrapper-project-label a{
	text-decoration: none;
	font-size: 12px;
	color: #3C96FF;
}
.project-label-edit{
	color: #63acf7;
}

input,textarea{
	user-select:auto; 
}

</style>
<template>
	<div class="page">
		<div class="inner-page">
			<div class="project_bg">
				<div class="upload">
					<label v-on:change="upload">
					 	<input ref="files" type="file" name="avatar" id="avatar" style="display:none;">
					 		更改上传
					</label>	
				</div>
				<img :src="fileUrl" v-show="fileUrl">
			</div>
			<div class="title">项目资料</div>
			<div class="mint-checklist project_name">
				<label class="mint-checklist-title">项目名称</label>
				<input type="text"  v-model.trim="projectInfo.name"  placeholder="请输入项目名称" class="mint-field-core">
			</div>
			<div class="mint-checklist project_desc">
				<label class="mint-checklist-title">项目简介</label>
				<textarea v-model.trim="projectInfo.profile"  placeholder="请输入项目简介" class="mint-field-core"></textarea>
			</div>
			<div class="mint-checklist label-lists">
				<!-- <label class="mint-checklist-title">项目标签</label> -->
				<!-- <ul class="wrapper-project-label">
			   		<li class="project-label">项目标签</li>
			   		<li @click="editProjectLabelsLink()">编辑</li>
			   </ul> -->
			   <ul class="wrapper-project-label">
			   		<li class="project-label">项目标签</li>
			   		<li class="project-label-edit" @click="editProjectLabelsLink()">编辑</li>
			   </ul>
			   <!-- label -->
				<div v-if="labels.length">
					<a href="javascript:;" v-for="label in labels">{{label.name}}</a>
				</div>
				<!-- /label -->
				<!-- no label -->
				<div v-else class="labels_null">
					没有相关标签,请编辑标签
				</div>
				<!-- /no label -->
			</div>
			<!-- <div class="mint-checklist">
				<label class="mint-checklist-title">项目详细描述</label>
				<textarea v-model.trim="projectDetailDesc"  placeholder="请输入项目详细描述" class="mint-field-core"></textarea>
			</div> -->
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
			fileUrl:'',
			projectName:'',
			projectDesc:'',
			projectDetailDesc:'',
			labels:[],
			projectInfo:{},

		}
	},
	created(){
		this.getProjectInfo();
		this.getProjectLabel();
		this.getProjectFile();
	},
	methods:{

		//getProjectFile

		getProjectFile(){
			this.$http.post("/file/getProjectFile.do",{
				projectId:this.$route.params.id
			},{
			  emulateJSON: true
			}
			).then(function (res) {
	              if(res.data.success){
	              	let data = res.data;
	              	let list = data.list;
	              	if(list.length){
	              		return list[list.length -1];
	              	}else{
	              		return {};
	              	}
	              }
	            }
	        ).then(function(res){
	        	//获取上传图片信息
	        	if(!res.fileId){
	        		this.fileUrl = '/static/project_bg.png';
	        		return false;
	        	}

	        	this.$http.post("/file/getFileUrl.do",{
					fileId:res.fileId,
				},{
				  emulateJSON: true
				}
				).then(function (res) {
		              if(res.data.success){
		              	let data = res.data;
		              	this.fileUrl = data.url||'/static/project_bg.png';
		              }else{
		              	this.fileUrl = '/static/project_bg.png';
		              }
		            }
		        );
		        //
	        });
		},

		//upload
		upload: function(e) {
            e.preventDefault();
            var file = e.target.files; // 每次只允许上传一张图片，因此只取[0]
            var name = file[0].name;

		    // 判断图片格式
		    // if( file.type!='image/png' ){  
		    //     alert('图片格式不正确');
		    //     e.target.files.length = 0;
		    //     $(e.target).val('');
		    //     return false;  
		    // }

		    // 使用formData组装数据
		    var formData = new FormData();
		    formData.append('file', file[0]); // 文件数据
		    formData.append('fileName', name); // 文件名
		    formData.append('projectId', this.$route.params.id); // 项目id
            this.$http.post("/file/uploadFile.do",formData,{
			  emulateJSON: true
			}).then(function (res) {
	              if(res.data.success){
	              	let data = res.data;
	              	Toast('上传图片成功！')
	              	//3561638574130250
	              	// this.showAvatar = true;
	              	// this.avatar = data.url;
	              	console.log('data',data)
	              	return data;
	              }else{
	              	Toast(res.data.msg)
	              }
	            }
	        ).then(function(res){
	        	//获取上传图片信息
	        	//
	        	this.$http.post("/file/getFileUrl.do",{
					fileId:res.fileId,
				},{
				  emulateJSON: true
				}
				).then(function (res) {
		              if(res.data.success){
		              	let data = res.data;
		              	this.fileUrl = data.url;
		              }
		            }
		        );
		        //
	        	console.log('res>>',res)
	        });
            //
        },

        //16389485373482918
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
	              	//
	              	 return false;
	              	setTimeout(()=>{
	              		location.href="/edit_item/"+ res.data.projectId;
	              	},500);

	              }else{
	              	Toast(res.data.msg)
	              }
	            }
	        );
		},

		//editProjectLabelsLink

		editProjectLabelsLink(){
			location.href="/lables_edit/"+this.$route.params.id;
		},

		linkEditLables(){
			location.href="/edit_lables";
		}
	},
};
</script>

