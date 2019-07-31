<template>
    <div class="account">
        <el-dialog title="同步核算人员" :visible="accountVisible" @update:visible="v=>$emit('update:accountVisible',v)">
            <span>此操作将会重新同步本月所有需要缴纳社保公积金的人员，请确认是否重新同步？</span>
            <div slot="footer" class="dialog-footer">
                <el-button @click="accountFailed">取 消</el-button>
                <el-button type="primary" @click="accountSuccess">确 定</el-button>
            </div>
        </el-dialog>
    </div>

</template>

<script>
    export default {
        props: ['accountVisible'],
        data() {
            return {

            };
        },
        methods: {
            accountFailed() {
                this.$emit('update:accountVisible', false);
                this.$message('取消同步');
            },
            accountSuccess() {
                this.$emit('update:accountVisible', false);
                this.$message({
                    message: '同步核算人员成功',
                    type: 'success'
                });
            }
        }
    };
</script>


<style lang="less" scoped>
    .account {
        /deep/.el-dialog {
            width: 500px;
        border-radius:12px;
        }

        /deep/.el-dialog__header {
            height: 30px;
            background: rgba(255, 255, 255, 1);
            box-shadow: 2px 0px 16px 0px rgba(3, 33, 136, 0.2);
            border-radius: 12px 12px 0px 0px;

            /deep/.el-dialog__title {
                font-size: 16px;
                font-family: PingFangSC-Medium;
                font-weight: 500;
                color: rgba(102, 102, 102, 1);
            }

        }

        /deep/.el-dialog__body {
            padding: 35px 91px;
            line-height: 31px;
            font-size: 14px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: rgba(102, 102, 102, 1);
        }
    }
</style>