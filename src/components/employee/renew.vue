<template>
    <el-dialog title="续签" :visible="renewVisible" @update:visible="v=>$emit('update:renewVisible',v)" class="renew">
        <div class="dh_top" style="margin-bottom: 30px;">
            <dl class="dh_top_l">
                <dt>1</dt>
                <dd>
                    <div class="dh_top_l_mess" style="line-height:36px;">
                        <strong>商丘</strong>
                        <span>010101</span>
                    </div>
                    <p>北京佶象信息技术有限公司-产品研发部-设计部-UI设计</p>
                </dd>
            </dl>
        </div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
            <el-row class="type">
                <el-col :span="12">
                    <el-form-item label="合同编号" style="margin-left:10px;">
                        <el-input v-model="ruleForm.name" placeholder="请输入"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row class="endStart">
                <el-col :span="12">
                    <el-form-item label="合同公司" prop="contract" required>
                        <el-select v-model="ruleForm.contract" placeholder="请选择">
                            <el-option label="方案一" value="1"></el-option>
                            <el-option label="方案二" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="合同生效日：" prop="effective" required>
                        <el-date-picker type="datetime" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"
                            placeholder="选择日期" v-model="ruleForm.effective">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row class="basic">
                <el-col :span="12" class="sign">
                    <el-form-item label="合同签订日：" prop="date" required>
                        <el-date-picker type="datetime" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"
                            placeholder="选择日期" v-model="ruleForm.date">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="12" class="current">
                    <el-form-item label="合同结束日：" prop="endDate" required>
                        <el-date-picker type="datetime" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"
                            placeholder="选择日期" v-model="ruleForm.endDate">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <div class="salary_mes">
                <span>薪资信息</span>

                <el-row class="fund">
                    <el-col :span="13">
                        <el-form-item label="薪资方案：">
                            <el-select v-model="ruleForm.scheme" placeholder="请选择">
                                <el-option label="方案一" value="1"></el-option>
                                <el-option label="方案二" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" class="allowance">
                        <strong>交通补贴：</strong>
                        <b>200元/月</b>
                    </el-col>
                    <el-col :span="5" class="allowance">
                        <strong>餐补：</strong>
                        <b>200元/月</b>
                    </el-col>
                </el-row>
                <el-row class="salary">
                    <el-col>
                        <el-form-item label="基本薪资：" prop="salary" required>
                            <el-input v-model="ruleForm.salary" placeholder="请输入"></el-input>
                            <em class="current unit allowance">元/月</em>
                        </el-form-item>
                    </el-col>

                </el-row>

            </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="$emit('update:renewVisible',false)">取 消</el-button>
            <el-button type="primary" @click="renewedSuccess('ruleForm')">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
    export default {
        props: ['renewVisible'],
        data() {
            return {
                props:["empId"],
                renew: this.renewVisible,
                ruleForm: {
                    name: '',
                    contract: '',
                    effective: '',
                    date: '',
                    endDate: '',
                    scheme: '',
                    salary: ''
                    // delivery: false,
                },
                rules: {
                    contract: [
                        { required: true, message: '请选择合同公司', trigger: 'change' }
                    ],
                    effective: [
                        { required: true, message: '请选择生效日期', trigger: 'change' }
                    ],
                    date: [
                        {required: true, message: '请选择合同签订日', trigger: 'change' }
                    ],
                    endDate: [
                        {required: true, message: '请选择合同签订日', trigger: 'change' }
                    ],
                    salary: [
                        {required: true, message: '请填写基本薪资', trigger: 'change' }
                    ]
                }
            }
        },
        methods: {
            renewedSuccess(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$emit('update:renewVisible', false);
                        console.log("续签成功");
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });

            },
            //获取续签接口
            // /api/emplist/getRenewal
            getRenewal(){
                var id = Number(this.$route.query.id);
                this.$http.get('/emplist/getRenewal',{
                    params:{
                        id,
                        companyId:1,
                        empId:this.empId

                    }
                }).then(data =>{
                    console.log(1111111111111,data);
                })
            }
        },

        mounted(){
            this.getRenewal();
        }

    }
</script>

<style lang="less" scoped>
    .renew {
        /deep/.el-form-item__error{
            margin-left:100px;
        }
        /deep/.el-dialog {
            width: 780px;
            border-radius: 12px;

            em {
                font-style: normal;
            }
        }

        .unit {
            font-size: 13px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
        }

        .type {
            .el-input {
                width: 192px;
            }

            /deep/.el-form-item__label {
                margin-right: 20px;
            }
        }

        .endStart {
            /deep/.el-select {
                width: 192px;
                margin-left: 20px;
            }

            .el-date-editor {
                width: 192px;
            }
        }

        .basic {
            border-bottom: 1px solid rgba(216, 216, 216, 1);

            /deep/.el-date-editor {
                width: 192px;
            }

            .sign {
                /deep/.el-form-item__label {
                    padding-right: 3px;
                }
            }
        }

        .salary_mes {
            margin-top: 20px;

            span {
                font-size: 14px;
                font-family: PingFangSC-Regular;
                font-weight: 400;
                color: rgba(38, 127, 246, 1);
            }

            .salary {
                margin-left: -21px;

                /deep/.el-input {
                    width: 165px;
                }

                /deep/.el-form-item__label {
                    padding-left: 10px;
                }

                .allowance {
                    line-height: 38px;
                    font-size: 13px;
                    font-family: PingFangSC-Semibold;
                    font-weight: 600;
                    color: rgba(102, 102, 102, 1);
                }

            }

            .fund {
                margin-left: -9px;
                margin-top: 13px;

                /deep/.el-form-item__label {
                    padding-left: 10px;
                }

                /deep/.el-select {
                    width: 197px;
                }

                .allowance {
                    line-height: 38px;
                    font-size: 13px;
                    font-family: PingFangSC-Semibold;
                    font-weight: 600;
                    color: rgba(102, 102, 102, 1);
                }
            }

        }

        /deep/.el-dialog__header {
            height: 30px;
            background: rgba(255, 255, 255, 1);
            box-shadow: 2px 0px 16px 0px rgba(3, 33, 136, 0.2);
            border-radius: 12px 12px 0px 0px;

        }

        /deep/.el-dialog__title {
            font-size: 16px;
            font-family: PingFangSC-Medium;
            font-weight: 500;
            color: rgba(102, 102, 102, 1);
        }

        .dh_top {
            padding-left: 57px;
        }

        .dh_top_l dt {
            width: 46px;
            height: 50px;
            border: 1px dashed rgb(49, 13, 13);
            margin-right: 21px;
            float: left;
        }

        .dh_top_l_mess strong {
            height: 35px;
            font-size: 24px;
            display: inline-block;
            font-family: PingFangSC-Semibold;
            font-weight: 600;
            color: rgba(51, 51, 51, 1);
            line-height: 33px;
            margin-bottom: 1px;
        }

        .dh_top_l_mess span {
            display: inline-block;
        }

        .dh_top_l p {
            height: 35px;
            font-size: 13px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: rgba(102, 102, 102, 1);
            height: 35px;
            float: left;
            padding: 0;
            margin: 0;
        }

        /deep/.el-dialog__body {
            padding: 30px 39px 13px;
        }

        /deep/.el-form {
            float: none;
            padding: 20px 15px 0 20px;
            font-size: 13px;
            font-family: PingFangSC-Semibold;
            font-weight: 600;
            color: rgba(102, 102, 102, 1);
        }

        form {
            background: rgba(250, 250, 250, 1);
            border-radius: 6px;
        }
    }
</style>