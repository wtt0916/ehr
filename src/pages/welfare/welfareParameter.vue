<template>
    <div id="parameter">
        <div class="breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/welfareSet' }">社保公积金管理</el-breadcrumb-item>
                <el-breadcrumb-item><a href="/">历史台账</a></el-breadcrumb-item>
            </el-breadcrumb>
            <div class="breadcrumb_ul">
                <el-button type="primary" @click="onImportEx">导入历史台账</el-button>
                <el-button plain>返回</el-button>
            </div>
        </div>
        <div class="par_table">
            <div class="par_search" :class="{'search-collapse':isCollapse}">
                <el-form ref="search" :model="search" class="search">
                    <div class="block">
                        <el-date-picker v-model="search.date" type="monthrange" range-separator="至"
                            start-placeholder="开始月份" end-placeholder="结束月份">
                        </el-date-picker>
                    </div>
                    <div class="button isButton">
                        <el-button plain>搜索</el-button>
                        <el-button plain>重置</el-button>
                    </div>
                </el-form>
                <div class="btn-collapse">
                    <el-link v-if="!isCollapse" @click="isCollapse=!isCollapse">收起<i
                            class="el-icon-caret-bottom el-icon--right"></i> </el-link>
                    <el-link v-else @click="isCollapse=!isCollapse">展开<i class="el-icon-caret-top el-icon--right"></i>
                    </el-link>
                </div>
            </div>
            <el-table :data="tableData" style="width: 100%" height="350"
                :default-sort="{prop: 'date', order: 'descending'}" @selection-change="handleSelectionChange"
                ref="multipleTable" tooltip-effect="dark">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column fixed prop="month" label="台账月份" width="130" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="socialNum" label="社保人数" width="130" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="fundNum" label="公积金人数" width="130" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="companySocial" label="公司社保缴费总计" width="200" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="companyfund" label="公司公积金缴费总计" width="200" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="personSocial" label="个人社保缴费总计" width="200" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="personfund" label="个人公积金缴费总计" width="200" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="sources" label="数据来源" width="130" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column fixed="right" label="操   作" width="150">
                    <template slot-scope="scope">
                        <el-button @click.native.prevent="handleCheck" type="text" size="small">
                            查看
                        </el-button>
                        <el-button @click.native.prevent="handleArchive" type="text" size="small">
                            反归档
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <div class="block page">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                    :current-page="currentPage" :page-sizes="[100, 200, 300, 400]" :page-size="100"
                    layout="total, sizes, prev, pager, next, jumper" :total="400">
                </el-pagination>
            </div>
        </div>
        <!-- 归档 -->
        <unarchive v-if="unarchiveVisible" :unarchiveVisible.sync="unarchiveVisible"></unarchive>
    </div>
</template>

<script>
    // import Paging from '@/components/welfare/Paging.vue'
    import unarchive from '@/components/welfare/unarchive.vue'
    export default {
        components: {
            // Paging
            unarchive
        },
        data() {
            return {
                isCollapse: false,
                currentPage: 4,
                unarchiveVisible: false,
                search: {
                    date: ''
                },
                // tableData:[],
                tableData: [{
                    month: '2016-05-02',
                    socialNum: '302人',
                    fundNum: '288人',
                    companySocial: '18000000.00元',
                    companyfund: '18000000.00元',
                    personSocial: '18000000.00元',
                    personfund: '18000000.00元',
                    sources: '系统核算'
                },
                {
                    month: '2016-05-02',
                    socialNum: '302人',
                    fundNum: '288人',
                    companySocial: '18000000.00元',
                    companyfund: '18000000.00元',
                    personSocial: '18000000.00元',
                    personfund: '18000000.00元',
                    sources: '手动导入'
                }, {
                    month: '2016-05-02',
                    socialNum: '302人',
                    fundNum: '288人',
                    companySocial: '18000000.00元',
                    companyfund: '18000000.00元',
                    personSocial: '18000000.00元',
                    personfund: '18000000.00元',
                    sources: '系统核算'
                }]
            }
        },

        methods: {
            // 确认导入
            onImportEx() {
                this.isShowMonthRange = true;
            },
            // 确认导入
            onConfirmImportEx() {
                if (!this.importMonthRange) {
                    this.$message({
                        message: '请选择要导入的日期',
                        type: 'warning'
                    });
                    return;
                }
                this.$router.push({
                    path: '/salary/hisImport'
                })
            },
            // 分页
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },


            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleArchive() {
                this.unarchiveVisible = true;
            },
            handleCheck() {
                this.$router.push('/history');
            },


            // 获取历史台账列表
            getParameterList() {
                // this.$http.get("/api/fundsettlement/list")
                //     .then(data => {

                //     }).catch(function (error) {
                //         console.log(error);
                //     })
            }
        },
        mounted() {
            this.getParameterList();
        }
    }
</script>

<style scoped lang="less">
    #parameter {
        .breadcrumb {
            height: 104px;
            background: rgba(255, 255, 255, 1);
            padding: 16px 30px 0;

            /deep/.el-breadcrumb {
                font-size: 13px;
                font-family: PingFangSC-Medium;
                font-weight: 500;
                color: rgba(153, 153, 153, 1);
                float: left;
            }

            .breadcrumb_ul {
                float: right;
                margin: 0;

                /deep/.el-button {
                    font-size: 12px;
                    font-family: PingFangSC-Medium;
                    font-weight: 500;
                }
            }
        }

        .par_table {
            padding: 0 20px;

            .par_search {
                margin-top: -67px;
                height: 36px;
                background: rgba(255, 255, 255, 1);
                box-shadow: 2px 0px 16px 0px rgba(3, 33, 136, 0.2);
                border-radius: 4px;
                padding: 20px 18px 20px 20px;
                margin-bottom: 10px;

                .search {
                    .block {
                        float: left;

                        /deep/.el-input__inner {
                            margin-top: 3px;
                            height: 35px;
                            font-size: 12px;
                            font-family: PingFangSC-Medium;
                            font-weight: 500;
                            color: rgba(102, 102, 102, 1);
                            border-radius: 2px;
                            border: 1px solid rgba(153, 153, 153, 1);

                            /deep/.el-icon-date {
                                line-height: 28px;
                            }

                            /deep/.el-range-separator {
                                line-height: 25px;
                            }
                        }

                    }


                    .button {
                        float: right;
                        margin-left: 20px;
                        line-height: 41px;
                        font-size: 12px;
                        font-family: PingFangSC-Medium;
                        font-weight: 500;

                        /deep/.el-button {
                            width: 80px;
                            height: 36px;
                            border-radius: 2px;
                            font-size: 12px;
                            font-family: PingFangSC-Regular;
                            font-weight: 400;
                        }
                    }


                }

                .btn-collapse {
                    float: right;
                    margin-left: 26px;
                    line-height: 36px;
                    font-size: 12px;
                    font-family: PingFangSC-Medium;
                    font-weight: 500;
                    color: rgba(22, 96, 253, 1);

                    a {
                        color: #1660FD;
                        font-size: 12px;
                        font-family: PingFangSC-Medium;
                        font-weight: 500;
                    }

                    /deep/.el-link.is-underline:hover:after {
                        border-bottom: 0;
                    }
                }
            }

            /* 收起 */
            .search-collapse {
                padding: 3px 10px 8px 17px;

                .search-item {
                    input.el-input__inner {
                        border: 0;
                    }
                }

                .btn-collapse {
                    top: 12px;
                }

                /* 收起时的输入框 */
                .search {
                    .block {
                        float: left;
                        line-height: 40px;

                        /deep/.el-input__icon {
                            height: 30px;
                        }

                        /deep/.el-date-editor {
                            border-radius: 0;
                            height: 30px;

                            line-height: 31px;
                            border: 0;
                            border-left: 1px solid rgba(102, 102, 102, 1);
                            border-right: 1px solid rgba(102, 102, 102, 1);
                        }

                        /deep/.el-range-separator {
                            line-height: 33px;
                        }

                        /deep/.el-col {
                            margin-right: -2px;
                        }
                    }

                    .button {
                        /deep/.el-button {
                            height: 31px;
                        }
                    }

                }

            }


            /* 分页 */
            .page {
                padding: 10px 5px 10px 29px;
                background: rgba(255, 255, 255, 1);
                box-shadow: 0px 1px 17px 0px rgba(54, 78, 159, 0.29);
                border-radius: 4px 4px 0px 0px;
                overflow: hidden;

                /deep/.el-pagination {
                    float: right;
                    padding-right: 10px;
                }

                /deep/.el-pager {
                    li {
                        min-width: 24px;
                        height: 25px;
                        line-height: 25px;
                        font-weight: normal;
                        padding: 0;
                        color: rgba(0, 0, 0, 0.65);
                        ;
                    }

                    li.active {
                        background: #2A78F8;
                        color: #fff;
                        border-radius: 4px;
                    }

                }

                /deep/.btn-prev,
                .btn-next {
                    min-width: 24px;
                    height: 25px;
                }

                /deep/.btn-prev {
                    padding-right: 0;
                }

                /deep/.btn-next {
                    padding-left: 0;
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

        }
    }
</style>