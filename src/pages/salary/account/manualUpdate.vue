<template>
  <div class="mu salary">
    <div class="search-tips-wrap">
      <div class="red-tips-wrap">
        <div class="red-tips">
          <span>若修改员工固定薪资数值及津补贴数值，在当月薪资存档后会自动将修改的薪资项数值更新至员工详情-薪资信息，后续核算薪资将以员工详情-薪资信息数值为准。</span>
        </div>
      </div>
      <div class="zy-search-pub search-area">
        <p class="search-title">批量修改员工薪资数据</p>
        <div class="search-item">
          <el-input placeholder="姓名/工号/手机号码" class="search-input" v-model="keyword"></el-input>
          <selecttree
            placeholder="部门"
            :multiple="true"
            :multiple-value="defaultDepChecked"
            :options="departments"
            @getValue="onSetDepartMent($event)"
          />
        </div>
        <div class="search-btns">
          <el-button class="his-search light-btn" @click="onPage">搜索</el-button>
        </div>
        <div class="btn-back">
          <el-link @click="$router.push('/salary/account')" icon="el-icon-back">返回薪资核算页</el-link>
        </div>
      </div>
    </div>
    <!--表区域-->
    <div class="table-edit-wrap">
      <el-table class="table-wrap" :data="list" style="width: 100%" height="450" border>
        <el-table-column fixed type="selection" width="55"></el-table-column>
        <el-table-column fixed prop="empName" label="姓名" width="100"></el-table-column>
        <el-table-column prop="empNum" label="工号" width="100"></el-table-column>
        <el-table-column prop="depName" label="部门" width="100"></el-table-column>
        <el-table-column prop="position" label="职位" width="100"></el-table-column>
        <el-table-column prop="empStatus" label="状态" width="100"></el-table-column>
        <el-table-column prop="empType" label="类型" width="100"></el-table-column>
        <el-table-column prop="planName" label="薪资方案" width="100"></el-table-column>
        <!--如果不考虑 固定、浮动、公积金顺序，可以直接循环colums-->
        <!--<template v-for="(col,key,index) in columns">-->
          <!--<el-table-column-->
            <!--v-for="(opt,colIndex) in col"-->
            <!--width="100"-->
            <!--:key="opt.optionId"-->
            <!--:column-key="key+'OptionList'"-->
          <!--&gt;-->
            <!--<template slot="header" slot-scope="scope">-->
              <!--<span class="icon-circle" :class="'icon-co-'+(index+1)"></span>-->
              <!--{{opt.optionName}}-->
            <!--</template>-->
            <!--<template slot-scope="scope">-->
              <!--<template v-if="key=='unstable' || key =='stable'">-->
                <!--<el-input-->
                  <!--v-if="scope.row[key+'OptionList'][colIndex].optionValue"-->
                  <!--v-model="scope.row[key+'OptionList'][colIndex].optionValue"-->
                  <!--placeholder="请输入内容"-->
                  <!--@change="onChange(scope,colIndex)"-->
                <!--&gt;</el-input>-->
                <!--<template v-if="!scope.row[key+'OptionList'][colIndex].optionValue">-</template>-->
              <!--</template>-->
              <!--<template v-else>-->
                <!--{{scope.row[key+'OptionList'][colIndex].optionValue||'-'}}-->
              <!--</template>-->
            <!--</template>-->
          <!--</el-table-column>-->
        <!--</template>-->


        <!--如果考虑 项的顺序，则一个一个循环-->
        <!--固定工资-->
        <el-table-column v-for="(opt,colIndex) in columns.stable" width="100" :key="opt.optionId" column-key="stableOptionList">
          <template slot="header" slot-scope="scope">
            <span class="icon-circle"></span>
            {{opt.optionName}}
          </template>
          <template slot-scope="scope">
            <el-input
            v-if="scope.row.stableOptionList[colIndex].optionValue"
            v-model="scope.row.stableOptionList[colIndex].optionValue"
            placeholder="请输入内容"
            @change="onChange(scope,colIndex)"
            ></el-input>
            <template v-if="!scope.row.stableOptionList[colIndex].optionValue">-</template>
          </template>
        </el-table-column>

        <el-table-column label="应出勤" width="100" column-key="orgAttendance">
          <template slot-scope="scope">
            <el-input
                    v-model="scope.row.orgAttendance"
                    placeholder="请输入内容"
                    @change="onChange(scope)"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column label="试用期出勤" width="100" column-key="trialAttendance">
          <template slot-scope="scope">
            <el-input
                    v-model="scope.row.trialAttendance"
                    placeholder="请输入内容"
                    @change="onChange(scope)"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column label="正式出勤" width="100" column-key="officialAttendance">
          <template slot-scope="scope">
            <el-input
                    v-model="scope.row.officialAttendance"
                    placeholder="请输入内容"
                    @change="onChange(scope)"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column label="出勤工资" width="100" prop="attendanceSalary"></el-table-column>

        <el-table-column v-for="(opt,colIndex) in columns.unstable" width="100" :key="opt.optionId" column-key="unstableOptionList">
          <template slot="header" slot-scope="scope">
            <span class="icon-circle"></span>
            {{opt.optionName}}
          </template>
          <template slot-scope="scope">
            <el-input
                    v-if="scope.row.unstableOptionList[colIndex].optionValue"
                    v-model="scope.row.unstableOptionList[colIndex].optionValue"
                    placeholder="请输入内容"
                    @change="onChange(scope,colIndex)"
            ></el-input>
            <template v-if="!scope.row.unstableOptionList[colIndex].optionValue">-</template>
          </template>
        </el-table-column>

        <el-table-column v-for="(opt,colIndex) in columns.allowance" width="100" :key="opt.optionId" column-key="allowanceOptionList">
          <template slot="header" slot-scope="scope">
            <span class="icon-circle"></span>
            {{opt.optionName}}
          </template>
          <template slot-scope="scope">
            {{scope.row.allowanceOptionList[colIndex].optionValue || '-'}}
          </template>
        </el-table-column>

        <el-table-column label="补发" width="100" prop="supplyAddTotal.supplyTotal"></el-table-column>
        <el-table-column label="考勤扣款" width="100" column-key="attendanceSubFee">
          <template slot-scope="scope">
            <el-input
                    v-model="scope.row.attendanceSubFee"
                    placeholder="请输入内容"
                    @change="onChange(scope)"
            ></el-input>
          </template>
        </el-table-column>

        <el-table-column v-for="(opt,colIndex) in columns.sub" width="100" :key="opt.optionId" column-key="subOptionList">
          <template slot="header" slot-scope="scope">
            <span class="icon-circle"></span>
            {{opt.optionName}}
          </template>
          <template slot-scope="scope">
            {{scope.row.subOptionList[colIndex].optionValue || '-'}}
          </template>
        </el-table-column>

        <el-table-column label="个人滞纳金" width="100" prop="personalLateFee"></el-table-column>
        <el-table-column label="补扣" width="100" prop="supplySubTotal.supplyTotal"></el-table-column>
        <el-table-column label="应发工资" width="100" prop="orgTotal"></el-table-column>

        <el-table-column v-for="(opt,colIndex) in columns.fund" width="100" :key="opt.optionId" column-key="fundOptionList">
          <template slot="header" slot-scope="scope">
            <span class="icon-circle"></span>
            {{opt.optionName}}
          </template>
          <template slot-scope="scope">
            {{scope.row.fundOptionList[colIndex].optionValue || '-'}}
          </template>
        </el-table-column>

        <el-table-column label="累计收入额(截止上月)" width="120" prop="addtionalOption.preIncomeTotal"></el-table-column>
        <el-table-column label="累计减免额(截止上月)" width="120" prop="addtionalOption.preSubTotal"></el-table-column>
        <el-table-column label="累计收入额(本月)" width="120" column-key="addtionalOption.perIncomeTotal">
          <template slot-scope="scope">
            <el-input
                    v-model="scope.row.addtionalOption.perIncomeTotal"
                    placeholder="请输入内容"
                    @change="onChange(scope)"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column label="累计减免额(本月)" width="120" column-key="addtionalOption.perSubTotal">
          <template slot-scope="scope">
            <el-input
                    v-model="scope.row.addtionalOption.perSubTotal"
                    placeholder="请输入内容"
                    @change="onChange(scope)"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column label="子女教育" width="120" prop="addtionalOption.perMonthSub1"></el-table-column>
        <el-table-column label="继续教育" width="120" prop="addtionalOption.perMonthSub2"></el-table-column>
        <el-table-column label="住房贷款" width="120" prop="addtionalOption.perMonthSub3"></el-table-column>
        <el-table-column label="住房租金" width="120" prop="addtionalOption.perMonthSub4"></el-table-column>
        <el-table-column label="赡养老人" width="120" prop="addtionalOption.perMonthSub5" ></el-table-column>
        <el-table-column label="累计已缴个税" width="120" column-key="addtionalOption.perIncomeTax">
          <template slot-scope="scope">
            <el-input
                    v-model="scope.row.addtionalOption.perIncomeTax"
                    placeholder="请输入内容"
                    @change="onChange(scope)"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column label="当月应缴个税" width="100" prop="taxReduce"></el-table-column>
        <el-table-column label="实发工资" width="100" column-key="actualTotal"></el-table-column>
        <el-table-column label="备注" width="100" column-key="remark">
          <template slot-scope="scope">
            <el-input v-model="scope.row.remark" placeholder="请输入内容" @change="onChange(scope)"></el-input>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import selecttree from "../../../components/selectTree";
export default {
  components: {
    selecttree
  },
  data() {
    return {
      keyword: this.$route.query.keyword || "",
      departments: [],
      depChecked: [],
      defaultDepChecked: this.$route.query.depChecked.split(","),
      tableData: [],
      list: [],
      total: 0,
      joinSalaryIds: [],
      leaveSalaryIds: [],
      companyCost: 0,
      salaryTotal: 0,
      salaryNum: 0,
      columns: {}
    };
  },
  methods: {
    onPage(sync) {
      const url="https://www.easy-mock.com/mock/5d15cbc238f5145ef5374a93/example/api/salary/salaryList";
      // const url =
        // "https://www.easy-mock.com/mock/5d15cbc238f5145ef5374a93/example/api/salary/compute";
      this.$http.get(url).then(response => {
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
        // this.columns
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
        console.log(this.columns);
      });
    },

    onDepartments() {
      const url =
        "https://www.easy-mock.com/mock/5d15cbc238f5145ef5374a93/example/api/deplist/getStructer";

      this.$http.get(url, {}).then(response => {
        this.departments = [response.result];
      });
    },
    // 返回薪资核算页
    onBack() {},
    onChange(scope, colIndex) {
      console.log(scope, colIndex);
      console.log(scope.$index + "行：" + scope.row.empName);
      if (colIndex == undefined) {
        //如果薪资项集合是对象
        const keys = scope.column.columnKey.split(".");
        let keyStr = keys.reduce((total, key) => {
          return (total = `["${total}"]` + `["${key}"]`);
        });
        if(keys.length==1) keyStr= `["${keyStr}"]`;
        console.log(keyStr);
        console.log(
          scope.column.columnKey +
            "属性发生变化，为：" +
            eval(`scope.row${keyStr}`)
        );
      } else {

        //如果薪资项集合是数组
        console.log(
          scope.column.columnKey +
            "集合中 "+colIndex+" 项属性发生变化，具体为：" ,
            scope.row[scope.column.columnKey][colIndex]
        );
      }
    },
    onSetDepartMent(value) {
      this.depChecked = (value || []).map(m => m.id);
    }
  },
  mounted() {
    $(".el-aside").hide();
    $(".zy-main").css("marginLeft", "0");
    this.onPage();
    this.onDepartments();
  },
  beforeRouteLeave(to, from, next) {
    $(".el-aside").show();
    $(".zy-main").css("marginLeft", "160px");
    next();
  }
};
</script>

<style lang="less" scoped>
@import "../index";
.mu {
  .search-tips-wrap {
    font-size: 13px;
    height: 120px;
    background: @ff;

    .search-area {
      padding: 10px 30px;
    }
    .search-title {
      font-size: 13px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      margin-right: 26px;
      display: inline-block;
    }
    .btn-back {
      position: absolute;
      right: 34px;
      top: 20px;
    }
  }
  .table-edit-wrap {
    padding: 0 20px;
    .el-table {
      position: relative;
      background: @ff;
      box-shadow: 0px 1px 17px 0px rgba(54, 78, 159, 0.29);
      border-radius: 4px;
    }
  }
  /deep/td {
    padding: 0;
    .cell {
      padding: 0;
      .el-input__inner {
        border-radius: 0;
      }
    }
  }
}

/deep/.el-input__inner {
  border: none;
}
/deep/.el-table__body tr.hover-row .el-input__inner:not(:focus) {
  background-color: #ecf5ff;
}
/deep/.el-table--enable-row-transition .el-table__body .el-input__inner {
  -webkit-transition: background-color 0.25s ease;
  transition: background-color 0.25s ease;
}
/deep/.el-input__inner:focus {
  box-shadow: inset 0px 0 1px 1px #409eff;
}
.red-tips-wrap {
  padding: 0 20px;
  .red-tips {
    border: 1px solid rgba(255, 163, 158, 1);
    padding: 5px 9px;
    margin-top: 3px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    background: #fff1f0;
    border-radius: 2px;
    color: @tipscolor;
  }
}
</style>
