<template>
  <div class="work-index">
    <div class="zy-bg-breadcrumb">
      <div class="menu-area">
        <div class="comm">
          <el-image
                  class="head"
                  style="width: 50px; height: 50px"
                  src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                  fit="fill"></el-image>
          <div class="user-info">
            <h1>早安，秦玉然</h1>
            <p class="infos">北京佶象信息技术有限公司 - 职能中心 - 人事行政部 - 人事经理 </p>
          </div>
        </div>
        <div class="company-empnum">
          <h2>1990</h2>
          <span>全部在职员工数</span>
        </div>
      </div>
    </div>
    <div class="index-wrap">
      <el-row class="index-cell-top">
        <el-col :span="6">
          <div class="cells index-cell col-index-wrap">
            <span class="cell-left icons icons-1"></span>
            <div class="cell-right">
              <h6 class="cell-title">待转正人员数</h6>
              <h3 class="num num-default">19</h3>
              <span class="cell-datarange">2019-04-01 至 2019-05-01</span>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="cells index-cell col-index-wrap">
            <span class="cell-left icons icons-2"></span>
            <div class="cell-right">
              <h6 class="cell-title">待续签人员数</h6>
              <h3 class="num num-default">9</h3>
              <span class="cell-datarange">2019-04-01 至 2019-05-01</span>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="cells index-cell col-index-wrap">
            <span class="cell-left icons icons-4"></span>
            <div class="cell-right">
              <h6 class="cell-title">待减人员数</h6>
              <h3 class="num num-default">6</h3>
              <span class="cell-datarange">2019-04-01 至 2019-05-01</span>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="cells index-cell col-index-wrap">
            <span class="cell-left icons icons-4"></span>
            <div class="cell-right">
              <h6 class="cell-title">待减人员数</h6>
              <h3 class="num num-default">6</h3>
              <span class="cell-datarange">2019-04-01 至 2019-05-01</span>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row class="index-cell-bottom">
        <el-col :span="6">
          <div class="cells index-cell">
            <div class="cell-top">
              <span class="icons icons-5"></span>
              <h6 class="cell-title">快捷入口</h6>
            </div>
            <ul class="quick-list cell-bottom">
              <li>
                <span class="list-icon icon-structer"></span>
                <p class="quick-name">组织架构</p>
                <span class="quick-desc">查看公司组织架构图</span>
                <i class="el-icon-arrow-right"></i>
              </li>
              <li>
                <span class="list-icon icon-newadd"></span>
                <p class="quick-name">新增员工</p>
                <span class="quick-desc">新增企业员工信息</span>
                <i class="el-icon-arrow-right"></i>
              </li>
              <li>
                <span class="list-icon icon-calc"></span>
                <p class="quick-name">薪资核算</p>
                <span class="quick-desc">月度核算员工薪资</span>
                <i class="el-icon-arrow-right"></i>
              </li>
              <li>
                <span class="list-icon icon-sb"></span>
                <p class="quick-name">社保公积金</p>
                <span class="quick-desc">月度核算社保公积金</span>
                <i class="el-icon-arrow-right"></i>
              </li>
              <li>
                <span class="list-icon icon-ht"></span>
                <p class="quick-name">合同公司</p>
                <span class="quick-desc">管理企业合同主体</span>
                <i class="el-icon-arrow-right"></i>
              </li>
            </ul>
          </div>
        </el-col>
        <el-col :span="18">
          <div class="cells last-cell-wrap">
            <el-row>
              <el-col :span="8">
                <!--<div class="cells last-cell-wrap">-->
                  <div class="left-wrap">
                    <div class="cell-top">
                      <span class="icons icons-6"></span>
                      <h6 class="cell-title">日历</h6>
                      <el-link class="btn-addtx" icon="el-icon-plus">添加提醒</el-link>
                    </div>
                    <div style="margin-top:20px;">
                      <FullCalendar defaultView="dayGridMonth" locale="zh-cn" :height="240" :plugins="calendarPlugins"
                                  :header="header" :eventSources="eventSources" @eventClick="eventClick"/>
                    </div>

                  </div>
                <!--</div>-->
              </el-col>
              <el-col :span="16">
                <!--<div class="cells last-cell-wrap">-->

                <div class="right-wrap">
                  <div class="cell-top">
                    <span class="icons icons-7"></span>
                    <h6 class="cell-title">今日提醒</h6>
                    <el-radio-group class="tab-menu" v-model="txTab" size="mini">
                      <el-radio-button label="0">待办(8)</el-radio-button>
                      <el-radio-button label="1">已办(8)</el-radio-button>
                    </el-radio-group>
                  </div>
                  <ul class="txlist">
                    <li class="tx-li">
                      <span>这里显示事项内容这里显示事项内容这里显示内容这里显示显。</span>
                      <p class="ope-wrap">
                        <i class="el-icon-delete icon-handle"></i>
                        <i class="el-icon-delete"></i>
                      </p>
                    </li>
                    <li class="tx-li">
                      <span>这里显示事项内容这里显示事项内容这里显示内容这里显示显。</span>
                      <p class="ope-wrap">
                        <i class="el-icon-delete icon-handle"></i>
                        <i class="el-icon-delete"></i>
                      </p>
                    </li>
                    <li class="tx-li">
                      <span>这里显示事项内容这里显示事项内容这里显示内容这里显示显。</span>
                      <p class="ope-wrap">
                        <i class="el-icon-delete icon-handle"></i>
                        <i class="el-icon-delete"></i>
                      </p>
                    </li>
                    <li class="tx-li">
                      <span>这里显示事项内容这里显示事项内容这里显示内容这里显示显。</span>
                      <p class="ope-wrap">
                        <i class="el-icon-delete icon-handle"></i>
                        <i class="el-icon-delete"></i>
                      </p>
                    </li>
                    <li class="tx-li">
                      <span>这里显示事项内容这里显示事项内容这里显示内容这里显示显。</span>
                      <p class="ope-wrap">
                        <i class="el-icon-delete icon-handle"></i>
                        <i class="el-icon-delete"></i>
                      </p>
                    </li>
                    <li class="tx-li">
                      <span>这里显示事项内容这里显示事项内容这里显示内容这里显示显。</span>
                      <p class="ope-wrap">
                        <i class="el-icon-delete icon-handle"></i>
                        <i class="el-icon-delete"></i>
                      </p>
                    </li>
                  </ul>
                </div>
                <!--</div>-->
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </div>

    <!--弹框区域-->
    <el-dialog class="zy-dialog-pub zy-dialog-pub-medium" title="添加提醒" :visible.sync="isShowAddremind">
      <el-form ref="dialogCopy" :model="copyPlanForm" :rules="rules" size="mini">
        <el-form-item label="提醒内容" label-width="120px" prop="planname">
          <el-input
                  type="textarea"
                  v-model="copyPlanForm.content"
                  :rows="2"
                  palaceholder="请输入提醒内容（最多50字）">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer t-c">
        <el-button class="button default-button" @click="isShowAddremind = false">取 消</el-button>
        <el-button type="primary" class="blue-button" @click="handleRemind">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  // https://fullcalendar.io/docs/month-view 日历文档
  import FullCalendar from '@fullcalendar/vue'
  import dayGridPlugin from '@fullcalendar/daygrid'

  export default {
    components: {
      FullCalendar // make the <FullCalendar> tag available
    },
    data () {
    return {
      calendarPlugins: [ dayGridPlugin ],
      txTab:0,
      isShowAddremind:false,
      copyPlanForm:{
        content:'',
      },
      rules: {
        content: [
          { required: true, message: '请输入提醒事项', trigger: 'blur' }
        ]
      },
      header:{
        left:   'prev',
        center: 'title',
        right:  'next'
      },
      // events: [
      //   {
      //     title: 'My Event',
      //     start: '2019-07-01',
      //     description: 'This is a cool event'
      //   },
      //   className
      //   // more events here
      // ],
      eventSources: [
        // your event source
        {
          events: [ // put the array in the `events` property
            {
              title  : 'event1',
              start  : '2019-07-01'
            },
            {
              title  : 'event2',
              start  : '2010-01-05',
              end    : '2010-01-07'
            },
            {
              title  : 'event3',
              start  : '2019-07-09T12:30:00',
            }
          ],
          className:'tips',
          color: 'black',     // an option!
          textColor: 'yellow' // an option!
        }],

    }
  },

  methods: {
    //确认添加提醒事件
    handleRemind(){

    },
    eventClick(calEvent, jsEvent, view){
      console.log(calEvent)
    }
  },
  created () {
    
  },
  mounted() {
    
  }

}
</script>
<style lang="less" scoped>
  @import "../../styles/colors";
  .el-row {
    /*margin-bottom: 20px;*/
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .work-index{
    position: relative;
    min-width: 1060px;
    padding: 111px 20px 68px;
    .menu-area{
      padding-top: 14px;
      .comm{
        font-size: 0;
        .head{
          vertical-align: top;
          margin-left: 5px;
          border-radius: 50px;
        }
        .user-info{
          vertical-align: top;
          min-width: 885px;
          margin-left: 20px;
          display: inline-block;
          h1{
            font-size:24px;
            font-family:PingFangSC-Semibold;
            font-weight:600;
          }
          .infos{
            color: @middle;
            font-size:13px;
            font-family:PingFangSC-Regular;
            font-weight:400;
            line-height: 18px;
          }
        }

      }
      .company-empnum{
        /*display: inline-block;*/
        position: absolute;
        right: 30px;
        top: 20px;
        h2{
          font-size:40px;
          font-family:DINAlternate-Bold;
          font-weight:bold;
          color:rgba(51,51,51,1);
          line-height:47px;
          text-shadow:0px 4px 10px rgba(215,215,215,0.59);
          background:linear-gradient(256deg, rgba(60,162,252,1) 0%, rgba(38,127,246,1) 100%);
          background-clip:text;
          text-fill-color:transparent;
          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;
        }
        span{
          font-size: 13px;
          color: @middle;
        }
      }
    }
    /*首页内容区*/
    .index-wrap{
      position: relative;
      font-size: 0;
      .cells{
        display: inline-block;
        vertical-align: top;
        font-size: 0;
        background: @ff;
        box-shadow:2px 0px 16px 0px rgba(3,33,136,0.2);
        border-radius:8px;
        padding: 24px 15px 30px 15px;
        .cell-title{
          font-family:PingFangSC-Medium;
          font-weight:500;
          font-size:16px;
          line-height: 1;
        }
        .icons{
          width: 17px;
          height: 17px;
          vertical-align: top;
        }
        .cell-left{
          display: inline-block;
          margin-right: 10px;
        }
        .cell-right{
          display: inline-block;
        }
      }
      .index-cell-top{
        .index-cell{
          /*width:21.4%;*/
          /*width:220px;*/
          height:106px;
          margin-right: 10px;
        }
        .col-index-wrap{
          /*width: 86%;*/
          display: block;
          margin-right: 10px;
          /*&:last-child{*/
            /*margin-right: 0;*/
          /*}*/
        }
        .icons-1{
          width: 14px;
          height: 14px;
          border-radius: 15px;
          background:linear-gradient(256deg,rgba(60,162,252,1) 0%,rgba(38,127,246,1) 100%);
          box-shadow:0px 4px 10px 0px rgba(215,215,215,0.59);
        }
        .icons-2{
          background:linear-gradient(256deg,rgba(60,162,252,1) 0%,rgba(38,127,246,1) 100%);
          box-shadow:0px 4px 10px 0px rgba(215,215,215,0.59);
        }
        .icons-3{
          background: url("../../assets/images/icon-indexadd.png") no-repeat center/contain;
        }
        .icons-4{
          background: url("../../assets/images/icon-indexreduce.png") no-repeat center/contain;
        }

        .num{
          font-size:40px;
          font-family:DINAlternate-Bold;
          font-weight:bold;
          line-height:47px;
          margin: 19px 0 1px;
        }
        .num-default{
          text-shadow:0px 4px 10px rgba(215,215,215,0.59);
          background:linear-gradient(256deg, rgba(60,162,252,1) 0%, rgba(38,127,246,1) 100%);
          background-clip:text;
          -webkit-background-clip:text;
          text-fill-color:transparent;
          -webkit-text-fill-color:transparent;
        }
        .cell-datarange{
          font-size: 12px;
          font-weight:400;
          color:@middle;
          line-height:17px;
        }
      }
      .index-cell-bottom{
        margin-top: 10px;
        .index-cell{
          /*width: 86%;*/
          height:276px;
          margin-right: 10px;
        }

        .cell-top{
          .icons,.cell-title{
            display: inline-block;
          }
          .cell-title{
            margin-left: 10px;
          }
          .icons-5{
            background: url("../../assets/images/icon-indexquick.png") no-repeat center/contain;
          }
          .icons-6{
            background: url("../../assets/images/icon-indexcalender.png") no-repeat center/contain;
          }
          .icons-7{
            background: url("../../assets/images/icon-tx.png") no-repeat center/contain;
          }
        }
        /*快捷入口*/
        .quick-list{
          color: @middle;
          margin-top: 20px;
          .list-icon{
            display: inline-block;
            width: 20px;
            height: 20px;
            margin-right: 10px;
          }
          .quick-name{
            font-size: 13px;
            font-family:PingFangSC-Semibold;
            font-weight:600;
          }
          .quick-desc{
            font-size: 12px;
            color: @middle;
            width: 116px;
          }
          .icon-structer{
            background: url('../../assets/images/icon-str.png') no-repeat center/contain;
          }
          .icon-newadd{
            background: url('../../assets/images/icon-quickadd.png') no-repeat center/contain;
          }
          .icon-calc{
            background: url('../../assets/images/icon-indexcalc.png') no-repeat center/contain;
          }
          .icon-sb{
            background: url('../../assets/images/icon-indexsb.png') no-repeat center/contain;
          }
          .icon-ht{
            background: url('../../assets/images/icon-indexht.png') no-repeat center/contain;
          }
          i{
            font-size: 14px;
            color: #000;
            font-weight: bold;
          }
          span,p,i{
            display: inline-block;
            vertical-align: middle;
          }
          li{
            height: 40px;
            line-height: 40px;
            border-bottom: 1px solid #ddd;
            .quick-name{
              width: 70px;
            }
          }
        }

        /*日历区域*/
        .last-cell-wrap{
          height:276px;
          /*width: 95%;*/
          display: block;
          margin-right: 10px;
          .left-wrap,.right-wrap{
            display: inline-block;
            vertical-align: top;
          }
          .left-wrap{
            /*width: 245px;*/
            /*margin-right: 50px;*/
          }
          .btn-addtx{
            color: @stepcolor;
            font-size: 13px;
            font-weight:400;
            vertical-align: top;
            position: absolute;
            right: 0;
          }
          .cell-top{
            position: relative;
          }
          .right-wrap{
            display: block;
            /*width: 460px;*/
            margin-left: 50px;
            .tab-ul{
              border-radius: 1px;
              display: inline-block;
              cursor: pointer;
            }
            .tab-menu{
              position: absolute;
              right: 0;
              /deep/.el-radio-button__orig-radio:checked+.el-radio-button__inner{
                background: #fff;
                color: @stepcolor;
                border: 1px solid @stepcolor;
                border-radius:0
              }
              /deep/.el-radio-button--mini .el-radio-button__inner{
                padding: 4.5px 19px;
                font-size: 13px;
              }
            }
            .tab-border{
              border:1px solid @light;
              color: @light;
              font-size: 13px;
              display: inline-block;
              width: 80px;
              height: 24px;
              line-height: 24px;
              &:last-child{
                margin-left: -1px;
              }
            }
            .on{
              color: @stepcolor;
              border-color: @stepcolor;
            }
            .txlist{
              margin-top: 20px;
              .tx-li{
                color: #000;
                cursor: pointer;
                font-size: 13px;
                padding-right: 50px;
                position: relative;
                @h:40px;
                height: @h;
                line-height: @h;
                border-bottom: 1px solid #ddd;
                .ope-wrap{
                  display: inline-block;
                  position: absolute;
                  right: 0;
                  top: 50%;
                  transform: translateY(-50%);
                  text-align: right;
                  color: @stepcolor;
                  .icon-handle{
                    margin-right: 18px;
                  }
                }
                span{
                  width: 100%;
                  display: inline-block;
                }
              }
            }
          }
        }
      }
    }
  }

  body .fc{
    font-size: 10px;
  }
</style>
