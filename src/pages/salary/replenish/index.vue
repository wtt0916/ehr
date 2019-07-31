<template>
  <div class="replenish zy-main-wraps salary">
    <!--面包屑及按钮区域-->
    <div class="zy-bg-breadcrumb">
      <div class="menu-area">
        <div class="comm">
          <el-breadcrumb class="bread" separator="/">
            <el-breadcrumb-item>
              <a href="/salary">薪资管理</a>
            </el-breadcrumb-item>
            <el-breadcrumb-item>
              <a>补发补扣</a>
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="btns">
          <el-button type="primary" style="width: 140px;" @click="isShowStartReplenish = true">发起补发补扣</el-button>
        </div>
      </div>
    </div>
    <!--搜索区域-->
    <div class="zy-search-pub search-area" :class="{'search-collapse':isCollapse}">
      <div class="search-item">
        <el-input placeholder="姓名/工号" class="search-input" size="medium" v-model="searchKey"></el-input>
        <selecttree
          placeholder="部门"
          :multiple="true"
          :options="departments"
          @getValue="onSetDepartMent($event)"
          ref="selectTree"
          class="search-dep"/>
        <el-select v-model="categoryChecked" class="search-select" placeholder="类别" size="medium">
          <el-option :key="item.id" v-for="item in categorys" :label="item.name" :value="item.id"></el-option>
        </el-select>
        <el-date-picker
                class="search-select-month"
                v-model="belongMonthChecked"
                type="month"
                size="medium"
                value-format="yyyyMM"
                placeholder="归属月份">
        </el-date-picker>
        <el-date-picker
                class="search-select-month"
                v-model="executeMonthChecked"
                type="month"
                size="medium"
                value-format="yyyyMM"
                placeholder="执行月份">
        </el-date-picker>
        <!--<el-select v-model="belongMonthChecked" class="search-select" placeholder="归属月份">-->
          <!--<el-option-->
            <!--:key="item.label"-->
            <!--v-for="item in departments"-->
            <!--:label="item.label"-->
            <!--:value="item.value">-->
          <!--</el-option>-->
        <!--</el-select>-->
        <!--<el-select v-model="executeMonthChecked" class="search-select" placeholder="执行月份">-->
          <!--<el-option-->
            <!--:key="item.label"-->
            <!--v-for="item in departments"-->
            <!--:label="item.label"-->
            <!--:value="item.value"-->
          <!--&gt;</el-option>-->
        <!--</el-select>-->
      </div>
      <div class="search-btns">
        <el-button class="his-search light-btn" @click="onSearch">搜索</el-button>
        <el-button class="his-search" @click="onResetSearch">重置</el-button>
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
        @select="onMenuChange">
        <el-menu-item index="1">待执行（{{todoNum||0}}）</el-menu-item>
        <el-menu-item index="2">已执行（{{doneNum||0}}）</el-menu-item>
        <el-menu-item index="3">已取消（{{cancelNum||0}}）</el-menu-item>
      </el-menu>
      <template>
        <el-table v-loading="isloading" class="table-all-wrap table-wrap" :data="pageList" :height="tableHeight" style="width: 95%;margin-left:30px;">
          <el-table-column fixed prop="batchId" label="批次号" width="140"></el-table-column>
          <el-table-column prop="empName" label="姓名" width="80"></el-table-column>
          <el-table-column prop="empNum" label="工号" width="80"></el-table-column>
          <el-table-column prop="depName" label="部门" width="140" show-overflow-tooltip></el-table-column>
          <el-table-column prop="position" label="职位" width="100"></el-table-column>
          <el-table-column prop="typeName" label="类别" width="60"></el-table-column>
          <el-table-column prop="total" label="总额" width="100"></el-table-column>
          <el-table-column prop="belongMonth" label="归属月份" width="80"></el-table-column>
          <el-table-column prop="executeMonth" label="执行月份" width="80"></el-table-column>
          <el-table-column prop="taxationName" label="是否计税" width="80"></el-table-column>
          <el-table-column prop="remark" label="备注" width="160" show-overflow-tooltip></el-table-column>
          <el-table-column v-if="activeIndex==3" prop="updateTime" label="取消时间" width="160"></el-table-column>
          <el-table-column label="操作" :width="activeIndex==1?'160':'80'" fixed="right" align="center">
            <template slot-scope="scope">
              <el-button @click="onSeeDetail(scope.row.id,scope.row)" type="text" size="small">查看</el-button>
              <el-button @click="editDetail(scope.row)" v-if="activeIndex==1" type="text" size="small">修改</el-button>
              <el-button
                v-if="activeIndex==1"
                type="text"
                size="small"
                @click="onCancel(scope.row,scope.$index)"
              >取消</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          class="t-r"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :page-sizes="sizeAry"
          :page-size="pageSize"
          layout=" sizes, prev, pager, next, jumper,slot"
          :total="total">
          <div v-if="activeIndex!=3" class="pagination-slot">
            <p>总计：共{{Number(addEmpNum)+Number(subEmpNum)}}人，补发人数{{addEmpNum }}人，补发金额{{addTotalStr}}元；补扣人数：{{subEmpNum}}人，补扣金额{{subTotalStr}}元</p>，
            <!-- <p>
              企业成本：
              <em>￥{{companyCost}}元</em>
            </p>-->
          </div>
        </el-pagination>
      </template>
    </div>

    <!--弹框区域-->
    <see-replenish v-if="isShowDetail" :show.sync="isShowDetail" :model="seeInfo" />
    <edit-replenish v-if="isShowUpdate" :show.sync="isShowUpdate" :cur-model="seeInfo" @handleUpdate="handleUpdate"/>
    <add-replenish v-if="isShowStartReplenish" :show.sync="isShowStartReplenish" :curmonth="curCalcSalaryMonth" @onAddResult="onAddResult"/>
  </div>
</template>
<script>
import selecttree from "../../../components/selectTree";
import seeReplenish from "./seeReplenish";
import addReplenish from "./addReplenish";
import editReplenish from "./editReplenish";
export default {
  components: {
    selecttree,
    seeReplenish,
    addReplenish,
    editReplenish
  },
  data() {
    return {
      searchKey: null, //搜索内容
      searchDepartment: "", //搜索科室
      departments: [],
      depChecked: null,
      tableHeight:window.innerHeight-305,
      categorys: [
        // {
        //   id: 0,
        //   name: "全部"
        // },
        {
          id: 1,
          name: "补发"
        }, {
          id: 2,
          name: "补扣"
        }
      ],
      categoryChecked: null,
      belongMonthChecked: null,
      executeMonthChecked: null,

      isloading: false,
      activeName: "unexecuted",
      isCollapse: false, //是否收起状态

      activeIndex: "1",
      pageList: [],
      total: 0,
      pageNum: 1,
      pageSize: 10,
      sizeAry:[10, 20, 30, 50, 100],

      cancelNum: 0,
      doneNum: 0,
      todoNum: 0,

      addEmpNum: 0,
      addTotalStr: 0,
      subEmpNum: 0,
      subTotalStr: 0,

      //已执行
      tableData: [],

      //查看弹框
      isShowDetail: false,
      seeInfo: {}, //要查看的实体
      info: {},

      //修改弹框
      isShowUpdate: false,
      basicSalary: "", //基本薪资
      postSalary: "", //岗位薪资
      notesUpdate: "", //备注内容

      // 发起补发补扣
      isShowStartReplenish: false,

      //设置薪资项及金额
      isShowSetSaItem: false,
      curFixedItem: [
        {
          name: "固定薪资",
          status: true
        },
        {
          name: "固定薪资1",
          status: false
        }
      ], //当前固定薪资项条目
      isShowCustomArea: false,
      fee: "",

      //当前计薪月
      curCalcSalaryMonth:201908
    };
  },
  methods: {
    getStatusByNum() {
      const url = '';
      // const url = 'https://www.easy-mock.com/mock/5d15cbc238f5145ef5374a93/example/api';
      this.$http
        .get(`${url}/empSalaryBack/getStatusByNum`, {}).then(response => {
          Object.assign(this, response.result);
        });
    },
    getData() {
      // console.log(this.depChecked);//部门集合
      this.isloading = true;
      let params = {
        companyId:1,
        pageNum: this.pageNum-1,
        pageSize: this.pageSize,
        status: this.activeIndex,
        type: this.categoryChecked || null,
        belongMonth: this.belongMonthChecked,
        executeMonth: this.executeMonthChecked,
        inDepIds: this.depChecked,
        nameNumPhone: this.searchKey
      };
      this.$http.post(`/empSalaryBack/list`, params).then(res => {
          const contents = res.result;
          this.overwrite(contents);
          this.pageList = contents.empSalaryBack;
          this.addEmpNum = contents.addEmpNum;
          this.addTotalStr = contents.addTotalStr;
          this.subEmpNum = contents.subEmpNum;
          this.subTotalStr = contents.subTotalStr;
          this.total = res.total;
        })
        .finally(a => {
          console.log("finally");
          this.isloading = false;
        });
    },
    getDepartments() {
      const url = '/deplist/getStructure';
      // const url = 'https://www.easy-mock.com/mock/5d15cbc238f5145ef5374a93/example/api/deplist/getStructer';
      const params = {companyId:1}
      this.$http.get(url, {params}).then(response => {
        this.departments = [response.result];
      });
    },
    //获取当前计薪月
    getCurcalcSalaryMonth(){
      const url = '/salarysettlement/getSalaryMonth';
      // const url = 'https://www.easy-mock.com/mock/5d15cbc238f5145ef5374a93/example/salarysettlement/getSalaryMonth';
      const params = {companyId:1}
      this.$http.get(url, {params}).then(response => {
        console.log(response);
        this.curCalcSalaryMonth = response.result;
      });
    },
    onSetDepartMent(value) {
      if (!value) {
        this.depChecked = null;
        return;
      }
      this.depChecked = (value || []).map(m => m.depId);
    },
    onMenuChange(val) {
      this.activeIndex = val;
      this.pageNum = 1;
      this.getData();
    },
    onSearch() {
      this.onMenuChange(this.activeIndex);
    },
    overwrite(model) {
      let list=[];
      if(model instanceof Array) list=model;
      else list=model.empSalaryBack ||[];
      const taxationModel = { 1: "计税", 2: "不计税" };
      const typeModel = { 1: "补发", 2: "补扣" };
      const statusModel = { 1: "待执行", 2: "已执行", 3: "已取消" };
      list.forEach(item => {
        item.taxationName = taxationModel[item.taxation];
        item.typeName = typeModel[item.type];
        item.statusName = statusModel[item.status];
      });
      return model;
    },
    onResetSearch() {
      this.searchKey = null;
      this.depChecked = null;
      this.belongMonthChecked = null;
      this.executeMonthChecked = null;
      this.categoryChecked = null;
      this.$refs.selectTree.clearHandle();
      this.onSearch();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.onMenuChange(this.activeIndex);
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getData();
    },
    //查看
    onSeeDetail(id, item) {
      this.seeInfo = item;
      this.info = item;
      this.isShowDetail = true;
    },
    onAddResult(models) {
      this.onResetSearch()
      // models = this.overwrite(models);
      // models.forEach(m => {
      //   this.pageList.unshift(m);
      // });
      // this.pageList = this.pageList.concat(models);
    },
    onCancel(item, index) {
      this.$confirm(`是否确认取消员工${item.empName}的${item.typeName}`,
        "取消",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消"
        }
      ).then(() => {
        const params = {
          id:item.id,
          status:3
        }
        this.$http.post('/empSalaryBack/update',params).then(res=>{
            this.pageList.splice(index, 1);
            this.$message({
              type: "success",
              message: "取消成功!"
            });
          })
        })
        .catch(() => {});
    },

    // 编辑
    //编辑弹框确认编辑
    editDetail(item){
      this.seeInfo=item;
      console.log(item)
      this.isShowUpdate = true
    },
    handleUpdate(model) {
      const index = this.pageList.findIndex(f=> f.id == model.id);
      this.pageList.splice(index,1,model);
      console.log(this.pageList);
      this.overwrite(this.pageList);
    },
    onChangeStatus() {}
  },
  mounted() {
    this.getStatusByNum();
    this.getData();
    this.getDepartments();
    this.getCurcalcSalaryMonth();
  },
  created() {}
};
</script>

<style lang="less">
@import "../index";
.replenish {
  /*搜索区域*/
  .search-area{
    .search-select,.search-dep{
      width: 100px;
    }
    .search-select-month{
      width: 120px;
    }
  }
  /*发起补发补扣弹框特殊样式*/
  .dia-start-replenish {
    th {
      background: #f7f7f7;
    }
    .head-top {
      padding: 0;
    }
    .dia-table-select {
      .el-input__inner {
        width: 110px;
        border: 0;
      }
    }
  }
  //设置薪资项及金额
  .setsaitem {
    .head-top {
      padding: 0 80px 15px;
    }
    .set-sa-items {
      margin: 0 60px;
      border-top: 1px solid #d8d8d8;
      p.itemtype {
        font-size: 12px;
        color: #333;
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        padding: 13px 20px;
      }
      .dia-set-sa-items-table {
        color: @middle;
        td {
          font-size: 12px;
        }
        .line {
          width: 20px;
          height: 1px;
          border-radius: 1px;
          display: inline-block;
          margin: 0 20px;
          vertical-align: middle;
          background: #d8d8d8;
        }
        .el-input {
          width: 120px;
          .el-input__inner {
            height: 30px;
            line-height: 30px;
            font-size: 12px;
            border: 1px solid @light;
          }
        }
      }
      th {
        background: #f7f7f7;
      }
    }
    /*查看*/
    .info-detail {
      color: @middle;
      font-size: 12px;
      td {
        padding: 7px 10px;
        font-size: 12px;
      }
    }
  }
  .height30 {
    .el-input__inner {
      border: 1px solid @light;
    }
  }
}
.pagination-slot {
  font-size: 12px;
  font-weight: 400;
  position: absolute;
  left: 30px;
  top: 16px;
  p {
    display: inline-block;
    em {
      color: @base;
      font-style: normal;
    }
  }
}
</style>
