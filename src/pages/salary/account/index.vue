<template>
  <div class="account salary">
    <!--面包屑及按钮区域-->
    <div class="zy-bg-breadcrumb breadcrumb-account">
      <div class="menu-area">
        <div class="comm">
          <el-breadcrumb class="bread" separator="/">
            <el-breadcrumb-item>
              <a href="/salary">薪资管理</a>
            </el-breadcrumb-item>
            <el-breadcrumb-item>
              <a>核算薪资</a>
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="btns">
          <el-button style="width: 115px;" type="primary" @click="isShowSync=true">① 同步计薪人员</el-button>
          <el-button style="width: 115px;" type="primary" @click="isShowAdjust=true">② 调整计薪方案</el-button>
          <el-button style="width: 145px;" type="primary" @click="isShowImport=true">③ 导入/更新薪资数据</el-button>
          <el-button class="green-button" type="success">计算薪资</el-button>
          <el-button style="width: 145px;" plain @click="isGuiDang=true">归档/新建下月薪资表</el-button>
          <el-link class="btn-guide" icon="el-icon-info">编辑</el-link>
        </div>
      </div>
      <div class="salarylist-area">
        <p>
          薪资月份：
          <span>{{monthcheck || '未选择'}}</span>
        </p>
        <p>
          计薪人数：
          <span>{{salaryNum}}</span>
        </p>
        <p>
          本月入职：
          <span>{{joinSalaryIds.length}}人</span>
        </p>
      </div>
      <div class="zy-search-pub search-area breadcrumb-account-search">
        <div class="search-item">
          <el-input class="search" placeholder="姓名/工号" v-model="keyword"></el-input>
          <selecttree
            placeholder="部门"
            :multiple="true"
            :options="departments"
            @getValue="onSetDepartMent($event)"
            ref="selectTree"
            class="search-dep"
          />
          <el-select v-model="planChecked" placeholder="请选择薪资方案" :multiple="true" collapse-tags>
            <el-option
              v-for="item in salaryPlanList"
              :key="item.planId"
              :label="item.planName"
              :value="item.planId"
            ></el-option>
          </el-select>
        </div>
        <div class="search-btns">
          <el-button class="button light-btn" @click="onPage">搜索</el-button>
          <el-button class="button" @click="onResetSearch">重置</el-button>
        </div>
      </div>
      <div class="assist-btn">
        <el-link
          :href="'/salary/manualUpdate?keyword='+keyword +'&depChecked='+depChecked"
          icon="el-icon-edit-outline"
        >手动修正</el-link>
        <el-link icon="el-icon-delete" @click="onShowDel">删除人员</el-link>
        <!--<el-link icon="el-icon-upload2">导出</el-link>-->
      </div>
    </div>

    <!--表格区域-->
    <div class="table-all-wrap">
      <div class="el-table-wrap">
        <el-table
          v-loading="loading"
          class="table-wrap"
          :data="list"
          style="width: 100%"
          height="450"
          ref="DataTable">
          <el-table-column fixed type="selection" width="55"></el-table-column>
          <el-table-column fixed prop="empName" label="姓名" width="100"></el-table-column>
          <el-table-column prop="empNum" label="工号" width="100"></el-table-column>
          <el-table-column prop="depName" label="部门" width="100"></el-table-column>
          <el-table-column prop="position" label="职位" width="100"></el-table-column>
          <el-table-column prop="empStatus" label="状态" width="100"></el-table-column>
          <el-table-column prop="empType" label="类型" width="100"></el-table-column>
          <template v-for="(col,key,index) in columns">
            <el-table-column v-for="(opt,colIndex) in col" width="100" :key="opt.optionId">
              <template slot="header" slot-scope="scope">
                <span class="icon-circle" :class="'icon-co-'+(index+1)"></span>
                {{opt.optionName}}
              </template>
              <template
                slot-scope="scope"
              >{{ (scope.row[key+'OptionList'][colIndex]||{}).optionValue || '-'}}</template>
            </el-table-column>
          </template>
          <el-table-column prop="orgTotal" label="应发" width="100"></el-table-column>
          <el-table-column prop="actualTotal" label="实发" width="100"></el-table-column>
          <el-table-column prop="orgAttendance" label="应出勤" width="100"></el-table-column>
          <el-table-column prop="actualAttendance" label="实际出勤" width="100"></el-table-column>
          <el-table-column prop="supplyAddTotal.supplyTotal" label="补发" width="100"></el-table-column>
          <el-table-column prop="supplySubTotal.supplyTotal" label="补扣" width="100"></el-table-column>
          <el-table-column prop="taxReduce" label="个税" width="100"></el-table-column>
          <el-table-column prop="lateFee" label="滞纳金" width="100"></el-table-column>
          <el-table-column prop="attendanceSalary" label="出勤工资" width="100"></el-table-column>
          <el-table-column prop="remark" label="备注" width="100"></el-table-column>
          <el-table-column prop="addtionalOption.perIncomeTax" label="个税累计" width="120"></el-table-column>
          <el-table-column prop="addtionalOption.perIncomeTotal" label="年收入累计" width="120"></el-table-column>
          <el-table-column prop="addtionalOption.perMonthSub1" label="子女教育" width="120"></el-table-column>
          <el-table-column prop="addtionalOption.perMonthSub2" label="继续教育" width="120"></el-table-column>
          <el-table-column prop="addtionalOption.perMonthSub3" label="住房贷款" width="120"></el-table-column>
          <el-table-column prop="addtionalOption.perMonthSub4" label="住房租金" width="120"></el-table-column>
          <el-table-column prop="addtionalOption.perMonthSub5" label="赡养老人" width="120"></el-table-column>
          <el-table-column prop="addtionalOption.perSubTotal" label="累计扣除" width="120"></el-table-column>
        </el-table>
      </div>
      <el-pagination
        class="t-r"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="sizeAry"
        :page-size="pageSize"
        layout=" sizes, prev, pager, next, jumper, slot"
        :total="total"
      >
        <div class="pagination-slot">
          <p>
            薪资总计：
            <em>￥{{salaryTotal}}元</em>
          </p>，
          <p>
            企业成本：
            <em>￥{{companyCost}}元</em>
          </p>
        </div>
      </el-pagination>
    </div>

    <!--弹框区域-->
    <!--选择薪资核算起始月份-->
    <el-dialog
      class="zy-dialog-pub zy-dialog-pub-medium"
      title="请选择薪资核算起始月份"
      :visible.sync="isShowCheckMonth"
      :close-on-click-modal="false"
      :show-close="false">
      <p class="word-explain">首次在系统进行薪资核算需选择起始月份，将以此月为始进行薪资核算~</p>
      <div class="dia-check-month t-c">
        请选择月份：
        <el-select v-model="monthcheck" placeholder="请选择">
          <el-option
            v-for="item in monthArr"
            :label="item.label"
            :key="item.value"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div slot="footer" class="dialog-footer t-c">
        <el-button type="primary" class="blue-button" @click="onMonth">确 定</el-button>
      </div>
    </el-dialog>
    <!--删除人员-->
    <el-dialog class="zy-dialog-pub zy-dialog-pub-medium" title="删除人员" :visible.sync="isShowDel">
      <p class="word-explain">{{delTitle}}</p>
      <div slot="footer" class="dialog-footer t-c">
        <el-button class="button default-button" @click="isShowDel = false">取 消</el-button>
        <el-button type="primary" class="blue-button" @click="onDel">确 定</el-button>
      </div>
    </el-dialog>
    <!--同步计薪人员-->
    <el-dialog class="zy-dialog-pub zy-dialog-pub-medium" title="同步计薪人员" :visible.sync="isShowSync">
      <p class="word-explain">此操作将会重新同步本月新入职、在职中、已离职、补发补扣的所有需要计薪的人员，请确认是否重新同步？</p>
      <div slot="footer" class="dialog-footer t-c">
        <el-button class="button default-button" @click="isShowSync = false">取 消</el-button>
        <el-button type="primary" class="blue-button" @click="onSync">确 定</el-button>
      </div>
    </el-dialog>
    <!--调整薪资方案-->
    <adjust-plan
      v-if="isShowAdjust"
      :show.sync="isShowAdjust"
      :departments="departments"
      :keyword="keyword"
      :dep-checked="depChecked"
      :plan-checked="planChecked"
    ></adjust-plan>
    <!--归档-->
    <el-dialog class="zy-dialog-pub zy-dialog-pub-large" title="归档" :visible.sync="isGuiDang">
      <div class="dia-search-dep-wrap">
        <div class="search-input">
          <el-input class="s-input" v-model="filterText" placeholder="部门名称/员工姓名"></el-input>
          <el-button class="s-btn" icon="el-icon-search"></el-button>
        </div>
        <div class="search-tree-result">
          <el-tree
            class="tree-result"
            show-checkbox
            node-key="id"
            :filter-node-method="filterNode"
            :default-expanded-keys="[2, 3]"
            :default-checked-keys="[5]"
            :props="defaultProps"
            ref="diaSearchTree"
          ></el-tree>
        </div>
      </div>
      <el-table class="dia-adjust-table" :data="list" height="250" border style="width: 490px">
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="zip" label="部门" width="180"></el-table-column>
        <el-table-column prop="zip" label="工号"></el-table-column>
        <el-table-column prop="zip" label="职位"></el-table-column>
        <el-table-column prop="zip" label="当前薪资方案"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-link icon="el-icon-delete"></el-link>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer t-c">
        <el-button class="button default-button" @click="isShowAdjust = false">取 消</el-button>
        <el-button type="primary" class="blue-button" @click="onAdjust">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { fail } from "assert";
import selecttree from "../../../components/selectTree";
import adjustPlan from "./adjustPlan";

export default {
  components: {
    selecttree,
    adjustPlan
  },
  data() {
    return {
      loading: false,
      keyword: "",
      salaryPlanList: [],
      planChecked: null,
      departments: [],
      depChecked: [],
      //选择薪资核算起始月份
      isShowCheckMonth: false,
      monthArr: [],
      monthcheck: "",

      //删除弹框
      isShowDel: false,
      delTitle: "",
      //同步计薪人员
      isShowSync: false,
      //导入导出
      isShowImport:false,
      //调整薪资方案
      isShowAdjust: false,
      //归档
      isGuiDang: false,
      filterText: "",
      defaultProps: {
        children: "children",
        label: "depName"
      },
      currentPage: 1,
      pageSize:10,
      sizeAry:[10, 20, 30, 50, 100],
      list: [],
      total: 0,
      joinSalaryIds: [],
      leaveSalaryIds: [],
      companyCost: 0,
      salaryTotal: 0,
      salaryNum: 0,
      columns: {}
      //   page: {}
    };
  },
  watch: {
    // filterText(val) {
    //   this.$refs.diaSearchTree.filter(val);
    // }
  },
  methods: {
    onInit() {},
    onPage(params) {
      console.log(params);
      this.loading = true;
      // const url = "https://www.easy-mock.com/mock/5d15cbc238f5145ef5374a93/example/api/salary/compute";
      const url="/salary/salaryList";
      this.$http.get(url,
          {
            params: Object.assign(
              {
                companyId:1,
                pageNum: this.currentPage-1,
                pageSize: this.pageSize
                // query:{
                //   companyId:1,
                //   pageNum: this.currentPage,
                //   pageSize: this.pageSize
                // }
              },
              params
            )
          }
        )
        .then(response => {
          //如果返回为空，则尚未选择月份
          if (!response.result) {
            this.getMonth();
            this.isShowCheckMonth = true;
            return;
          }
          this.list = response.result.empSalarys;
          this.total = response.total;
          // //本月入职
          this.joinSalaryIds = response.result.joinSalaryIds;
          // //本月离职
          this.leaveSalaryIds = response.result.leaveSalaryIds;
          // //企业成本
          this.companyCost = response.result.companyCost;
          // //薪资总计
          this.salaryTotal = response.result.salaryTotal;
          // //计薪人数
          this.salaryNum = response.result.salaryNum;
          const propertys = Object.keys(response.result.columns);
          this.list.forEach(model => {
            propertys.forEach(key => {
              let temp = [];
              temp = JSON.parse(JSON.stringify(response.result.columns[key]));
              temp.forEach(item => {
                const curModel = model[`${key}OptionList`].find(
                  f => f.optionId == item.optionId
                );
                if (curModel) Object.assign(item, curModel);
              });
              model[`${key}OptionList`] = temp;
            });
          });
          this.columns = response.result.columns;
          console.log(this.list);

          // this.list.forEach(model => {
          //   propertys.forEach(key => {
          //     let temp = {};
          //     model[`${key}OptionList`].forEach(item => {
          //       temp[item.optionId] = JSON.parse(JSON.stringify(item));
          //     });
          //     model[key] = temp;
          //   });
          // });
          // this.columns = response.result.columns;
        })
        .finally(t => {
          this.loading = false;
        });
    },
    // 选择月份
    onMonth() {
      if (!this.monthcheck) {
        this.$message({
          message: "请选择月份",
          type: "warning"
        });
        return;
      }
      let month = this.monthcheck.split('-').join('');
      this.$http.get('/salarysettlement/initMonth',{
        params:{
          companyId:this.companyId,
          month
        }
      }).then(res=>{
        // 选择完月份，自动调同步计薪人员接口
        this.onSync();
        // this.onPage({
        //   sync: true
        // });
        this.isShowCheckMonth = false;
      });
    },
    onDepartments() {
      const url = "/deplist/getStructure";
      // const url = "https://www.easy-mock.com/mock/5d15cbc238f5145ef5374a93/example/api/deplist/getStructer";
      this.$http.get(url, {
        params:{
          companyId:1
        }
      }).then(response => {
        this.departments = [response.result];
      });
    },
    onSetDepartMent(value) {
      this.depChecked = (value || []).map(m => m.id);
    },
    onSearch() {},
    onResetSearch() {
      this.$refs.selectTree.clearHandle();
      (this.keyword = ""), (this.depChecked = null), (this.planChecked = null);
    },
    //获取近12个月的月份
    getMonth() {
      var dataArr = [];
      var params = {};
      var data = new Date();
      var year = data.getFullYear();
      data.setMonth(data.getMonth() + 1, 1); //获取到当前月份,设置月份
      for (var i = 0; i < 12; i++) {
        data.setMonth(data.getMonth() - 1); //每次循环一次 月份值减1
        var m = data.getMonth() + 1;
        m = m < 10 ? "0" + m : m;
        dataArr.push(data.getFullYear() + "-" + m);
      }
      this.monthArr = dataArr.map((item, index) => {
        return {
          label: item,
          value: item
        };
      });
    },
    getSalaryPlan() {
      this.$http
        .get(
          "https://www.easy-mock.com/mock/5d15cbc238f5145ef5374a93/example/api/salary/list",
          {
            params: {
              id: 111
            }
          }
        )
        .then(response => {
          this.salaryPlanList = response.result;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.onPage();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.onPage();
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClick() {},
    onShowDel() {
      if (!this.$refs.DataTable.selection.length) {
        this.$message("请勾选要删除的人员");
        return;
      }
      const selection = this.$refs.DataTable.selection;
      const names = selection.map(m => `“${m.empName}”`).toString();
      // this.monthcheck
      this.delTitle = `是否确定删除人员${names} ${selection.length}人？删除后将不再为${selection.length}人计算2019-05月薪资`;
      this.isShowDel = true;
    },
    //删除弹框的确认删除功能
    onDel() {
      this.$refs.DataTable.selection.forEach(item => {
        const index = this.list.findIndex(f => f.empId == item.empId);
        this.list.splice(index, 1);
      });
      this.isShowDel = false;
      // console.log(this.$refs.DataTable.selection)
    },
    //确认同步计薪人员
    onSync() {
      this.isShowSync = false;
      const month = this.monthcheck.split('-').join('');
      this.$http.get('/salary/syncEmpSalary',{
        params:{
          month:201906,
          companyId:1
        }
      }).then(res=>{

      })
      // this.onPage({
      //   sync: true
      // });
    },
    //调整薪资方案弹框
    filterNode(value, data) {
      if (!value) return true;
      return data.depName.indexOf(value) !== -1;
    },
    //确定调整薪资方案
    onAdjust() {}
  },
  created() {
    this.getSalaryPlan();
    this.onDepartments();
    this.onPage();
  }
};
</script>

<style lang="less" scoped>
@import "../index";
.account {
  position: relative;
  padding: 160px 20px 68px;
  .breadcrumb-account {
    height: 138px;
    .menu-area {
      padding-bottom: 6px;
    }
    .salarylist-area {
      border-top: 1px solid @light;
      padding-top: 9px;
      padding-bottom: 17px;
      p {
        display: inline-block;
        font-size: 13px;
        margin-right: 20px;
        font-family: DINAlternate-Bold;
        font-weight: bold;
        span {
          color: @base;
        }
      }
    }
    &-search {
      box-shadow: none;
      padding: 0;
      .search {
        width: 160px;
      }
      .el-select {
        // width: 90px;
      }
    }
    .assist-btn {
      position: absolute;
      right: 30px;
      bottom: 20px;
      .el-link {
        color: @base;
        font-size: 12px;
      }
    }
    .btns {
      font-size: 0;
      .el-button {
        margin-right: 10px;
      }
    }
  }
  .table-all-wrap {
    position: relative;
    box-shadow: 2px 0px 16px 0px rgba(3, 33, 136, 0.2);
    border-radius: 4px;
    background: @ff;
    .icon-circle {
      @h: 10px;
      width: @h;
      height: @h;
      border-radius: @h;
      margin-right: 4px;
      display: inline-block;
    }
    .icon-co-1 {
      background-color: #267ff6;
    }
    .icon-co-2 {
      background-color: #2e1cac;
    }
    .icon-co-3 {
      background-color: #f626cb;
    }
    .icon-co-4 {
      background-color: #f62654;
    }
    /*分页部分*/
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
  }
  .btn-guide {
    color: @base;
    vertical-align: inherit;
    font-size: 12px;
    font-family: PingFangSC-Semibold;
    font-weight: 600;
  }
  /*弹框区域*/
  .dia-check-month {
    margin-top: 49px;
  }
  /*调整薪资方案弹框*/
  // .dia-search-dep-wrap {
  //   height: 250px;
  //   overflow: auto;
  //   display: inline-block;
  //   padding-right: 20px;
  //   margin-right: 20px;
  //   vertical-align: top;
  //   border-right: 1px solid @light;
  //   .search-input {
  //     .s-input {
  //       width: 240px;
  //     }
  //     .s-btn {
  //       background: @base;
  //       color: @ff;
  //     }
  //     .el-input__inner {
  //       @h: 30px;
  //       height: @h;
  //       line-height: 30px;
  //     }
  //   }
  //   .search-tree-result {
  //     margin-top: 30px;
  //     overflow-y: scroll;
  //   }
  // }
  // .search-result-wrap {
  //   display: inline-block;
  //   .top-menu,
  //   .el-link--default {
  //     color: @base;
  //   }
  //   .el-link--default {
  //     font-size: 12px;
  //   }
  //   .top-menu {
  //     font-size: 14px;
  //     margin-bottom: 8px;
  //     span.pick-num {
  //       width: 412px;
  //       display: inline-block;
  //     }
  //   }
  // }
  // .batch-handle-warp {
  //   background: #fafafa;
  //   margin-top: 40px;
  //   color: @middle;
  //   @h: 60px;
  //   height: @h;
  //   font-size: 14px;
  //   line-height: @h;
  //   span.pick-num {
  //     color: @base;
  //     padding: 5px 19px;
  //     border-right: 1px solid @light;
  //   }
  //   p.batch-handle-p {
  //     display: inline-block;
  //     padding: 0 20px;
  //     .el-input__inner {
  //       width: 100px;
  //       height: 30px;
  //       line-height: 30px;
  //     }
  //   }
  //   button.batch-handle-btn {
  //     border: 0;
  //     background: #fafafa;
  //     font-size: 12px;
  //     &:nth-of-type(1) {
  //       color: @base;
  //       padding-left: 20px;
  //       font-size: 13px;
  //       border-left: 1px solid @light;
  //       border-radius: 0;
  //     }
  //   }
  // }
  // .dia-adjust-table {
  //   width: 490px;
  //   display: inline-block;
  //   /deep/th {
  //     background: #f7f7f7;
  //   }
  // }
}
</style>
