<template>
    <div class="plan zy-main-wraps salary">
        <!--面包屑及按钮区域-->
        <div class="zy-bg-breadcrumb">
            <div class="menu-area">
                <div class="comm">
                    <el-breadcrumb class="bread" separator="/">
                        <el-breadcrumb-item>
                            <a href="/salary">薪资管理</a>
                        </el-breadcrumb-item>
                        <el-breadcrumb-item>
                            <a>薪资方案</a>
                        </el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
                <div class="btns">
                    <el-button type="primary" @click="$router.push('/salary/addPlan')">新增方案</el-button>
                </div>
            </div>
        </div>

        <div class="zy-search-pub search-area" :class="{'search-collapse':isCollapse}">
            <div class="search-item">
                <el-input placeholder="方案名称" v-model="searchKey"></el-input>
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
        <el-table
                show-overflow-tooltip
                v-loading="loading"
                class="table-wrap"
                :data="tableData"
                :height="tableHeight"
                style="width: 100%">
            <el-table-column type="index" label="序号" width="50"></el-table-column>
            <el-table-column prop="planName" label="方案名称" width="200" show-overflow-tooltip></el-table-column>
            <el-table-column prop="planName" label="计薪方式" width="100">
                <template slot-scope="scope">
                    按{{scope.row.salaryType==1?'天':'小时'}}
                </template>
            </el-table-column>
            <el-table-column prop="planName" label="月计薪时长" width="100">
                <template slot-scope="scope">
                    {{scope.row.workDay}}天{{scope.row.workHour}}小时
                </template>
            </el-table-column>
            <el-table-column prop="planOption" label="薪资项" width="280" show-overflow-tooltip></el-table-column>
            <el-table-column prop="planOption" label="个税申报方式" width="120">
                <template slot-scope="scope">
                    {{scope.row.perIncomeTax==1?'当月':'次月'}}
                </template>
            </el-table-column>
            <el-table-column prop="createrName" label="添加人" width="110"></el-table-column>
            <el-table-column prop="updateTime" label="更新时间" width="160"></el-table-column>
            <el-table-column label="操作" width="260" fixed="right">
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.status" @change="handleChangeStatus(scope.row)"></el-switch>
                    <el-button @click="$router.push(`/salary/planDetail?id=${scope.row.id}`)" type="text" size="small">查看</el-button>
                    <el-button type="text" size="small" @click="handleModify(scope.row)">编辑</el-button>
                    <el-button type="text" size="small" @click="handleCopy(scope.row)">复制</el-button>
                    <el-button type="text" size="small" @click="handleDel(scope.row, scope.$index)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                class="t-r"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="sizeAry"
                :page-size="pageSize"
                layout=" sizes, prev, pager, next, jumper"
                :total="total">
        </el-pagination>

        <!--弹框区域-->
        <!--复制-->
        <el-dialog class="zy-dialog-pub zy-dialog-pub-medium" title="复制薪资方案" :visible.sync="isShowCopyPlan">
            <el-form ref="dialogCopy" :model="copyPlanForm" :rules="rules" size="mini">
                <el-form-item label="方案名称" label-width="120px" prop="planname">
                    <el-input v-model="copyPlanForm.planname" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer t-c">
                <el-button class="button default-button" @click="isShowCopyPlan = false">取 消</el-button>
                <el-button type="primary" class="blue-button" @click="onCopy">确 定</el-button>
            </div>
        </el-dialog>
        <!--删除弹框-->
        <el-dialog class="zy-dialog-pub zy-dialog-pub-medium" title="提示" :visible.sync="isShowDel">
            <p class="word-explain">是否删除此方案？</p>
            <div slot="footer" class="dialog-footer t-c">
                <el-button class="button default-button" @click="isShowDel = false">取 消</el-button>
                <el-button type="primary" class="blue-button" @click="onDel">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                loading:false,
                searchKey:null,//搜索内容
                isCollapse:false,//是否收起状态
                total:0,
                currentPage: 1,
                pageSize:10,
                sizeAry:[10, 20, 30, 50, 100],
                tableData: [],
                tableHeight: window.innerHeight - 255,
                isShowCopyPlan:false,//是否显示复制薪资方案弹框
                copyPlanForm:{
                    planname:''
                },
                rules: {
                    planname: [
                        { required: true, message: '请输入方案名称', trigger: 'blur' }
                    ]
                },
                copyItem:'',//当前复制项

                isShowDel:false,
                delIndex:''
            }
        },
        methods:{
            getData(pageNum){
                let params = {
                    pageNum: this.currentPage-1,
                    pageSize: this.pageSize,
                    companyId:1
                }
                this.loading = true;
                // const url = '';
                // const url = 'https://www.easy-mock.com/mock/5d15cbc238f5145ef5374a93/example/api';
                this.$http.get('/salaryPlan/queryList',{params}).then(res=>{
                    const contents = res.result;
                    this.total = res.total;
                    this.handleShowList(contents);
                }).finally(t=>{
                    this.loading = false
                })
            },
            onSearch(){
                this.loading = true;
                this.$http.get('/salaryPlan/queryList',{
                    params:{
                        planName:this.searchKey,
                        pageNum: this.currentPage-1,
                        pageSize: this.pageSize,
                        companyId:1
                    }
                }).then(res=>{
                    const contents = res.result;
                    this.total = res.total;
                    this.handleShowList(contents);
                }).finally(t=>{
                    this.loading = false
                })
            },
            handleShowList(contents){
                console.log(contents);
                contents.forEach(item=>{
                    item.status==1?(item.status = true):(item.status = false);//switch开关组件接收true/false，这里转一下
                    var optionName = [];
                    item.planOptions.forEach(data=>{
                        if(data.status==1) optionName.push(data.optionName);
                    })
                    item.planOption = optionName.join(',')
                })
                this.tableData = contents;
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.pageSize = val;
                this.getData();
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.currentPage = val;
                this.getData();
            },
            onResetSearch(){
                this.searchKey = null;
                this.onSearch();
            },
            // 修改薪资状态
            handleChangeStatus(item){
                let status = item.status?1:2;
                const params = {
                    id:item.id,
                    status
                }
                this.$http.get('/salaryPlan/updateStatus',{params}).then(res=>{

                })
            },
            handleModify(item){
                this.$router.push({
                    path:'/salary/modifyPlan',
                    query:{
                        id:item.id
                    }
                });
            },
            //复制此方案
            handleCopy(item){
                this.copyItem = item;
                this.isShowCopyPlan = true;
            },
            onCopy(){
                const params = {
                    companyId:1,
                    planName:this.copyPlanForm.planname,
                    id:+this.copyItem.id
                }
                this.$http.get('/salaryPlan/copyPlan',{params}).then(res=>{
                    const content = res.result;
                    this.$router.push({
                        path:'/salary/modifyPlan',
                        query:{
                            id:content
                        }
                    })
                })
            },
            //点击删除按钮
            handleDel(item,index){
                this.delIndex = index;
                this.delItem = item;
                this.isShowDel = true;
            },
            //删除
            onDel(){
                const params ={
                    companyId:1,
                    planId:this.delItem.planId,
                    id:this.delItem.id
                }
                this.$http.post('/salaryPlan/deleteSalaryPlan',params).then(res=>{
                    this.getData();
                    this.isShowDel = false;
                })
            },
        },
        created(){
            this.getData()
        }
    }
</script>

<style lang="less">
    @import "../index";
    .plan{
        .el-table{
            box-shadow:0px 1px 17px 0px rgba(54,78,159,0.29);
            border-radius: 4px;
        }
        /deep/.el-switch.is-checked .el-switch__core{
            background-color: @base;
            border-color: @base;
        }
        /*弹框主体区域*/
        .el-dialog__body{
            overflow: hidden;
            .el-input{
                width: 270px;
            }
            .blue-button{
                margin-left: 10px;
            }
            .personnel{
                padding: 10px 0;
            }
        }
    }

</style>
