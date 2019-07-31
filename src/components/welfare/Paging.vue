<!-- 分页 -->
<template>
    <div class="block page">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
            :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper"
            :total="400">
        </el-pagination>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                currentPage: 4
            }
        },
        methods: {
            // 分页
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            }
        }
    }
</script>

<style scoped lang="less">
    /* 分页 */
    .page {
        width: 100%;
        height: 40px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 1px 17px 0px rgba(54, 78, 159, 0.29);
        border-radius: 4px 4px 0px 0px;
        padding-top: 10px;
    }

    /deep/.el-pagination {
        float: right;
        padding-right: 10px;
    }
</style>