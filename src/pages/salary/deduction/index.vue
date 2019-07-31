<template>
  <div class="deduction zy-main-wraps salary">
    <!--面包屑及按钮区域-->
    <div class="zy-bg-breadcrumb">
      <div class="menu-area">
        <div class="comm">
          <el-breadcrumb class="bread" separator="/">
            <el-breadcrumb-item>
              <a href="/salary">薪资管理</a>
            </el-breadcrumb-item>
            <el-breadcrumb-item>
              <a>附加专项扣除设置</a>
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="btns">
          <el-button type="primary" style="width:140px" @click="isAddDeduction = true">新增附加专项扣除员工</el-button>
          <!--<el-button>导出</el-button>-->
        </div>
      </div>
    </div>
    <!--搜索区域-->
    <div class="zy-search-pub search-area" :class="{'search-collapse':isCollapse}">
      <div class="search-item">
        <el-select v-model="contractCompany" placeholder="合同公司">
          <el-option
                  v-for="(item,index) in contractCompanyList"
                  :key="index"
                  value-format="yyyy"
                  :label="item.mainCompanyName"
                  :value="item.mainCompanyId">
          </el-option>
        </el-select>
        <selecttree
                placeholder="部门"
                :multiple="true"
                :options="departments"
                @getValue="onSetDepartMent($event)"
                ref="selectTree"
                class="search-dep"/>
        <el-input placeholder="姓名/工号" v-model="searchKey"></el-input>
        <el-date-picker
                v-if="curActive==2"
                v-model="searchYear"
                value-format="yyyy"
                type="year"
                placeholder="选择年">
        </el-date-picker>
      </div>
      <div class="search-btns">
        <el-button class="his-search light-btn" @click="onSearch">搜索</el-button>
      </div>
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
    <!--表格区域-->
    <div class="table-all-wrap">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect">
        <el-menu-item index="1">员工附加专项信息</el-menu-item>
        <el-menu-item index="2">员工累计扣除金额</el-menu-item>
      </el-menu>
      <!--员工附加专项信息列表-->
      <template v-if="curActive==1">
        <el-table
          v-loading="isloading"
          :height="tableHeight"
          class="table-all-wrap table-wrap additional-list"
          :data="tableData"
          :header-cell-style="rowClass"
          style="width: 100%">
          <!--<el-table-column fixed type="selection" width="50"></el-table-column>-->
          <!--<el-table-column fixed prop="empName" label="批次号" width="100"></el-table-column>-->
          <el-table-column fixed prop="empName" label="姓名" width="80"></el-table-column>
          <el-table-column prop="empNum" label="工号" width="120"></el-table-column>
          <!--<el-table-column prop="depName" label="合同公司" width="140"></el-table-column>-->
          <el-table-column prop="depName" label="部门" width="140" show-overflow-tooltip></el-table-column>
          <el-table-column prop="position" label="职位" width="120"></el-table-column>
          <el-table-column label="子女教育" width="258">
            <template slot-scope="scope">
              <div
                v-if="scope.row.childrenConfigs.length"
                v-for="(item,index) in scope.row.childrenConfigs" class="multi" :key="index">
                <div class="month-deduction">
                  <h6>每月减免</h6>
                  <p class="main-cont">{{item.perSub}}元</p>
                </div>
                <div class="cycle">
                  <h6>当前减免周期</h6>
                  <p class="main-cont">{{item.startDate}}-{{item.endDate}}</p>
                </div>
                <div
                  class="btn-mask"
                  v-if="item.status==0"
                  @click="onExtendCycle(scope.row,scope.$index,1,item)">
                  <p>已失效，延长减免周期</p>
                </div>
              </div>
              <div v-else>-</div>
            </template>
          </el-table-column>
          <el-table-column prop="updateTime" label="住房租金" width="258">
            <template slot-scope="scope">
              <div v-if="scope.row.tenantConfig" class="multi">
                <div class="month-deduction">
                  <h6>每月减免</h6>
                  <p>{{scope.row.tenantConfig.perSub}}元</p>
                </div>
                <div class="cycle">
                  <h6>当前减免周期</h6>
                  <p>{{scope.row.tenantConfig.startDate}}-{{scope.row.tenantConfig.endDate}}</p>
                </div>
                <div
                  class="btn-mask"
                  v-if="scope.row.tenantConfig.status==0"
                  @click="onExtendCycle(scope.row,scope.$index,2,scope.row.tenantConfig)"
                >
                  <p>已失效，延长减免周期</p>
                </div>
              </div>
              <div v-else>-</div>
            </template>
          </el-table-column>
          <el-table-column prop="updateTime" label="住房贷款信息" width="258">
            <template slot-scope="scope">
              <div v-if="scope.row.loanConfig" class="multi">
                <div class="month-deduction">
                  <h6>每月减免</h6>
                  <p>{{scope.row.loanConfig.perSub}}元</p>
                </div>
                <div class="cycle">
                  <h6>当前减免周期</h6>
                  <p>{{scope.row.loanConfig.startDate}}-{{scope.row.loanConfig.endDate}}</p>
                </div>
                <div
                  class="btn-mask"
                  v-if="scope.row.loanConfig.status==0"
                  @click="onExtendCycle(scope.row,scope.$index,3,scope.row.loanConfig)"
                >
                  <p>已失效，延长减免周期</p>
                </div>
              </div>
              <div v-else>-</div>
            </template>
          </el-table-column>
          <el-table-column prop="updateTime" label="赡养老人" width="258">
            <template slot-scope="scope">
              <div v-if="scope.row.supportConfig" class="multi">
                <div class="month-deduction">
                  <h6>每月减免</h6>
                  <p>{{scope.row.supportConfig.perSub}}元</p>
                </div>
                <div class="cycle">
                  <h6>当前减免周期</h6>
                  <p>{{scope.row.supportConfig.startDate}}-{{scope.row.supportConfig.endDate}}</p>
                </div>
                <div
                  class="btn-mask"
                  v-if="scope.row.supportConfig.status==0"
                  @click="onExtendCycle(scope.row,scope.$index,4,scope.row.supportConfig)"
                >
                  <p>已失效，延长减免周期</p>
                </div>
              </div>
              <div v-else>-</div>
            </template>
          </el-table-column>
          <el-table-column prop="updateTime" label="继续教育" width="258">
            <template slot-scope="scope">
              <div v-if="scope.row.educationConfig" class="multi">
                <div class="month-deduction">
                  <h6>每月减免</h6>
                  <p>{{scope.row.educationConfig.perSub}}元</p>
                </div>
                <div class="cycle">
                  <h6>当前减免周期</h6>
                  <p>{{scope.row.educationConfig.startDate}}-{{scope.row.educationConfig.endDate}}</p>
                </div>
                <div
                  class="btn-mask"
                  v-if="scope.row.educationConfig.status==0"
                  @click="onExtendCycle(scope.row,scope.$index,5,scope.row.educationConfig)"
                >
                  <p>已失效，延长减免周期</p>
                </div>
              </div>
              <div v-else>-</div>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120" fixed="right">
            <template slot-scope="scope">
              <el-button @click="onSeeDetail(scope.row.empId,scope.row)" type="text" size="small">查看</el-button>
              <el-button type="text" size="small" @click="onEdit(scope.row)">编辑</el-button>
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
          layout="sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </template>
      <template v-if="curActive==2">
        <el-table
          class="table-all-wrap table-wrap deduction-list"
          :data="tableData"
          style="width: 100%"
          :height="tableHeight">
          <!--<el-table-column fixed type="selection" width="50"></el-table-column>-->
          <el-table-column fixed prop="empName" label="姓名" width="100"></el-table-column>
          <el-table-column prop="empNum" label="工号" width="120"></el-table-column>
          <el-table-column prop="empNum" label="合同公司" width="120"></el-table-column>
          <el-table-column prop="depName" label="部门" width="140"></el-table-column>
          <el-table-column prop="position" label="职位" width="160"></el-table-column>
          <el-table-column prop="updateTime" label="累计收入额" width="150"></el-table-column>
          <el-table-column prop="updateTime" label="累计减免额" width="150"></el-table-column>
          <el-table-column prop="updateTime" label="累计已缴税额" width="150"></el-table-column>
        </el-table>
        <el-pagination
          class="t-r"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="sizeAry"
          :page-size="pageSize"
          layout=" sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </template>
    </div>

    <!--弹框区域 查看 新增 编辑 延期-->
    <see-deduction v-if="isShowDetail" :show.sync="isShowDetail" :model="curModel" />
    <add-deduction v-if="isAddDeduction" :show.sync="isAddDeduction" @addCallback="addCallback" />
    <edit-deduction v-if="isShowEditDeduction" :show.sync="isShowEditDeduction" :cur-model="curModel" @editCallback="editCallback"/>
    <delayed-deduction v-if="isShowExtend" :show.sync="isShowExtend" :delayed-model="delayedModel" @delayedCallback="delayedCallback"/>
  </div>
</template>

<script>
import selecttree from "../../../components/selectTree";
import addDeduction from "./addDeduction";
import seeDeduction from "./seeDeduction";
import editDeduction from "./editDeduction";
import delayedDeduction from "./delayedDeduction";
export default {
  components: {
    selecttree,
    addDeduction,
    seeDeduction,
    editDeduction,
    delayedDeduction
  },
  data() {
    return {
      tableHeight:window.innerHeight-305,
      searchKey: null, //搜索内容
      departments: [],
      searchDepartment: "", //搜索部门
      searchYear:null,//按年度搜索
      isCollapse: false, //是否收起状态
      contractCompanyList:[],//合同公司列表
      contractCompany:'',//合同公司选中值

      curActive: "1",
      activeIndex: "1",

      // 分页涉及到
      tableData: [],
      currentPage: 1,
      isloading: false,
      total: 1,
      pageSize: 10,
      sizeAry: [10, 20, 30, 50, 100],

      // taxPageList: [],
      // taxCurrentPage: 1,
      // taxPageSize: 10,
      // taxTotal: 1,
      // taxSizeAry: [10, 20, 30, 50, 100],

      //查看弹框
      isShowDetail: false,
      //当前查看/编辑对象
      //与delayedModel不同，此对象为附加专项详情，为当前列表中的一整行
      curModel: {},

      //新增附加专项扣除
      isAddDeduction: false,

      // 延长时间周期弹框
      isShowExtend: false,
      // 延长周期的扣除所需对象
      // 包含emp 和 当前选择的单一扣除项两个属性
      delayedModel: null,

      //编辑附加专项扣除弹框
      isShowEditDeduction: false
    };
  },
  methods: {
    onDepartments() {
      // const url = "https://www.easy-mock.com/mock/5d15cbc238f5145ef5374a93/example/api/deplist/getStructer";
      const url = "/deplist/getStructure";
      const params = {
        companyId:1
      }
      this.$http.get(url, {params}).then(response => {
        this.departments = [response.result];
      });
    },
    onSetDepartMent(value) {
      console.log(value);
      this.depChecked = value;
    },
    //获取合同公司筛选项列表
    getContractCompanyList(){
      const params = {
        companyId:1
      }
      this.$http.get('/maincompanylist/queryMainCompanyList', {params}).then(response => {
        this.contractCompanyList = response.result
      });
    },
    getData() {
      console.log(this.contractCompany);
      this.isloading = true;
      // const url = "https://www.easy-mock.com/mock/5d15cbc238f5145ef5374a93/example/api/empAdditional/getAdditionalList";
      let url = "/empAdditional/getAdditionalList";
      let params = {
        companyId:1,
        pageNum: this.currentPage-1,
        pageSize: this.pageSize,
        depId: this.depChecked,
        mainCompanyId:this.contractCompany||null,
        nameNumPhone: this.searchKey
      };
      //按选项卡选中的类型 获取不同的数据
      if (this.curActive == 2) {
        url = "/empAdditional/queryPersonalTax";
        params.year = this.searchYear
      }
      this.$http.post(url, params).then(res => {
          this.total = res.total;
          const contents = res.result;
          this.handleShowList(contents);
        })
        .finally(a => {
          this.isloading = false;
        });
    },
    //搜索会将当前页码置为 1 再去调用getData
    onSearch() {
      this.currentPage = 1;
      this.getData();
    },
    handleShowList(contents) {
      // 类型(1-子女教育，2-住房租金，3-住房贷款利息，4-赡养老人，5-继续教育)'
      // contents.forEach(item=>{
      // var optionName = [];
      // item.empAdditionalConfigDOS.forEach(data=>{
      // optionName.push(data.optionName);
      // })
      // item.planOption = optionName.join(',')
      // })
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
    // handleTaxSizeChange(val) {
    //   console.log(`每页 ${val} 条`);
    //   this.taxPageSize = val;
    //   this.getData();
    // },
    // handleCurrentChange1(val) {
    //   console.log(`当前页: ${val}`);
    //   this.taxCurrentPage = val;
    //   this.getData();
    // },
    rowClass({ row,column, rowIndex,columnIndex}){
      if(columnIndex > 3) return 'padding-left: 24px';
    },
    // 选项卡
    handleSelect(index, indexPath) {
      this.curActive = index;
      this.onSearch();
    },
    // 查看
    onSeeDetail(empId, item) {
      // 目测列表中的对象 和 获取单个详情的对象一致，则不需要单独查询
      // 如果列表中的对象为简略对象，不能满足查看需求，则可以先查询详情后再赋值和打开弹窗
      // ps：以上逻辑适用于编辑
      this.curModel = item;
      this.isShowDetail = true;
      // const url =
      //   "https://www.easy-mock.com/mock/5d15cbc238f5145ef5374a93/example/api/empadditional/getSingle";

      // this.$http(url, {
      //   params: {
      //     empId
      //   }
      // }).then(res => {
      //   this.curModel = res.result;
      //   this.isShowDetail = true;
      // });
    },
    // 编辑
    onEdit(item) {
      this.curModel = item;
      this.isShowEditDeduction = true;
    },
    // 延期
    onExtendCycle(empModel, index, type, deductionModel) {
      this.delayedModel = {
        emp: empModel,
        deduction: deductionModel,
        index
      };
      this.isShowExtend = true;
    },
    // 新增回调
    addCallback(items) {
      if (this.curActive == 1) this.onSearch();
    },
    editCallback(item) {
      //1、将修改后的model传回替换，性能最好，但是不建议，因为经过修改组件的model会有一些特殊的控制属性
      // const index = this.tableData.findIndex(f => f.id == item.id);
      // this.tableData.splice(index, 1, item);

      //2、这里也可以直接重新请求整个列表，不建议，体验不好，性能最差，最不容易出错。
      this.onSearch();

      //3、单独查询修改后的这一条，替换列表，建议， 体验尚可，性能一般。

      // this.$http('/empAdditional/getSingle', {
      //   params: {
      //     empId: this.curModel.empId
      //   }
      // }).then(res => {
      //   console.log(res.result);
      //   //将请求回来的刚才修改过这一条 替换到列表上
      //   const index = this.tableData.findIndex(f => f.id == this.curModel.id);
      //   this.tableData.splice(index, 1, res.result);
      // });
    },
    delayedCallback(item) {
      //将修改后的对象的值（status、金额、时间）覆盖到 打开弹窗时保存的 对象里
      Object.assign(this.delayedModel.deduction, item);
      //vue监听不到对象中属性值得变化，手动触发
      this.$set(
        this.tableData,
        this.delayedModel.index,
        this.tableData[this.delayedModel.index]
      );
    }
  },
  created() {
    this.onDepartments();
    this.onSearch();
    this.getContractCompanyList()
  }
};
</script>

<style lang="less">
@import "../index";
.deduction {
  .btns {
    button:first-child {
      width: 140px;
    }
  }
  .search-area {
    .el-input {
      width: 160px;
      margin-right: 10px;
    }
    /deep/.el-select {
      @w: 100px;
      .el-input,
      .el-input__inner {
        width: @w;
      }
    }
  }
  /*.table-all-wrap {*/
    /*.el-table {*/
      /*td {*/
        /*padding: 0;*/
      /*}*/
    /*}*/
  /*}*/
  .additional-list{
    .el-table__header{
      th{
        padding: 18px 0 7px;
      }
    }
    .el-table__body {
      td {
        padding: 0;
        .cell{
          /*padding: 0;*/
        }
      }
    }
    .multi{
      padding: 10px 26px;
    }
    .cycle{
      margin-left: 25px;
    }
  }
  .multi {
    /*overflow: hidden;*/
    width: 100%;
    position: relative;
    display: inline-block;
    .month-deduction,
    .cycle {
      /*float: left;*/
      display: inline-block;
    }
    .month-deduction {
      vertical-align: top;
      color: @middle;
      .btn-childtitle {
        display: block;
        font-size: 13px;
      }
      .el-input,
      .el-input__inner {
        width: 120px;
      }
      .el-input {
        margin-right: 5px;
      }
    }
    p.main-cont{
      margin-top: 5px;
    }
    .cycle {
      margin-left: 10px;
      color: @middle;
      h6 {
        font-size: 13px;
        font-weight: normal;
      }
    }
    .btn-mask {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      border-radius: 2px;
      background: #f7f7f7;
      opacity: 0.8;
      cursor: pointer;
      p {
        position: absolute;
        top: 50%;
        /*left: 50%;*/
        transform: translateY(-50%);
        font-size: 14px;
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        color: @redcolor;
        width: 100%;
        text-align: center;
      }
    }
  }
  /*员工累计扣除金额列表*/
  .deduction-list{
    .el-table__header{
      th{
        padding: 18px 0 7px;
      }
    }
    /deep/.el-table__body{
      td{
        padding: 7px 0;
      }
    }
  }
  /*弹框部分*/
  .head-wrap {
    .head-top {
      overflow: hidden;
      padding: 0 100px 15px;
      .right-info,
      .header-img {
        float: left;
      }
      .header-img {
        margin-right: 20px;
        img {
          border-radius: 52px;
        }
      }
      .right-info {
        .user-name {
          font-size: 24px;
          font-family: PingFangSC-Semibold;
          font-weight: 600;
          color: #333;
          display: inline-block;
        }
        .other-info {
          color: @middle;
          font-weight: 400;
          font-size: 13px;
        }
      }
      .el-image {
        width: 52px;
        height: 52px;
      }
    }
    .head-body {
      .describe {
        color: @base;
        font-family: PingFangSC-Semibold;
        font-weight: 600;
      }
      .deduction-item {
        li {
          font-family: PingFangSC-Semibold;
          font-weight: 600;
          color: @middle;
          border-bottom: 1px solid #d8d8d8;
          overflow: hidden;
          padding: 16px 0;
          .left,
          .middle,
          .right {
            float: left;
          }
          .left {
            margin-right: 15px;
          }
          .middle {
            margin-right: 30px;
            font-size: 12px;
            font-weight: 400;
            font-family: PingFangSC-Regular;
          }
          .right {
            width: 500px;
            .icon-right {
              position: absolute;
              right: 0;
              top: 2px;
              font-size: 15px;
            }
            .right-item {
              position: relative;
              margin-bottom: 18px;
              line-height: 18px;
              &:last-child {
                margin-bottom: 0;
              }
            }
            .icon-enable {
              color: #66cc66;
            }
            .icon-unenable {
              color: @light;
            }
          }
          &:last-child {
            border-bottom: none;
          }
          .zy-edit-pub {
            vertical-align: top;
          }
          .time-scope {
            border-color: @light;
            border-radius: 2px;
            margin-left: 10px;
            .el-range-separator {
              color: @middle;
            }
          }
          .border {
            font-size: 0;
            margin-top: 10px;
          }
        }
      }
    }
  }
  .dialog-item-list {
    .dialog-body {
      margin-top: 20px;
      th {
        background: #f7f7f7;
      }
      .cycle {
        .el-input {
          width: 150px;
          display: block;
        }
      }
    }
    /*新增附加专项扣除弹框*/
    /*.dia-add-deduction{*/
    /*.el-input__inner{*/
    /*width: 95px;*/
    /*}*/
    /*}*/
    .search-dep {
      .el-input__inner {
        width: 100px;
      }
    }
    .dia-btn-addchild {
      color: @base;
      font-size: 13px;
    }
    .dia-btn-delchild {
      position: absolute;
      width: 24px;
      height: 24px;
      right: 0;
      background: url("../../../assets/images/icon-delchild.png") no-repeat
        center/contain;
    }
    .mt5 {
      margin-top: 5px;
    }
  }
  td {
    padding: 0;
  }
}
</style>
