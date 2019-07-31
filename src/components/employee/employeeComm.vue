<template>
    <div>
        <!-- 面包屑 -->
        <div class="dh_top">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <!-- <el-breadcrumb-item><a href="/">员工管理</a></el-breadcrumb-item> -->
                <el-breadcrumb-item>员工列表</el-breadcrumb-item>
                <el-breadcrumb-item>员工详情</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="dh_top_ul">
                <el-button type="primary" plain @click='hrefTo'>发送工资条</el-button>
                <el-button plain v-if="empDetails.status === 6" @click="renew">续签</el-button>
                <el-button plain v-if="empDetails.status === 5" @click="positive">转正</el-button>
                <el-button plain v-if="empDetails.status === 7" @click="reinstate">复职</el-button>
                <el-button plain @click="personnel">人事异动</el-button>
                <el-button plain @click="salary">调薪</el-button>
            </div>
        </div>
        <div class="dh_bottom">
            <dl class="dh_bottom_l">
                <!-- <dt>1</dt> -->
                <dt class="demo-fit">
                    <!-- <div class="block">
                        <el-avatar shape="square" :size="100" :fit="fit" :src="squareUrl"></el-avatar>
                    </div> -->
                </dt>
                <dd>
                    <div class="dh_bottom_l_mess" style="line-height:36px;">
                        <strong>{{empDetails.empName}}</strong>
                        <!-- （1-全职，2-兼职，3-实习，4-外派） -->
                        <span>{{empDetails.empType === 1?'全职':''||empDetails.empType === 2?'兼职':''
                            ||empDetails.empType === 3?'实习':''||empDetails.empType === 4?'外派':''}}</span>

                            <!-- 1-离职，2-在职中，3-试用期，4-停薪留职，5-待转正，6-待续签，7-待复职 -->
                        <span style="background:rgba(17,207,73,1)">
                            {{empDetails.status === 1?'离职':''||empDetails.status === 2?'在职中':''
                        ||empDetails.status === 3?'试用期':''||empDetails.status === 4?'停薪留职':''||empDetails.status === 5?'待转正':''
                        ||empDetails.status === 6?'待续签':''||empDetails.status === 7?'待复职':''}}
                        </span>
                    </div>
                    <ul>
                        <li><span>岗位：</span><span>{{empDetails.depName}}</span>-<span>{{empDetails.position}}</span></li>
                        <li><span>在职时长：</span>2年5天</li>
                        <li><span>入职时间：</span>{{empDetails.entryTime}}</li>
                    </ul>
                </dd>
                <ul class="dh_bottom_l_export">
                    <li>
                        <i class="iconfont icon-dayinji" style="font-size:13px;"></i>
                        <span>材料导出</span>
                    </li>
                    <li>
                        <i class="iconfont icon-xiazai" style="font-size:13px;"></i>
                        <span>材料导出</span>
                    </li>
                </ul>
            </dl>
        </div>
        <!-- 续签 -->
        <renew v-if="renewVisible" :renewVisible.sync="renewVisible"></renew>
        <!-- 转正 -->
        <positive v-if="positiveVisible" :positiveVisible.sync="positiveVisible"></positive>
        <!-- 复职 -->
        <reinstate v-if="reinstateVisible" :renewVisible.sync="reinstateVisible"></reinstate>
        <!-- 人事异动 -->
        <personnel v-if="personnelVisible" :personnelVisible.sync="personnelVisible"></personnel>
        <!-- 调薪 -->
        <salary v-if="salaryVisible" :salaryVisible.sync="salaryVisible"></salary>
        <!-- 发送工资条 -->
        <sheet v-if="sheetVisible" :sheetVisible.sync="sheetVisible"></sheet>
    </div>

</template>

<script>
    import renew from '@/components/employee/renew'
    import positive from '@/components/employee/positive'
    import reinstate from '@/components/employee/reinstate'
    import personnel from '@/components/employee/personnel'
    import salary from '@/components/employee/salary'
    import sheet from '@/components/employee/salarySheet'
    export default {
        data() {
            return {
                renewVisible: false,
                positiveVisible:false,
                reinstateVisible:false,
                personnelVisible: false,

                salaryVisible: false,
                sheetVisible: false,

                // 员工详情
                empDetails: [],

                // 头像
                fit: ['cover'],
                squareUrl: 'src/assets/images/icon-shezhi.png',
            }
        },
        components: {
            renew,
            positive,
            reinstate,
            personnel,
            salary,
            sheet,
        },
        methods: {
            hrefTo() {
                // this.$router.push({ path: '/staffEdit' });
                this.sheetVisible = true;
            },
            renew() {
                this.renewVisible = true;
            },
            positive(){
                this.positiveVisible = true;
            },
            reinstate(){
                this.reinstateVisible = true;
            },

            personnel() {
                this.personnelVisible = true;
            },
            salary() {
                this.salaryVisible = true;
                console.log(11);
            },


            // 获取员工详情
            getEmpDetails() {
                var empId = Number(this.$route.query.id);
                // console.log(empId);
                this.$http.get("/emplist/getEmpInfo", {
                    params: {
                        id: empId
                    }
                }).then(data => {
                    this.empDetails = data.result
                })
            },
        },
        mounted(){
            this.getEmpDetails();
        }
    }
</script>

<style scoped lang="less">
    /* 面包屑 */
    .detail_header .el-breadcrumb {
        width: 191px;
        height: 18px;
        font-size: 13px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(153, 153, 153, 1);
        line-height: 18px;
        padding: 16px 0 0 30px;
        float: left;
        cursor: default;
    }

    .dh_top {
        height: 53px;

        .dh_top_ul {
            float: right;
            margin: 23px 30px 0 0;

            /deep/.el-button {
                width: 89px;
                height: 28px;
                border-radius: 2px;
            }
        }
    }

    .dh_bottom {
        margin: 0 0 17px 72px;
    }




    .dh_bottom_l dt {
        width: 46px;
        height: 50px;
        border: 1px dashed rgb(49, 13, 13);
        margin-right: 21px;
        float: left;
    }

    .dh_bottom_l_mess strong {
        width:100px;
        height: 35px;
        font-size: 24px;
        display: inline-block;
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        color: rgba(51, 51, 51, 1);
        line-height: 33px;
        margin-bottom: 1px;
    }

    .dh_bottom_l_mess span {
        width: 40px;
        height: 18px;
        display: inline-block;
        text-align: center;
        background: rgba(24, 144, 255, 1);
        border-radius: 2px;
        opacity: 0.5;
        font-size: 12px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 17px;
    }

    .dh_bottom_l ul {
        font-size: 13px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        height: 35px;
        float: left;
        padding: 0;
        margin: 0;
    }

    .dh_bottom_l ul li {
        float: left;
        margin-right: 16px;
    }


    /* 材料导出 */
    .dh_bottom_l .dh_bottom_l_export {
        position: absolute;
        top: 83px;
        right: 17px;
        color: rgba(48, 82, 240, 1);
        font-size: 12px;
    }
</style>