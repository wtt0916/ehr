<template>
    <el-dialog title="设置工号规则" :visible="staffIdVisible" @update:visible="v=>$emit('update:staffIdVisible',v)" center>
        <strong><i class="iconfont icon-gantanhao"></i>系统将根据目前设置的工号规则，在入职新员工时自动编制相应工号 </strong>
        <el-form ref="ruleForm" class="staff">
            <el-row class="company_mes">
                <div style="margin-top:10px;" v-for="(item, index) in ruleForm" :key="index">
                    <el-col style="width:280px;">
                        <el-form-item label="公司前綴：" prop="prefix" :status-icon="false" required>
                            <el-input v-model="item.prefix" maxlength="10" show-word-limit placeholder="请输入(最多10个字符)">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col style="width:275px;">
                        <el-form-item label="适用范围：" prop="scope">
                            <el-select v-model="item.scope" placeholder="请选择">
                                <el-option label="区域一" value="1"></el-option>
                                <el-option label="区域二" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-button id="accessories" plain style="cursor: pointer" @click="accessories">+继续添加</el-button>
                    <el-button id="remove" plain style="cursor: pointer;" @click="removeDomain(index)">
                        删&nbsp;&nbsp;&nbsp;除
                    </el-button>

                </div>
            </el-row>
            <el-row class="work_num">
                <el-col :span="13">
                    <el-form-item label="工号数字位数：" prop="jobNum">
                        <el-input v-model="ruleForm.jobNum" maxlength="10" show-word-limit placeholder="请输入1~10之间的整数">
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-checkbox class="pre">是否前置补0</el-checkbox>
                <el-col class="compile">
                    <el-form-item label="工号从：" prop="jobNum">
                        <el-input v-model="ruleForm.jobNum1">
                        </el-input>&nbsp;&nbsp;<b>开始编制</b>
                    </el-form-item>
                </el-col>
                <el-checkbox>使用当前工号规则按员工入职时间重新为员工编制工号（包含在职中，已离职的员工）</el-checkbox>
            </el-row>

        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="$emit('update:staffIdVisible',false)">取 消</el-button>
            <el-button type="primary" @click="staffIdSuccess">确 定</el-button>
        </div>
    </el-dialog>

</template>


<script>
    export default {
        props: ['staffIdVisible'],
        data() {
            return {
                ruleForm: [{
                    prefix: '',
                    scope: '',
                    jobNum: '',
                    jobNum1: ''
                }],
            };
        },
        methods: {
            staffIdSuccess() {
                this.$emit('update:staffIdVisible', false);
                console.log("设置工号成功");
            },
            accessories() {
                this.ruleForm.push({
                    prefix: '',
                    scope: ''
                })
            },
            removeDomain(index) {
                this.ruleForm.splice(index, 1)
            }
        }
    };
</script>


<style lang="less" scoped>
    /deep/.el-dialog {
        width: 885px;
        border-radius: 12px;
    }

    /deep/.el-form {
        float: none;

        .el-input {
            width: 170px;
            font-size: 11px;
        }

        /deep/.el-button {
            font-size: 13px;
            width: 78px;
            line-height: 22px;
            text-align: center;
            font-style: normal;
            border-radius: 3px;
            margin-top: 2px;
        }
    }

    /deep/.el-dialog__header {
        height: 30px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 2px 0px 16px 0px rgba(3, 33, 136, 0.2);
        border-radius: 12px 12px 0px 0px;

    }

    /deep/.el-dialog__body {
        padding: 0 20px;

        /deep/.el-form-item__label {
            font-size: 12px;
            font-family: PingFangSC-Medium;
            font-weight: 500;
            color: rgba(102, 102, 102, 1);
        }

        b {
            font-size: 12px;
            font-family: PingFangSC-Medium;
            font-weight: 500;
            color: rgba(102, 102, 102, 1);
        }
    }

    .staff {
        .company_mes {
            padding: 0 60px;

            /deep/.el-form-item {
                margin-bottom: 10px;
            }
        }
    }

    strong {
        display: block;
        line-height: 30px;
        background: rgba(255, 241, 240, 1);
        border-radius: 2px;
        opacity: 0.5;
        padding-left: 21px;
        font-size: 13px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(255, 163, 158, 1);
        border: 1px solid rgba(255, 163, 158, 1);

        i {
            margin-right: 13px;
        }
    }

    .work_num {
        width: 720px;
        height: 200px;
        margin-left: 67px;
        background: rgba(250, 250, 250, 1);
        border-radius: 6px;
        padding: 21px 40px 0;

        /deep/.el-input {
            width: 200px;
        }

        /deep/.el-checkbox {
            .el-checkbox__label {
                font-size: 13px;
            }
        }

        .pre {
            margin-top: 10px;
        }

        .compile {
            /deep/.el-input {
                width: 120px;
            }
        }

        /deep/.el-checkbox__inner {
            width: 20px;
            height: 20px;
            border-radius: 4px;
            border: 1px solid #999;
        }

        /deep/.el-checkbox__input.is-indeterminate .el-checkbox__inner::before {
            content: '';
            position: absolute;
            display: block;
            background-color: #fff;
            height: 10px;
            width: 10px;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
        }

        /deep/.el-checkbox__inner::after {
            width: 6px;
            height: 12px;
            left: 5px;
        }
    }

    /* 验证 */
    /deep/.el-form-item__error {
        left: 110px;
        top: 28%;
    }
</style>