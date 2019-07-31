<template>
    <el-dialog title="调薪" :visible="salaryVisible" @update:visible="v=>$emit('update:salaryVisible',v)" class="salary">
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

        <el-form ref="salary" :model="salary" class="salary">
            <el-row class="salary_current">
                <el-col :span="12">
                    <el-form-item label="基本薪资：">
                        <span>5000元</span>
                        <b>ㅡ</b>
                        <el-input v-model="salary.current" placeholder="调整后"></el-input>
                        <em class="current unit">元/月</em>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="岗位薪资：">
                        <span>300元</span>
                        <b>ㅡ</b>
                        <el-input v-model="salary.postSalary" placeholder="调整后"></el-input>
                        <em class="current unit">元/月</em>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row class="force">
                <el-col>
                    <el-form-item label="生效时间：">
                        <el-date-picker type="date" placeholder="选择日期" v-model="salary.date">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row class="remark">
                <el-col>
                    <el-form-item label="备注：">
                        <el-input type="textarea" placeholder="请填写(必填)" v-model="salary.desc" required>
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="$emit('update:salaryVisible',false)">取 消</el-button>
            <el-button type="primary" @click="salarySuccess">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
    export default {
        props: ['salaryVisible'],
        data() {
            return {
                salary: {
                    current: '',
                    meal: '',
                    bonus: '',
                    fare: '',
                    season: '',
                    year: '',
                    date: '',
                    desc: ''
                }
            }
        },
        methods: {
            salarySuccess() {
                this.$emit('update:salaryVisible', false);
                console.log("调薪成功");
            }
        }
    }
</script>


<style lang="less" scoped>
    .salary {
        /deep/.el-dialog {
            border-radius: 12px;
        }

        .salary_current {
            border-bottom: 1px solid rgba(216, 216, 216, 1);
            margin-bottom: 20px;
        }

        /deep/.el-form-item {
            margin-bottom: 14px;
        }

        /deep/.el-form-item__content {
            line-height: 0;
        }

        /deep/.el-dialog {
            width: 780px;

            em {
                font-style: normal;
                font-size: 13px;
                font-family: PingFangSC-Regular;
                font-weight: 400;
                color: rgba(153, 153, 153, 1);
            }

            b {
                color: rgba(216, 216, 216, 1);
            }

            span {
                font-size: 13px;
                font-family: PingFangSC-Regular;
                font-weight: 400;
                color: rgba(102, 102, 102, 1);
            }
        }

        /deep/.el-form-item__label {
            padding: 0;
            font-size: 13px;
            font-family: PingFangSC-Semibold;
            font-weight: 600;
            color: rgba(102, 102, 102, 1);
        }

        .el-input {
            width: 120px;
        }

        .force {
            .el-input {
                width: 211px;
            }
        }

        .remark {
            .el-textarea {
                width: 0;
            }

            /deep/.el-form-item__label {
                padding-right: 25px;
            }

            /deep/.el-textarea__inner {
                width: 545px;
                height: 80px;
                border-radius: 3px;
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
            padding: 30px 39px 10px;
        }

        /deep/.el-form {
            float: none;
            padding: 20px 10px 0 20px;
        }

        form {
            background: rgba(250, 250, 250, 1);
            border-radius: 6px;
        }
    }
</style>