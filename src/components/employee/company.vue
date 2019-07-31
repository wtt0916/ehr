<template>
    <el-dialog title="新增合同公司" :visible="companyVisible" @update:visible="v=>$emit('update:companyVisible',v)" center
        class="company">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="合同公司" prop="name">
                <el-input v-model="ruleForm.name" placeholder="请填写"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="$emit('update:companyVisible',false)">取 消</el-button>
            <el-button type="primary" @click="companySuccess">确 定</el-button>
        </div>
    </el-dialog>
</template>



<script>
    export default {
        props: ['companyVisible'],
        data() {
            return {
                ruleForm: {
                    name: '',
                    region: '',
                    num: ''
                },
                rules: {
                    name: [
                        { required: true, message: '请填写公司名称', trigger: 'blur' },
                        { min: 3, max: 5, message: '此公司名称已存在，请重新填写公司名称', trigger: 'blur' }
                    ],
                }
            };
        },
        methods: {
            companySuccess() {
                this.$emit('update:companyVisible', false);
                console.log("新增合同公司");
            }
        }
    };
</script>

<style lang="less" scoped>
    /deep/.el-dialog{
        border-radius:12px;
    }
    /deep/.el-form {
        float: none;
        padding: 20px;

        .el-input {
            width: 200px;
        }

        .el-form-item {
            margin-left: 72px;
        }
    }

    /deep/.el-dialog__header {
        height: 30px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 2px 0px 16px 0px rgba(3, 33, 136, 0.2);
        border-radius: 12px 12px 0px 0px;

    }
    /deep/.el-dialog__title{
        font-size: 16px;
    }
    /deep/.el-dialog__body {
        border-bottom: 1px solid #D7D7D7;
    }
</style>