<template>
    <div class="delete">
        <el-dialog title="删除" :visible="deleteVisble" @update:visible="v=>$emit('update:deleteVisble',v)">
            <span>是否确定删除社保公积金方案“<em>XXXXX</em>”？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="deleteFailed">取 消</el-button>
                <el-button type="primary" @click="deleteSuccess">确 定</el-button>
            </span>
        </el-dialog>
    </div>

</template>

<script>
    export default {
        props: ['deleteVisble'],
        data() {
            return {

            }
        },
        methods: {
            deleteFailed() {
                this.$emit('update:deleteVisble', false);
                // this.$message('取消删除方案');
            },
            deleteSuccess() {
                this.$emit('update:deleteVisble', false);
                // this.$message({
                //     message: '删除方案成功',
                //     type: 'success'
                // });
            }
        }
    }
</script>

<style scoped lang="less">
    .delete {
        /deep/.el-dialog {
            width: 500px;
            border-radius: 12px;
        }

        /deep/.el-dialog__header {
            padding: 14px 0 14px 45px;
            height: 22px;
            background: rgba(255, 255, 255, 1);
            box-shadow: 2px 0px 16px 0px rgba(3, 33, 136, 0.2);
            border-radius: 12px 12px 0px 0px;

            .el-dialog__title {
                font-size: 16px;
                font-family: PingFangSC-Medium;
                font-weight: 500;
                color: rgba(102, 102, 102, 1);
            }
        }

        /deep/.el-dialog__body {
            text-align: center;
            font-size: 14px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: rgba(102, 102, 102, 1);
            padding: 50px;

            em {
                font-style: normal;
            }
        }
    }
</style>