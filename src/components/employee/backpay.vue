<template>
    <div class="backpay">
        <el-dialog title="补发工资" :visible="backpayVisible" @update:visible="v=>$emit('update:backpayVisible',v)">
            <div class="backpay_con">
                <h3>补发明细</h3>
                <el-table :data="tableData" style="width: 100%"
                    :header-cell-style="{background:'#eef1f6',color:'#606266'}">
                    <el-table-column prop="batch" label="批 次 号" width="140" :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column prop="basic" label="基本薪资" width="91" :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column prop="post" label="岗位薪资" width="91" :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column prop="amount" label="总  计" width="71" :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column prop="whether" label="是否需要计税" width="110" :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column prop="month" label="归属月份" width="91" :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column prop="initiator" label="发起人" width="81" :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column prop="starttime" label="发起时间" :show-overflow-tooltip="true">
                    </el-table-column>
                </el-table>
                <el-table :data="tableData" style="width: 100%"
                    :header-cell-style="{background:'#eef1f6',color:'#606266'}">
                    <el-table-column prop="remark" label="备注" :show-overflow-tooltip="true">
                    </el-table-column>
                </el-table>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        props: ['backpayVisible'],
        data() {
            return {
                tableData: [{
                    batch: '2019061109352701',
                    basic: '300元',
                    post: '800元',
                    amount: '800元',
                    whether: '不需计税',
                    month: '2019-04',
                    initiator: '张三',
                    starttime: '2019-5-21 18:21',
                    remark: '这里显示备注这里显示备注这里显示备注显示',
                    amount: '300'
                }]
            };
        },
        methods: {

        },
    };
</script>


<style scoped lang="less">
    .backpay {
        /deep/.el-dialog {
            width: 880px;
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
            padding: 30px 41px 180px 44px;

            h3 {
                font-size: 14px;
                font-family: PingFangSC-Regular;
                font-weight: 400;
                color: rgba(102, 102, 102, 1);
                margin-bottom: 10px;
            }

            /deep/.el-table {
                border-left: 1px solid rgba(247, 247, 247, 1);
                border-right: 1px solid rgba(247, 247, 247, 1);
            }

            /deep/.el-table th {
                padding: 3px 0;

                .cell {
                    font-size: 14px;
                    font-family: PingFangSC-Semibold;
                    font-weight: 600;
                    color: rgba(102, 102, 102, 1);
                }
            }

            /deep/.el-table td {
                padding: 4px 0;

                .cell {
                    font-size: 14px;
                    font-family: PingFangSC-Regular;
                    font-weight: 400;
                    color: rgba(102, 102, 102, 1);
                }
            }
        }
    }
</style>