<template>
    <div class="his salary">
        <!--面包屑及按钮区域-->
        <div class="zy-bg-breadcrumb">
            <div class="menu-area">
                <div class="comm">
                    <el-breadcrumb class="bread" separator="/">
                        <el-breadcrumb-item>
                            <a href="/salary">薪资管理</a>
                        </el-breadcrumb-item>
                        <el-breadcrumb-item>
                            <a>历史薪资</a>
                        </el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
                <div class="btns">
                    <el-button type="primary" @click="onImportEx">导入历史薪资</el-button>
                    <el-button>导出</el-button>
                </div>
            </div>
            <div class="pick-month-wrap t-c" v-show="isShowMonthRange">
                <el-date-picker
                        v-model="importMonthRange"
                        type="monthrange"
                        value-format="yyyy-MM"
                        range-separator="至"
                        start-placeholder="开始月份"
                        end-placeholder="结束月份">
                </el-date-picker>
                <div class="monthrange-btn">
                    <el-button class="button default-button" @click="isShowMonthRange = false">取消</el-button>
                    <el-button class="button blue-button" @click="onConfirmImportEx">确定</el-button>
                </div>
            </div>
        </div>
        <!--搜索区域-->
        <div class="zy-search-pub search-area" :class="{'search-collapse':isCollapse}">
            <el-date-picker
                    v-model="monthAry"
                    type="monthrange"
                    value-format="yyyy-MM"
                    range-separator="至"
                    start-placeholder="开始月份"
                    end-placeholder="结束月份">
            </el-date-picker>
            <el-button class="his-search light-btn" @click="onSearch">搜索</el-button>
            <el-button class="his-search" @click="onResetSearch">重置</el-button>
            <div class="btn-collapse">
                <el-link v-if="!isCollapse" @click="isCollapse=!isCollapse">收起<i class="el-icon-caret-bottom el-icon--right"></i> </el-link>
                <el-link v-else @click="isCollapse=!isCollapse">展开<i class="el-icon-caret-top el-icon--right"></i> </el-link>
            </div>
        </div>
        <!--表格区域-->
        <el-table class="table-wrap" :data="tableData" style="width: 100%" v-loading="isloading" height="450">
            <el-table-column fixed type="selection" width="65"></el-table-column>
            <el-table-column fixed prop="salaryMonth" label="台账月份"></el-table-column>
            <el-table-column prop="salaryEmpNum" label="计薪人数"></el-table-column>
            <el-table-column prop="orgTotal" label="实发薪资总计"></el-table-column>
            <el-table-column prop="companyTotal" label="企业成本" width="120"></el-table-column>
            <el-table-column prop="zip" fixed="right" label="操作" width="270">
                <template slot-scope="scope">
                    <el-button @click="onSeeDetail(scope.row)" type="text" size="small">查看</el-button>
                    <el-button @click="onSendSalarybill(scope.row)" type="text" size="small">发送工资条</el-button>
                    <el-button @click="onWithdraw(scope.row)" type="text" class="table-btn-gray" size="small">反归档</el-button>
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
        <!--反归档弹框-->
        <el-dialog class="zy-dialog-pub zy-dialog-pub-medium dia-withdraw" title="反归档" :visible.sync="isShowwithdraw">
           <div class="head-top">
               薪资月份：{{curItem.salaryMonth}}
           </div>
            <div class="head-body">
                <h6 class="h6-title">提示</h6>
                <P>1、反归档适用于实发薪资数据与当前已归档薪资数据不符时，可直接 操作【反归档】。 </P>
                <P>2、若需对员工错发的工资进行补发或者补扣，可直接操作【补发补扣】。</P>
            </div>
            <div slot="footer" class="dialog-footer t-c">
                <el-button class="button default-button" @click="isShowwithdraw = false">进行【补发补扣操作】</el-button>
                <el-button type="primary" class="blue-button" @click="onConfirmWithdraw">反归档，进行薪资信息调整</el-button>
            </div>
        </el-dialog>
        <!--发送工资条-->
        <el-dialog class="zy-dialog-pub zy-dialog-pub-large dia-send-salarybill" title="发送工资条" :visible.sync="isShowSendSalarybill">
            <div class="head-top dia-photo-info">
                <el-image class="header-img" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg">
                    <div slot="error" class="image-slot">
                        <i class="el-icon-picture-outline"></i>
                    </div>
                </el-image>
                <div class="right-info">
                    <div class="info-top">
                        <h4 class="user-name">张三</h4>
                        <span class="other-info">GW00174509</span>
                    </div>
                    <p class="other-info">
                        这是公司名称-产品运营部-产品经理
                    </p>
                </div>
            </div>
            <div class="head-body">
                <div class="pick-month t-c">
                    <span>工资条月份</span>
                    <el-date-picker
                            v-model="diaBillMonth"
                            type="month"
                            placeholder="选择月">
                    </el-date-picker>
                </div>
                <p class="dia-sendtips">
                    <el-link>工资条将发送至员工邮箱，是否现在发送工资条？</el-link>
                </p>
                <div slot="footer" class="dialog-footer t-c">
                    <el-button class="button default-button" @click="isShowSendSalarybill = false">取消</el-button>
                    <el-button type="primary" class="blue-button" @click="onWithdraw">确定</el-button>
                </div>
            </div>
        </el-dialog>
        <!--发送工资条反馈提示-->
        <el-dialog class="zy-dialog-pub zy-dialog-pub-medium" title="提示" :visible.sync="isShowSendMessage">
            <!--el-icon-success-->
            <p class="dia-tips t-c">
                <i class="icon-success el-icon-success"></i>已成功将工资条发送至员工邮箱！
            </p>
            <p class="dia-sendtips">
                <el-link>如果您的浏览器未自动跳转，请点击这里</el-link>
            </p>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isCollapse:false,//是否收起状态
                isloading:false,

                sizeAry:[10, 20, 30, 50, 100],
                pageSize:10,
                currentPage: 1,
                total:0,
                tableData: [],
                monthAry:[],

                //导入
                importMonthRange:false,
                isShowMonthRange:false,

                //反归档弹框
                isShowwithdraw:false,

                //发送工资条弹框
                isShowSendSalarybill:false,
                diaBillMonth:'',

                //发送工资条反馈提示弹框
                isShowSendMessage:false,

                curItem:[],//当前选中item
            }
        },
        methods:{
            getData(){
                this.isloading = true;
                this.$http.get('https://www.easy-mock.com/mock/5d15cbc238f5145ef5374a93/example/api/salary/queryHistorical',{
                    params:{
                        pageNum:this.currentPage,
                        pageSize:this.pageSize
                    }
                }).then(res=>{
                    this.total = res.total;
                    const contents = res.result;
                    this.handleShowList(contents);
                }).finally(a => {
                    this.isloading = false;
                });
            },
            onSearch(){
                console.log(this.monthAry);
                this.$http.get('https://www.easy-mock.com/mock/5d15cbc238f5145ef5374a93/example/api/salary/queryHistorical',{
                    params:{
                        key:this.searchKey
                    }
                }).then(res=>{
                    const contents = res.result;
                    this.handleShowList(contents);
                })
            },
            onResetSearch(){

            },
            handleShowList(contents){
                this.tableData = contents;
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.pageSize = val;
                this.getData()
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.pageNum = val;
                this.getData()
            },
            //导入
            onImportEx(){
                this.isShowMonthRange = true;
            },
            // 确认导入
            onConfirmImportEx(){
                if(!this.importMonthRange){
                    this.$message({
                        message: '请选择要导入的日期',
                        type: 'warning'
                    });
                    return;
                }
                this.$router.push({
                    path:'/salary/hisImport'
                })
            },
            //查看
            onSeeDetail(item){
                this.$router.push({
                    path:'/salary/hisDetail',
                    query:{
                        id:item.id
                    }
                })
            },
            // 发送工资条
            onSendSalarybill(item){
                this.curItem = item;
                this.isShowSendSalarybill = true;
            },
            //反归档
            onWithdraw(item){
                this.curItem = item;
                this.isShowwithdraw = true;
            },
            //反归档弹框确认按钮
            onConfirmWithdraw(){

            }
        },
        created(){
            this.getData()
        }
    }
</script>

<style lang="less">
    /*@import "../../../styles/colors";*/
    @import "../index";
    .his{
        position: relative;
        padding: 68px 20px;
        .pick-month-wrap{
            position: absolute;
            z-index: 11;
            background: #fff;
            padding: 16px;
            right: 0;
            box-shadow:0px 1px 17px 0px rgba(54,78,159,0.29);
            .monthrange-btn{
                margin-top: 30px;
                .default-button{
                    padding: 7px 25px;
                }
            }
        }
        .el-table{
            position: relative;
            background:@ff;
            box-shadow:0px 1px 17px 0px rgba(54,78,159,0.29);
            border-radius: 4px;
        }
        .his-search{
            width: 80px;
            height: 36px;
            border-radius: 2px;
            border:1px solid @base;
            font-size: 12px;
            font-weight: 400;
            color: @base;
            margin-right: 6px;
        }
        .zy-bg-breadcrumb{
            .btns{
                position: relative;
                button:nth-of-type(1){
                    width: 100px;
                }

            }
        }

        .primary{
            background: @base;
            color: #fff;
        }
        .search-collapse{
            .el-date-editor--monthrange{
                border: 0;
            }
        }
        .search-area{
            /*padding: 20px 30px;*/
            position: relative;
            background: #fff;
            box-shadow:2px 0px 16px 0px rgba(3,33,136,0.2);
            border-radius:4px;
            margin-bottom: 10px;
        }
        .el-date-editor{
            margin-right: 16px;
        }
        /*反归档弹框*/
        .dia-withdraw{
            line-height: 1.4;
            .head-top{
                padding: 0 30px;
                margin-bottom: 9px;
            }
            .head-body{
                font-weight:400;
                height: 116px;
                color: @redcolor;
                p:not(:first-child){
                    margin-top: 4px;
                }
                .h6-title{
                    font-size: 13px;
                    font-weight:400;
                    margin-bottom: 9px;
                }
            }

        }
        /*发送工资条弹框*/
        .dia-send-salarybill{
            .dia-sendtips{
                margin-top: 107px;

            }
        }
        .dia-tips{
            margin-bottom: 19px;
            i{
                margin-right: 9px;
            }
            .icon-success{
                color: @success;
            }
        }
        /*弹框里的蓝色链接提示*/
        .dia-sendtips{
            text-align: center;
            a{
                color: @base;
                font-size:13px;
                font-weight:400;
            }
        }
    }

</style>
