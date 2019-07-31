<template>
    <div class="unarchive">
        <el-dialog title="反归档" :visible="unarchiveVisible" @update:visible="v=>$emit('update:unarchiveVisible',v)">
            <span class="month">薪资月份：<em>2019-04</em></span>
            <div class="unarchive_mes">
                <el-checkbox v-model="checked">是否确认将2019-05月社保公积金进行反归档？</el-checkbox>
                <h5>提示：反归档后可能会对当月已归档的薪资数据有影响</h5>
            </div>

            <span slot="footer" class="dialog-footer">
                <el-button @click="unarchiveFailed">取 消</el-button>
                <el-button type="primary" @click="unarchiveSuccess">反归档，进行社保公积金信息调整</el-button>
            </span>
        </el-dialog>
    </div>

</template>

<script>
    export default {
        props: ['unarchiveVisible'],
        data() {
            return {
                checked: false
            };
        },
        methods: {
            unarchiveFailed() {
                this.$emit('update:unarchiveVisible', false);
                this.$message('取消反归档');
            },
            unarchiveSuccess() {
                this.$emit('update:unarchiveVisible', false);
                this.$message({
                    message: '反归档成功',
                    type: 'success'
                });
            }
        }
    };
</script>


<style lang="less" scoped>
    .unarchive {
        /deep/.el-dialog {
            border-radius: 12px;
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
            padding: 17px 53px;

            .month {
                font-size: 13px;
                font-family: PingFangSC-Semibold;
                font-weight: 600;
                color: rgba(102, 102, 102, 1);

                em {
                    font-style: normal;
                }
            }

            .unarchive_mes {
                padding: 23px 98px 0 90px;
                height: 117px;
                background: rgba(250, 250, 250, 1);
                border-radius: 6px;
                margin-top: 10px;
                text-align: center;

                /deep/.el-checkbox {
                    margin-top: 30px;
                }

                h5 {
                    margin: 10px 0 0 0;
                    font-size: 11px;
                    font-family: PingFangSC-Regular;
                    font-weight: 400;
                    color: #FFA0A0;
                }
            }
        }

        /deep/.dialog-footer {
            span {
                font-size: 12px;
                font-family: PingFangSC-Medium;
                font-weight: 500;
            }
        }
    }
</style>