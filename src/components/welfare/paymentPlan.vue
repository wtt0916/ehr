<template>
    <div class="paymentPlan">
        <el-dialog title="调整缴纳方案" :visible="planVisible" @update:visible="v=>$emit('update:planVisible',v)">
            <div class="add_con">
                <form class="con_left">
                    <el-row>
                        <el-col :span="5">
                            <el-select v-model="department" placeholder="全部部门">
                                <el-option v-for="item in options" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="6" class="search">
                            <el-input placeholder="姓名/工号" v-model="message">
                            </el-input>
                            <el-button type="primary" icon="el-icon-search"></el-button>
                        </el-col>
                        <el-col :span="7" id="checkbox">
                            <el-select v-model="vals" multiple placeholder="请选择">
                                <el-option v-for="item in options" :key="item.value" :label="item.label"
                                    :value="item.value" type="checkbox">
                                </el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="5">
                            <el-button type="primary">搜索</el-button>
                            <el-button>重置</el-button>
                        </el-col>
                    </el-row>
                </form>
                <div class="con_right">
                    <p class="right_top">
                        <span>已选择<em>3</em>人</span>
                        <span @click="batch" style="cursor: pointer; float: right"><i
                                class="iconfont icon-piliangtianjia"></i>批量操作</span>
                    </p>
                    <el-table :data="tableData" height="230">
                        <el-table-column type="selection" width="55">
                        </el-table-column>
                        <el-table-column fixed prop="name" label="姓名" width="91" :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column prop="section" label="部门" width="120" :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column prop="household" label="户口类型" width="120" :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column prop="package" label="缴纳方案" width="100" :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column prop="socialBase" label="社保基数" width="130" :show-overflow-tooltip="true">
                            <template slot-scope="{row,$index}">
                                <div @click="{{changeSocial($index)}}">
                                    <el-input v-if="ediSocial[$index]" v-model='row.socialBase'></el-input>
                                    <span v-else>{{row.socialBase}}</span>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="fundBase" label="公积金基数" width="120" :show-overflow-tooltip="true">
                            <template slot-scope="{row,$index}">
                                <div @click="{{changeFund($index)}}">
                                    <el-input v-if="ediFund[$index]" v-model='row.fundBase'></el-input>
                                    <span v-else>{{row.fundBase}}</span>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <div class="add_fot" id="addBatch" style="display: none">
                <ul>
                    <li>已选择<span>3</span>人</li>
                    <li>
                        <el-form ref="form" :model="form">
                            <el-form-item label="调整薪资方案为">
                                <el-select v-model="form.region" placeholder="请选择">
                                    <el-option label="区域一" value="1"></el-option>
                                    <el-option label="区域二" value="2"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-form>
                    </li>
                    <li>
                        <el-button plain id="submit" @click="submit">提交</el-button>
                        <el-button plain id="cancel" @click="cancel">取消</el-button>
                    </li>
                </ul>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="planFailed">取 消</el-button>
                <el-button type="primary" @click="planSuccess">确 定</el-button>
            </span>
        </el-dialog>
    </div>

</template>

<script>
    export default {
        props: ['planVisible'],
        data() {
            return {
                ediSocial: [],
                ediFund: [],
                form: {
                    region: ''
                },
                message: '',
                vals: '',

                options: [{
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }, {
                    value: '选项3',
                    label: '蚵仔煎'
                }, {
                    value: '选项4',
                    label: '双皮奶'
                }, {
                    value: '选项5',
                    label: '蚵仔煎'
                }],
                department: '',

                tableData: [{
                    name: '王小虎',
                    section: '销售一部',
                    household: '城镇',
                    package: '一个月',
                    socialBase: 400,
                    fundBase: 1200
                }, {
                    name: '王小虎',
                    section: '销售一部',
                    household: '城镇',
                    package: '一个月',
                    socialBase: 400,
                    fundBase: 1200
                }, {
                    name: '王小虎',
                    section: '销售一部',
                    household: '城镇',
                    package: '一个月',
                    socialBase: 400,
                    fundBase: 1200
                }]
            };
        },

        methods: {
            planSuccess() {
                this.$emit('update:planVisible', false);
                this.$message({
                    message: '增员成功',
                    type: 'success'
                });
            },
            planFailed() {
                this.$emit('update:planVisible', false);
                this.$message('取消增员');
            },
            changeSocial(row) {
                this.ediSocial[row] = true;
                this.$set(this.ediSocial, row, true)
            },

            changeFund(row) {
                this.ediFund[row] = true;
                this.$set(this.ediFund, row, true)
            },


            // 批量操作
            batch() {
                console.log(111);
                var batch = document.getElementById("addBatch");
                batch.style.display = "block";
            },
            submit() {
                var batch = document.getElementById("addBatch");
                batch.style.display = "none";
                this.$message({
                    message: '提交成功',
                    type: 'success'
                });

            },
            cancel() {
                var batch = document.getElementById("addBatch");
                batch.style.display = "none";
                this.$message('取消批量操作');
            },

        }
    };
</script>


<style scoped lang="less">
    .paymentPlan {

        /* 下拉选项框 */
        /* /deep/.el-select__tags {
            overflow: hidden;
            
        } */

        #checkbox {
            /deep/.el-select {
                display: block;

                .el-tag {
                    margin-left: 2px;
                }
            }

            /deep/.el-input__inner {
                width: 221px;
            }

            /deep/.el-select__tags {
                display: inline-block;
                white-space: nowrap;
                overflow: hidden;
            }
        }

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
            padding: 27px 40px 0 38px;

            .add_con {

                margin-bottom: 39px;
                overflow: hidden;

                .con_left {
                    margin-left: 20px;

                    /deep/.el-select__caret {
                        line-height: 10px;
                    }

                    /deep/.el-input {
                        margin-bottom: 12px;

                        .el-input__inner {
                            width: 150px;
                            height: 30px;
                            border-radius: 4px;
                        }
                    }

                    .search {
                        /deep/.el-input {
                            width: 148px;
                        }

                        /deep/.el-button {
                            height: 29px;
                        }
                    }
                }

                .con_right {
                    margin-left: 20px;
                    float: left;

                    .right_top {
                        margin: 0 0 10px 0;

                        span:first-child {
                            margin-right: 323px;
                            font-size: 14px;
                            font-family: PingFangSC-Regular;
                            font-weight: 400;
                            color: rgba(42, 120, 248, 1);

                            em {
                                font-style: normal;
                            }
                        }

                        span:nth-child(2) {
                            font-size: 12px;
                            font-family: PingFangSC-Regular;
                            font-weight: 400;
                            color: rgba(42, 120, 248, 1);

                            i {
                                font-size: 12px;
                                margin-right: 3px;
                            }
                        }
                    }

                    /* 全选操作 */
                    /deep/.el-table td {
                        padding: 3px 0;
                        font-size: 12px;
                    }

                    /deep/.el-table th {
                        padding: 7px 0;
                        font-size: 12px;
                    }

                    /deep/.el-checkbox__inner {
                        width: 20px;
                        height: 20px;
                        border-radius: 4px;
                        border: 1px solid #999;
                    }

                    /deep/.el-checkbox__input.is-checked .el-checkbox__inner,
                    /deep/.el-checkbox__input.is-indeterminate .el-checkbox__inner {
                        background: #1660FD;
                        border: 1px solid #1660FD;
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

                    /* //总选中按钮 */
                    /deep/.is-indeterminate {
                        .el-checkbox__inner {
                            background: #1660FD;
                        }
                    }


                    /deep/.el-input__inner {
                        width: 76px;
                        height: 30px;
                    }
                }
            }

            .add_fot {
                background: rgba(250, 250, 250, 1);
                border-radius: 2px;
                overflow: hidden;
                padding: 14px 0 16px 150px;
                line-height: 40px;

                ul {
                    margin: 0;

                    li {
                        float: left;
                    }

                    li:first-child {
                        padding-right: 19px;
                        border-right: 1px solid rgba(216, 216, 216, 1);
                        font-size: 14px;
                        font-family: PingFangSC-Regular;
                        font-weight: 400;
                        color: rgba(42, 120, 248, 1);
                    }

                    li:nth-child(2) {
                        padding-right: 19px;
                        border-right: 1px solid rgba(216, 216, 216, 1);

                    }

                    li:last-child {
                        margin-left: 20px;
                        font-size: 12px;
                        font-family: PingFangSC-Semibold;
                        font-weight: 600;
                        color: rgba(102, 102, 102, 1);
                        text-align: center;
                    }

                    /deep/.el-form {
                        height: 40px;

                        /deep/.el-select {
                            width: 100px;
                        }

                        /deep/.el-form-item__label {
                            width: 120px;
                            font-size: 14px;
                            font-family: PingFangSC-Regular;
                            font-weight: 400;
                            color: rgba(102, 102, 102, 1);
                        }

                        /deep/.el-form-item__content {
                            margin-left: 120px;
                        }
                    }
                }
            }
        }
    }
</style>