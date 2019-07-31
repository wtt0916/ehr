<template>
    <div class="historyView">
        <div class="breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/welfareSet' }">社保公积金</el-breadcrumb-item>
                <el-breadcrumb-item><a href="/">月度台账</a></el-breadcrumb-item>
                <el-breadcrumb-item><a href="/">查看</a></el-breadcrumb-item>
            </el-breadcrumb>
            <span class="back"><a href="/welfareParameter">返回</a></span>
        </div>
        <div class="historyView_table">
            <div class="historyView_mes">
                <p>薪资月份：<span>2019 - 05</span></p>
                <ul class="person">
                    <li>社保人数总计：<span>302</span><span>人</span></li>
                    <li>公积金人数总计：<span>302</span><span>人</span></li>
                    <li>数据来源：<span style="font-size: 18px">系统核算</span></li>
                </ul><br>
                <ul class="count">
                    <li>公司社保缴费总计：<span>180，000，00</span><span>元</span></li>
                    <li>公司公积金缴费总计：<span>180，000，00</span><span>元</span></li>
                    <li>个人社保缴费总计：<span>180，000，00</span><span>元</span></li>
                    <li>个人公积金缴费总计：<span>180，000，00</span><span>元</span></li>
                </ul>
            </div>
            <div class="historyView_search" :class="{'search-collapse':isCollapse}">
                <el-form ref="search" :model="search">
                    <el-row>
                        <el-col style="width:120px" class="input">
                            <el-form-item style="width:140px;">
                                <el-input class="search" v-model="search.name" placeholder="姓名、工号、手机号"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col style="width:120px" class="search">
                            <el-form-item style="width:91px;">
                                <el-select v-model="search.section" placeholder="部门">
                                    <el-option label="区域一" value="1"></el-option>
                                    <el-option label="区域二" value="2"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <div class="button">
                    <el-button type="primary">搜索</el-button>
                    <el-button plain>重置</el-button>
                    <el-button plain>高级搜索</el-button>
                </div>
                <div class="btn-collapse">
                    <el-link v-if="!isCollapse" @click="isCollapse=!isCollapse">收起<i
                            class="el-icon-caret-bottom el-icon--right"></i> </el-link>
                    <el-link v-else @click="isCollapse=!isCollapse">展开<i class="el-icon-caret-top el-icon--right"></i>
                    </el-link>
                </div>
            </div>

            <div class="table">
                <el-table :data="tableData" style="width: 100%" height="200"
                    :default-sort="{prop: 'date', order: 'descending'}" @selection-change="handleSelectionChange"
                    ref="multipleTable" tooltip-effect="dark">
                    <el-table-column type="selection" width="55">
                    </el-table-column>
                    <el-table-column fixed prop="name" label="姓名" width="91" :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column prop="jobNum" label="工号" width="91" :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column prop="section" label="部门" width="130" :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column prop="post" label="职位" width="130" :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column prop="employeeType" label="员工类型" width="73" :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column prop="employeeStatus" label="员工状态" width="91" :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column prop="household" label="户口类型" width="81" :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column prop="package" label="缴纳方案" width="91" :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column prop="personSocialFees" label="个人社保缴费" width="110" :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column prop="personSocialCosts" label="个人社保补缴" width="110" :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column prop="personFundFees" label="个人公积金缴费" width="110" :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column prop="personFundCosts" label="个人公积金补缴" width="110" :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column prop="firmSocialFees" label="公司社保缴费" width="110" :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column prop="firmSocialCosts" label="公司社保补缴" width="110" :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column prop="firmFundFees" label="公司公积金缴费" width="110" :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column prop="firmFundCosts" label="公司公积金补缴" width="110" :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column fixed="right" label="操   作" width="150">
                        <template slot-scope="scope">
                            <el-button @click.native.prevent="handleCheck" type="text" size="small">
                                查看明细
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="block page">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                        :current-page="currentPage" :page-sizes="[100, 200, 300, 400]" :page-size="100"
                        layout="total, sizes, prev, pager, next, jumper" :total="400">
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    export default {
        data() {
            return {
                activeName: 'first',
                currentPage: 4,
                isCollapse: false,
                search: {
                    date: '',
                    name: '',
                    section: '',
                    stateEmployees: '',
                    employeestype: ''
                },
                tableData: [{
                    name: '王小虎',
                    jobNum: '09284',
                    section: '产品技术部',
                    post: '前端工程师',
                    employeeType: '全职',
                    employeeStatus: '试用期',
                    household: '城镇',
                    package: '方案一',
                    personSocialFees: '500元',
                    personSocialCosts: '500元',
                    personFundFees: '500元',
                    personFundCosts: '500元',
                    firmSocialFees: '500元',
                    firmSocialCosts: '500元',
                    firmFundFees: '500元',
                    firmFundCosts: '500元'
                },
                {
                    name: '王小虎',
                    jobNum: '09284',
                    section: '产品技术部',
                    post: '前端工程师',
                    employeeType: '全职',
                    employeeStatus: '试用期',
                    household: '城镇',
                    package: '方案一',
                    personSocialFees: '500元',
                    personSocialCosts: '500元',
                    personFundFees: '500元',
                    personFundCosts: '500元',
                    firmSocialFees: '500元',
                    firmSocialCosts: '500元',
                    firmFundFees: '500元',
                    firmFundCosts: '500元'
                },
                {
                    name: '王小虎',
                    jobNum: '09284',
                    section: '产品技术部',
                    post: '前端工程师',
                    employeeType: '全职',
                    employeeStatus: '试用期',
                    household: '城镇',
                    package: '方案一',
                    personSocialFees: '500元',
                    personSocialCosts: '500元',
                    personFundFees: '500元',
                    personFundCosts: '500元',
                    firmSocialFees: '500元',
                    firmSocialCosts: '500元',
                    firmFundFees: '500元',
                    firmFundCosts: '500元'
                },
                {
                    name: '王小虎',
                    jobNum: '09284',
                    section: '产品技术部',
                    post: '前端工程师',
                    employeeType: '全职',
                    employeeStatus: '试用期',
                    household: '城镇',
                    package: '方案一',
                    personSocialFees: '500元',
                    personSocialCosts: '500元',
                    personFundFees: '500元',
                    personFundCosts: '500元',
                    firmSocialFees: '500元',
                    firmSocialCosts: '500元',
                    firmFundFees: '500元',
                    firmFundCosts: '500元'
                },
                {
                    name: '王小虎',
                    jobNum: '09284',
                    section: '产品技术部',
                    post: '前端工程师',
                    employeeType: '全职',
                    employeeStatus: '试用期',
                    household: '城镇',
                    package: '方案一',
                    personSocialFees: '500元',
                    personSocialCosts: '500元',
                    personFundFees: '500元',
                    personFundCosts: '500元',
                    firmSocialFees: '500元',
                    firmSocialCosts: '500元',
                    firmFundFees: '500元',
                    firmFundCosts: '500元'
                }],
            }
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
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
            // 查看明细
            handleCheck(index, row) {
                console.log(index, row);
                this.$router.push('/examine');
            },
        }
    }
</script>


<style lang="less" scoped>
    .historyView {
        .breadcrumb {
            height: 104px;
            background: rgba(255, 255, 255, 1);
            padding: 16px 30px 0;

            .el-breadcrumb {
                float: left;
                font-size: 13px;
                font-family: PingFangSC-Medium;
                font-weight: 500;
                color: rgba(153, 153, 153, 1);
            }

            .back {
                padding: 5px 18px;
                float: right;
                font-size: 12px;
                font-family: PingFangSC-Medium;
                font-weight: 500;
                border-radius: 2px;
                border: 1px solid rgba(153, 153, 153, 1);

                a {
                    color: rgba(102, 102, 102, 1);
                }

            }
        }

        .historyView_table {
            padding: 0 20px;

            .historyView_mes {
                height: 96px;
                background: rgba(255, 255, 255, 1);
                box-shadow: 2px 0px 16px 0px rgba(3, 33, 136, 0.2);
                border-radius: 4px;
                margin-top: -56px;
                margin-bottom: 10px;
                padding: 20px 0 22px 10px;

                span {
                    color: rgba(42, 120, 248, 1);
                }

                p {
                    font-size: 13px;
                    font-family: DINAlternate-Bold;
                    font-weight: bold;
                    color: rgba(51, 51, 51, 1);
                    margin: 0;
                    margin-bottom: 14px;
                }

                ul {
                    margin: 0;
                    padding: 0;

                }

                .person {
                    font-size: 13px;
                    font-family: PingFangSC-Semibold;
                    font-weight: 600;
                    color: rgba(51, 51, 51, 1);
                    margin-bottom: 50px;

                    li {
                        float: left;
                        margin-right: 162px;
                    }

                    span {
                        font-size: 20px;
                        font-family: DINAlternate-Bold;
                        font-weight: bold;
                        color: rgba(42, 120, 248, 1);
                    }
                }

                .count {
                    font-size: 13px;
                    font-family: PingFangSC-Regular;
                    font-weight: 400;
                    color: rgba(102, 102, 102, 1);

                    li {
                        float: left;
                        margin-right: 30px;
                    }

                    li:last-child {
                        margin-right: 0;
                    }

                    span {
                        color: #2A78F8;
                    }
                }
            }

            .historyView_search {
                height: 36px;
                background: rgba(255, 255, 255, 1);
                box-shadow: 2px 0px 16px 0px rgba(3, 33, 136, 0.2);
                border-radius: 4px;
                padding: 20px 19px 20px 10px;

                /deep/.el-form {
                    height: 36px;

                    .el-form-item {
                        margin-bottom: 0;
                    }

                    /deep/.el-input {
                        font-size: 12px;
                        font-family: PingFangSC-Regular;
                        font-weight: 400;
                        color: rgba(153, 153, 153, 1);

                        .el-input__inner {
                            border: 1px solid rgba(153, 153, 153, 1);
                        }
                    }

                    .input {
                        margin-right: 43px;
                    }

                    .select {
                        margin: 0 3px;
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

                .button {
                    float: left;
                    line-height: 39px;

                    /deep/.el-button {
                        font-size: 12px;
                        font-family: PingFangSC-Medium;
                        font-weight: 500;
                        height: 38px;
                        padding: 0 20px;
                    }

                    /deep/.el-button:last-child {
                        padding: 0 10px;
                    }
                }
            }
            /* 收起 */
            .search-collapse {
                    padding: 3px 10px 8px 17px;

                    /deep/.el-input {
                        margin-right: -3px;
                    }

                    /deep/.el-input__inner {
                        border-radius: 0;
                        height: 30px;
                        line-height: 30px;
                        border: 0 !important;
                        border-left: 1px solid rgba(102, 102, 102, 1) !important;
                        border-right: 1px solid rgba(102, 102, 102, 1) !important;
                    }
                    /deep/.el-form .input{
                        margin-right: 19px;
                    }
                    .button {
                        margin-top: 2px;

                        /deep/.el-button {
                            height: 30px;
                        }
                    }

                    .btn-collapse {
                        top: 12px;
                    }
                }

            /* 分页 */
            .page {
                width: 100%;
                height: 40px;
                background: rgba(255, 255, 255, 1);
                box-shadow: 0px 1px 17px 0px rgba(54, 78, 159, 0.29);
                border-radius: 4px 4px 0px 0px;
                padding-top: 10px;

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

            .table {
                margin-top: 8px;
            }

            /deep/.el-tabs {
                .el-tabs__header {
                    margin: 10px 0 1px 0;
                    background: rgba(255, 255, 255, 1);
                    box-shadow: 2px 0px 16px 0px rgba(3, 33, 136, 0.2);
                    border-radius: 4px 4px 0px 0px;
                }

                /deep/.el-tabs__active-bar {
                    height: 4px;
                }

                /deep/.el-tabs__item {
                    font-size: 14px;
                    font-family: PingFangSC-Semibold;
                    font-weight: 600;
                }
            }

            /* 全选操作 */
            /deep/.el-table td {
                padding: 3px 0;
                font-size: 12px;
            }

            /deep/.el-table th {
                padding: 5px 0;
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