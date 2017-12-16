<style scoped>
.project_bg {
    position: relative;
}

.project_bg img {
    width: auto;
    height: 75px;
    margin: 0 auto;
    display: block;
    background-size: contain;
}

.upload {
    position: absolute;
    right: 12px;
    bottom: 6px;
    font-size: 12px;
    padding: 4px 6px;
    background: #3C96FF;
    border-radius: 100px;
    text-align: center;
    color: #fff;
}

</style>
<template>
    <div class="project_bg">
        <div class="upload" v-if="projectInfo">
            <label v-on:change="upload">
                <input ref="files" type="file" name="avatar" id="avatar" style="display:none;"> 更改上传
            </label>
        </div>
        <img :src="(projectInfo && projectInfo.projectImageUrl)||'/static/project_bg.png'">
    </div>
</template>
<script>
import { Toast, Indicator } from 'mint-ui';
export default {
    name: 'item_edit_bg',
    props: {
        projectInfo: {
            type: Object,
        }
    },
    methods: {
        //upload
        upload: function(e) {
            e.preventDefault();
            Indicator.open('图片上传中...');
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
            formData.append('fileName', name); // 文件名
            formData.append('projectId', this.$route.params.id); // 项目id
            this.$http.post("/file/uploadFile.do", formData, {
                emulateJSON: true
            }).then(function(res) {
                if (res.data.success) {
                    Indicator.close();

                    let data = res.data;
                    this.projectInfo.projectImageUrl = data.url;
                    location.href = "/item_detail/" + this.$route.params.id;

                    Toast('上传图片成功！')
                } else {
                    Toast(res.data.msg)
                }
            });
            //
        },
    }
};

</script>
