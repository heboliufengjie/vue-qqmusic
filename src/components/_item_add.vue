<style scoped>
.page {
    background-color: #fff;
}

.inner-page {
    padding: 16px 15px;
}

.header {
    position: relative;
    width: 100%;
    height: 75px;
    background: #ccc;
    margin-bottom: 16px;
}

.upload {
    position: absolute;
    right: 12px;
    bottom: 12px;
    font-size: 12px;
    padding: 4px 6px;
    background: #3C96FF;
    border-radius: 100px;
    text-align: center;
    color: #fff;
}

.title {
    font-size: 14px;
    color: #000;
    height: 38px;
    line-height: 38px;
    background-color: #f8f8f8;
    margin-top: 12px;
    padding-left: 14px;
}

.project_name,
.project_desc,
.label-lists {
    margin-top: 14px;
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

.labels_null {
    text-align: center;
    font-size: 12px;
    color: #ccc;
    padding: 20px;
}

.mint-checklist {
    border-bottom: 1px solid #ccc;
}

.mint-checklist-title {
    font-size: 14px;
    margin-left: 0;
}

.mint-checklist input,
.mint-checklist textarea {
    font-size: 12px;
}

.mint-button--primary {
    margin-top: 15px;
}

.wrapper-project-label {
    display: flex;
    display: -webkit-flex;
    /* Safari */
    flex-direction: row;
    justify-content: space-between;
    color: #000;
    font-size: 14px;
}

.wrapper-project-label a {
    text-decoration: none;
    font-size: 12px;
    color: #3C96FF;
}

.project-label-edit {
    color: #63acf7;
}

input,
textarea {
    user-select: auto;
}

</style>
<template>
    <div class="page">
        <div class="inner-page">
            <!-- project-bg -->
            <project-bg @toAddProject="toAddProject"></project-bg>
            <!-- /project-bg -->
            <div class="title">项目资料</div>
            <div class="mint-checklist project_name">
                <label class="mint-checklist-title">项目名称</label>
                <input type="text" v-model.trim="projectInfo.name" placeholder="请输入项目名称" class="mint-field-core">
            </div>
            <div class="mint-checklist project_desc">
                <label class="mint-checklist-title">项目简介</label>
                <textarea v-model.trim="projectInfo.profile" placeholder="请输入项目简介" class="mint-field-core"></textarea>
            </div>
            <div class="mint-checklist label-lists" v-if="false">
                <ul class="wrapper-project-label">
                    <li class="project-label">项目标签</li>
                    <li class="project-label-edit" @click="editProjectLabelsLink(projectInfo )">编辑</li>
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
            <div class="mint-checklist">
                <label class="mint-checklist-title">项目详细描述</label>
                <textarea v-model.trim="projectInfo.detail" placeholder="请输入项目详细描述" class="mint-field-core"></textarea>
            </div>
            <mt-button size="large" class="mint-button--primary" @click.native="createProject()">确定</mt-button>
            <!-- reset -->
            <mt-button size="large" class="mint-button mint-button--primary mint-button--large is-plain" type="primary" @click.native="reset()">取消</mt-button>
            <!-- /reset -->
        </div>
    </div>
</template>
<script>
import { Toast, MessageBox, Indicator } from 'mint-ui';
export default {
    name: 'item_add',
    data() {
        return {
            labels: [],
            projectInfo: {},
            files: {},
            projectId: '',
        }
    },
    components: {
        projectBg(resolve) {
            require(['./_item_edit_bg.vue'], resolve);
        },
    },

    methods: {

        //创建项目
        createProject() {
            if (!this.projectInfo.name) {
                Toast('项目名称不能为空！');
                return false;
            }
            if (!this.projectInfo.profile) {
                Toast('项目简介不能为空！');
                return false;
            }

            if (!this.projectInfo.detail) {
                Toast('项目描述不能为空！');
                return false;
            }

            this.$http.post("/project/createProject.do", {
                name: this.projectInfo.name, //项目名称
                profile: this.projectInfo.profile, //项目简介
                detail: this.projectInfo.detail, //项目描述
            }, {
                emulateJSON: true
            }).then(function(res) {
                if (res.data.success) {
                    let projectId = res.data.projectId;
                    this.upload(projectId);
                    Toast('创建成功')
                    setTimeout(() => {
                        location.href = "/item_edit/" + res.data.projectId;
                    }, 500);

                } else {
                    Toast(res.data.msg)
                }
            });
        },

        //toAddProject

        toAddProject(data) {
            this.files = data.files;
        },

        //upload project bg

        upload(id) {
            let formData = new FormData();
            let file = this.files;
            let name = file[0].name;
            formData.append('file', file[0]); // 文件数据
            formData.append('fileName', name); // 文件名
            formData.append('projectId', id); // 项目id
            this.$http.post("/file/uploadFile.do", formData, {
                emulateJSON: true
            }).then(function(res) {
                if (res.data.success) {
                    //Indicator.close();
                    //let data = res.data;
                    //this.projectInfo.projectImageUrl = data.url;
                    //location.href = "/item_detail/" + this.$route.params.id;
                    //Toast('上传图片成功！')
                } else {
                    Toast(res.data.msg)
                }
            });
        },

        //reset
        reset() {
            this.projectInfo = {};
        },

        //editProjectLabelsLink
        editProjectLabelsLink(data) {
            if (!data.id) {
                MessageBox('提示', '保存成功后才能编辑标签');
            }
        },

    },
};

</script>
