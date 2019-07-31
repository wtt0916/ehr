<template>
    <div class="employeesList">
        <div class="employee_main">
            <div style="height:45px;">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item>员工管理</el-breadcrumb-item>
                    <el-breadcrumb-item>员工列表</el-breadcrumb-item>
                </el-breadcrumb>
                <div class="button" style="padding-left: 0;">
                    <el-button type="primary" @click="$router.push('/staffEdit')">新增员工</el-button>
                    <el-button plain @click="onImportEx">导入</el-button>
                    <el-button plain>导出</el-button>
                </div>
            </div>
            <div class="employee_search" :class="{'search-collapse':isCollapse}">
                <el-form ref="formValue" :model="formValue">
                    <el-row>
                        <el-col style="width:140px">
                            <el-form-item>
                                <!-- <el-autocomplete class="inline-input" v-model="state" :fetch-suggestions="querySearch"
                                    placeholder="姓名/工号/手机号" @select="handleSearch">
                                </el-autocomplete> -->
                                <el-input prop="nameNumPhone" v-model="formValue.nameNumPhone" placeholder="姓名、工号、手机号">
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col style="width:95px">
                            <el-form-item>
                                <el-select v-model="formValue.mainCompanyId" placeholder="合同公司">
                                    <el-option v-for="(item,index) in companyName" :key="index"
                                        :label="item.mainCompanyName" :value="item.mainCompanyId"></el-option>
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col style="width:91px">
                            <el-form-item>
                                <el-select v-model="formValue.depName" placeholder="部门">
                                    <el-option v-for="(item,index) in department" :key="index" :label="item.depName"
                                        :value="item.depId">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col style="width:100px">
                            <el-form-item>
                                <el-select v-model="formValue.status" placeholder="员工状态">
                                    <el-option label="全部" value="null"></el-option>
                                    <el-option label="在职中" value="2"></el-option>
                                    <el-option label="试用期" value="3,5"></el-option>
                                    <el-option label="待续签" value="6"></el-option>
                                    <el-option label="停职留薪" value="4,7"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col style="width:95px">
                            <el-form-item>
                                <!-- （1-全职，2-兼职，3-实习，4-外派） -->
                                <el-select v-model="formValue.empType" placeholder="员工类别">
                                    <el-option label="全职" value="1"></el-option>
                                    <el-option label="兼职" value="2"></el-option>
                                    <el-option label="实习" value="3"></el-option>
                                    <el-option label="外派" value="4"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <div class="block">
                            <el-date-picker v-model="formValue.time" type="datetimerange" start-placeholder="入职日期(起)"
                                end-placeholder="入职日期(止)" style="font-size:12px">
                            </el-date-picker>
                        </div>
                        <div class="button">
                            <el-form-item>
                                <el-button type="primary" @click="fnSearch">搜索</el-button>
                                <el-button plain @click="resetForm('formValue')">重置</el-button>
                                <el-button plain>高级搜索</el-button>
                            </el-form-item>
                        </div>
                    </el-row>
                </el-form>
                <div class="btn-collapse">
                    <el-link v-if="!isCollapse" @click="isCollapse=!isCollapse">收起<i
                            class="el-icon-caret-bottom el-icon--right"></i> </el-link>
                    <el-link v-else @click="isCollapse=!isCollapse">展开<i class="el-icon-caret-top el-icon--right"></i>
                    </el-link>
                </div>
            </div>
            <div class="employee_table" style="background:rgba(255,255,255,1)">
                <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                    <el-menu-item index="1">全部员工({{allEmpSize || 0}}人)</el-menu-item>
                    <el-menu-item index="2">在职员工({{inServiceEmpSize || 0}}人)</el-menu-item>
                    <el-menu-item index="3">离职员工({{outServiceEmpSize || 0}}人)</el-menu-item>
                </el-menu>
                <template>
                    <div class="table_first" v-show="activeIndex == '1'">
                        <div class="table">
                            <p v-if="renewNum!==0">
                                <i class="iconfont icon-gantanhao"
                                    style="margin-right: 2px; color:rgba(255,199,191,1)"></i>
                                有<span>{{renewNum}}</span>名员工合同即将结束，请尽快处理
                            </p>
                            <p style="background:rgba(230,247,255,1);
                                border-radius:2px;
                                opacity:0.5;
                                border:1px solid rgba(166,197,255,1);" v-if="positive!==0">
                                <i class="iconfont icon-gantanhao "
                                    style="margin-right: 2px; color: rgba(122,162,200,1)"></i>
                                有<span>{{positive}}</span>名员工试用期即将结束，请尽快处理
                            </p>
                            <p style="background:#FBC5C5; padding-right:20px;
                                border-radius:2px;
                                opacity:0.5;
                                border:1px solid rgba(166,197,255,1);" v-if="resumeNumber!==0">
                                <i class="iconfont icon-gantanhao "
                                    style="margin-right: 2px; color: rgba(122,162,200,1)"></i>
                                有<span>{{resumeNumber}}</span>名员工即将到达复职日期，请尽快处理
                            </p>

                            <el-table :data="allEmpList" style="width: 100%;" v-loading="loading"
                                :default-sort="{prop: 'date', order: 'descending'}" ref="multipleTable"
                                tooltip-effect="dark">
                                <el-table-column type="selection" width="55">
                                </el-table-column>
                                <el-table-column fixed prop="name" label="姓  名" width="91" sortable
                                    :show-overflow-tooltip="true">
                                    <template slot-scope="scope">
                                        {{scope.row.empName}}
                                    </template>
                                </el-table-column>
                                <el-table-column prop="jobNumber" label="工  号" width="91" sortable
                                    :show-overflow-tooltip="true">
                                    <template slot-scope="scope">
                                        {{scope.row.empNum}}
                                    </template>
                                </el-table-column>
                                <el-table-column prop="contract" label="合同主体" width="130" sortable
                                    :show-overflow-tooltip="true">
                                    <template slot-scope="scope">
                                        {{scope.row.mainCompanyName}}
                                    </template>
                                </el-table-column>
                                <el-table-column prop="section" label="部  门" width="110" sortable
                                    :show-overflow-tooltip="true">
                                    <template slot-scope="scope">
                                        {{scope.row.depName}}
                                    </template>
                                </el-table-column>
                                <el-table-column prop="post" label="职  位" width="110" sortable
                                    :show-overflow-tooltip="true">
                                    <template slot-scope="scope">
                                        {{scope.row.position}}
                                    </template>
                                </el-table-column>
                                <el-table-column prop="emptype" label="员工类型" width="100" sortable
                                    :show-overflow-tooltip="true">
                                    <template slot-scope="scope">
                                        <!-- {{scope.row.empType}} （1-全职，2-兼职，3-实习，4-外派） -->
                                        {{scope.row.empType === 1?'全职':''||scope.row.empType === 2?'兼职':''||scope.row.empType === 3?'实习':''||scope.row.empType === 4?'外派':''}}
                                    </template>
                                </el-table-column>
                                <el-table-column prop="stateEmployees" label="员工状态" width="100" sortable
                                    :show-overflow-tooltip="true">
                                    <template slot-scope="scope">
                                        <!-- {{scope.row.status}}   1-离职,2-在职中,3-试用期,4-停薪留职,5-待转正,6-待续签,7-待复职' -->
                                        {{scope.row.status === 1?'离职':''||scope.row.status === 2?'在职中':''||scope.row.status === 3?'试用期':''}}
                                        {{scope.row.status === 4?'停薪留职':''||scope.row.status === 5?'待转正':''||scope.row.status === 6?'待续签':''}}
                                        {{scope.row.status === 7?'待复职':''}}
                                    </template>
                                </el-table-column>
                                <el-table-column prop="phone" label="电话号码" width="110" :show-overflow-tooltip="true">
                                    <template slot-scope="scope">
                                        {{scope.row.telephone}}
                                    </template>
                                </el-table-column>
                                <el-table-column prop="entryDate" label="入职日期" width="180" format="yyyy-MM-dd"
                                    :show-overflow-tooltip="true">
                                    <template slot-scope="scope">
                                        {{scope.row.entryTime}}
                                    </template>
                                </el-table-column>
                                <el-table-column fixed="right" label="操   作" width="210">
                                    <template slot-scope="scope">
                                        <el-button v-if="scope.row.status === 6"
                                            @click.native.prevent="renewClick(scope.row._id)" type="text" size="small">
                                            续签
                                        </el-button>
                                        <el-button v-if="scope.row.status === 7" @click.native.prevent="reinstateClick"
                                            type="text" size="small">
                                            复职
                                        </el-button>
                                        <el-button v-if="scope.row.status === 5" @click.native.prevent="positiveClick"
                                            type="text" size="small">
                                            转正
                                        </el-button>
                                        <el-button @click.native.prevent="checkClick(scope.row.id)" type="text"
                                            size="small">
                                            查看
                                        </el-button>
                                        <el-button v-if="scope.row.status === 6 || scope.row.status === 3 || scope.row.status === 4 || scope.row.status === 2 
                                            || scope.row.status === 5 || scope.row.status === 7 "
                                            @click.native.prevent="personnelClick" type="text" size="small">
                                            人事异动
                                        </el-button>
                                        <el-button
                                            v-if="scope.row.status === 6 || scope.row.status === 3 || scope.row.status === 4 || scope.row.status === 2 ||scope.row.status === 5 || scope.row.status === 7"
                                            @click.native.prevent="salaryClick" type="text" size="small">
                                            调薪
                                        </el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                        <div class="block page">
                            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                                :current-page="pageNum" :page-sizes="[10, 20, 30, 50, 100]" :page-size="pageSize"
                                layout="total, sizes, prev, pager, next, jumper" :total="total">
                            </el-pagination>
                        </div>
                    </div>
                    <div class="table_second" v-show="activeIndex == '2'">
                        <div class="table">
                            <p v-if="renewNum!==0">
                                <i class="iconfont icon-gantanhao "
                                    style="margin-right: 2px; color:rgba(255,199,191,1)"></i>
                                有<span>{{renewNum}}</span>名员工合同即将结束，请尽快处理
                            </p>
                            <p style="background:rgba(230,247,255,1);
                                        border-radius:2px;
                                        opacity:0.5;
                                        border:1px solid rgba(166,197,255,1);" v-if="positive!==0">
                                <i class="iconfont icon-gantanhao "
                                    style="margin-right: 2px; color: rgba(122,162,200,1)"></i>
                                有<span>{{positive}}</span>名员工试用期即将结束，请尽快处理
                            </p>
                            <p style="background:#FBC5C5; padding-right:20px;
                                    border-radius:2px;
                                    opacity:0.5;
                                    border:1px solid rgba(166,197,255,1);" v-if="resumeNumber!==0">
                                <i class="iconfont icon-gantanhao "
                                    style="margin-right: 2px; color: rgba(122,162,200,1)"></i>
                                有<span>{{resumeNumber}}</span>名员工即将到达复职日期，请尽快处理
                            </p>

                            <el-table :data="incumbency" style="width: 100%" v-loading="loading"
                                :default-sort="{prop: 'date', order: 'descending'}" ref="multipleTable"
                                tooltip-effect="dark">
                                <el-table-column type="selection" width="55">
                                </el-table-column>
                                <el-table-column fixed prop="name" label="姓  名" width="91" sortable
                                    :show-overflow-tooltip="true">
                                    <template slot-scope="scope">
                                        {{scope.row.empName}}
                                    </template>
                                </el-table-column>
                                <el-table-column prop="jobNumber" label="工  号" width="91" sortable
                                    :show-overflow-tooltip="true">
                                    <template slot-scope="scope">
                                        {{scope.row.empNum}}
                                    </template>
                                </el-table-column>
                                <el-table-column prop="contract" label="合同公司" width="130" sortable
                                    :show-overflow-tooltip="true">
                                    <template slot-scope="scope">
                                        {{scope.row.mainCompanyName}}
                                    </template>
                                </el-table-column>
                                <el-table-column prop="section" label="部  门" width="110" sortable
                                    :show-overflow-tooltip="true">
                                    <template slot-scope="scope">
                                        {{scope.row.depName}}
                                    </template>
                                </el-table-column>
                                <el-table-column prop="post" label="职  位" width="110" sortable
                                    :show-overflow-tooltip="true">
                                    <template slot-scope="scope">
                                        {{scope.row.position}}
                                    </template>
                                </el-table-column>
                                <el-table-column prop="emptype" label="员工类型" width="120" sortable
                                    :show-overflow-tooltip="true">
                                    <template slot-scope="scope">
                                        <!-- {{scope.row.empType}} （1-全职，2-兼职，3-实习，4-外派） -->
                                        {{scope.row.empType === 1?'全职':''||scope.row.empType === 2?'兼职':''||scope.row.empType === 3?'实习':''||scope.row.empType === 4?'外派':''}}
                                    </template>
                                </el-table-column>
                                <el-table-column prop="stateEmployees" label="员工状态" width="120" sortable
                                    :show-overflow-tooltip="true">
                                    <template slot-scope="scope">
                                        <!-- {{scope.row.status}}   1-离职,2-在职中,3-试用期,4-停薪留职,5-待转正,6-待续签,7-待复职' -->
                                        {{scope.row.status === 1?'离职':''||scope.row.status === 2?'在职中':''||scope.row.status === 3?'试用期':''}}
                                        {{scope.row.status === 4?'停薪留职':''||scope.row.status === 5?'待转正':''||scope.row.status === 6?'待续签':''}}
                                        {{scope.row.status === 7?'待复职':''}}
                                    </template>
                                </el-table-column>
                                <el-table-column prop="phone" label="电话号码" width="110" :show-overflow-tooltip="true">
                                    <template slot-scope="scope">
                                        {{scope.row.telephone}}
                                    </template>
                                </el-table-column>
                                <el-table-column prop="entryDate" label="入职日期" width="110" format="yyyy-MM-dd"
                                    :show-overflow-tooltip="true">
                                    <template slot-scope="scope">
                                        {{scope.row.entryTime}}
                                    </template>
                                </el-table-column>
                                <el-table-column fixed="right" label="操   作" width="210" :show-overflow-tooltip="true">
                                    <template slot-scope="scope">
                                        <el-button v-if="scope.row.status === 6" @click.native.prevent="renewClick"
                                            type="text" size="small">
                                            续签
                                        </el-button>
                                        <el-button v-if="scope.row.status === 7" @click.native.prevent="reinstateClick"
                                            type="text" size="small">
                                            复职
                                        </el-button>
                                        <el-button v-if="scope.row.status === 5" @click.native.prevent="positiveClick"
                                            type="text" size="small">
                                            转正
                                        </el-button>
                                        <el-button @click.native.prevent="checkClick(scope.row.id)" type="text"
                                            size="small">
                                            查看
                                        </el-button>
                                        <el-button v-if="scope.row.status === 6 || scope.row.status === 3 || scope.row.status === 4 || scope.row.status === 2 
                                        || scope.row.status === 5 || scope.row.status === 7 "
                                            @click.native.prevent="personnelClick" type="text" size="small">
                                            人事异动
                                        </el-button>
                                        <el-button
                                            v-if="scope.row.status === 6 || scope.row.status === 3 || scope.row.status === 4 || scope.row.status === 2 ||scope.row.status === 5 || scope.row.status === 7"
                                            @click.native.prevent="salaryClick" type="text" size="small">
                                            调薪
                                        </el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                        <div class="block page">
                            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                                :current-page="pageNum" :page-sizes="[10, 20, 30, 50, 100]" :page-size="pageSize"
                                layout="total, sizes, prev, pager, next, jumper" :total="totalIn">
                            </el-pagination>
                        </div>
                    </div>
                    <div class="table_third" v-show="activeIndex == '3'">
                        <div class="table">
                            <el-table :data="leaveEmpList" style="width: 100%" v-loading="loading"
                                :default-sort="{prop: 'date', order: 'descending'}" ref="multipleTable"
                                tooltip-effect="dark">
                                <el-table-column type="selection" width="55">
                                </el-table-column>
                                <el-table-column fixed prop="name" label="姓  名" width="91" sortable
                                    :show-overflow-tooltip="true">
                                    <template slot-scope="scope">
                                        {{scope.row.empName}}
                                    </template>
                                </el-table-column>
                                <el-table-column prop="jobNumber" label="工  号" width="91" sortable
                                    :show-overflow-tooltip="true">
                                    <template slot-scope="scope">
                                        {{scope.row.empNum}}
                                    </template>
                                </el-table-column>
                                <el-table-column prop="contract" label="合同公司" width="110" sortable
                                    :show-overflow-tooltip="true">
                                    <template slot-scope="scope">
                                        {{scope.row.mainCompanyName}}
                                    </template>
                                </el-table-column>
                                <el-table-column prop="section" label="部  门" width="120" sortable
                                    :show-overflow-tooltip="true">
                                    <template slot-scope="scope">
                                        {{scope.row.depName}}
                                    </template>
                                </el-table-column>
                                <el-table-column prop="post" label="职  位" width="110" sortable
                                    :show-overflow-tooltip="true">
                                    <template slot-scope="scope">
                                        {{scope.row.position}}
                                    </template>
                                </el-table-column>
                                <el-table-column prop="emptype" label="员工类型" width="120" sortable
                                    :show-overflow-tooltip="true">
                                    <template slot-scope="scope">
                                        <!-- {{scope.row.empType}} （1-全职，2-兼职，3-实习，4-外派） -->
                                        {{scope.row.empType === 1?'全职':''||scope.row.empType === 2?'兼职':''||scope.row.empType === 3?'实习':''||scope.row.empType === 4?'外派':''}}
                                    </template>
                                </el-table-column>
                                <el-table-column prop="phone" label="电话号码" width="110" :show-overflow-tooltip="true">
                                    <template slot-scope="scope">
                                        {{scope.row.telephone}}
                                    </template>
                                </el-table-column>
                                <el-table-column prop="termDate" label="离职日期" width="120" format="yyyy-MM-dd"
                                    :show-overflow-tooltip="true">
                                    <template slot-scope="scope">
                                        {{scope.row.leaveDate}}
                                    </template>
                                </el-table-column>
                                <el-table-column fixed="right" label="操   作" width="135" :show-overflow-tooltip="true">
                                    <template slot-scope="scope">
                                        <el-button
                                            v-if="scope.row.status === 6 || scope.row.status === 3 || scope.row.status === 4 || scope.row.status === 2 || scope.row.status === 1"
                                            @click.native.prevent="checkClick(scope.row.id)" type="text" size="small">
                                            查看员工信息
                                        </el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>

                        <div class="block page">
                            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                                :current-page="pageNum" :page-sizes="[10, 20, 30, 50, 100]" :page-size="pageSize"
                                layout="total, sizes, prev, pager, next, jumper" :total="totalIn">
                            </el-pagination>
                        </div>
                    </div>
                </template>
            </div>
        </div>

        <!-- 弹出框 -->
        <div class="dialog">
            <!-- 续签 -->
            <renew v-if="renewVisible" :id='id' :empId="empId" :renewVisible.sync="renewVisible"></renew>
            <!-- 转正 -->
            <positive v-if="positiveVisible" :positiveVisible.sync="positiveVisible"></positive>
            <!-- 复职 -->
            <reinstate v-if="reinstateVisible" :reinstateVisible.sync="reinstateVisible"></reinstate>
            <!-- 人事异动 -->
            <personnel v-if="personnelVisible" :personnelVisible.sync="personnelVisible"></personnel>
            <!-- 调薪 -->
            <salary v-if="salaryVisible" :salaryVisible.sync="salaryVisible"></salary>
        </div>
    </div>
</template>

<script>
    import renew from '@/components/employee/renew.vue'
    import personnel from '@/components/employee/personnel.vue'
    import salary from '@/components/employee/salary.vue'
    import positive from '@/components/employee/positive.vue'
    import reinstate from '@/components/employee/reinstate.vue'

    export default {
        components: {
            renew,
            personnel,
            salary,
            positive,
            reinstate
        },
        data() {
            return {
                empId: "",
                id: "",

                companyName: [],
                department: [],

                formValue: { //表单查询
                    nameNumPhone: '',
                    mainCompanyId: '',
                    depName: '',
                    status: '',
                    empType: '',
                    time: ''

                },
                companyId: 1, //公司Id
                status: "", //员工状态

                //待续签
                renewNum: 0,
                //待转正
                positive: 0,
                //待复职
                resumeNumber: 0,



                loading: true,   // 加载

                allEmpList: [], //全部列表
                leaveEmpList: [],//离职列表
                incumbency: [], //在职列表

                // 员工数量查询
                allEmpSize: '',
                inServiceEmpSize: '',
                outServiceEmpSize: '',

                // 默认条数分页
                total: 0,
                totalIn: 0,
                totalSub: 0,

                pageNum: 1,   //页数
                pageSize: 10,  //每页显示的条数
                // 弹框
                renewVisible: false,
                personnelVisible: false,
                salaryVisible: false,
                positiveVisible: false,
                reinstateVisible: false,

                activeIndex: '1',

                isCollapse: false,

                active: 0,
            }
        },

        methods: {
            // 确认导入
            onImportEx() {
                this.$router.push({
                    path: '/empLead'
                })
            },
            // 重置方案
            resetForm(formValue) {
                this.formValue = {
                    nameNumPhone: '',
                    depName: '',
                    section: '',
                    status: '',
                    empType: '',
                    time: ''
                }
                this.$refs[formValue].resetFields();
            },

            //点击列表获取不同状态列表数据
            handleSelect(key, keyPath) {
                this.activeIndex = key;
                if (this.activeIndex === "1") {
                    this.status = "";
                } else if (this.activeIndex === "2") {
                    this.status = "";
                } else if (this.activeIndex === "3") {
                    this.status = 1;
                }
                this.getEmpList(
                    {
                        companyId: this.companyId,
                        status: this.status,
                    }
                );
            },

            //条件查询
            fnSearch() {
                this.formValue.companyId = this.companyId;
                this.formValue.status = this.status;
                this.getEmpList(
                    this.formValue
                )
            },

            //员工列表查询
            getEmpList(obj) {
                this.loading = true;
                this.$http.get('/emplist/getEmpPage', {
                    params: obj
                }).then(data => {
                    console.log(111111111111111111, data);
                    this.positive = 0;
                    this.renewNum = 0;
                    this.resumeNumber = 0;
                    for (let i = 0; i < data.result.length; i++) {
                        if (data.result[i].status === 5) {
                            this.positive++;
                        } else if (data.result[i].status === 6) {
                            this.renewNum++;
                        } else if (data.result[i].status === 7) {
                            this.resumeNumber++;
                        }
                    }
                    if (data.code === 0) {
                        this.loading = false;

                        if (obj.status === "" && this.activeIndex === "1") {
                            this.allEmpList = data.result;
                            this.total = data.total;
                            // <!-- {{scope.row.status}}   1-离职,2-在职中,3-试用期,4-停薪留职,5-待转正,6-待续签,7-待复职' -->
                        } else if (obj.status === "" && this.activeIndex === "2") {
                            data.result.map((item, index) => {
                                if (item.status === 1) {
                                    data.result.splice(index, 2);
                                }
                                this.incumbency = data.result;
                            })
                            this.incumbency = data.result;
                            this.totalIn = data.total;
                        } else {
                            this.leaveEmpList = data.result;
                            this.totalSub = data.total;
                        }
                    }
                    this.getEmpSize();

                })
            },
            // 获取合同公司
            getCompanyList() {
                this.$http.get('/maincompanylist/queryMainCompanyList', {
                    params: {
                        companyId: 1,

                    }
                }).then(data => {
                    this.companyName = data.result
                })
            },
            // 获取部门下拉
            getStructureByPermits() {
                this.$http.get('/deplist/getStructureByPermits', {
                    params: {
                        id: 1
                    }
                }).then(data => {
                    this.department = data.result;
                    console.log(22, this.department);
                })
            },

            handleChange(val) {
                console.log(val);
            },
            handleClick(tab, event) {
                console.log(tab, event);
            },


            // 操作按钮
            renewClick(id) {
                this.empId = id;
                this.renewVisible = true;
            },
            // 查看员工信息
            checkClick(id) {
                this.$router.push({ path: "/employeeDetails", query: { id: id } });
            },

            personnelClick() {
                this.personnelVisible = true;
            },
            salaryClick() {
                this.salaryVisible = true;
            },
            positiveClick() {
                this.positiveVisible = true;
            },
            reinstateClick() {
                this.reinstateVisible = true;
            },

            //数量查询
            getEmpSize() {
                console.log(this.pageNum, this.pageSize);
                this.loading = true;
                let params = {
                    companyId: 1,
                    pageNum: 1,
                    pageSize: 10
                }
                this.$http.get('/emplist/getEmpSize', { params }).then(data => {
                    console.log(data);
                    this.allEmpSize = data.result.allEmpSize
                    this.inServiceEmpSize = data.result.inServiceEmpSize
                    this.outServiceEmpSize = data.result.outServiceEmpSize
                    this.loading = false;
                })
            },
            // 分页设置
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.pageSize = val;
                const data = {};
                data.companyId = this.companyId;
                data.status = "";
                this.getEmpList(data);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.pageNum = val;
                const data = {};
                data.companyId = this.companyId;
                data.status = "";
                this.getEmpList(data);
            },

        },
        created() {
            this.total = this.allEmpList.length;
            this.totalIn = this.incumbency.length;
            this.totalSub = this.leaveEmpList.length;
        },
        mounted() {
            const data = {};
            data.companyId = this.companyId;
            data.status = "";
            this.getEmpList(data);

            this.getCompanyList();
            this.getStructureByPermits();

            this.getEmpSize();
        },

    }
</script>

<style lang="less" scoped>
    @import "index";

    .employeesList {
        /deep/.table {
            min-height: calc(100vh - 900px);

            .el-table__body-wrapper {
                min-height: calc(100vh - 900px);
            }

        }

        /deep/.el-breadcrumb {
            font-size: 13px;
            font-weight: 500;
            color: rgba(153, 153, 153, 1);
            padding-left: 30px;
        }

        /* 添加 */
        .addclass {
            background: #267FF6;
            box-shadow: 0px 4px 10px 0px rgba(39, 45, 210, 0.3);
        }

        .color {
            color: white;
        }


        .employee_main {
            height: 103px;
            background: rgba(255, 255, 255, 1);
            padding: 17px 20px 0;
            position: relative;

            .el-breadcrumb {
                float: left;
            }

            .button {
                float: right;

                /deep/.el-button {
                    width: 65px;
                    height: 28px;
                    border-radius: 2px;
                    font-size: 12px;
                    font-weight: 500;
                }
            }

            .employee_search {
                height: 36px;
                margin-bottom: 10px;
                background: rgba(255, 255, 255, 1);
                box-shadow: 2px 0px 16px 0px rgba(3, 33, 136, 0.2);
                border-radius: 4px;
                padding: 20px 14px;

                /deep/.el-col {
                    margin-right: 2px;
                }

                /deep/.el-form-item {
                    margin-bottom: 0;
                }

                /deep/.el-range-input {
                    font-size: 12px;
                    font-weight: 500;
                    color: rgba(102, 102, 102, 1);
                }

                /deep/.el-input__inner {
                    font-size: 12px;
                    font-weight: 500;
                    color: rgba(102, 102, 102, 1);
                    line-height: 17px;
                    border-radius: 2px;
                    border: 1px solid rgba(153, 153, 153, 1);
                }

                /deep/.el-date-editor {
                    width: 214px;
                }

                .block {
                    float: left;
                }

                .button {
                    margin-left: 10px;
                    line-height: 40px;

                    /deep/.el-button {
                        width: 70px;
                        height: 36px;
                        border-radius: 2px;
                        margin-left: 0;
                    }
                }


                .btn-collapse {
                    float: right;
                    margin-left: 8px;
                    line-height: 36px;
                    font-size: 12px;
                    font-weight: 500;
                    color: rgba(22, 96, 253, 1);

                    a {
                        color: #1660FD;
                        font-size: 12px;
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

                .search-btns {
                    button {
                        padding: 5px 28px;
                    }
                }

                .btn-collapse {
                    top: 12px;
                }

            }

            /* 收起时的输入框 */
            .search-collapse {
                /deep/.el-input__inner {
                    height: 30px;
                    line-height: 30px;
                    border: 0;
                    border-left: 1px solid rgba(102, 102, 102, 1);
                    border-right: 1px solid rgba(102, 102, 102, 1);
                }

                .block {
                    line-height: 40px;

                    /deep/.el-input__icon {
                        height: 30px;
                    }

                    /deep/.el-range-separator {
                        height: 35px;
                    }
                }

                /deep/.el-col {
                    margin-right: -2px;
                }

                .button {
                    /deep/.el-button {
                        height: 30px;
                    }

                }
            }

            .employee_table {
                /deep/.el-menu {
                    margin: 0 30px 10px;
                }

                /deep/.el-button {
                    margin-right: -15px;
                }

                .table {
                    padding: 0 30px;
                }

                /deep/.el-menu--horizontal>.el-menu-item.is-active {
                    border-bottom: 4px solid #409EFF;
                    font-size: 14px;
                    font-family: PingFangSC-Semibold;
                    font-weight: 600;
                    color: rgba(42, 120, 248, 1);
                }

                /deep/.el-menu-item {
                    font-size: 14px;
                    font-family: PingFangSC-Semibold;
                    font-weight: 600;
                    color: rgba(102, 102, 102, 1);
                }
            }

            .employee_table /deep/.el-tabs__nav-scroll {
                margin-left: 0;

                .el-tabs__active-bar {
                    height: 4px;
                }

                .cell:last-child {
                    margin-left: 70px;
                    background: red;
                }
            }

            /deep/.el-checkbox__inner {
                width: 20px;
                height: 20px;
                border-radius: 4px;
                border: 1px solid #999;
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
                    background: @base;
                }
            }

            /deep/.el-table th {
                padding: 0;
                font-size: 12px;

            }

            /deep/.el-table td,
            .el-table th {
                padding: 3px 0;
                font-size: 12px;
            }

            /deep/.el-table__row td {
                padding-left: 0;
            }

            p {
                width: 245px;
                height: 30px;
                float: left;
                margin: 0 10px 11px 0;
                background: rgba(255, 241, 240, 1);
                border-radius: 2px;
                opacity: 0.5;
                line-height: 30px;
                padding-left: 22px;
                font-size: 12px;
                font-family: PingFangSC-Regular;
                font-weight: 400;
                color: rgba(102, 102, 102, 1);
                border: 1px solid rgba(255, 163, 158, 1);
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
        }
    }
</style>