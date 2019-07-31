<template>
    <div class="syncAccount">
        <div class="breadcrumb">
            <div class="breadcrumb_top">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item :to="{ path: '/' }">社保公积金管理</el-breadcrumb-item>
                    <el-breadcrumb-item><a href="/">月度核算</a></el-breadcrumb-item>
                </el-breadcrumb>
                <div class="breadcrumb_ul">
                    <!-- <li>同步核算人员</li>
                    <li>调整缴纳方案</li>
                    <li>开始计算</li>
                    <li>归档并创建下月台账</li> -->
                    <el-button type="primary" @click="account">同步核算人员</el-button>
                    <el-button type="primary" @click="paymentPlan">调整缴纳方案</el-button>
                    <el-button type="success">开始计算</el-button>
                    <el-button plain @click="archive">归档并创建下月台账</el-button>
                </div>
            </div>
            <div class="breadcrumb_bot">
                <ul class="bot_mes">
                    <li>缴纳月份：<span>2019 - 05</span></li>
                    <!-- <li class="warn"><i
                            class="iconfont icon-gantanhao"></i>本月薪资已归档，修改当前社保公积金数据，归档时若同步社保公积金至本月薪资，将影响本月已归档的薪资数据，请知悉。
                    </li> -->
                    <!-- <li>正常缴纳员工：<span>1000</span><span>人</span></li>
                    <li>补缴员工：<span>0</span><span>人</span></li> -->
                </ul>
                <div class="search">
                    <el-form ref="search" :model="search" class="search">
                        <el-row>
                            <el-col :span="8" class="input">
                                <el-form-item>
                                    <!-- <el-input v-model="search.name" placeholder="姓名、工号、手机号"></el-input> -->
                                    <el-autocomplete class="inline-input" v-model="state"
                                        :fetch-suggestions="querySearch" placeholder="姓名/工号/手机号" @select="handleSelect">
                                    </el-autocomplete>
                                </el-form-item>
                            </el-col>
                            <el-col :span="4" class="select">
                                <el-form-item>
                                    <el-select v-model="search.section" placeholder="部门">
                                        <el-option label="区域一" value="1"></el-option>
                                        <el-option label="区域二" value="2"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <!-- <el-col :span="4" class="select">
                                <el-form-item>
                                    <el-select v-model="search.stateEmployees" placeholder="员工状态">
                                        <el-option label="区域一" value="1"></el-option>
                                        <el-option label="区域二" value="2"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col> -->
                            <div class="button">
                                <!-- <span>搜索</span>
                                    <span>重置</span> -->
                                <el-button plain>搜索</el-button>
                                <el-button plain>重置</el-button>
                            </div>
                        </el-row>
                    </el-form>

                    <ul class="icon">
                        <li class="iconfont icon-xinzengyuangong" @click="addMember">增员</li>
                        <li class="iconfont icon-xinzengyuangong" @click="subMember">减员</li>
                        <li class="iconfont icon-xinzengyuangong" @click="payment">补缴</li>
                        <li class="iconfont icon-bianjixiugai">手动修正</li>
                        <li class="iconfont icon-20daochu">导出</li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="account_table">
            <el-table :data="tableData" style="width: 100%" height="280"
                :default-sort="{prop: 'date', order: 'descending'}" @selection-change="handleSelectionChange"
                ref="multipleTable" tooltip-effect="dark">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column fixed prop="name" label="姓名" width="91" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="jobNum" label="工号" width="91" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="section" label="部门" width="110" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="post" label="职位" width="120" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="emptype" label="员工类型" width="110" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="empstate" label="员工状态" width="110" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="account" label="户口类型" width="120" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="payPack" label="缴纳方案" width="120" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="social" label="个人社保缴费" width="120" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="payment" label="个人社保补缴" width="120" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="fund" label="个人公积金缴费" width="120" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="fundpay" label="个人公积金补缴" width="120" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="firmsocial" label="公司社保缴费" width="120" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="firmpay" label="公司社保补缴" width="120" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="firmfund" label="公司公积金缴费" width="120" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="firmpay" label="公司社保补缴" width="120" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column fixed="right" label="操   作" width="110">
                    <template slot-scope="scope">
                        <el-button @click.native.prevent="handleCheck" type="text" size="small">
                            查看明细
                        </el-button>
                    </template>
                </el-table-column>

            </el-table>
            <div class="block page">
                <ul class="mes">
                    <li>个人社保缴费总计：<span>5，093.00元</span></li>
                    <li>个人公积金缴费总计：<span>5，093.00元</span></li>
                    <li>公司社保缴费总计：<span>5，093.00元</span></li>
                    <li>公司公积金缴费总计：<span>5，093.00元</span></li>
                </ul>
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                    :current-page="currentPage" :page-sizes="[100, 200, 300, 400]" :page-size="100"
                    layout="total, sizes, prev, pager, next, jumper" :total="400">
                </el-pagination>
            </div>
        </div>

        <!-- 月度核算 -->
        <selectWelfare v-if="selectVisible" :selectVisible.sync="selectVisible"></selectWelfare>
        <!-- 补缴 -->
        <payment v-if="paymentVisible" :paymentVisible.sync="paymentVisible"></payment>
        <!-- 增员 -->
        <addMember v-if="addVisible" :addVisible.sync="addVisible"></addMember>
        <!-- 减员 -->
        <subMember v-if="subVisible" :subVisible.sync="subVisible"></subMember>
        <!-- 同步核算人员 -->
        <account v-if="accountVisible" :accountVisible.sync="accountVisible"></account>
        <!-- 归档 -->
        <archive v-if="archiveVisible" :archiveVisible.sync="archiveVisible"></archive>
        <!-- 查看明细 -->
        <detailsView v-if="viewVisble" :viewVisble.sync="viewVisble"></detailsView>
        <!-- 调整缴纳方案 -->
        <paymentPlan v-if="planVisible" :planVisible.sync="planVisible"></paymentPlan>
    </div>
</template>

<script>
    import selectWelfare from '@/components/welfare/select.vue'
    import payment from '@/components/welfare/payment.vue'
    import addMember from '@/components/welfare/addMember.vue'
    import subMember from '@/components/welfare/subMember.vue'
    import account from '@/components/welfare/accountPerson.vue'
    import archive from '@/components/welfare/archive.vue'
    import detailsView from '@/components/welfare/detailsView.vue'
    import paymentPlan from '@/components/welfare/paymentPlan.vue'

    export default {
        data() {
            return {
                currentPage: 4,
                // 模糊搜索
                restaurants: [],
                state: '',

                selectVisible: true,
                paymentVisible: false,
                addVisible: false,
                subVisible: false,
                accountVisible: false,
                archiveVisible: false,
                viewVisble: false,
                planVisible: false,

                search: {
                    name: '',
                    jobNum: '',
                    section: '',
                    post: '',
                    emptype: '',
                    empstate: '',
                    account: '',
                    payPack: '',
                    social: '',
                    payment: '',
                    fund: '',
                    fundpay: '',
                    firmsocial: '',
                    firmpay: '',
                    firmfund: '',
                    firmpay: ''
                },
                tableData: [{
                    name: 'aa',
                    jobNum: '00238',
                    section: '产品技术部',
                    post: '前端工程师',
                    emptype: '全职',
                    empstate: '试用期',
                    account: '城镇',
                    payPack: '方案一',
                    social: '500元',
                    payment: '500元',
                    fund: '500元',
                    fundpay: '500元',
                    firmsocial: '500元',
                    firmpay: '500元',
                    firmfund: '500元',
                    firmpay: '500元'
                },
                {
                    name: 'aa',
                    jobNum: '00238',
                    section: '产品技术部',
                    post: '前端工程师',
                    emptype: '全职',
                    empstate: '试用期',
                    account: '城镇',
                    payPack: '方案一',
                    social: '500元',
                    payment: '500元',
                    fund: '500元',
                    fundpay: '500元',
                    firmsocial: '500元',
                    firmpay: '500元',
                    firmfund: '500元',
                    firmpay: '500元'
                },
                {
                    name: 'aa',
                    jobNum: '00238',
                    section: '产品技术部',
                    post: '前端工程师',
                    emptype: '全职',
                    empstate: '试用期',
                    account: '城镇',
                    payPack: '方案一',
                    social: '500元',
                    payment: '500元',
                    fund: '500元',
                    fundpay: '500元',
                    firmsocial: '500元',
                    firmpay: '500元',
                    firmfund: '500元',
                    firmpay: '500元'
                }]
            }
        },
        components: {
            selectWelfare,
            payment,
            addMember,
            subMember,
            account,
            archive,
            detailsView,
            paymentPlan
        },
        methods: {
            // 模糊搜索
            querySearch(queryString, cb) {
                var restaurants = this.restaurants;
                var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
                // 调用 callback 返回建议列表的数据
                cb(results);
            },
            createFilter(queryString) {
                return (restaurant) => {
                    return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
            loadAll() {
                return [
                    { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
                    { "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" },
                    { "value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
                    { "value": "泷千家(天山西路店)", "address": "天山西路438号" },
                    { "value": "贡茶", "address": "上海市长宁区金钟路633号" }
                ];
            },
            handleSelect(item) {
                console.log(item);
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleCheck() {
                this.viewVisble = true;
            },

            // 分页
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },


            // 操作-->
            payment() {
                this.paymentVisible = true;
                console.log(111);
            },
            addMember() {
                this.addVisible = true;
            },
            subMember() {
                this.subVisible = true;
            },
            account() {
                this.accountVisible = true;
            },
            archive() {
                this.archiveVisible = true;
            },
            paymentPlan() {
                this.planVisible = true;
            }
        },
        mounted() {
            this.restaurants = this.loadAll();
        }
    }

</script>

<style scoped lang="less">
    .syncAccount {
        /deep/.el-table__body-wrapper {
            height: 310px;
        }

        .breadcrumb {
            height: 139px;
            background: rgba(255, 255, 255, 1);
            padding: 16px 30px 15px 30px;

            .breadcrumb_top {
                height: 42px;
                border-bottom: 1px solid rgba(221, 221, 221, 1);

                .el-breadcrumb {
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

            .breadcrumb_bot {
                margin-top: 10px;

                .bot_mes {
                    padding: 0;
                    padding-bottom: 17px;
                    margin-bottom: 17px;

                    li {
                        float: left;
                        font-size: 13px;
                        font-family: DINAlternate-Bold;
                        font-weight: bold;
                        color: rgba(51, 51, 51, 1);
                        margin-right: 19px;
                    }

                    /* .warn {
                        background: #FBC5AA;
                        color: white;
                        font-size: 10px;
                        line-height: 20px;
                        padding: 0 0 0 10px;

                        i {
                            font-size: 10px;
                            margin-right: 3px;
                        }
                    } */

                    span {
                        color: #2A78F8;
                    }
                }

                .search {
                    .input {
                        width: 160px;
                    }

                    .select {
                        width: 110px;
                    }

                    /deep/ .el-input {
                        font-size: 12px;
                        font-family: PingFangSC-Regular;
                        font-weight: 400;
                        color: rgba(189, 193, 198, 1);

                        .el-input__inner {
                            border: 1px solid rgba(153, 153, 153, 1);
                        }
                    }

                    .icon {
                        float: right;
                        margin-bottom: 0;
                        margin-top: 25px;

                        li {
                            float: left;
                            font-size: 12px;
                            font-family: PingFangSC-Regular;
                            font-weight: 400;
                            color: rgba(38, 127, 246, 1);
                            margin-right: 20px;
                            cursor: default;
                        }
                    }

                    /deep/.el-form-item__content {
                        margin-right: 10px;
                    }

                    .button {
                        float: right;
                        border-left: 1px solid rgba(216, 216, 216, 1);
                        padding-left: 20px;
                        line-height: 41px;

                        /deep/.el-button {
                            width: 80px;
                            height: 36px;
                            border-radius: 2px;
                        }
                    }
                }
            }
        }

        .account_table {
            padding: 0 20px;
            background: rgba(255, 255, 255, 1);
            margin-top: -100px;

            /deep/.el-table {
                box-shadow: 2px 0px 16px 0px rgba(3, 33, 136, 0.2);
                border-radius: 4px 4px 0px 0px;

            }

            /* 全选操作 */
            /deep/.el-table td {
                padding: 0;
                font-size: 12px;
            }

            /deep/.el-table th {
                padding: 10px 0;
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

            /* 分页 */
            .page {
                width: 100%;
                padding: 20px 0 40px 0;
                background: rgba(255, 255, 255, 1);
                box-shadow: 0px 1px 17px 0px rgba(54, 78, 159, 0.29);
                border-radius: 4px 4px 0px 0px;
                padding-top: 10px;

                .mes {
                    padding: 0 0 20px 8px;

                    li {
                        float: left;
                        font-size: 12px;
                        font-family: PingFangSC-Regular;
                        font-weight: 400;
                        color: rgba(102, 102, 102, 1);
                        margin-right: 10px;

                        span {
                            color: #267FF6;
                        }


                    }
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

            /deep/.el-pagination {
                float: right;
                padding-right: 10px;
            }
        }
    }
</style>