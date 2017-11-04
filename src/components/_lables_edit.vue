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
			<div class="mint-search-list" style="">
				<div class="mint-search-list-warp"></div>
			</div>
		</div>
		<div class="inner-page">
			<div class="label-lists">
				<a href="javascript:;" v-for="label in labels">{{label.type}}</a>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'edit_lables',
		data() {
			return {
				value:'',
				showCancel:0,
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
			focus(){
				this.showCancel = 1;
			},
			submit(data){
				if(!data){
					return false;
				}else{
					console.log('submit',data)
				}
			},
		},
	};
</script>

