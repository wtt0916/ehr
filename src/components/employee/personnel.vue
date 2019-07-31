<template>
    <el-dialog title="人事异动" :visible="personnelVisible" @update:visible="v=>$emit('update:personnelVisible',v)"
        class="personnelChange">
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
        <div class="personnel">
            <el-form ref="select" :model="select" label-width="81px" class="select">
                <el-row style="width:290px">
                    <el-col>
                        <el-form-item label="异动类型：">
                            <!-- <el-select v-model="select.region" placeholder="请选择" @click.native="changeContent">
                                <el-option label="调岗" value="0"></el-option>
                                <el-option label="停薪留职" value="1"></el-option>
                                <el-option label="离职" value="2"></el-option>
                            </el-select> -->
                            <el-select :default-active="$route.path" @change="changeContent"
                                v-model="select.searchValue" filterable placeholder="请选择" class="select">
                                <el-option v-for="item in options" :key="item.value" :label="item.label"
                                    v-model="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <el-form ref="transfer" :model="transfer" class="transfer" id="transfer">
                <div class="input_select">
                    <el-row class="original">
                        <el-col :span="12">
                            <el-form-item label="原部门：">
                                <span>产品技术部</span>
                                <b>ㅡ</b>
                                <el-select v-model="transfer.department" placeholder="调整为">
                                    <el-option label="调岗" value="1"></el-option>
                                    <el-option label="停薪留职" value="2"></el-option>
                                    <el-option label="离职" value="3"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="原岗位：">
                                <span>前端开发工程师</span>
                                <b>ㅡ</b>
                                <el-input v-model="transfer.original" placeholder="请填写"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>
                            <el-form-item label="生效时间：" style="margin-right:14px;">
                                <el-date-picker v-model="transfer.date" type="date" placeholder="选择日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col class="remark">
                            <el-form-item label="备注：">
                                <el-input type="textarea" placeholder="请填写(必填)" v-model="transfer.desc" required>
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
            </el-form>

            <el-form ref="payment" :model="payment" class="payment" id="payment" label-width="81px"
                style="display: none">
                <div class="input_select">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="申请日期：">
                                <el-date-picker type="date" placeholder="选择日期" v-model="payment.date">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="最后工作日：">
                                <el-date-picker type="date" placeholder="选择日期" v-model="payment.work">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="最后计薪日：">
                                <el-date-picker type="date" placeholder="选择日期" v-model="payment.lastDay">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="复职日期：">
                                <el-date-picker type="date" placeholder="选择日期" v-model="payment.resume">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>


                    <el-row>
                        <el-col>
                            <el-form-item label="备注：">
                                <el-input type="textarea" placeholder="请填写(必填)" v-model="payment.desc"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
            </el-form>

            <el-form ref="dimission" :model="dimission" class="dimission" id="dimission" style="display: none">
                <div class="input_select">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="离职类型：">
                                <el-radio-group v-model="dimission.radio">
                                    <el-radio label="主动"></el-radio>
                                    <el-radio label="被动"></el-radio>
                                    <el-radio label="其他"></el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="申请日期：">
                                <el-date-picker type="date" placeholder="选择日期" v-model="dimission.date">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="离职日期：">
                                <el-date-picker type="date" placeholder="选择日期" v-model="dimission.termDate">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="最后工作日：">
                                <el-date-picker type="date" placeholder="选择日期" v-model="dimission.lastwork">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="最后计薪日：">
                                <el-date-picker type="date" placeholder="选择日期" v-model="dimission.finalpay">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>
                            <el-form-item label="备注：">
                                <el-input type="textarea" placeholder="请填写(必填)" v-model="transfer.desc"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
            </el-form>
        </div>

        <div slot="footer" class="dialog-footer">
            <el-button @click="$emit('update:personnelVisible',false)">取 消</el-button>
            <el-button type="primary" @click="personnelSuccess">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
    export default {
        props: ['personnelVisible'],
        data() {
            return {
                options: [{
                    value: '0',
                    label: '调岗'
                }, {
                    value: '1',
                    label: '停薪留职'
                }, {
                    value: '2',
                    label: '离职'
                }],
                optionsSec: [{
                    value: '0',
                    label: '继续缴纳'
                }, {
                    value: '1',
                    label: '停缴'
                }],


                select: {
                    searchValue: '',
                },
                payment: {
                    region: '',
                    date: '',
                    work: '',
                    lastDay: '',
                    resume: '',
                    desc: '',
                    checked: false

                },
                transfer: {
                    department: '',
                    original: '',
                    desc: '',
                    date: ''
                },
                dimission: {
                    date: '',
                    termDate: '',
                    lastwork: '',
                    finalpay: '',
                    radio: '',
                    desc: ''
                },
                stoppay: {
                    social: '',
                    fund: ''
                }

            }
        },
        methods: {
            personnelSuccess() {
                this.$emit('update:personnelVisible', false);
                console.log("异动成功");
            },

            changeContent() {
                console.log(111, this.select.searchValue);
                var transfer = document.getElementById("transfer");
                var payment = document.getElementById("payment");
                var dimission = document.getElementById("dimission");
                // var security = document.getElementById("security");
                var stoppay = document.getElementById("stoppay");
                if (this.select.searchValue === this.options[0].value) {
                    console.log('000');
                    transfer.style.display = "block";
                    payment.style.display = "none";
                    dimission.style.display = "none";

                }
                if (this.select.searchValue === this.options[1].value) {
                    console.log(222);
                    transfer.style.display = "none";
                    payment.style.display = "block";
                    dimission.style.display = "none";

                }
                if (this.select.searchValue === this.options[2].value) {
                    console.log(333);
                    transfer.style.display = "none";
                    payment.style.display = "none";
                    dimission.style.display = "block";

                }
            },
            changeSecurity() {
                console.log(999, this.select.security);
                var security = document.getElementById("security");
                var stoppay = document.getElementById("stoppay");
                if (this.select.security === this.optionsSec[0].value) {
                    security.style.display = "block";
                    stoppay.style.display = "none";

                }
                if (this.select.security === this.optionsSec[1].value) {
                    security.style.display = "none";
                    stoppay.style.display = "block";

                }
            }
        },
        created() {
            this.select.searchValue = this.options[0].value;
            // this.select.security = this.optionsSec[0].value;

        }
    }
</script>


<style lang="less" scoped>
    /deep/.el-dialog {
        border-radius: 12px;
    }

    /deep/.el-radio__label {
        color: rgba(0, 0, 0, 0.65);
        font-size: 14px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        background: none;
    }

    .personnelChange {
        .personnel {
            padding: 20px 44px 0 39px;
            background: rgba(250, 250, 250, 1);
            border-radius: 6px;
        }

        .select {
            /deep/.el-select {
                width: 220px;
            }
        }

        .payment {
            .el-select {
                width: 220px;
            }

            /deep/.el-textarea__inner {
                width: 530px;
                height: 80px;
            }

            .check {
                line-height: 35px;

                .el-form-item {
                    margin-bottom: 15px;
                }
            }
        }

        .security {
            span {
                font-size: 13px;
                font-family: PingFangSC-Semibold;
                font-weight: 600;
                color: rgba(102, 102, 102, 1);

                em {
                    font-style: normal;
                    font-size: 14px;
                    font-family: PingFangSC-Regular;
                    font-weight: 400;
                    color: rgba(102, 102, 102, 1);
                }
            }

            .unit {
                font-style: normal;
                font-size: 14px;
                font-family: PingFangSC-Regular;
                font-weight: 400;
                color: rgba(153, 153, 153, 1);
            }

            .el-row {
                line-height: 45px;
            }

            .scheme {
                /deep/.el-form-item__label {
                    padding-left: 10px;
                }
            }

            .el-input {
                width: 179px;
            }

            .fundlabel {
                /deep/.el-form-item__label {
                    padding-right: 25px;
                }
            }
        }

        .stoppay {
            /deep/.el-input {
                width: 214px;
            }
        }

        .transfer {
            .el-select {
                width: 150px;
            }

            .original {
                border-bottom: 1px solid rgba(216, 216, 216, 1);
                margin-bottom: 20px;
            }

            b {
                color: rgba(216, 216, 216, 1);
            }

            span {
                font-size: 13px;
                font-family: PingFangSC-Semibold;
                font-weight: 600;
                color: rgba(102, 102, 102, 1);
            }

            /deep/.el-input {
                width: 143px;
            }

            /deep/.el-textarea__inner {
                height: 80px;
            }

            .el-form-item__label {
                margin-right: 13px;
            }

            .remark {
                /deep/.el-form-item__label {
                    margin-right: 39px;
                }

                .el-textarea {
                    width: 540px;
                    height: 80px;
                    border-radius: 3px;
                }
            }
        }

        .dimission {
            .el-date-editor {
                width: 190px;
            }

            /deep/.el-textarea {
                width: 0;
            }

            /deep/.el-form-item__label {
                width: 91px;
            }

            /deep/.el-textarea__inner {
                width: 500px;
                height: 80px;
                border-radius: 3px;
            }
        }

        /deep/.el-dialog__header {
            height: 30px;
            box-shadow: 2px 0px 16px 0px rgba(3, 33, 136, 0.2);
        }

        /deep/.el-dialog__title {
            font-size: 16px;
            font-family: PingFangSC-Medium;
            font-weight: 500;
            color: rgba(102, 102, 102, 1);
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
            padding: 7px 39px;
        }

        /deep/.el-dialog {
            width: 780px;
        }

        /deep/.el-form {
            float: none;
        }

        /deep/ .el-form-item__label {
            font-size: 13px;
            font-family: PingFangSC-Semibold;
            font-weight: 600;
            color: rgba(102, 102, 102, 1);
            text-align: left;
            padding-right: 0;
        }


        /deep/.el-radio {
            position: inherit;
            top: 0;
            margin-right: 13px;

            .el-radio__input {
                visibility: inherit;
                margin-right: 5px;
            }
        }
    }
</style>