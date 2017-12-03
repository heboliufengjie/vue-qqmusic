<style lang="sass">
.page{
	background-color:#fff;
	overflow:auto;
}
.tip{
	position: fixed;
	bottom:0px;
	width:100%;
	height:40px;
	display:block;
	background: #55C6FF;
	color:#fff;
	font-size:12px;
	line-height:40px;
}
.tip span{
	width:calc(50% - 2px );
	text-align:center;
	display:inline-block;
}
.tip :first-child{
	border-right:1px solid #fff;
}

.header{
	position:relative;
 	width: 100%;
 	margin-bottom: 16px;
 	padding:14px 12px;
}
.header-inner{
 	border:1px solid #ccc;
 	border-radius:10px;
 	padding-bottom:20px;
 	overflow:hidden;
}
.header .bg{
	width:100%;
	height:120px;
}
.header .edit{
	position:absolute;
	right:24px;
	top:24px;
	color:#fff;
	font-size:12px;
}
.header .edit a{
	text-decoration:none;
	color:#fff;
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
.upload img{
	background-color: rgb(38, 162, 255);
	color: #fff;
	width: 72px;
	height: 72px;
	border-radius: 50%;
	text-align: center;
	line-height: 65px;
	font-size: 16px;
	margin-bottom: 5px;
	overflow:hidden;
	border:1px solid rgba(129,143,160,0.15);
	box-shadow: 0 1px 5px 0 rgba(74,97,127,0.14);
}
.name{
	text-align:center;
	font-size:16px;
	margin-top: -16px;
}
.desc{
	width:calc(100% - 20px);
	margin:34px auto 0;
	text-align:center;
	font-size:12px;
	color: #1A2C3F;
}
.label-lists{
	width:calc(100% - 20px);
	margin:20px auto;
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
.items{
	padding:0 15px;
}
.items .title{
		font-size: 12px;
		color: #CFCFCF;
		margin-top:5px;
	}
	.items ul{
		padding: 5px 0px 40px;
	}
	.items ul li{
		display:flex;
		flex-wrap:nowrap;
		margin-bottom:24px;
		background-color:#fff;  
		box-shadow: 0 1px 6px 0 rgba(74,97,127,0.14);
		border-radius: 4px; 
		//padding:16px 10px; 
		img{
			width:83px;
			height:75px;
		}

		>div{
			margin-left:10px;
			padding-bottom:9px;
			padding-top:9px;
		}
		
		.name{
    		display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 14px;
			color: #202020;
			span{
				display:inline-block;
			}
			.link{
				color: #3C96FF;
				text-decoration:none;
				font-size: 12px;
				margin-left:1rem;
			}
		}
		.job{
			font-size: 12px;
			color: #626262;
			padding:4px 0;
		}

		.label{
			font-size:12px;
			color: #202020;
			span{
				border: 1px solid #8AC0FF;
				border-radius: 20px;
				padding:3px 6px;
				display:inline-block;
				margin-right:6px;
			}
		}
		   
	}
</style>
<template>
	<div class="page">
	    <div class="header">
	    	<div class="header-inner">
		    	<img src="/static/avatar_bg.png" class="bg">
		    	<span class="edit"><a :href="editLink()">编辑</a></span>
				<div class="upload">
				 	<img :src="userInfo.avatarUrl||'/static/avatar02.png'" v-if="showAvatar" class="avatar">
				</div>
				<div class="name">{{userInfo.name}}</div>
				<div class="desc">{{userInfo.profile||'这家伙很懒，还没填写简介'}}</div>
				<div class="label-lists" v-if="labels.length">
					<a href="javascript:;" v-for="label in labels">{{label.name}}</a>
				</div>
			</div>
		</div>
		<div class="item-lists">
			<mt-tab-container class='items'>
				<mt-tab-container-item>
					<p class="title">Ta创建的项目</p>
					<ul>
						<li v-for='item in lists' :key="item.id">
							<img :src="item.projectImageUrl||'/static/project_bg02.png'" class="project" @click="getProjectInfo(item)">
							<div>
								<p>{{item.name}}</p>
								<p class="job">{{item.profile}}</p>
								<p class="label" v-if="item.labelList.length">
									<span v-for="label in item.labelList">{{label.name}}</span>
								</p>
							</div>
						</li>
					</ul>
				</mt-tab-container-item>
			</mt-tab-container>
		</div>
    	<div class="tip">
    		<span @click='LinkAddItem()'>添加项目</span>
    		<span @click='LinkPersonalDisplay()'>个人展示</span>
    	</div>
	</div>
</template>
	
<script>
	// import fallback from './fallback.vue';
	// import { apiHandler } from '@/api/index';
	export default {
		name: 'personal_display',
		data() {
			return {
				showAvatar:false,
				labels:[],
				lists:[],
				userInfo:{},
			}
		},
		components: {
			headerVue(resolve) {
				require(['./header.vue'], resolve);
			}
		},
		created(){
			this.getUserInfo();
			this.getUserCreteProject();
			this.getUserLabel();
		},
		methods:{

			//获得用户信息
			
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
				
			// 获取用户创建的项目
			getUserCreteProject(){
				this.$http.post("/project/getUserCreateProject.do").then(function (res) {
		              if(res.data.success){
		              	let data = res.data;
		              	this.lists = data.list;
		              }
		            }
		        );
			},

			//getProjectInfo
			getProjectInfo(data){
				location.href='/item_detail/'+data.id;
			},


			//editLink

			editLink(){
				return '/me';
			},

			//添加项目

			LinkAddItem(){
				location.href='/item_add';
			},

			//个人展示

			LinkPersonalDisplay(){
				location.href='/personal_display';
			},

		}
	}
</script>

