<style lang="sass">
.page{
	background-color:#fff;
	height:100vh;
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
 	margin-top:50px;
 	padding:0 12px;
}
.header-inner{
 	border:1px solid #ccc;
 	border-radius:10px;
}
.header .bg{
	width:100%;
	height:120px;
	background-color:#ccc;
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
	width: 65px;
	font-size: 12px;
	text-align: center;
	color: #fff;
}
.upload img{
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
.name{
	text-align:center;
	font-size:16px;
	margin-top: -25px;
    margin-bottom: 25px;
}
.desc{
	width:calc(100% - 20px);
	margin:0 auto;
	text-align:center;
	font-size:12px;
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
		font-size: 14px;
		color: #CFCFCF;
		margin-top:5px;
	}
	.items ul{
		padding: 5px 0px 0px;
	}
	.items ul li{
		display:flex;
		flex-wrap:nowrap;
		margin-bottom:24px;
		background-color:#fff;  
		box-shadow: 0 1px 6px 0 rgba(74,97,127,0.14);
		border-radius: 4px; 
		padding:16px 10px; 
		img{
			width:60px;
			height:60px;
			display:inline-block;
			border-radius:50%;
			margin-right:15px;
		}

		>div{
			width:100%;
		}
		
		.name{
    		display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 1rem;
			color: #202020;
			span{
				display:inline-block;
			}
			.link{
				color: #3C96FF;
				text-decoration:none;
				font-size:0.3rem;
				margin-left:1rem;
			}
		}
		.job{
			font-size:0.3rem;
			color: #202020;
			padding:0.25rem 0;
		}

		.label{
			font-size:0.2rem;
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
		<header-vue fixed class="music-header-2">
	      <fallback slot="left"></fallback>
	      <span slot="right" style="font-size: 30px;font-weight: bold;display: inline-block;margin-top: -10px;">...</span>
	    </header-vue>
	    <div class="header">
	    	<div class="header-inner">
		    	<img src="" class="bg">
		    	<span class="edit"><a :href="editLink()">编辑</a></span>
				<div class="upload">
				 	<img src="" v-if="!false">
				</div>
				<div class="name">Jessie Smith</div>
				<div class="desc">I wasn't the girl who played dress up and dreamt of a pink Barbie car.</div>
				<div class="label-lists">
					<a href="javascript:;" v-for="label in labels">{{label.name}}</a>
				</div>
			</div>
		</div>
		<div class="item-lists">
			<mt-tab-container class='items'>
				<mt-tab-container-item>
					<p class="title">Ta创建的项目</p>
					<ul>
						<li v-for='item in lists'>
							<img src="../assets/project.jpg" class="project">
							<div>
								<p>{{item.name}}</p>
								<p class="job">{{item.profile}}</p>
								<p class="label">
									<span>标签</span>
									<span>标签</span>
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
	import fallback from './fallback.vue';
	import { apiHandler } from '@/api/index';
	export default {
		name: 'personal_display',
		data() {
			return {
				desc:'',
				labels:[],
				lists:[],
			}
		},
		components: {
			headerVue(resolve) {
				require(['./header.vue'], resolve);
			}
		},
		created(){
			this.getUserCreteProject();
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

			//editLink

			editLink(){
				return '/me';
			},

		}
	}
</script>

