<template>
  <div class="welfareSet">
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">社保公积金</el-breadcrumb-item>
        <el-breadcrumb-item>
          <a href="/">员工缴纳方案</a>
        </el-breadcrumb-item>
      </el-breadcrumb>
      <span class="newPlan">
        <!-- <a href="/newPlan">新增方案</a> -->
        <router-link :to="{path:'/newPlan'}">新增方案</router-link>
      </span>
    </div>
    <div class="welfare_table">
      <div class="welfareSet_search" :class="{'search-collapse':isCollapse}">
        <el-form ref="search" :model="search" class="search">
          <el-row>
            <!-- <el-col style="width: 121px;">
              <el-date-picker v-model="search.date" type="month" placeholder="选择日期">
              </el-date-picker>
            </el-col>-->
            <el-col style="width:155px;">
              <el-form-item>
                <el-input v-model="search.name" placeholder="方案名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col style="width:110px;">
              <el-form-item>
                <el-select v-model="search.mainCompanyId" placeholder="缴纳主体" style="width:100px">
                  <el-option
                    v-for="item in mainCompanyList"
                    :key="item.mainCompanyId"
                    :label="item.mainCompanyName"
                    :value="item.mainCompanyId"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col style="width:110px;">
              <el-form-item>
                <el-select
                  @change="provinceChange"
                  v-model="search.provinceValue"
                  placeholder="缴纳省"
                  style="width:100px"
                >
                  <el-option
                    v-for="item in provinceList"
                    :key="item.addressId"
                    :label="item.addressName"
                    :value="item.addressId"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col style="width:130px;">
              <el-form-item>
                <el-select v-model="search.cityValue" placeholder="缴纳区" style="width:100px">
                  <el-option
                    v-for="item in cityList"
                    :key="item.addressId"
                    :label="item.addressName"
                    :value="item.addressId"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <div class="button">
              <el-button type="primary" @click="getList">搜索</el-button>
              <el-button @click="reset">重置</el-button>
            </div>
          </el-row>
        </el-form>
        <div class="btn-collapse">
          <el-link v-if="!isCollapse" @click="isCollapse=!isCollapse">
            收起
            <i class="el-icon-caret-bottom el-icon--right"></i>
          </el-link>
          <el-link v-else @click="isCollapse=!isCollapse">
            展开
            <i class="el-icon-caret-top el-icon--right"></i>
          </el-link>
        </div>
      </div>
      <div class="table">
        <el-table :data="tableData" style="width: 100%" :height="tableheight" v-loading="loading">
          <el-table-column
            prop="order"
            type="index"
            label="序号"
            width="50"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column prop="planName" label="方案名称" width="220" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column
            prop="mainCompanyName"
            label="缴纳主体"
            width="130"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column prop="cityName" label="缴纳地区" width="150" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <p v-if="scope.row.provinceName">{{scope.row.provinceName}}-{{scope.row.cityName}}</p>
            </template>
          </el-table-column>
          <el-table-column prop="scope" label="有效缴纳范围" width="180" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <p>{{scope.row.fundOptionRange}}</p>
            </template>
          </el-table-column>
          <el-table-column prop="createrName" label="添加人" width="120" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="updateTime" label="更新时间" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column label="操   作" width="250">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.status" active-color inactive-color="#d4d3d3"></el-switch>
              <span>
                <router-link :to="{path:'/examine',query:{id:scope.row.id}}">查看</router-link>
              </span>
              <span style="color:#ccc" v-if="!scope.row.edit">编辑</span>
              <span v-else>
                <router-link :to="{path:'/newPlan',query:{id:scope.row.id}}">编辑</router-link>
              </span>
              <span @click="copy(scope.row)">复制</span>
              <span style="color:#ccc" v-if="!scope.row.edit">删除</span>
              <span v-else @click="del(scope.row)">删除</span>
            </template>
          </el-table-column>
        </el-table>
        <div class="block page">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pagination.current_page"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="pagination.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pagination.total"
          ></el-pagination>
        </div>
      </div>
    </div>
    <!-- <el-dialog title="删除" :visible="deleteVisble">
      <span>
        是否确定删除社保公积金方案“
        <em>{{del_name}}</em>”？
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteFailed">取 消</el-button>
        <el-button type="primary" @click="deleteSuccess">确 定</el-button>
      </span>
    </el-dialog>-->
    <el-dialog title="复制方案" :visible.sync="copyVisble" class="copy_dia" :before-close="handleClose">
      <el-form
        :model="copyForm"
        :rules="copyrules"
        ref="copyForm"
        label-width="100px"
        class="copy_form"
      >
        <el-form-item label="方案名称：" prop="name">
          <el-input v-model="copyForm.name"></el-input>
        </el-form-item>
      </el-form>
      <p>
        <el-button @click="copyVisble = false">取 消</el-button>
        <el-button type="primary" @click="copySuccess('copyForm')">确 定</el-button>
      </p>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false,
      value: true,
      pagination: {
        current_page: 1,
        pageNum: 0,
        pageSize: 10,
        total: 0
      },
      tableheight: window.innerHeight - 255,

      deleteVisble: false,
      copyVisble: false,
      loading: false,
      state: "",

      search: {
        name: "",
        mainCompanyId: "",
        provinceValue: "",
        cityValue: ""
      },
      mainCompanyList: [],
      provinceList: [],
      cityList: [],
      tableData: [],
      del_name: "",
      copyForm: {},
      copyrules: {
        name: [{ required: true, message: "请填写方案名称", trigger: "blur" }]
      }
    };
  },
  methods: {
    //重置
    reset() {
      this.name = "";
      this.mainCompanyId = "";
      this.provinceValue = "";
      this.cityValue = "";
    },
    deleteSuccess() {
      // this.$http
      //   .get("/fundPlanList/delFundPlan", {
      //     params: {
      //       id: row.id
      //     }
      //   })
      //   .then(res => {
      //     if (res.data.success) {
      //       this.getList();
      //     }
      //   });
    },
    deleteFailed() {},
    // handleSelect(item) {
    //   console.log(item);
    // },
    // 开关
    changeSwitch(data) {
      console.log(data);
    },

    // 分页
    handleSizeChange(val) {
      this.pagination.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.pagination.pageNum = val - 1;
      this.getList();
    },
    // 删除
    del(row) {
      this.$confirm("此操作将删除此方案, 是否继续?", "删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http
            .get("/fundPlanList/delFundPlan", {
              params: {
                companyId: 1,
                id: row.id
              }
            })
            .then(res => {
              if (res.code == 0) {
                this.getList();
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
      // this.deleteVisble = true;
      // this.del_name = row.planName;
    },
    copy(row) {
      this.copyVisble = true;
      this.copyForm.id = row.id;
    },
    handleClose(done) {
      done();
      this.$refs["copyForm"].resetFields();
    },
    copySuccess(copyForm) {
      this.$refs["copyForm"].validate(valid => {
        if (valid) {
          this.$http
            .get("/fundPlanList/copyPlan", {
              params: {
                companyId: 1,
                id: this.copyForm.id,
                planName: this.copyForm.name
              }
            })
            .then(res => {
              if (res.code == 0) {
                this.copyVisble = false;
                this.getList();
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //缴纳主体
    getMainList() {
      this.$http
        .get("/fundPlanList/queryMainList", {
          params: {
            companyId: 1
          }
        })
        .then(res => {
          if (res.code == 0) {
            this.mainCompanyList = res.result;
          }
        });
    },
    //或取省
    getProvince() {
      this.$http
        .get("/fundPlanList/getAddress", {
          params: {
            parentId: 1
          }
        })
        .then(res => {
          if (res.code == 0) {
            this.provinceList = res.result;
          }
        });
    },
    //省change
    provinceChange(val) {
      this.search.provinceValue = val;
      this.search.cityValue = "";
      this.getCity(val);
    },
    //获取区
    getCity(val) {
      this.$http
        .get("/fundPlanList/getAddress", {
          params: {
            parentId: val
          }
        })
        .then(res => {
          if (res.code == 0) {
            this.cityList = res.result;
          }
        });
    },
    //查询列表
    getList() {
      this.loading = true;
      this.$http
        .get("/fundPlanList/queryFundPlanList", {
          params: {
            pageSize: this.pagination.pageSize, // 一页几个
            pageNum: this.pagination.pageNum, // 第几页
            companyId: 1,
            planName: this.search.name,
            mainCompanyId: this.search.mainCompanyId,
            provinceId: this.search.provinceValue,
            cityId: this.search.cityValue
          }
        })
        .then(res => {
          if (res.code == 0) {
            this.loading = false;
            this.tableData = [];
            this.tableData = res.result;
            this.tableData.map(item => {
              item.status = item.status == 1 ? true : false;
            });
            this.pagination.total = res.total;
          }
        });
    }
  },
  created() {
    this.getList();
    this.getMainList();
    this.getProvince();
    // this.getCity();
  }
};
</script>


<style scoped lang="less">
/deep/.el-table .cell {
  span {
    color: #409eff;
    font-weight: 500;
    font-size: 13px;
    cursor: pointer;
    display: inline-block;
    padding: 0 7px;
  }
  a {
    color: #409eff;
    font-weight: 500;
    font-size: 13px;
    cursor: pointer;
  }
}
.welfareSet {
  // height: 100%;
  .breadcrumb {
    padding: 16px 30px 0;
    height: 104px;
    background: rgba(255, 255, 255, 1);

    .el-breadcrumb {
      float: left;
      font-size: 13px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(153, 153, 153, 1);
    }

    .newPlan {
      padding: 5px 6px;
      float: right;
      font-size: 12px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      background: #267ff6;

      a {
        color: rgba(255, 255, 255, 1);
      }
    }
  }

  .welfare_table {
    padding: 0 20px;
    // height: 100%;
    .welfareSet_search {
      margin-top: -67px;
      height: 36px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 2px 0px 16px 0px rgba(3, 33, 136, 0.2);
      border-radius: 4px;
      padding: 20px 18px 20px 20px;

      /deep/.el-date-editor.el-input {
        width: 119px;
      }

      /deep/.el-form-item__label {
        padding: 0;
      }

      /deep/.el-input__inner {
        font-size: 12px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(102, 102, 102, 1);
        line-height: 17px;
        border-radius: 2px;
        border: 1px solid rgba(153, 153, 153, 1);
      }

      /deep/.el-select {
        width: 100px;
      }

      b {
        float: right;
        font-size: 12px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(22, 96, 253, 1);
        line-height: 36px;
      }

      .search {
        /deep/ .el-input {
          font-size: 12px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(189, 193, 198, 1);
        }
      }

      /deep/.el-form-item__content {
        margin-right: 10px;
      }

      .button {
        float: right;
        padding-left: 20px;
        border-left: 1px solid rgba(216, 216, 216, 1);

        /deep/.el-button {
          width: 80px;
          height: 38px;
          border-radius: 2px;
        }
      }
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
          background: #2a78f8;
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
      background: #1660fd;
      border: 1px solid #1660fd;
    }

    /deep/.el-checkbox__input.is-indeterminate .el-checkbox__inner::before {
      content: "";
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
        background: #1660fd;
      }
    }

    /* 开关 */
    /deep/.el-switch {
      width: 34px;
      height: 16px;
    }
  }

  .table {
    // height: 100%;
    /deep/.el-table {
      // height: e("calc(100vh - 255px)");
    }
  }

  /deep/.el-tooltip__popper {
    width: 130px;
    font-size: 11px;
    box-shadow: 0 0 5px #999;
  }

  /* 禁用或开启 */
  // .ispayment {
  //   /deep/.el-switch__label {
  //     position: absolute;
  //     display: none;
  //     color: #fff;
  //   }

  //   /deep/.el-switch__label--left {
  //     z-index: 9;
  //     left: 21px;
  //   }

  //   /deep/.el-switch__label--right {
  //     z-index: 9;
  //     left: -6px;
  //   }

  //   /deep/.el-switch__label.is-active {
  //     display: block;
  //   }

  //   /deep/.el-switch .el-switch__core,
  //   .el-switch .el-switch__label {
  //     width: 50px !important;
  //   }
  // }

  .btn-collapse {
    float: right;
    margin-left: 26px;
    line-height: 36px;
    font-size: 12px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(22, 96, 253, 1);

    a {
      color: #1660fd;
      font-size: 12px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
    }

    /deep/.el-link.is-underline:hover:after {
      border-bottom: 0;
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

    .button {
      margin-top: 5px;
    }
  }

  /* 收起时的输入框 */
  .welfare_table .search-collapse {
    padding: 3px 10px 8px 17px;

    /deep/.el-input__inner {
      height: 30px;
      line-height: 30px;
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

    /deep/.el-input__inner {
      border: 0;
      border-radius: 0;
      border-left: 1px solid rgba(102, 102, 102, 1);
      border-right: 1px solid rgba(102, 102, 102, 1);
    }

    /deep/.el-col {
      margin-right: -12px;
    }

    .button {
      /deep/.el-button {
        height: 30px;
      }
    }
  }
}
// /deep/.el-message-box__wrapper .el-message-box__content{
//   padding-top: 15px !important;
//   margin-top: 30px;
//   text-align: left;
// }
.copy_dia {
  /deep/.el-dialog__body {
    height: 170px;
    p {
      text-align: right;
      padding-top: 50px;
    }
  }
}
.copy_form {
  width: 80%;
  padding: 0 30px;
  float: none;
}
</style>