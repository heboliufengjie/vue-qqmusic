<style lang="sass" scoped>
.items .title {
    font-size: 12px;
    color: #CFCFCF;
    text-align: center;
    margin-top: 13px;
    margin-bottom: 14px;
}

.items ul {
    padding: 0px 13px 0px;
}

.items ul li {
    display: flex;
    flex-wrap: nowrap;
    margin-bottom: 20px;
    background-color: #fff;
    box-shadow: 0 1px 6px 0 rgba(74, 97, 127, 0.14);
    border-radius: 4px;
    padding: 16px 10px;

    .name {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-weight: bold;
        font-size: 14px;
        color: #212121;
        span {
            display: inline-block;
        }
        .link {
            color: #3C96FF;
            text-decoration: none;
            font-size: 0.3rem;
            margin-left: 1rem;
        }
    }
    .job {
        font-size: 12px;
        color: #9b9b9b;
        padding: 8px 0;
    }

    .label {
        font-size: 12px;
        color: #9b9b9b;
        span {
            border: 1px solid #8AC0FF;
            border-radius: 20px;
            padding: 3px 12px;
            display: inline-block;
            margin-right: 6px;
            margin-bottom: 6px;
        }
    }
}

.items ul li .avatarUrl {
    margin-right: 15px;
}

.items ul li .avatarUrl img {
    width: 49px;
    height: 49px;
    border-radius: 50%;
    overflow: hidden;
}

.mint-tab-container {
    height: calc(100vh - 40px - 53px);
}

.page .page-content {
    margin-bottom: 40px;
}


.project-null {
    width: 100%;
    height: 100%;
    overflow: hidden;
    text-align: center;
    font-size: 12px;
    color: #CFCFCF;
}

.project-null .null {
    margin: 147px auto 0;
    width: calc(0.5 * 186px);
    height: calc(0.5 * 168px);
    background: url('/static/project_null.png') no-repeat center;
    background-size: cover;
    margin-bottom: 14px;
}

</style>
<template>
    <div class="page">
        <div class="page-content" style="overflow: hidden;">
            <div class="song-cotainer" ref="scrollTarget">
                <mt-navbar :value="selected" @input="function(val) {selected = val}">
                    <mt-tab-item id="1" class='mint-tab-item-left' @click.native="getProjectLists()">有趣项目</mt-tab-item>
                    <mt-tab-item id="2" class='mint-tab-item-right' @click.native="getRecommendUserLists()">优秀小伙伴</mt-tab-item>
                </mt-navbar>
                <mt-tab-container v-model="selected" ref="scrollTouch" class='items'>
                    <mt-tab-container-item id="1">
                        <p class="title">找到你感兴趣的组</p>
                        <ul v-show="ProjectLists.length && loaded">
                            <!-- 项目列表 -->
                            <li v-for="(song, index) in ProjectLists">
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
                            <!-- ／项目列表 -->
                        </ul>
                        <!-- null -->
                        <div class="project-null" v-show="!ProjectLists.length && loaded">
                            <div class="null"></div>
                            <p>还在载入值得投入的项目</p>
                        </div>
                        <!-- /null -->
                    </mt-tab-container-item>
                    <mt-tab-container-item id="2" v-if="selected == 2">
                        <p class="title">找到你感兴趣的小伙伴</p>
                        <ul v-show="RecommendUserLists.length && loaded">
                            <li :key="item.id" v-for="item in RecommendUserLists" @click="LinkpPersonalDisplay(item)">
                                <div class="avatarUrl">
                                    <img :src="item.avatarUrl ||'/static/avatar02.png'">
                                </div>
                                <div>
                                    <p class="name">{{item.name}}</p>
                                    <p class="job">{{item.profile||'这个人很懒，还没有简介'}}</p>
                                    <p class="label" v-if="item.labelList.length">
                                        <span v-for="label in item.labelList" :key="label.id">{{label.name}}</span>
                                    </p>
                                </div>
                            </li>
                        </ul>
                        <!-- null -->
                        <div class="project-null" v-show="!RecommendUserLists.length && loaded">
                            <div class="null"></div>
                            <p>还未载入有趣的小伙伴</p>
                        </div>
                        <!-- /null -->
                    </mt-tab-container-item>
                </mt-tab-container>
            </div>
        </div>
        <!-- fixed-menu -->
        <fixed-menu></fixed-menu>
        <!-- /fixed-menu -->
    </div>
</template>
<script>
export default {
    name: 'lists',
    data() {
        return {
            topinfo: {},
            title: '',
            showTitle: false,
            data: {},
            songlist: [],
            selected: "1",
            coverScale: 1,
            loaded: false,
            ProjectLists: [],
        };
    },
    components: {
        fixedMenu(resolve) {
            require(['./_fixed-menu.vue'], resolve);
        },
    },
    created() {

        //首页进入默认显示用户加入的项目

        this.getUserJoinedProject();
    },

    methods: {

        //首页进入默认显示用户加入的项目

        getUserJoinedProject() {
            this.loaded = false;
            this.ProjectLists = [];
            this.$http.post("/project/getUserJoinedProject.do").then(function(res) {
                if (res.data.success) {
                    this.loaded = true;
                    this.ProjectLists = res.data.list;
                } else {
                    Toast(res.data.msg)
                }
            });
        },

        //获得系统推荐的小伙伴
        getSystemRecommendUser() {
            this.loaded = false;
            this.RecommendUserLists = [];
            this.$http.post("/user/getSystemRecommendUser.do").then(function(res) {
                if (res.data.success) {
                    this.loaded = true;
                    this.RecommendUserLists = res.data.list;
                } else {
                    Toast(res.data.msg)
                }
            });
        },

        // 点击有趣项目切换
        getProjectLists() {
            this.getUserJoinedProject();
        },

        //点击有趣小伙伴切换
        getRecommendUserLists() {
            this.getSystemRecommendUser();
        },

        //查看系统推荐小伙伴想详情

        LinkpPersonalDisplay(data) {
            location.href = '/personal_display/' + data.id;
        },

    },

}

</script>
