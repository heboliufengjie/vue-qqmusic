<style lang="sass">
.page {
    background-color: #fff;
    overflow: auto;
}

.header {
    position: relative;
    width: 100%;
    margin-bottom: 16px;
    padding: 14px 12px;
}

.header-inner {
    border: 1px solid #ccc;
    border-radius: 10px;
}

.header .bg {
    width: 100%;
    height: 120px;
}

.header .edit {
    position: absolute;
    right: 24px;
    top: 24px;
    color: #fff;
    font-size: 12px;
}

.header .edit a {
    text-decoration: none;
    color: #fff;
}

.upload {
    position: relative;
    top: calc(65px / 2 * -1);
    margin: 0 auto;
    width: 65px;
    font-size: 12px;
    text-align: center;
    color: #fff;
}

.upload img {
    color: #fff;
    width: 65px;
    height: 65px;
    border-radius: 50%;
    text-align: center;
    line-height: 65px;
    font-size: 16px;
    margin-bottom: 5px;
}

.name {
    text-align: center;
    font-size: 16px;
    margin-top: -25px;
    margin-bottom: 25px;
}

.desc {
    width: calc(100% - 20px);
    margin: 0 auto;
    text-align: center;
    font-size: 12px;
}

.label-lists {
    width: calc(100% - 20px);
    margin: 20px auto;
}

.label-lists a {
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

.items {
    padding: 0 15px;
}

.items .title {
    font-size: 14px;
    color: #CFCFCF;
    margin-top: 5px;
}

.items ul {
    padding: 5px 0px 40px;
}

.items ul li {
    display: flex;
    flex-wrap: nowrap;
    margin-bottom: 24px;
    background-color: #fff;
    box-shadow: 0 1px 6px 0 rgba(74, 97, 127, 0.14);
    border-radius: 4px;
    padding: 16px 10px;
    img {
        width: 60px;
        height: 60px;
        border: 1px solid #EFEFEF;
    }

    >div {
        margin-left: 15px;
    }

    .name {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
        color: #202020;
        span {
            display: inline-block;
        }
        .link {
            color: #3C96FF;
            text-decoration: none;
            font-size: 12px;
            margin-left: 1rem;
        }
    }
    .job {
        font-size: 12px;
        color: #202020;
        padding: 0.25rem 0;
    }

    .label {
        font-size: 12px;
        color: #202020;
        span {
            border: 1px solid #8AC0FF;
            border-radius: 20px;
            padding: 3px 6px;
            display: inline-block;
            margin-right: 6px;
        }
    }
}

</style>
<template>
    <div class="page">
        <div class="header">
            <div class="header-inner">
                <img src="/static/avatar_bg.png" class="bg">
                <div class="upload">
                    <img :src="userInfo.avatarUrl||'/static/avatar02.png'" v-if="showAvatar" class="avatar">
                </div>
                <div class="name">{{userInfo.name}}</div>
                <div class="desc">{{userInfo.profile||'这家伙很懒，还没填写简介'}}</div>
                <div class="label-lists" v-if="labels.length">
                    <a href="javascript:;" v-for="label in labels" :key="label.id">{{label.name}}</a>
                </div>
            </div>
        </div>
        <!-- item-lists -->
        <div class="item-lists">
            <mt-tab-container class='items'>
                <mt-tab-container-item>
                    <p class="title">Ta创建的项目</p>
                    <ul>
                        <li v-for='item in lists' :key="item.id">
                            <div class="project" @click="getProjectInfo(item)">
                                <img :src="item.projectImageUrl||'/static/project_bg02.png'">
                            </div>
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
        <!-- /item-lists -->
        <!-- fixed-menu -->
        <fixed-menu></fixed-menu>
        <!-- /fixed-menu -->
    </div>
</template>
<script>
export default {
    name: 'systemRecommendUser',
    data() {
        return {
            showAvatar: false,
            labels: [],
            lists: [],
            userInfo: {},
        }
    },
    components: {
        fixedMenu(resolve) {
            require(['./_fixed-menu.vue'], resolve);
        },
    },
    created() {
        this.getUserInfo();
        this.getUserLabel();
        this.getUserCreteProject();
    },
    methods: {

        //获得用户信息
        getUserInfo() {
            this.$http.post("/user/getUserInfo.do", {
                id: this.$route.params.id,
            }, {
                emulateJSON: true
            }).then(function(res) {
                if (res.data.success) {
                    let data = res.data;
                    this.showAvatar = true;
                    this.userInfo = data;
                }
            });
        },


        //获得一个用户的所有标签
        getUserLabel() {
            this.$http.post("/label/getUserLabel.do", {
                id: this.$route.params.id,
            }, {
                emulateJSON: true
            }).then(function(res) {
                if (res.data.success) {
                    let data = res.data;
                    this.labels = data.list;
                }
            });
        },

        // 获取用户创建的项目
        getUserCreteProject() {
            this.$http.post("/project/getUserCreateProject.do", {
                id: this.$route.params.id,
            }, {
                emulateJSON: true
            }).then(function(res) {
                if (res.data.success) {
                    let data = res.data;
                    this.lists = data.list;
                }
            });
        },

        //getProjectInfo
        getProjectInfo(data) {
            location.href = '/item_detail/' + data.id;
        },

    }
}

</script>
