<style scoped>
 .page{
 	background-color: #fff;
 }

 .header-inner {
    border: 1px solid #ccc;
    border-radius: 10px;
    overflow: hidden;
}
 .inner-page{
 	padding: 0 15px 20px;
 }
 .header{
 	position: relative;
    width: 100%;
    margin-bottom: 16px;
    padding: 14px 12px;
 }
 .header .bg{
	width:100%;
	height:120px;
	background-color:#ccc;
}
 .upload{
    position:relative;
	top:calc(65px / 2 * -1);
	margin:0 auto;
	width: 72px;
	height:72px;
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

.avatar{
	width: 72px;
    height: 72px;
    border-radius: 50%;
    text-align: center;
    line-height: 65px;
    font-size: 16px;
    margin-bottom: 5px;
    overflow: hidden;
    border: 1px solid rgba(129, 143, 160, 0.15);
    box-shadow: 0 1px 5px 0 rgba(74, 97, 127, 0.14);
}
input,textarea{
	user-select:auto; 
}

</style>
<template>
	<div class="page">
		<!-- header -->
		<div class="header">
				<div class="header-inner">
					<img src="/static/avatar_bg.png" class="bg">
					<div class="upload">
						<label v-on:change="upload">
					 		<img :src="userInfo.avatarUrl" v-if="showAvatar" class="avatar">
					 		<input ref="files" type="file" name="avatar" id="avatar" style="display:none;">
					 	</label>	
					 	<label v-on:change="upload">
					 	<div class="palette" v-if="!showAvatar" >+
					 		<input ref="files" type="file" name="avatar" id="avatar" style="display:none;">
					 	</div>
					 	</label>	
						<p>上传头像</p>
					</div>
				</div>
		</div>
		<!-- /header -->
		<div class="inner-page">
			<div class="mint-checklist label-lists">
				<ul class="wrapper-project-label">
			   		<li class="project-label">标签</li>
			   		<li @click="editUserLabels()">编辑</li>
			   </ul>
			   <!-- label -->
				<div v-if="labels.length">
					<a href="javascript:;" @click="deleteLabel(label,index,labels)" v-for="(label,index) in labels" :key="label.id">{{label.name}}</a>
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
				<input type="text"  v-model.trim="userInfo.name"  placeholder="请输入用户名" class="mint-field-core">
			</div>
			<div class="mint-checklist">
				<label class="mint-checklist-title">个人简介</label>
				<textarea v-model.trim="userInfo.profile"  placeholder="请输入个人简介" class="mint-field-core"></textarea>
			</div>
			<mt-button size="large" class="mint-button--primary" @click="submit()">确定</mt-button>
		</div>
	</div>
</template>
<script>
import { Toast , MessageBox} from 'mint-ui';
export default {
	name: 'me',
	data() {
		return {
			username:'',
			desc:'',
			showAvatar:false,
			avatar:'',
			labels:[],
			projectInfo:{},
			userInfo:{},
		}
	},

	created(){
		this.getUserLabel();
		this.getUserInfo();
	},
	methods:{

			getUserInfo(){
				var storage=window.localStorage;
	            var json=storage.getItem("teamUp");
	            var jsonObj=JSON.parse(json);

				this.$http.post("/user/getUserInfo.do",{
					id:jsonObj.id,
				},{
				  emulateJSON: true
				}).then(function (res) {
		              if(res.data.success){
		              	let data = res.data;
		              	this.showAvatar=true,
		              	this.userInfo = data;
		              }
		            }
		        );
			},

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
		    formData.append('fileName', name); // 其他的一些参数
            this.$http.post("/user/uploadAvatar.do",formData,{
			  emulateJSON: true
			}).then(function (res) {
	              if(res.data.success){
	              	let data = res.data;
	              	Toast('上传图片成功！')
	              	this.showAvatar = true;
	              	this.userInfo.avatarUrl = data.url;
	              }else{
	              	Toast(res.data.msg)
	              }
	            }
	        );
            //
        },

    	//deleteLabel

		deleteLabel(data,index,datas){
			MessageBox.confirm('确定删除此标签?').then(action => {
			  	if(action ==='confirm'){
			  		//
			  		this.$http.post("/label/deleteLabel.do",{
						id:data.id,
					},{
					  emulateJSON: true
					}
					).then(function (res) {
			              if(res.data.success){
			              	Toast('删除标签成功')
			              	datas.splice(index,1)
			              }else{
			              	Toast(res.data.msg)
			              }
			            }
			        );
			        //
			  	}
			});
        },

		uploadImg(){
			console.log('uploadImg')
		},

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
			if(!this.userInfo.profile){
				Toast('个人简介不能为空！');
				return false;
			}

			this.$http.post("/user/modifyProfile.do",{
				name:this.userInfo.name,
				profile:this.userInfo.profile,
			},{
			  emulateJSON: true
			}).then(function (res) {
	              if(res.data.success){
	              	var storage=window.localStorage;
            		var json=storage.getItem("teamUp");
            		var jsonObj=JSON.parse(json);
            		jsonObj.name = this.username;
	              	var d=JSON.stringify(jsonObj);
	              	storage.setItem("teamUp",d);
	              	
	              	location.href="/personal_display";

	              	Toast('修改成功')
	              }else{
	              	Toast(res.data.msg)
	              }
	            }
	        );
		},

		//editUserLabels

		editUserLabels(){
			MessageBox.prompt('添加项目标签').then(({ value, action }) => {
				 //createProjectLabel
				this.$http.post("/label/createLabel.do",{
					name:value,
					isPublic:0,
				},{
				  emulateJSON: true
				}).then(function (res) {
		              if(res.data.success){
		              	Toast('创建项目标签成功')
		              	this.labels.push({
		              		name:value,
		              		id:res&&res.data.labelId
		              	})

		              }else{
		              	Toast(res.data.msg)
		              }
		            }
		        );
				 //
			});
		},

		//editProjectLabelsLink
		editProjectLabelsLink(){
			
		},
	},
};
</script>

