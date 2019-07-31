<template>
    <div class="detailsView">
        <el-dialog title="查看明细" :visible="viewVisble" @update:visible="v=>$emit('update:viewVisble',v)">
            <div class="dh_top" style="margin-bottom: 12px;">
                <dl class="dh_top_l">
                    <dt>1</dt>
                    <dd>
                        <div class="dh_top_l_mess" style="line-height:36px;">
                            <strong>商丘</strong>
                            <span>010101</span>
                        </div>
                        <p><span>北京佶象信息技术有限公司</span>-<span>产品研发部</span>-<span>设计部</span>-<span>UI设计</span></p>
                    </dd>
                </dl>
            </div>
            <div class="details_con">
                <ul class="con_list">
                    <li class="list_first">补缴月份：<span>2019 - 05</span></li>
                    <li class="list_second">
                        <span id="payment" @click="payment">缴纳</span>
                        <span id="payfees" @click="payfees">补缴</span>
                    </li>
                    <div id="month" style="display: none">
                        <li>补缴月份：<span>1个月</span></li>
                        <li>补缴方案：<span>方案一</span></li>
                        <li>个人滞纳金总额：<span>500</span><span>元</span></li>
                        <li>公司滞纳金总额：<span>500</span><span>元</span></li>
                    </div>
                </ul>
            </div>

            <div class="details_table">
                <div class="table_first" id="table_first">
                    <el-table :data="tableData" :span-method="objectSpanMethod" style="width: 100%; margin-top: 20px"
                        height="248">
                        <el-table-column prop="package" label="缴纳方案" width="100">
                        </el-table-column>
                        <el-table-column prop="item" label="缴纳项" width="90">
                        </el-table-column>
                        <el-table-column prop="base" label="缴纳基数" width="90">
                        </el-table-column>
                        <el-table-column prop="personRatio" label="个人缴纳比例" width="120">
                        </el-table-column>
                        <el-table-column prop="companyRatio" label="公司缴纳比例">
                        </el-table-column>
                        <el-table-column prop="personAmount" label="个人缴纳金额">
                        </el-table-column>
                        <el-table-column prop="companyAmount" label="公司缴纳金额">
                        </el-table-column>
                    </el-table>
                </div>

                <div class="table_second" id="table_second" style="display: none">
                    <el-table :data="tableData1" :span-method="objectSpanMethod" style="width: 100%; margin-top: 20px"
                        height="248">
                        <el-table-column prop="package" label="缴纳方案" width="100">
                        </el-table-column>
                        <el-table-column prop="item" label="缴纳项" width="90">
                        </el-table-column>
                        <el-table-column prop="base" label="缴纳基数" width="90">
                        </el-table-column>
                        <el-table-column prop="personRatio" label="个人缴纳比例" width="120">
                        </el-table-column>
                        <el-table-column prop="companyRatio" label="公司缴纳比例">
                        </el-table-column>
                        <el-table-column prop="personAmount" label="个人缴纳金额">
                        </el-table-column>
                        <el-table-column prop="companyAmount" label="公司缴纳金额">
                        </el-table-column>
                    </el-table>
                </div>

            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="viewFailed">取 消</el-button>
                <el-button type="primary" @click="viewSuccess">确 定</el-button>
            </div>
        </el-dialog>
    </div>

</template>

<script>
    export default {
        props: ['viewVisble'],
        data() {
            return {
                activeName: 'first',
                tableData: [{
                    package: '方案一',
                    item: '养老保险',
                    base: 5000,
                    personRatio: '20%',
                    companyRatio: '20%',
                    personAmount: '1000元',
                    companyAmount: '1000元'
                }, {
                    package: '方案一',
                    item: '医疗保险',
                    base: 5000,
                    personRatio: '20%',
                    companyRatio: '20%',
                    personAmount: '1000元',
                    companyAmount: '1000元'
                }, {
                    package: '方案一',
                    item: '失业保险',
                    base: 5000,
                    personRatio: '20%',
                    companyRatio: '20%',
                    personAmount: '1000元',
                    companyAmount: '1000元'
                }, {
                    package: '方案一',
                    item: '生育保险',
                    base: 5000,
                    personRatio: '20%',
                    companyRatio: '20%',
                    personAmount: '1000元',
                    companyAmount: '1000元'
                }, {
                    package: '方案一',
                    item: '工伤保险',
                    base: 5000,
                    personRatio: '20%',
                    companyRatio: '20%',
                    personAmount: '1000元',
                    companyAmount: '1000元'
                }],

                tableData1: [{
                    package: '方案二',
                    item: '养老保险',
                    base: 5000,
                    personRatio: '20%',
                    companyRatio: '20%',
                    personAmount: '1000元',
                    companyAmount: '1000元'
                }, {
                    package: '方案一',
                    item: '医疗保险',
                    base: 5000,
                    personRatio: '20%',
                    companyRatio: '20%',
                    personAmount: '1000元',
                    companyAmount: '1000元'
                }, {
                    package: '方案一',
                    item: '失业保险',
                    base: 5000,
                    personRatio: '20%',
                    companyRatio: '20%',
                    personAmount: '1000元',
                    companyAmount: '1000元'
                }, {
                    package: '方案一',
                    item: '生育保险',
                    base: 5000,
                    personRatio: '20%',
                    companyRatio: '20%',
                    personAmount: '1000元',
                    companyAmount: '1000元'
                }, {
                    package: '方案一',
                    item: '工伤保险',
                    base: 5000,
                    personRatio: '20%',
                    companyRatio: '20%',
                    personAmount: '1000元',
                    companyAmount: '1000元'
                }],

            }
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            },

            // 缴纳及补缴方案
            payment() {
                var payment = document.getElementById("payment");
                var payfees = document.getElementById("payfees");
                var month = document.getElementById("month");
                var table_first = document.getElementById("table_first");
                var table_second = document.getElementById("table_second");
                payment.style.color = '#267FF6';
                payment.style.borderColor = '#267FF6';
                payfees.style.color = '';
                payfees.style.borderColor = '';
                table_first.style.display = "block";
                table_second.style.display = "none";
                month.style.display = "none";
            },
            payfees() {
                var payment = document.getElementById("payment");
                var payfees = document.getElementById("payfees");
                var month = document.getElementById("month");
                var table_first = document.getElementById("table_first");
                var table_second = document.getElementById("table_second");
                payfees.style.color = '#267FF6';
                payfees.style.borderColor = '#267FF6';
                payment.style.color = 'rgba(102, 102, 102, 1)';
                payment.style.borderColor = 'rgba(221, 221, 221, 1)';
                table_first.style.display = "none";
                table_second.style.display = "block";
                month.style.display = "block";
            },

            viewFailed() {
                this.$emit('update:viewVisble', false);
                this.$message('取消删除方案');
            },
            viewSuccess() {
                this.$emit('update:viewVisble', false);
                this.$message({
                    message: '删除方案成功',
                    type: 'success'
                });
            },

            objectSpanMethod({ row, column, rowIndex, columnIndex }) {
                if (columnIndex === 0) {
                    if (rowIndex % 5 === 0) {
                        return {
                            rowspan: 5,
                            colspan: 1
                        };
                    } else {
                        return {
                            rowspan: 0,
                            colspan: 0
                        };
                    }
                }
            }
        }
    }
</script>

<style scoped lang="less">
    .detailsView {
        /deep/.el-dialog {
            width: 850px;
            border-radius: 12px;
        }

        /deep/.el-dialog__header {
            padding: 14px 0 14px 45px;
            height: 22px;
            background: rgba(255, 255, 255, 1);
            box-shadow: 2px 0px 16px 0px rgba(3, 33, 136, 0.2);
            border-radius: 12px 12px 0px 0px;

            .el-dialog__title {
                font-size: 16px;
                font-family: PingFangSC-Medium;
                font-weight: 500;
                color: rgba(102, 102, 102, 1);
            }
        }

        /deep/.el-dialog__body {
            padding: 0 40px 0 45px;
            overflow: hidden;

            .dh_top {
                padding-left: 57px;
                height: 74px;
                margin-top: 20px;
                border-bottom: 1px solid rgba(221, 221, 221, 1);
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


            .details_con {
                height: 20px;
                margin-bottom: 2px;

                .con_list {
                    padding: 0;
                    margin: 0;
                    line-height: 24px;

                    #payment {
                        border: 1px solid #267FF6;
                        color: #267FF6;
                    }

                    li {
                        float: left;
                        font-size: 13px;
                        font-family: PingFangSC-Regular;
                        font-weight: 400;
                        color: rgba(102, 102, 102, 1);
                        margin-right: 6px;

                        span {
                            color: #2A78F8;
                        }
                    }

                    .list_first {
                        line-height: 24px;
                        padding-right: 10px;
                        border-right: 1px solid rgba(221, 221, 221, 1);
                        font-size: 13px;
                        font-family: PingFangSC-Semibold;
                        font-weight: 600;
                        color: rgba(51, 51, 51, 1);
                        margin-right: 10px;

                        span {
                            color: #2A78F8;
                        }
                    }

                    .list_second {
                        margin-right: 30px;

                        span {
                            display: inline-block;
                            width: 40px;
                            line-height: 24px;
                            border-radius: 1px;
                            border: 1px solid rgba(221, 221, 221, 1);
                            font-size: 13px;
                            font-family: PingFangSC-Regular;
                            font-weight: 400;
                            color: rgba(102, 102, 102, 1);
                            text-align: center;
                            margin-right: -4px;
                            cursor: default;
                        }
                    }
                }
            }


            .details_table {
                /deep/.el-table td {
                    padding: 8px 0;
                }
            }

        }
    }
</style>