<template>
    <el-dialog title="添加部门" :visible="departmentVisible" @update:visible="v=>$emit('update:departmentVisible',v)" center
        class="company">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="上级部门">
                <el-select v-model="ruleForm.superior" placeholder="请选择">
                    <el-option label="区域一" value="1"></el-option>
                    <el-option label="区域二" value="2"></el-option>
                </el-select>
                <el-tooltip class="item" effect="dark" content="如不选择上级部门，将默认在“公司名称”下新增一级部门" placement="right">
                    <i class="iconfont icon-wenhao_huabanfuben"></i>
                </el-tooltip>
            </el-form-item>
            <el-form-item label="部门名称" prop="department">
                <el-input v-model="ruleForm.department" placeholder="请填写"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="$emit('update:departmentVisible',false)">取 消</el-button>
            <el-button type="primary" @click="departmentSuccess('ruleForm')">提 交</el-button>
        </div>
    </el-dialog>
</template>



<script>
    export default {
        props: ['departmentVisible'],
        data() {
            return {
                ruleForm: {
                    superior: '',
                    department: ''
                },
                rules: {
                    department: [
                        { required: true, message: '请填写公司名称', trigger: 'blur' },
                        { min: 3, max: 5, message: '此公司名称已存在，请重新填写公司名称', trigger: 'blur' }
                    ],
                }
            };
        },
        methods: {
            departmentSuccess(formName) {
                
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$emit('update:departmentVisible', false);
                        console.log("新增合同公司");
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
                
            }
        }
    };
</script>

<style lang="less" scoped>
    /deep/.el-dialog {
        border-radius: 12px;
    }

    /deep/.el-dialog__header {
        height: 30px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 2px 0px 16px 0px rgba(3, 33, 136, 0.2);
        border-radius: 12px 12px 0px 0px;

    }

    /deep/.el-dialog__body {
        border-bottom: 1px solid #D7D7D7;

        /deep/.el-form {
            float: none;
            padding: 20px;

            .el-input {
                width: 200px;
            }

            .el-form-item {
                margin-left: 72px;
            }

            i {
                color: #CDCDCD;
            }
        }
    }
</style>