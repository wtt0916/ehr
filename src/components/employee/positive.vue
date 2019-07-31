<template>
    <el-dialog title="转正" :visible="positiveVisible" @update:visible="v=>$emit('update:positiveVisible',v)"
        class="positive">
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
            <el-row class="contract">
                <el-col :span="11">
                    <span>约定转正日期： <em>2019-07-21</em></span>
                </el-col>
                <el-col :span="13">
                    <el-form-item label="实际转正日期：" required>
                        <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <div class="salary_mes">
                <span>薪资信息</span>

                <el-row class="fund">
                    <el-col>
                        <el-form-item label="薪资方案：">
                            <el-select v-model="ruleForm.scheme" placeholder="请选择">
                                <el-option label="方案一" value="1"></el-option>
                                <el-option label="方案二" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="salary">
                    <el-col :span="13">
                        <el-form-item label="基本薪资：" required>
                            <el-input v-model="ruleForm.salary" placeholder="请输入"></el-input>
                            <em class="current unit allowance">元/月</em>
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

            </div>

            <!-- <el-row class="fund">
                <el-col :span="11">
                    <span>试用期社保公积金方案： <em>方案一</em></span>
                </el-col>
                <el-col :span="13">
                    <el-form-item label="转正后社保公积金方案：" required>
                        <el-select v-model="ruleForm.scheme" placeholder="请选择">
                            <el-option label="方案一" value="1"></el-option>
                            <el-option label="方案二" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row> -->
            <!-- <el-row class="social ">
                <el-col :span="11">
                    <span>试用期社保缴纳基数： <em>500元</em></span>
                </el-col>
                <el-col :span="13">
                    <el-form-item label="转正后社保缴纳基数：" required>
                        <el-input v-model="ruleForm.social" placeholder="请输入"></el-input>
                        <em class="unit current">元/月</em>
                    </el-form-item>
                </el-col>
            </el-row> -->
            <!-- <el-row class="basic">
                <el-col :span="11">
                    <span>试用期公积金缴纳基数：<em>500元</em></span>
                </el-col>
                <el-col :span="13" class="current">
                    <el-form-item label="转正后公积金缴纳基数：" required>
                        <el-input v-model="ruleForm.tryfund" placeholder="请输入"></el-input>
                        <em class="unit current">元/月</em>
                    </el-form-item>
                </el-col>
            </el-row> -->
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="$emit('update:positiveVisible',false)">取 消</el-button>
            <el-button type="primary" @click="renewedSuccess">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
    export default {
        props: ['positiveVisible'],
        data() {
            return {
                ruleForm: {
                    date: '',
                    salary: '',
                    scheme: '',
                    social: '',
                    tryfund: ''
                },
                rules: {
                    name: [
                        { required: true, message: '请输入', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    region: [
                        { required: true, message: '请选择', trigger: 'change' }
                    ],
                    date1: [
                        { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                    ],
                    date2: [
                        { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
                    ]
                }
            }
        },
        methods: {
            renewedSuccess() {
                this.$emit('update:renewVisible', false);
                console.log("续签成功");
            }
        }

    }
</script>

<style lang="less" scoped>
    .positive {
        /deep/.el-dialog {
            border-radius: 12px;
        }

        /deep/.el-form-item {
            margin-bottom: 10px;
        }

        .el-row {
            line-height: 47px;
        }

        /deep/.el-form-item__label {
            padding: 0;
        }

        .contract {
            border-bottom: 1px solid rgba(216, 216, 216, 1);
            margin-bottom: 10px;

            /deep/.el-form-item__label {
                padding-right: 14px;
            }

            /deep/.el-input {
                width: 195px;
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
                margin-top:10px;
                /deep/.el-form-item__label {
                    padding-left: 10px;
                }

                /deep/.el-select {
                    width: 197px;
                }
            }
        }


        /deep/.el-dialog {
            width: 720px;

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
            padding: 30px 30px 10px;
        }

        /deep/.el-form {
            float: none;
            padding: 20px 53px 13px 20px;
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