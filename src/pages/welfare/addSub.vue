<template>
  <div id="addSub">
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">社保公积金</el-breadcrumb-item>
        <el-breadcrumb-item>
          <a href="/">增减员清单</a>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="addSub_table">
      <div class="addSub_search" :class="{'search-collapse':isCollapse}">
        <el-form ref="search" :model="search" class="search">
          <el-row>
            <el-col style="width:110px;">
              <el-date-picker
                style="width:110px;"
                v-model="search.time"
                type="month"
                format="yyyy-MM"
                value-format="yyyy-MM"
                placeholder="选择日期"
              ></el-date-picker>
            </el-col>
            <el-col style="width:140px;">
              <el-form-item>
                <el-input style="width:140px;" v-model="search.name" placeholder="姓名、工号"></el-input>
              </el-form-item>
            </el-col>
            <el-col style="width: 120px;">
              <el-form-item style="width: 133px;">
                <selecttree
                  placeholder="部门"
                  :multiple="true"
                  :options="departments"
                  @getValue="onSetDepartMent($event)"
                  ref="selectTree"
                  class="search-dep"
                />
              </el-form-item>
            </el-col>
            <!-- <div id="addEmployee"> -->
            <el-col style="width:150px; margin-left:18px;">
              <el-form-item>
                <el-select v-model="search.addstauts" placeholder="社保增员状态">
                  <el-option label="全部" value="0"></el-option>
                  <el-option label="已增员" value="1"></el-option>
                  <el-option label="待增员" value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col style="width:190px; display: block;">
              <el-form-item>
                <el-select v-model="search.substatus" placeholder="公积金增员状态">
                  <el-option label="全部" value="0"></el-option>
                  <el-option label="已减员" value="1"></el-option>
                  <el-option label="待减员" value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <!-- </div> -->

            <el-col style="width:155px;">
              <div class="button">
                <el-button type="primary" @click="Search">搜索</el-button>
                <el-button @click="reset">重置</el-button>
              </div>
            </el-col>
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
      <div class="addSub_table" style="background:rgba(255,255,255,1)">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
        >
          <el-menu-item index="1">增员表({{addNum}}人)</el-menu-item>
          <el-menu-item index="2">减员表({{subNum}}人)</el-menu-item>
          <div class="status">
            <div v-if="activeIndex == '1'">
              <span @click="addMember">
                <i class="iconfont icon-piliangtianjia"></i>标为已增员
              </span>
              <!-- <span>
                <i class="iconfont icon-20daochu"></i>导出
              </span>-->
            </div>
            <div v-if="activeIndex == '2'">
              <span @click="subMember">
                <i class="iconfont icon-piliangtianjia"></i>标为已减员
              </span>
              <!-- <span>
                <i class="iconfont icon-20daochu"></i>导出
              </span>-->
            </div>
          </div>
        </el-menu>
        <template>
          <div class="table" v-show="activeIndex == '1'">
            <el-table
              :data="tableDataAdd"
              ref="mulAddTable"
              style="width: 100%"
              :height="tableheight"
              @selection-change="addSelectionChange"
            >
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column prop="empName" label="姓名" width="120" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column prop="empNum" label="工号" width="120"></el-table-column>
              <el-table-column prop="depName" label="部门" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column prop="position" label="职位" width="120" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column label="社保增员状态" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                  <span v-if="scope.row.insuranceAdd == 1">已增员</span>
                  <span v-if="scope.row.insuranceAdd == 2">待增员</span>
                  <span v-if="scope.row.insuranceAdd == 3||scope.row.insuranceAdd == 4">—</span>
                </template>
              </el-table-column>
              <el-table-column label="公积金增员状态" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                  <span v-if="scope.row.insuranceAdd == 3">已增员</span>
                  <span v-if="scope.row.insuranceAdd == 4">待增员</span>
                  <span v-if="scope.row.insuranceAdd == 1||scope.row.insuranceAdd == 2">—</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="table" v-show="activeIndex == '2'">
            <el-table
              :data="tableDatadel"
              ref="muldelTable"
              style="width: 100%"
              :height="tableheight"
              @selection-change="delSelectionChange"
            >
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column prop="empName" label="姓名" width="120" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column prop="empNum" label="工号" width="120" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column prop="depName" label="部门" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column prop="position" label="职位" width="120" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column prop="socialAdd" label="社保减员状态" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                  <span v-if="scope.row.insuranceAdd == 3">已减员</span>
                  <span v-if="scope.row.insuranceAdd == 4">待减员</span>
                  <span v-if="scope.row.insuranceAdd == 1||scope.row.insuranceAdd == 2">—</span>
                </template>
              </el-table-column>
              <el-table-column prop="pensionAdd" label="公积金减员状态" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                  <span v-if="scope.row.insuranceAdd == 1">已减员</span>
                  <span v-if="scope.row.insuranceAdd == 2">待减员</span>
                  <span v-if="scope.row.insuranceAdd == 3||scope.row.insuranceAdd == 4">—</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </template>
      </div>
      <!-- 分页 -->
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
</template>

<script>
import selecttree from "../../components/selectTree";
export default {
  data() {
    return {
      // 模糊查询
      state: "",
      mulAddTable: [],
      muldelTable: [],
      num: 1,
      num1: 2,
      isCollapse: false,
      pagination: {
        current_page: 1,
        pageNum: 0,
        pageSize: 10,
        total: 0
      },
      activeIndex: "1",
      search: {
        time: "",
        name: "",
        addstauts: "",
        substatus: ""
      },
      tableDataAdd: [],
      tableheight: window.innerHeight - 315,
      tableDatadel: [],
      addNum: "",
      subNum: "",
      departments: [] //部门
    };
  },
  components: {
    selecttree
  },
  methods: {
    Search() {
      if (this.activeIndex == 1) {
        this.getAddList();
      } else {
        this.getDelList();
      }
    },
    //重置
    reset() {
      this.search.name = "";
      this.search.addstauts = "";
      this.search.substatus = "";
    },
    // 分页
    handleSizeChange(val) {
      this.pagination.pageSize = val;
      if (this.activeIndex == 1) {
        this.getAddList();
      } else {
        this.getDelList();
      }
    },
    handleCurrentChange(val) {
      this.pagination.pageNum = val - 1;
      if (this.activeIndex == 1) {
        this.getAddList();
      } else {
        this.getDelList();
      }
    },
    addSelectionChange(val) {
      console.log(val);
      this.mulAddTable = val;
    },
    delSelectionChange(val) {
      this.muldelTable = val;
    },
    onSetDepartMent(value) {
      if (!value) {
        this.depChecked = null;
        return;
      }
      this.depChecked = (value || []).map(m => m.id);
      console.log(this.depChecked);
    },

    // 增员减员提示
    addMember() {
      if (this.mulAddTable.length > 0) {
        this.$confirm(
          "<span>是否确认将<i>" +
            this.mulAddTable.length +
            "</i>人的社保和公积金状态标位已增员？</span>",
          "提示",
          {
            dangerouslyUseHTMLString: true,
            confirmButtonText: "确定",
            cancelButtonText: "取消"
          }
        )
          .then(() => {
            let tempids = [];
            this.mulAddTable.map(item => {
              tempids.push({
                id: item.id,
                fundAdd: item.fundAdd,
                insuranceAdd: item.insuranceAdd
              });
            });
            this.$http
              .post("/empfundlist/addOrSubEmpFund", {
                addOrSubEmpFund: tempids,
                operation: 1
              })
              .then(res => {
                if (res.code == 0) {
                  this.$message({
                    type: "success",
                    message: "增员成功"
                  });
                  this.getAddList();
                }
              });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "取消增员"
            });
          });
      }
    },
    subMember() {
      if (this.muldelTable.length > 0) {
        this.$confirm(
          "<span>是否确认将<i>" +
            this.muldelTable.length +
            "</i>人的社保和公积金状态标位已减员？</span>",
          "提示",
          {
            dangerouslyUseHTMLString: true,
            confirmButtonText: "确定",
            cancelButtonText: "取消"
          }
        )
          .then(() => {
            let tempids = [];
            this.muldelTable.map(item => {
              tempids.push({
                id: item.id,
                fundAdd: item.fundAdd,
                insuranceAdd: item.insuranceAdd
              });
            });
            this.$http
              .post("/empfundlist/addOrSubEmpFund", {
                addOrSubEmpFund: tempids,
                operation: 3
              })
              .then(res => {
                if (res.code == 0) {
                  this.$message({
                    type: "success",
                    message: "减员成功"
                  });
                  this.getDelList();
                }
              });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "取消减员"
            });
          });
      }
    },

    handleSelect(key, keyPath) {
      console.log(key);
      this.activeIndex = key;
      if (key == 2) {
        this.getDelList();
        this.pagination.total = this.tableDatadel.length;
        console.log(this.pagination.total);
      }
      if (key == 1) {
        this.getAddList();
        this.pagination.total = this.tableDataAdd.length;
      }
    },
    //查询增员列表
    getAddList() {
      this.$http
        .post("/emplist/getAllAddOrDelete", {
          pageSize: this.pagination.pageSize, // 一页几个
          pageNum: this.pagination.pageNum, // 第几页
          companyId: 1,
          types: [1, 2],
          nameNumPhone: this.search.name,
          inDepId: this.depChecked
        })
        .then(res => {
          if (res.code == 0) {
            this.tableDataAdd = [];
            this.tableDataAdd = res.result;
            this.pagination.total = 0;
            this.pagination.total = res.total;
            this.addNum = this.pagination.total;
          }
        });
    },
    //查询减员列表
    getDelList() {
      this.$http
        .post("/emplist/getAllAddOrDelete", {
          pageSize: this.pagination.pageSize, // 一页几个
          pageNum: this.pagination.pageNum, // 第几页
          companyId: 1,
          types: [3, 4],
          nameNumPhone: this.search.name,
          inDepId: this.depChecked
        })
        .then(res => {
          if (res.code == 0) {
            this.tableDatadel = [];
            this.tableDatadel = res.result;
            this.subNum = res.total;
          }
        });
    },
    //时间戳
    timeFormat() {
      let date = new Date();
      // var date= new Date(Date.parse(date));
      let y = date.getFullYear(); //年
      let m = date.getMonth() + 1; //月
      if (m < 10) {
        m = "0" + m;
      }
      //   let d = date.getDate(); //日
      //   if (d < 10) {
      //     d = "0" + d;
      //   }
      this.search.time = y + "." + m;
      //   return y + "." + m;
    },
    getTree() {
      this.$http
        .get("/deplist/getStructure", {
          params: {
            companyId: 1
          }
        })
        .then(response => {
          this.departments = [response.result];
          console.log(this.departments);
        });
    }
  },
  created() {
    this.getAddList();
    this.getDelList();
    this.timeFormat();
    this.getTree();
  }
};
</script>

<style scoped lang="less">
/deep/.el-table {
  min-height: e("calc(100vh - 320px)");
}
#addSub {
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

    .back {
      padding: 5px 18px;
      float: right;
      font-size: 12px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      line-height: 17px;
    }
  }

  .addSub_table {
    padding: 0 20px;

    .addSub_search {
      margin-top: -67px;
      margin-bottom: 10px;
      height: 36px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 2px 0px 16px 0px rgba(3, 33, 136, 0.2);
      border-radius: 4px;
      padding: 20px 18px 20px 20px;

      #addEmployee {
        width: 885px;

        /deep/.el-select {
          width: 150px;
        }
      }

      #subEmployee {
        width: 885px;
      }

      /deep/ .el-form {
        height: 49px;
      }

      /deep/.el-col {
        margin-right: 2px;
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

      .search {
        /deep/.el-input__inner {
          font-size: 12px;
          font-family: PingFangSC-Medium;
          font-weight: 500;
          color: rgba(102, 102, 102, 1);
        }

        /deep/.el-form-item__label {
          padding: 0;
          font-size: 12px;
          font-family: PingFangSC-Medium;
          font-weight: 500;
          color: rgba(102, 102, 102, 1);
        }

        // /deep/.el-select {
        //   width: 90px;
        // }

        /deep/.el-button {
          width: 68px;
          height: 38px;
          border-radius: 2px;
          font-size: 12px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
        }
      }
    }

    /deep/.el-menu--horizontal > .el-menu-item.is-active {
      border-bottom: 4px solid #409eff;
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

    .status {
      float: right;
      margin-top: 25px;
      outline: none;

      span {
        font-size: 12px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(38, 127, 246, 1);
        margin-right: 20px;
        cursor: pointer;

        i {
          font-size: 12px;
          margin-right: 3px;
        }
      }
    }

    /* 收起 */
    .search-collapse {
      padding: 8px 10px 3px 17px;

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
      .status {
        top: 182px;
      }

      /deep/.el-input__icon {
        line-height: 30px;
      }

      /deep/.el-form-item__label {
        line-height: 30px;
      }

      /deep/.el-input__inner {
        height: 30px;
        line-height: 30px;
      }

      /deep/.el-form-item__content {
        line-height: 0;
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
        margin-right: -2px;
      }

      .button {
        /deep/.el-button {
          height: 30px;
        }
      }
    }

    .addSubTable {
      margin-top: 10px;

      /deep/.el-tabs__header {
        margin: 0;
      }

      /deep/.el-tabs__nav-wrap {
        background: rgba(255, 255, 255, 1);
      }

      /deep/.el-tabs__nav-scroll {
        margin-left: 16px;

        /deep/.el-tabs__active-bar {
          height: 4px;
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
      padding: 5px 0;
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

  /deep/.el-tooltip__popper {
    width: 130px;
    font-size: 11px;
    box-shadow: 0 0 5px #999;
  }
}
</style>