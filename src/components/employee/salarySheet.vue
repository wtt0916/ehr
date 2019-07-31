<template>
    <el-dialog title="发送工资条" :visible="sheetVisible" @update:visible="v=>$emit('update:sheetVisible',v)" class="person">
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
        <div class="block">
            工资条月份：
            <el-date-picker v-model="year" type="month" placeholder="选择月份" style="width:150px;">
            </el-date-picker>
            <p>工资条将发送至员工邮箱，是否现在发送工资条？</p>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button @click="sheetdefeated">取 消</el-button>
            <el-button type="primary" @click="sheetSuccess">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
    export default {
        props: ['sheetVisible'],
        data() {
            return {
                show: false,
                year: '',
                month: ''
            }
        },
        methods: {
            sheetdefeated() {
                this.$emit('update:sheetVisible', false);
                this.$message('取消发送');
            },
            sheetSuccess() {
                this.$emit('update:sheetVisible', false);
                console.log("发送工资条成功");
                this.$message({
                    message: '发送工资条成功',
                    type: 'success'
                });
            }
        }
    }
</script>


<style lang="less" scoped>
    .person {
        /deep/.el-dialog {
            border-radius: 12px;
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
            padding: 30px 50px;
        }

        .block {
            padding-top: 30px;
            text-align: center;

            p {
                margin-top: 50px;
                margin-left: -20px;
            }
            /deep/.el-input__icon{
                margin-left:6px;
            }
        }
    }
</style>