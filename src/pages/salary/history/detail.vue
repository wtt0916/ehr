<template>
    <div class="his-detail zy-main-wraps salary">
        <div class="zy-bg-breadcrumb">
            <div class="menu-area">
                <div class="comm">
                    <el-breadcrumb class="bread" separator="/">
                        <el-breadcrumb-item>
                            <a href="/salary">薪资管理</a>
                        </el-breadcrumb-item>
                        <el-breadcrumb-item>
                            <a href="/salary/history">历史薪资</a>
                        </el-breadcrumb-item>
                        <el-breadcrumb-item>
                            <a>历史薪资</a>
                        </el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
                <div class="btns">
                    <el-button @click="$router.push('/salary/history')">返回</el-button>
                </div>
            </div>
        </div>
        <div class="his-title">
            <div class="month">
                <b>薪资月份：</b><span class="hight-light">2019-05</span>
            </div>
            <div class="count">
                <p>实发薪资总计：<span class="hight-light hight-bold">{{salaryTotal}}元</span></p>
                <p>企业成本总计：<span class="hight-light hight-bold">{{companyCost}}元</span></p>
            </div>
            <div class="tips">
                <p>计薪总人数：<span>{{salaryNum}}人</span></p>
                <p>薪资周期：<span>2019.03.01~2019.03.31</span></p>
                <p>考勤周期：<span>2019.03.01~2019.03.31</span></p>
                <p>对应社保公积金月份：<span>2019.04</span></p>
            </div>
        </div>
        <div class="zy-search-pub search-area" :class="{'search-collapse':isCollapse}">
            <div class="search-item">
                <el-input class="search" placeholder="姓名/工号" v-model="keyword"></el-input>
                <selecttree
                        placeholder="部门"
                        :options="departments"
                        @getValue="onSetDepartMent($event)"
                        ref="selectTree"
                        class="search-dep"
                />
            </div>
            <div class="search-btns">
                <el-button class="his-search light-btn" @click="onSearch">搜索</el-button>
                <el-button class="his-search" @click="onResetSearch">重置</el-button>
            </div>
            <div class="btn-collapse">
                <el-link v-if="!isCollapse" @click="isCollapse=!isCollapse">收起<i class="el-icon-caret-bottom el-icon--right"></i> </el-link>
                <el-link v-else @click="isCollapse=!isCollapse">展开<i class="el-icon-caret-top el-icon--right"></i> </el-link>
            </div>
        </div>
        <!--表格区域-->
        <div class="table-all-wrap">
            <div  class="el-table-wrap">
                <el-table v-loading="loading" class="table-wrap" :data="list" style="width: 100%" height="450" ref="DataTable">
                    <el-table-column fixed type="selection" width="55"></el-table-column>
                    <el-table-column fixed prop="empName" label="姓名" width="100"></el-table-column>
                    <el-table-column prop="empNum" label="工号" width="100"></el-table-column>
                    <el-table-column prop="depName" label="部门" width="100"></el-table-column>
                    <el-table-column prop="position" label="职位" width="100"></el-table-column>
                    <el-table-column prop="empStatus" label="状态" width="100"></el-table-column>
                    <el-table-column prop="empType" label="类型" width="100"></el-table-column>

                    <template v-for="(col,key,index) in columns">
                        <el-table-column v-for="(opt,colIndex) in col" width="100" :key="opt.optionId">
                            <template slot="header" slot-scope="scope">
                                <span class="icon-circle" :class="'icon-co-'+(index+1)"></span>
                                {{opt.optionName}}
                            </template>
                            <template
                                    slot-scope="scope"
                            >{{ (scope.row[key+'OptionList'][colIndex]||{}).optionValue || '-'}}</template>
                        </el-table-column>
                    </template>
                    <el-table-column prop="orgTotal" label="应发" width="100"></el-table-column>
                    <el-table-column prop="actualTotal" label="实发" width="100"></el-table-column>
                    <el-table-column prop="orgAttendance" label="应出勤" width="100"></el-table-column>
                    <el-table-column prop="actualAttendance" label="实际出勤" width="100"></el-table-column>
                    <el-table-column prop="supplyAddTotal.supplyTotal" label="补发" width="100"></el-table-column>
                    <el-table-column prop="supplySubTotal.supplyTotal" label="补扣" width="100"></el-table-column>
                    <el-table-column prop="taxReduce" label="个税" width="100"></el-table-column>
                    <el-table-column prop="lateFee" label="滞纳金" width="100"></el-table-column>
                    <el-table-column prop="attendanceSalary" label="出勤工资" width="100"></el-table-column>
                    <el-table-column prop="remark" label="备注" width="100"></el-table-column>
                    <el-table-column prop="addtionalOption.perIncomeTax" label="个税累计" width="120"></el-table-column>
                    <el-table-column prop="addtionalOption.perIncomeTotal" label="年收入累计" width="120"></el-table-column>
                    <el-table-column prop="addtionalOption.perMonthSub1" label="子女教育" width="120"></el-table-column>
                    <el-table-column prop="addtionalOption.perMonthSub2" label="继续教育" width="120"></el-table-column>
                    <el-table-column prop="addtionalOption.perMonthSub3" label="住房贷款" width="120"></el-table-column>
                    <el-table-column prop="addtionalOption.perMonthSub4" label="住房租金" width="120"></el-table-column>
                    <el-table-column prop="addtionalOption.perMonthSub5" label="赡养老人" width="120"></el-table-column>
                    <el-table-column prop="addtionalOption.perSubTotal" label="累计扣除" width="120"></el-table-column>
                </el-table>
            </div>
            <el-pagination
                    class="t-r"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="sizeAry"
                    :page-size="pageSize"
                    layout=" sizes, prev, pager, next, jumper, slot"
                    :total="total"
            >
            </el-pagination>
        </div>
    </div>
</template>
<script>
    import selecttree from "../../../components/selectTree";
    export default {
        components: {
            selecttree
        },
        data(){
            return{
                loading:false,
                keyword:'',//搜索内容
                isCollapse:false,//是否收起状态
                departments: [],

                // 表区域
                list: [],
                currentPage: 1,
                sizeAry:[10, 20, 30, 50, 100],
                pageSize: 10,
                total: 0,

                companyCost: 0,
                salaryTotal: 0,
                salaryNum: 0,
                columns: {},
            }
        },
        methods:{
            onPage(params) {
                this.loading = true;
                this.$http.get("https://www.easy-mock.com/mock/5d15cbc238f5145ef5374a93/example/api/salary/compute",
                        {
                            params: Object.assign(
                                {
                                    companyId: 111,
                                    pageNum: this.currentPage,
                                    pageSize: this.pageSize
                                },
                                params
                            )
                        }
                    ).then(response => {
                        //如果返回为空，则尚未选择月份
                        if (!response.result) {
                            this.getMonth();
                            this.isShowCheckMonth = true;
                            return;
                        }
                        this.list = response.result.empSalarys;
                        this.total = response.total;
                        // //本月入职
                        this.joinSalaryIds = response.result.joinSalaryIds;
                        // //本月离职
                        this.leaveSalaryIds = response.result.leaveSalaryIds;
                        // //企业成本
                        this.companyCost = response.result.companyCost;
                        // //薪资总计
                        this.salaryTotal = response.result.salaryTotal;
                        // //计薪人数
                        this.salaryNum = response.result.salaryNum;
                        const propertys = Object.keys(response.result.columns);
                        this.list.forEach(model => {
                            propertys.forEach(key => {
                                let temp = [];
                                temp = JSON.parse(JSON.stringify(response.result.columns[key]));
                                temp.forEach(item => {
                                    const curModel = model[`${key}OptionList`].find(
                                        f => f.optionId == item.optionId
                                    );
                                    if (curModel) Object.assign(item, curModel);
                                });
                                model[`${key}OptionList`] = temp;
                            });
                        });
                        this.columns = response.result.columns;
                        console.log(this.list);

                        // this.list.forEach(model => {
                        //   propertys.forEach(key => {
                        //     let temp = {};
                        //     model[`${key}OptionList`].forEach(item => {
                        //       temp[item.optionId] = JSON.parse(JSON.stringify(item));
                        //     });
                        //     model[key] = temp;
                        //   });
                        // });
                        // this.columns = response.result.columns;
                    }).finally(t=>{
                        this.loading = false;
                });
            },
            onSearch(){
                this.$http.get('/api/salaryplanlist/query.json',{
                    params:{
                        key:this.keyword
                    }
                }).then(res=>{
                    const contents = res.result;
                    // this.handleShowList(contents);
                })
            },
            onResetSearch(){},
            onSetDepartMent(value) {
                this.depChecked = value;
            },
            onDepartments() {
                this.$http.get("/api/deplist/getStructer.json", {}).then(response => {
                    this.departments = [response.result];
                });
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            }
        },
        created(){
            this.onDepartments();
            this.onPage()
        }
    }
</script>
<style lang="less" scoped>
@import "../index";
.his-detail{
    .his-title{
        position: relative;
        background: @ff;
        border-radius:4px;
        padding: 20px 20px 22px 20px;
        font-size: 13px;
        box-shadow:2px 0px 16px 0px rgba(3,33,136,0.2);
        p{
            display: inline-block;
        }
        .hight-light{
            color: @base;
        }
        .hight-bold{
            font-family:DINAlternate-Bold;
            font-weight:bold;
            font-size: 20px;
            /*line-height: 28px;*/
        }
        .month,.count,.tips{
            line-height: 1.4;
        }
        .count{
            margin-top: 7px;
            p{
                margin-right: 60px;
            }
        }
        .tips{
            margin-top: 25px;
            p{
                margin-right: 100px;
            }
            p:last-child{
                margin-right: 0;
            }
        }
    }
    .search-area{
        margin-top: 10px;
        .search-dep{
            /deep/.el-input{
                width: 100px;
            }
        }
        .search{
            width: 160px;
        }
        .his-search-input{
            width: 160px;
        }
    }
    .icon-circle {
        @h: 10px;
        width: @h;
        height: @h;
        border-radius: @h;
        margin-right: 4px;
        display: inline-block;
    }
    .icon-co-1 {
        background-color: #267ff6;
    }
    .icon-co-2 {
        background-color: #2e1cac;
    }
    .icon-co-3 {
        background-color: #f626cb;
    }
    .icon-co-4 {
        background-color: #f62654;
    }
}
</style>