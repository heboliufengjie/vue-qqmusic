<style scoped>
 .page{
 	background-color: #fff;
 }

 .header-inner {
    border: 1px solid #ccc;
    border-radius: 10px;
}
 .inner-page{
 	padding: 0 15px;
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
	position: relative;
    top: calc(65px / 2 * -1);
    margin: 0 auto;
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

.avatar{
	width: 74px;
	height: 74px;
	border-radius: 50%;
	overflow: hidden;
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
					 		<img :src="avatar" v-if="showAvatar" class="avatar">
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
			showAvatar:false,
			avatar:'',
			labels:[],
			projectInfo:{},
		}
	},

	created(){
		this.getUserLabel();
		this.getUserInfo();
		//this.getAvatar();
	},
	methods:{
		//getAvatar
		// getAvatar(){
		// 	this.$http.post("/label/getAvatar.do",{

		// 	}).then(function (res) {
	 //              if(res.data.success){
	 //              	let data = res.data;
	 //              	this.labels = data.list;
	 //              }
	 //            }
	 //        );
		// },


		getUserInfo(){
			 //将JSON字符串转换成为JSON对象输出
			var storage=window.localStorage;
            var json=storage.getItem("teamUp");
            var jsonObj=JSON.parse(json);
            this.username = jsonObj.name;
            this.desc = jsonObj.profile;

            //getAvatar
            this.$http.post("/user/getAvatar.do",{
            	id:jsonObj.id
			}).then(function (res) {
	              if(res.data.success){
	              	let data = res.data;
	              	this.showAvatar = true;
	              	this.avatar = data.url;
	              	//console.log('data',data);
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
	              	this.avatar = data.url;
	              }else{
	              	Toast(res.data.msg)
	              }
	            }
	        );
            //
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
			if(!this.desc){
				Toast('个人简介不能为空！');
				return false;
			}

			this.$http.post("/user/modifyProfile.do",{
				name:this.username,
				profile:this.desc,
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

