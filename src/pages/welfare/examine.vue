<template>
  <div class="planView">
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">社保公积金</el-breadcrumb-item>
        <el-breadcrumb-item>
          <a href="javascript:;">缴纳方案</a>
        </el-breadcrumb-item>
        <el-breadcrumb-item>查看</el-breadcrumb-item>
      </el-breadcrumb>
      <el-button @click="Return">返回</el-button>
    </div>
    <div class="viewDetails">
      <span>
        方案名称：
        <em>{{headerDate.planName}}</em>
      </span>
      <span>
        缴纳主体：
        <em>{{headerDate.mainCompanyName}}</em>
      </span>
      <span>
        缴纳地区：
        <em>{{headerDate.provinceName}}-{{headerDate.cityName}}</em>
      </span>
      <span>
        当前状态：
        <em>{{headerDate.status}}</em>
      </span>
    </div>
    <div class="see_social">
      <p>
        <span>社保</span>
        <span>共{{socialNum}}个缴纳项</span>
      </p>
      <el-table :data="socialTable" style="width: 100%" v-loading="loading">
        <el-table-column prop="optionName" label="缴纳项名称" width="180" align="center"></el-table-column>
        <el-table-column label="基数范围" width="200" align="center">
          <template slot-scope="scope">
            <p>{{scope.row.baseStart}}-{{scope.row.baseEnd}}</p>
          </template>
        </el-table-column>
        <el-table-column label="缴纳对象" width="100" align="center">
          <template slot-scope="scope">
            <p>公司</p>
            <p>个人</p>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="城镇户口缴纳比例" align="center">
          <template slot-scope="scope">
            <p>{{scope.row.companyRatio1}}</p>
            <p>
              {{scope.row.personalRatio1}}
              <span v-if="scope.row.exFee1">-{{scope.row.exFee1}}</span>
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="非城镇户口缴纳比例" align="center">
          <template slot-scope="scope">
            <p>{{scope.row.companyRatio2}}</p>
            <p>
              {{scope.row.personalRatio2}}
              <span v-if="scope.row.exFee2">-{{scope.row.exFee2}}</span>
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="是否缴纳" width="150" align="center">
          <template slot-scope="scope">
            <i
              v-if="scope.row.status =='已启用'"
              class="el-icon-check"
              style="background:#66cc66;color:#fff;border-radius:50%"
            ></i>
            <i
              v-else
              class="el-icon-close"
              style="background:rgba(0, 0, 0, 0.65);color:#fff;border-radius:50%"
            ></i>
            {{scope.row.status}}
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="see_social">
      <p>
        <span>公积金</span>
        <span>共{{fundNum}}个缴纳项</span>
      </p>
      <el-table :data="fundTable" style="width: 100%" v-loading="loading">
        <el-table-column prop="optionName" label="缴纳项名称" width="180" align="center"></el-table-column>
        <el-table-column label="基数范围" width="200" align="center">
          <template slot-scope="scope">
            <p>{{scope.row.baseStart}}-{{scope.row.baseEnd}}</p>
          </template>
        </el-table-column>
        <el-table-column label="缴纳对象" width="100" align="center">
          <template slot-scope="scope">
            <p>公司</p>
            <p>个人</p>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="城镇户口缴纳比例" align="center">
          <template slot-scope="scope">
            <p>{{scope.row.companyRatio1}}</p>
            <p>
              {{scope.row.personalRatio1}}
              <span v-if="scope.row.exFee1">-{{scope.row.exFee1}}</span>
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="非城镇户口缴纳比例" align="center">
          <template slot-scope="scope">
            <p>{{scope.row.companyRatio2}}</p>
            <p>
              {{scope.row.personalRatio2}}
              <span v-if="scope.row.exFee2">-{{scope.row.exFee2}}</span>
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="是否缴纳" width="150" align="center">
          <template slot-scope="scope">
            <i
              v-if="scope.row.status =='已启用'"
              class="el-icon-check"
              style="background:#66cc66;color:#fff;border-radius:50%"
            ></i>
            <i
              v-else
              class="el-icon-close"
              style="background:rgba(0, 0, 0, 0.65);color:#fff;border-radius:50%"
            ></i>
            {{scope.row.status}}
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- <div class="details">
      <div class="social">
        <div class="social-con-title title">
          <span class="social-name">社保</span>
          <span class="social-number">
            共
            <em>6</em>个缴纳项
          </span>
        </div>
        <el-divider></el-divider>
        <div class="social_table">
          <table class="con-table" style="text-align: left;">
            <tr class="table_title">
              <th class="name">缴纳项名称</th>
              <th class="number">基数范围</th>
              <th class="pay-obj">缴纳对象</th>
              <th class="city-proportion">城镇户口缴纳比例</th>
              <th class="uncity-proportion">非城镇户口缴纳比例</th>
              <th class="ispayment">是否缴纳</th>
            </tr>
            <tr class="sub_mes">
              <td class="sub-name">养老保险</td>
              <td class="sub-number">
                <span>3000</span>
                <em>ㅡ</em>
                <span>5000</span>
              </td>
              <td class="pay-obj">
                <p class="sub-pay-obj">公司</p>
                <p class="sub-pay-obj">个人</p>
              </td>
              <td class="city-proportion pay-obj" style="padding-top:8px;">
                <p>10%</p>
                <p>5%</p>
              </td>
              <td class="uncity-proportion pay-obj" style="padding-top:8px;">
                <p>10%</p>
                <p>5%</p>
              </td>
              <td class="ispayment">
                <span>
                  <i class="success el-icon-success"></i>已启用
                </span>
              </td>
            </tr>

            <tr class="sub_mes">
              <td class="sub-name">医疗保险</td>
              <td class="sub-number">
                <span>3000</span>
                <em>ㅡ</em>
                <span>5000</span>
              </td>
              <td class="pay-obj">
                <p class="sub-pay-obj">公司</p>
                <p class="sub-pay-obj">个人</p>
              </td>
              <td class="city-proportion pay-obj" style="padding-top:8px;">
                <p>10%</p>
                <p>
                  <span>5%</span> +
                  <span>3</span>
                  <span>元</span>
                </p>
              </td>
              <td class="uncity-proportion pay-obj" style="padding-top:8px;">
                <p>10%</p>
                <p>
                  <span>5%</span> +
                  <span>3</span>
                  <span>元</span>
                </p>
              </td>
              <td class="ispayment">
                <span>
                  <i class="success el-icon-success"></i>已启用
                </span>
              </td>
            </tr>
            <tr class="sub_mes">
              <td class="sub-name">失业保险</td>
              <td class="sub-number">
                <span>3000</span>
                <em>ㅡ</em>
                <span>5000</span>
              </td>
              <td class="pay-obj">
                <p class="sub-pay-obj">公司</p>
                <p class="sub-pay-obj">个人</p>
              </td>
              <td class="city-proportion pay-obj" style="padding-top:8px;">
                <p>10%</p>
                <p>5%</p>
              </td>
              <td class="uncity-proportion pay-obj" style="padding-top:8px;">
                <p>10%</p>
                <p>5%</p>
              </td>
              <td class="ispayment">
                <span>
                  <i class="success el-icon-success"></i>已启用
                </span>
              </td>
            </tr>
            <tr class="sub_mes">
              <td class="sub-name">工伤保险</td>
              <td class="sub-number">
                <span>3000</span>
                <em>ㅡ</em>
                <span>5000</span>
              </td>
              <td class="pay-obj">
                <p class="sub-pay-obj">公司</p>
                <p class="sub-pay-obj">个人</p>
              </td>
              <td class="city-proportion pay-obj" style="padding-top:8px;">
                <p>10%</p>
                <p>5%</p>
              </td>
              <td class="uncity-proportion pay-obj" style="padding-top:8px;">
                <p>10%</p>
                <p>5%</p>
              </td>
              <td class="ispayment">
                <span>
                  <i class="error el-icon-error"></i>未启用
                </span>
              </td>
            </tr>
            <tr class="sub_mes">
              <td class="sub-name">生育保险</td>
              <td class="sub-number">
                <span>3000</span>
                <em>ㅡ</em>
                <span>5000</span>
              </td>
              <td class="pay-obj">
                <p class="sub-pay-obj">公司</p>
                <p class="sub-pay-obj">个人</p>
              </td>
              <td class="city-proportion pay-obj" style="padding-top:8px;">
                <p>10%</p>
                <p>5%</p>
              </td>
              <td class="uncity-proportion pay-obj" style="padding-top:8px;">
                <p>10%</p>
                <p>5%</p>
              </td>
              <td class="ispayment">
                <span>
                  <i class="success el-icon-success"></i>已启用
                </span>
              </td>
            </tr>
          </table>
        </div>
      </div>

      <div class="fund">
        <div class="fund-con-title title">
          <span class="fund-name">公积金</span>
          <span class="fund-number">
            共
            <em>6</em>个缴纳项
          </span>
        </div>
        <el-divider></el-divider>
        <div class="fund_table">
          <table class="con-table" style="text-align: left;">
            <tr class="table_title">
              <th class="name">缴纳项名称</th>
              <th class="number">基数范围</th>
              <th class="pay-obj">缴纳对象</th>
              <th class="city-proportion">城镇户口缴纳比例</th>
              <th class="uncity-proportion">非城镇户口缴纳比例</th>
              <th class="ispayment">是否缴纳</th>
            </tr>
            <tr class="sub_mes">
              <td class="sub-name">公积金</td>
              <td class="sub-number">
                <span>3000</span>
                <em>ㅡ</em>
                <span>5000</span>
              </td>
              <td class="pay-obj">
                <p class="sub-pay-obj">公司</p>
                <p class="sub-pay-obj">个人</p>
              </td>
              <td class="city-proportion pay-obj" style="padding-top:8px;">
                <p>10%</p>
                <p>5%</p>
              </td>
              <td class="uncity-proportion pay-obj" style="padding-top:8px;">
                <p>10%</p>
                <p>5%</p>
              </td>
              <td class="ispayment">
                <span>
                  <i class="success el-icon-success"></i>已启用
                </span>
              </td>
            </tr>

            <tr class="sub_mes">
              <td class="sub-name">补充公积金</td>
              <td class="sub-number">
                <span>3000</span>
                <em>ㅡ</em>
                <span>5000</span>
              </td>
              <td class="pay-obj">
                <p class="sub-pay-obj">公司</p>
                <p class="sub-pay-obj">个人</p>
              </td>
              <td class="city-proportion pay-obj" style="padding-top:8px;">
                <p>10%</p>
                <p>5%</p>
              </td>
              <td class="uncity-proportion pay-obj" style="padding-top:8px;">
                <p>10%</p>
                <p>5%</p>
              </td>
              <td class="ispayment">
                <span>
                  <i class="success el-icon-success"></i>已启用
                </span>
              </td>
            </tr>
            <tr class="sub_mes">
              <td class="sub-name">薪资项名称</td>
              <td class="sub-number">
                <span>3000</span>
                <em>ㅡ</em>
                <span>5000</span>
              </td>
              <td class="pay-obj">
                <p class="sub-pay-obj">公司</p>
                <p class="sub-pay-obj">个人</p>
              </td>
              <td class="city-proportion pay-obj" style="padding-top:8px;">
                <p>10%</p>
                <p>5%</p>
              </td>
              <td class="uncity-proportion pay-obj" style="padding-top:8px;">
                <p>10%</p>
                <p>5%</p>
              </td>
              <td class="ispayment">
                <span>
                  <i class="success el-icon-success"></i>已启用
                </span>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>-->
  </div>
</template>

<script>
export default {
  data() {
    return {
      socialNum: "",
      fundNum: "",
      socialTable: [],
      loading: false,
      fundTable: [],
      headerDate: {
        planName: "",
        mainCompanyName: "",
        provinceName: "",
        cityName: "",
        status: ""
      }
    };
  },
  methods: {
    Return() {
      this.$router.push({ path: "/welfareSet" });
    },
    getList(id) {
      this.$http
        .get("/fundPlanList/getDetail", {
          params: {
            id: id
          }
        })
        .then(res => {
          if (res.code == 0) {
            this.headerDate.planName = res.result.planName;
            this.headerDate.mainCompanyName = res.result.mainCompanyName;
            this.headerDate.provinceName = res.result.provinceName;
            this.headerDate.cityName = res.result.cityName;
            this.headerDate.status =
              res.result.status == 1 ? "已启用" : "已禁用";
            this.socialTable = res.result.insurances;
            this.socialNum = this.socialTable.length;
            this.socialTable.map(item => {
              item.status = item.status == 1 ? "已启用" : "未启用";
            });
            this.fundTable = res.result.funds;
            this.fundNum = this.fundTable.length;
            this.fundTable.map(item => {
              item.status = item.status == 1 ? "已启用" : "未启用";
            });
            console.log(res.result);
          }
        });
    }
  },
  created() {
    this.getList(this.$route.query.id);
  }
};
</script>

<style scoped lang="less">
.planView {
  margin: 0 20px 0 19px;

  table td {
    padding: 7px 0;
  }

  table {
    border-collapse: collapse;
    border: 1px solid rgba(247, 247, 247, 1);

    td {
      padding-left: 30px;
    }

    tr {
      border-bottom: 1px solid rgba(247, 247, 247, 1);
    }

    tr:hover {
      background: rgba(247, 247, 247, 1);
    }

    th {
      padding-left: 30px;
    }
  }

  .breadcrumb {
    height: 52px;
    padding: 17px 10px 0;
    position: relative;
    /deep/.el-breadcrumb {
      float: left;
      font-size: 13px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(153, 153, 153, 1);
    }
    /deep/.el-button {
      position: absolute;
      padding: 8px 15px;
      right: 0;
    }
  }

  .viewDetails {
    height: 27px;
    padding: 17px 0 16px 10px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 2px 0px 16px 0px rgba(3, 33, 136, 0.2);
    border-radius: 4px;
    margin-bottom: 8px;

    span {
      display: inline-block;
      font-size: 12px;
      height: 17px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(102, 102, 102, 1);
      border-right: 1px solid rgba(216, 216, 216, 1);
      padding: 0 20px;

      em {
        font-style: normal;
      }
    }

    span:last-child {
      border-right: 0;
    }
  }

  .see_social {
    margin-top: 20px;
    padding: 0 30px;
    background: #fff;
    padding-bottom: 40px;
    & > p:nth-child(1) {
      border-bottom: 1px solid #dedede;
      padding: 15px 0;
      position: relative;
      & > span:nth-child(1) {
        font-size: 14px;
        font-weight: 600;
        color: rgba(38, 127, 246, 1);
      }
      & > span:nth-child(2) {
        position: absolute;
        right: 0;
        font-size: 13px;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        border-left: 1px solid #dedede;
        padding-left: 19px;
      }
    }
  }
  .details {
    background: white;
    padding: 0 30px 18px;

    /deep/.el-divider {
      margin: 0;
    }

    .title {
      line-height: 43px;
    }

    .social {
      .social-name {
        font-size: 14px;
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        color: rgba(38, 127, 246, 1);
      }

      .social-number {
        float: right;
        font-size: 13px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);

        em {
          font-style: normal;
        }
      }

      .social_table {
        border-collapse: collapse;

        .con-table {
          width: 100%;
          margin-top: 5px;

          .table_title {
            border-collapse: collapse;
            font-size: 14px;
            height: 48px;
            font-family: PingFangSC-Semibold;
            font-weight: 600;
            color: rgba(51, 51, 51, 1);
            background: rgba(247, 247, 247, 1);
          }

          .ispayment {
            span {
              font-size: 14px;
              font-family: PingFangSC-Regular;
              font-weight: 400;
              color: rgba(0, 0, 0, 0.65);

              i.success {
                font-size: 15px;
                color: rgba(102, 204, 102, 1);
                margin-right: 5px;
              }

              i.error {
                font-size: 15px;
                margin-right: 5px;
              }
            }
          }
        }
      }

      .pay-obj {
        p:first-child {
          margin-bottom: 8px;
        }
      }
    }

    .fund {
      .fund-name {
        font-size: 14px;
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        color: rgba(38, 127, 246, 1);
      }

      .fund-number {
        float: right;
        font-size: 13px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);

        em {
          font-style: normal;
        }
      }

      .fund_table {
        .con-table {
          width: 100%;
          margin-top: 5px;

          .table_title {
            font-size: 14px;
            height: 48px;
            font-family: PingFangSC-Semibold;
            font-weight: 600;
            color: rgba(51, 51, 51, 1);
            background: rgba(247, 247, 247, 1);
          }

          .ispayment {
            span {
              font-size: 14px;
              font-family: PingFangSC-Regular;
              font-weight: 400;
              color: rgba(0, 0, 0, 0.65);

              i.success {
                font-size: 15px;
                color: rgba(102, 204, 102, 1);
                margin-right: 5px;
              }

              i.error {
                font-size: 15px;
                margin-right: 5px;
              }
            }
          }
        }

        .pay-obj {
          p:first-child {
            margin-bottom: 8px;
          }
        }
      }
    }
  }
}
</style>