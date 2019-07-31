<template>
    <div class="plan-detail zy-main-wraps salary">
        <!--面包屑及按钮区域-->
        <div class="zy-bg-breadcrumb">
            <div class="menu-area">
                <div class="comm">
                    <el-breadcrumb class="bread" separator="/">
                        <el-breadcrumb-item>
                            <a href="/salary">薪资管理</a>
                        </el-breadcrumb-item>
                        <el-breadcrumb-item>
                            <a href="/salary">薪资方案</a>
                        </el-breadcrumb-item>
                        <el-breadcrumb-item>
                            <a>查看方案</a>
                        </el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
                <div class="btns">
                    <el-button @click="$router.push('/salary')">返回</el-button>
                </div>
            </div>
            <div class="plan-title">
                <h2 class="overhidden" :title="detail.planName">{{detail.planName}}</h2>
                <div class="intro">
                    <p>
                        <el-button v-if="detail.status==1" class="enabled" icon="el-icon-success">已启用</el-button>
                        <el-button v-if="detail.status==2" icon="el-icon-error" class="no-enabled">未启用</el-button>
                    </p>
                    <span v-if="detail.workDay">
                        月记薪时长：【按法定计薪天数】{{detail.workDay}}天 {{detail.workHour}}小时/天
                    </span>
                    <span v-else>
                        月记薪时长：【按法定计薪天数】{{detail.workHour}}小时/天
                    </span>
                    <span>
                        计薪方式：按{{detail.salaryType=='1'?'天':'小时'}}
                    </span>
                </div>
            </div>
        </div>

        <!--optionType (integer, optional): 薪资项类型（1-固定工资，2-浮动工资，3-津补贴，4-薪资扣减项）-->
        <!--status (integer, optional): 状态（1-启用，2-禁用，3-删除）-->
        <div class="detail">
            <h6 class="set">薪资项</h6>
            <div class="main">
                <h5>固定工资</h5>
                <template v-for="item in detail.planOptions">
                    <div v-if="item.optionType==1" class="content">
                        <p>{{item.optionName}} - 薪资核算时将引用员工薪资信息中的基本薪资</p>
                        <span>
                          <el-button v-if="item.status==1" class="enabled" icon="el-icon-success">已启用</el-button>
                          <el-button v-if="item.status==2" class="no-enabled" icon="el-icon-success">未启用</el-button>
                        </span>
                    </div>
                </template>
            </div>
            <div class="main">
                <h5>浮动工资</h5>
                <template v-for="item in detail.planOptions">
                    <div v-if="item.optionType==2" class="content">
                        <p>{{item.optionName}} - 薪资核算时需导入此项数据</p>
                        <span>
                          <el-button v-if="item.status==1" class="enabled" icon="el-icon-success">已启用</el-button>
                          <el-button v-if="item.status==2" class="no-enabled" icon="el-icon-success">未启用</el-button>
                        </span>
                    </div>
                </template>
            </div>
            <div class="main">
                <h5>津贴补助</h5>
                <template v-for="item in detail.planOptions">
                    <div v-if="item.optionType==3" class="content">
                        <p>{{item.optionName}} - 按员工薪资比例补贴，补贴比例为5%，补贴月份为“每月”/按固定金额补贴，补贴月份为“1月，2月，3月”</p>
                        <span>
                          <el-button v-if="item.status==1" class="enabled" icon="el-icon-success">已启用</el-button>
                          <el-button v-if="item.status==2" class="no-enabled" icon="el-icon-success">未启用</el-button>
                        </span>
                    </div>
                </template>
            </div>
            <div class="main">
                <h5>薪资扣减项</h5>
                <template v-for="item in detail.planOptions">
                    <div v-if="item.optionType==4" class="content">
                        <p>{{item.optionName}} - 薪资核算时需导入各项数据</p>
                        <span>
                          <el-button v-if="item.status==1" class="enabled" icon="el-icon-success">已启用</el-button>
                          <el-button v-else class="no-enabled" icon="el-icon-success">未启用</el-button>
                        </span>
                    </div>
                </template>
            </div>
        </div>


    </div>
</template>

<script>
    export default {
        data() {
            return {
                detail:{}
            }
        },
        methods:{
            getData(){
                const id = this.$route.query.id;
                this.$http.get('/salaryPlan/querySalaryPlan',{
                    params:{
                        id
                    }
                }).then(res=>{
                    const contents = res.result;
                    this.detail = contents;
                })
            }
        },
        created(){
            this.getData()
        }
    }
</script>

<style lang="less">
    @import "../index";
    .plan-detail{
        .btns{
            margin-bottom: 0;
        }
        .plan-title{
            overflow: hidden;
            padding: 14px 120px;
            h2,.intro{
                float: left;
            }
            h2{
                width:132px;
                font-size:24px;
                margin-top: 4px;
                font-family:PingFangSC-Semibold;
                font-weight:600;
                color:@dark;
                border-right: 1px solid #d8d8d8;
            }
            .intro{
                font-size: 13px;
                padding-left: 13px;
                p{
                    font-weight: normal;
                    margin-bottom: 7px;
                    button{
                        border: 0;
                        padding: 0;
                        font-size: 13px;
                    }

                }
                span{
                    color: @middle;
                    margin-right: 20px;
                }
            }
        }
        .detail{
            box-shadow:2px 0px 16px 0px rgba(3,33,136,0.2);
            border-radius:8px;
            position: relative;
            margin-top: 63px;
            padding: 22px 130px;
            background: @ff;
            font-size:13px;
            h5{
                font-family:PingFangSC-Semibold;
                font-weight:600;
                color: @dark;
            }
            .main{
                padding: 10px 0;
                border-bottom: 1px solid #d8d8d8;
                .content{
                    overflow: hidden;
                    margin-top: 10px;
                    color: @middle;
                    p{
                        float: left;
                        line-height: 1.4;
                    }
                    span{
                        float: right;
                        color: @middle;
                        font-size: 13px;
                        font-family:PingFangSC-Regular;
                        font-weight:400;
                    }
                    button{
                        border: 0;
                        padding: 0;
                    }
                }
            }
        }
        button.enabled{
            color: #66CC66;
        }
        button.no-enabled{
            color: @light;
        }
    }

</style>
