<style scoped>
 .page{
 	background-color: #fff;
 }
 .inner-page{
 	padding: 0 15px;
 }
.label-lists{
	margin-top: 10px;
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
.mint-search{
	height: 44px;
}
.mint-search .mint-searchbar{
	background-color: #fff !important;
}
.mint-searchbar-inner{
	border-radius: 0px; 
	border-bottom: 1px solid #26a2ff; 
}
input,textarea{
	user-select:auto; 
}
</style>
<template>
	<div class="page">
		<div class="mint-search">
			<div class="mint-searchbar">
				<div class="mint-searchbar-inner">
					<i class="mintui mintui-search"></i>
					<input type="search" placeholder="输入你想表达的短句" v-model.trim="value" v-on:keyup.enter="submit(value)" @focus='focus' class="mint-searchbar-core">
				</div>
				<a class="mint-searchbar-cancel" v-show='showCancel'>取消</a>
			</div>
			<!-- <div class="mint-search-list" style="">
				<div class="mint-search-list-warp"></div>
			</div> -->
		</div>
		<div class="inner-page">
			<div class="label-lists">
				<a @click="addLabelForProject(label)" :key="label.id" v-for="label in labels">{{label.name}}</a>
			</div>
		</div>
	</div>
</template>
<script>
import { Toast } from 'mint-ui';
export default {
	name: 'lables_edit',
	data() {
		return {
			value:'',
			showCancel:0,
			labels:[],
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

		//为一个项目添加标签
		addLabelForProject(data){
			this.$http.post("/project/addLabelForProject.do",{
				id:this.$route.params.id,
				labelId:data.id
			},{
			  emulateJSON: true
			}
			).then(function (res) {
	              if(res.data.success){
	              	Toast('添加成功')
	              }else{
	              	Toast(res.data.msg)
	              }
	            }
	        );
		},
			
		focus(){
			this.showCancel = 1;
		},
		submit(data){
			alert(12)
			if(!data){
				return false;
			}else{
				console.log('submit',data)
			}
		},
	},
};
</script>

