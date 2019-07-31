<template>
    <div class="archive">
        <el-dialog title="归档" :visible="archiveVisible" @update:visible="v=>$emit('update:archiveVisible',v)">
            <div class="archive_con">
                <p>
                    <span>月份：<em>2019-04</em></span>
                </p>
                <p>
                    <span style="margin-right: 100px">社保人数：<em>302</em><em>人</em></span>
                    <span>公积金人数：<em>302</em><em>人</em></span>
                </p>
                <p>
                    <span style="margin-right: 100px">公司社保缴费总计：<em>18000000.00</em><em>元</em></span>
                    <span>公司公积金缴费总计：<em>18000000.00</em><em>元</em></span>
                </p>
                <p>
                    <span style="margin-right: 100px">个人社保缴费总计：<em>18000000.00</em><em>元</em></span>
                    <span>个人公积金缴费总计：<em>18000000.00</em><em>元</em></span>
                </p>
            </div>
            <div class="archive_mes">
                <p>是否确认现在归档2019-04月社保公积金？</p>
                <!-- <el-checkbox v-model="checked" @click.native="checkall">同步当前社保公积金数据至本月薪资</el-checkbox>
                <h5 id="sync" style="display: none">提示：同步后，已归档的薪资数据因当前社保公积金数据的更新将发生变化</h5>
                <h5 id="unsync">提示：不同步，当月社保公积金数据将与本月薪资内社保公积金数据不一致</h5> -->
            </div>

            <span slot="footer" class="dialog-footer">
                <el-button @click="archiveFailed">取 消</el-button>
                <el-button type="primary" @click="archiveSuccess">确 定</el-button>
            </span>
        </el-dialog>
    </div>

</template>

<script>
    export default {
        props: ['archiveVisible'],
        data() {
            return {
                checked: false
            };
        },
        methods: {
            checkall() {
                var sync = document.getElementById("sync");
                var unsync = document.getElementById("unsync");
                if (this.checked === false) {
                    sync.style.display = "block";
                    unsync.style.display = "none";
                } else {
                    sync.style.display = "none";
                    unsync.style.display = "block";
                }
            },
            archiveFailed() {
                this.$emit('update:archiveVisible', false);
                this.$message('取消归档');
            },
            archiveSuccess() {
                this.$emit('update:archiveVisible', false);
                this.$message({
                    message: '归档成功',
                    type: 'success'
                });
            }
        }
    };
</script>


<style lang="less" scoped>
    .archive {
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
            padding: 20px;

            .archive_con {
                padding: 10px;
                background: rgba(250, 250, 250, 1);
                margin-bottom: 15px;

                p {
                    margin: 0;
                    margin-bottom: 13px;

                    span {
                        font-size: 13px;
                        font-family: PingFangSC-Semibold;
                        font-weight: 600;
                        color: rgba(51, 51, 51, 1);

                        em {
                            font-size: 13px;
                            font-style: normal;
                            font-family: DINAlternate-Bold;
                            font-weight: bold;
                            color: #2A78F8;
                        }
                    }
                }
            }

            .archive_mes {
                text-align: center;
                margin-top:30px;
                p {
                    font-size: 13px;
                    font-family: PingFangSC-Semibold;
                    font-weight: 600;
                    color: rgba(102, 102, 102, 1);
                    margin-bottom:5px;
                }

                h5 {
                    margin: 5px 0 0 0;
                    font-size: 11px;
                    font-family: PingFangSC-Regular;
                    font-weight: 400;
                    color: #FFA0A0;
                }
            }
        }
    }
</style>