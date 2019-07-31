<template>
    <div class="copycase">
        <el-dialog title="复制社保公积金方案" :visible="copyVisble" @update:visible="v=>$emit('update:copyVisble',v)">
            <el-form ref="form" :model="form">
                <el-form-item label="方案名称：">
                    <el-input v-model="form.name" placeholder="请输入"></el-input>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="$emit('update:copyVisble',false)">取 消</el-button>
                <el-button type="primary" @click="copySuccess">确 定</el-button>
            </div>
        </el-dialog>
    </div>

</template>

<script>
    export default {
        props: ['copyVisble'],
        data() {
            return {
                form: {
                    name: ''
                }
            }
        },
        methods: {
            copySuccess() {
                this.$emit('update:copyVisble', false);
                this.$message({
                    message: '复制方案成功',
                    type: 'success'
                });
            }
        }
    }
</script>

<style scoped lang="less">
    .copycase {
        /deep/.el-dialog {
            width: 550px;
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
            .el-form {
                float: none;
                margin: 52px 0 0 110px;
            }

            .el-input {
                width: 270px;
            }
        }
    }
</style>