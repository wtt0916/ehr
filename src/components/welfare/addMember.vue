<template>
    <div class="addMember">
        <el-dialog title="增员" center :visible="addVisible" @update:visible="v=>$emit('update:addVisible',v)">
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
                            <el-input placeholder="姓名" v-model="filterText">
                            </el-input>
                            <el-button type="primary" icon="el-icon-search"></el-button>
                        </el-col>
                        <el-col :span="10">
                            <el-button type="primary">搜索</el-button>
                            <el-button>重置</el-button>
                        </el-col>
                    </el-row>
                </form>
                <div class="con_right">
                    <p class="right_top">
                        <span>已选择<em>3</em>人</span>
                        <!-- <span @click="batch" style="cursor: pointer"><i class="iconfont icon-piliangtianjia"></i>批量操作</span> -->
                    </p>
                    <el-table :data="tableData" height="165">
                        <el-table-column type="selection" width="55">
                        </el-table-column>
                        <el-table-column fixed prop="name" label="姓名" width="91" :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column prop="section" label="部门" width="120" :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column prop="household" label="户口类型" width="120" :show-overflow-tooltip="true">
                            <template slot-scope="{row,$index}">
                                <div @click="{{changeHousehold($index)}}" class="household">
                                    <el-select v-if="ediType[$index]" v-model='row.household' placeholder="请选择">
                                        <el-option v-for="item in options" :key="item.value" :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                    <span v-else>{{row.household}}</span>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="package" label="缴纳方案" width="120" :show-overflow-tooltip="true">
                            <template slot-scope="{row,$index}">
                                <div @click="{{changePlan($index)}}" class="package">
                                    <el-select v-if="ediPackage[$index]" v-model='row.package' placeholder="请选择">
                                        <el-option v-for="item in plans" :key="item.plans" :label="item.label"
                                            :value="item.valueplan">
                                        </el-option>
                                    </el-select>
                                    <span v-else>{{row.package}}</span>
                                </div>
                            </template>
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
            <!-- <div class="add_fot" id="addBatch" style="display: none">
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
                        <span>提交</span>
                            <span>取消</span>
                        <el-button plain id="submit" @click="submit">提交</el-button>
                        <el-button plain id="cancel" @click="cancel">取消</el-button>
                    </li>
                </ul>
            </div> -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="addFailed">取 消</el-button>
                <el-button type="primary" @click="addSuccess">确 定</el-button>
            </span>
        </el-dialog>
    </div>

</template>

<script>
    export default {
        props: ['addVisible'],
        data() {
            return {
                ediSocial: [],
                ediFund: [],
                ediPackage: [],
                ediType: [],
                filterText: '',
                form: {
                    region: ''
                },
                options: [{
                    value: '选项1',
                    label: '城镇'
                }, {
                    value: '选项2',
                    label: '非城镇'
                }],
                value: '',
                plans: [{
                    valueplan: '选项1',
                    label: '方案一'
                }, {
                    valueplan: '选项2',
                    label: '方案二'
                }],


                options: [{
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }, {
                    value: '选项3',
                    label: '蚵仔煎'
                }],
                department: '',


                valueplan: '',
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
            addSuccess() {
                this.$emit('update:addVisible', false);
                this.$message({
                    message: '增员成功',
                    type: 'success'
                });
            },
            addFailed() {
                this.$emit('update:addVisible', false);
                this.$message('取消增员');
            },
            changeHousehold(row) {
                this.ediType[row] = true;
                this.$set(this.ediType, row, true)
            },
            changePlan(row) {
                this.ediPackage[row] = true;
                this.$set(this.ediPackage, row, true)
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


            // 过滤树节点
            filterNode(value, data) {
                if (!value) return true;
                return data.label.indexOf(value) !== -1;
            }

        },

        watch: {
            filterText(val) {
                this.$refs.tree2.filter(val);
            }
        }
    };
</script>


<style scoped lang="less">
    .addMember {
        /deep/.el-dialog {
            border-radius: 12px;
            width: 880px;
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

                    .search{
                        /deep/.el-input{
                            width: 148px;
                        }
                        /deep/.el-button{
                            height:29px;
                        }
                    }
                }

                .con_right {
                    margin-left: 20px;

                    

                    .household {
                        /deep/.el-input__icon {
                            line-height: 10px;
                        }

                        .el-input__inner {
                            width: 91px;
                        }

                    }

                    .package {
                        /deep/.el-input__icon {
                            line-height: 10px;
                        }

                        .el-input__inner {
                            width: 91px;
                        }
                    }

                    /deep/.el-table__body-wrapper {
                        font-size: 14px;
                        font-family: PingFangSC-Semibold;
                        font-weight: 400;
                        color: rgba(102, 102, 102, 1);
                    }

                    /deep/.el-table__fixed {
                        font-size: 14px;
                        font-family: PingFangSC-Semibold;
                        font-weight: 600;
                        color: rgba(102, 102, 102, 1);
                    }

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
        }
    }
</style>