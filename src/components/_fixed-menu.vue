<style scoped>
.tip {
    position: fixed;
    bottom: 0px;
    width: 100%;
    height: 40px;
    display: block;
    background: #55C6FF;
    color: #fff;
    font-size: 12px;
    line-height: 40px;
}

.tip span {
    width: calc(33.33333% - 3px);
    text-align: center;
    display: inline-block;
}


.tip span:nth-child(2) {
    border-left: 1px solid #fff;
    border-right: 1px solid #fff;
}

</style>
<template>
    <div class="tip">
        <span @click='LinkALists()'>首页</span>
        <span @click='LinkAddItem()'>添加项目</span>
        <span @click='LinkPersonalDisplay()'>个人展示</span>
    </div>
</template>
<script>
import { GetLocalStorage } from '../util';
export default {
    name: 'mt-header',
    data() {
        return {
            selected: '',
        }
    },
    methods: {
        //首页

        LinkALists() {
            location.href = '/lists';
        },

        //添加项目

        LinkAddItem() {
            location.href = '/item_add';
        },

        //个人展示

        LinkPersonalDisplay() {
            location.href = '/personal_display/' + GetLocalStorage().id;
        },
    }
};

</script>
