<template>
	<div class="page">
		<header-vue fixed 
					class="music-header-2" 
					:title="topinfo.ListName + `第${_getDayOfYear(data.update_time)}天`" 
					:showTitle="showTitle">
	      <fallback slot="left"></fallback>
	      <span slot="right" style="font-size: 30px;font-weight: bold;display: inline-block;margin-top: -10px;">...</span>
	    </header-vue>
	    <div class="page-content" style="overflow: hidden;">
	    	<div class="song-cotainer" v-if="songlist.length" ref="scrollTarget" a='2'>
    			<mt-navbar :value="selected" @input="function(val) {selected = val}">
				  <mt-tab-item id="1" class='mint-tab-item-left'>有趣项目</mt-tab-item>
		  		  <mt-tab-item id="2" class='mint-tab-item-right'>优秀小伙伴</mt-tab-item>
				</mt-navbar>
				<mt-tab-container v-model="selected" ref="scrollTouch" class='items'>
					<mt-tab-container-item id="1">
						<p class="title">找到你感兴趣的组</p>
						<ul>
							<li v-for="(song, index) in songlist">
								<img src="../assets/project.jpg" class="project">
								<div>
									<div class="name">
										设计夜校
									</div>
									<p class="job">自学 职场技能 学长代练</p>
									<p class="label">
										<span>标签</span>
										<span>标签</span>
									</p>
								</div>
							</li>
						</ul>
					</mt-tab-container-item>
					<mt-tab-container-item id="2" v-if="selected == 2">
						<p class="title">找到你感兴趣的小伙伴</p>
						<ul>
							<li>
								<img src="../assets/users.jpg">
								<div>
									<div class="name">
										<span>cheeky in china</span>
										<span class="link">查看他项目</span>
									</div>
									<p class="job">design sprint</p>
									<p class="label">
										<span>标签</span>
										<span>标签</span>
									</p>
								</div>
							</li>
							<li>
								<img src="../assets/users.jpg">
								<div>
									<div class="name">
										<span>cheeky in china</span>
										<span class="link">查看他项目</span>
									</div>
									<p class="job">design sprint</p>
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
	    	<div class="ranklist-loading" v-else>
	    		<div class="loading">
	    			<mt-spinner type="fading-circle"></mt-spinner>
	    			<p>正在载入...</p>
	    		</div>
	    	</div>
    	</div>
    	<div class="tip">
    		<span>添加项目</span>
    		<span>个人展示</span>
    	</div>
	</div>
</template>
	
<script>
	import fallback from './fallback.vue';
	import { apiHandler } from '@/api/index';
	import AlloyTouch from 'alloytouch';
	import Transform from 'css3transform';
	import { lyricsAnalysis, getDayOfYear } from '../util';
	import { mapMutations, mapActions } from 'vuex';
	import base64 from 'base-64';
	import utf8 from 'utf8';
	
	/* ==============================================================
	 *                       RankList 组件
	 *	已完成UI：
	 *		随着列表滚动完成封面的模糊变化和标题的变化
	 *  Issuse:
	 *		在这里的话向大家推荐下AlloyTeam的 AlloyTouch
	 *		而不是Iscroll，相比较于Iscroll，AlloyTouch更加简洁
	 *		300多行的代码相比IScroll2000多的行的代码，大大减少了资源的占用,
	 *		源码的阅读也非常流畅.相比之下AlloyTouch也赋予了滚动更多的灵活性
	 *		而不像Iscroll必须要求Wapper和Scroll的限制，同时Iscroll对于高度
	 *		的严格要求在Vue的模板中经常会出现无法获取明确高度而导致无法滚动，需要
	 *		通过 Refresh 来刷新组件, 而AlloyTouch则不会又这种情况
	 * ============================================================= */
	const NameSpace = 'playing';

	export default {
		name: 'rankList',
		created() {
	        apiHandler({
	        	name: 'rankList',
	        	params: {
	        		topid: this.$route.params.id
	        	}
	        },(response) => {
	        	/*
	        	 * 延迟400ms执行等待页面切换动画完成
	        	 * 原由: 当不存在延迟时组件的内容渲染与页面的切换将会同时执行
	        	 * 由此将会导致在Chrome下产生卡顿
	        	 * */
		        setTimeout(() => {
		        	this.topinfo = response.topinfo;
			        this.songlist = response.songlist;
			        this.data = response;

			        // enable scroll 
			        this.$nextTick(() => {
			        	this._initScroll();
			        });
		        }, 400);
	        })
		},
		data() {
			return {
				topinfo: {},
				title: '',
				showTitle: false,
				data: {},
				songlist: [],
				selected: "1",
				coverScale: 1
			};
		},
		methods: {
			_initScroll() {
				let scrollTouch = this.$refs.scrollTouch.$el,
					scrollTarget = this.$refs.scrollTarget;

				Transform(scrollTarget, true);

				let self = this;	
				let alloyTouch = new AlloyTouch({
					touch: scrollTouch,
					target: scrollTarget,
					sensitivity: .8,
					bindSelf: true,
					property: 'translateY',
					max: 0,
					change(pos) {
						console.log('pos',pos);
						let coverHeight = -scrollTouch.clientWidth*.7 + 40;
						function enableScroll() {
							this.fixed = scrollTouch.scrollTop > 0 ? true : false;
						};

						// Toggle The Title When Pos Change
						self.showTitle = pos <= -60 ? true : false;
						
						if (pos <= coverHeight) {
							// Fiexd The RankList When List Scroll To Top
							this.target[this.property] = coverHeight;

							// enable tab container scrolled When List Scroll To Top
							this.preventDefault = false;
							enableScroll.call(this)
						}else {
							this.preventDefault = true;
						}
						self._blurringCover(pos/coverHeight);
					}
				});
			},
			_blurringCover(percentage) {
				let blur = 30,
					musicCover = this.$refs.musicCover;
				//musicCover.style.filter = `blur(${(percentage*blur >> 0)}px)`;
			},
			_getDayOfYear: getDayOfYear,
			randomPlayAll() {
				this.stackSonglist(this.songlist);
				this.switchPlayOrder('random');
				this.playSong('next');
			},
			...mapMutations(NameSpace, ['switchPlayOrder', 'stackSonglist']),
			...mapActions(NameSpace, ['playSong'])
		},
		components: {
			headerVue(resolve) {
				require(['./header.vue'], resolve);
			}
		}
	}
</script>

<style lang="sass">
	.song-cotainer, .ranklist-loading {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		background-color: transparent;
		overflow: hidden;
		&:before {
			display: block;
			content: '';
			margin-top: 40px;
		}
		.lyrics-wrapper {
			line-height: 42px;
		    text-align: center;
		    font-size: 16px;
		}
	}
	.ranklist-loading {
		bottom: 0;
		.loading {
			display: flex;
			justify-content: center;
			padding-top: 30%;
			height: 100%;
			background-color: $white-base;
			p {
				margin-top: 10px;
				margin-left: 10px;
				font-size: 10px;
				color: rgba(0, 0, 0, .5);
			}
		}
	}
	.items .title{
		font-size: 14px;
		color: #CFCFCF;
		text-align:center;
		margin-top:5px;
	}
	.items ul{
		padding: 5px 15px 0px;
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
	.mint-tab-container {
		height: calc(100vh - 40px - 40px - 53px);
	}
	.page .page-content{
		margin-bottom:40px;
	}
	.tip{
		position: absolute;
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
</style>