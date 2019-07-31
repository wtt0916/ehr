<template>
  <el-dialog
    class="zy-dialog-pub zy-dialog-pub-large"
    title="调整薪资方案"
    :visible.sync="visible"
    @close="$emit('update:show', false)">
    <div class="dia-search-dep-wrap">
      <div class="search-input">
        <el-input class="s-input" v-model="screenKeyWord" placeholder="姓名/工号"></el-input>
        <selecttree
          placeholder="部门"
          :multiple="true"
          :options="departments"
          @getValue="onSetDepartMent($event)"
          ref="selectTree"
          class="search-dep"/>
        <el-select class="salaryplan" v-model="screenPlanChecked" placeholder="请选择薪资方案" :multiple="true" collapse-tags>
          <el-option
            v-for="item in salaryPlanList"
            :key="item.planId"
            :label="item.planName"
            :value="item.planId"
          ></el-option>
        </el-select>
        <!--<el-button-->
          <!--class="s-btn"-->
          <!--icon="el-icon-search"-->
          <!--style="width:36px;height:36px;"-->
          <!--@click="onSearch"-->

        <el-button class="button default-button search-button light-button" @click="onSearch">搜索</el-button>
        <el-button class="button default-button search-button" @click="onResetSearch">重置</el-button>

        <!--&gt;</el-button>-->
        <!--<div class="search-btns">-->
          <!--<el-button class="his-search light-btn" @click="onSearch">搜索</el-button>-->
          <!--<el-button class="his-search" @click="onResetSearch">重置</el-button>-->
        <!--</div>-->
      </div>
    </div>
    <div class="search-result-wrap">
      <div class="top-menu">
        <!-- <span v-if="isBatch" class="pick-num">已选择0人</span> -->
        <!-- <el-link icon="el-icon-edit" @click="isBatch=!isBatch">批量操作</el-link> -->
      </div>
      <el-table
        ref="multipleTable"
        class="dia-adjust-table"
        :data="EmpList"
        height="220"
        border
        @selection-change="onSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="empName" label="姓名"></el-table-column>
        <el-table-column prop="depName" label="部门" width="180"></el-table-column>
        <el-table-column prop="empNum" label="工号"></el-table-column>
        <el-table-column prop="position" label="职位"></el-table-column>
        <!-- <el-table-column prop="planName" label="当前薪资方案"></el-table-column> -->
        <el-table-column label="当前薪资方案">
          <template slot-scope="scope">
            <el-select v-model="scope.row.planId" placeholder="请选择薪资方案">
              <el-option
                v-for="item in salaryPlanList"
                :key="item.planId"
                :label="item.planName"
                :value="item.planId"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="batch-handle-warp t-c">
      <span class="pick-num">已选择 {{multipleSelection.length}} 人</span>
      <p class="batch-handle-p">
        调整薪资方案为
        <el-select v-model="multiplePlanId" :clearable="true" placeholder="请选择">
          <el-option
            v-for="item in salaryPlanList"
            :key="item.planId"
            :label="item.planName"
            :value="item.planId"
          ></el-option>
        </el-select>
      </p>
      <el-button class="batch-handle-btn" @click="onSumitSelection">提交</el-button>
      <el-button class="batch-handle-btn" @click="onClearSelection">取消</el-button>
    </div>
    <div slot="footer" class="dialog-footer t-c">
      <el-button class="button default-button" @click="$emit('update:show', false)">取 消</el-button>
      <el-button type="primary" class="blue-button" @click="onConfirm">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import selecttree from "../../../components/selectTree";
export default {
  components: {
    selecttree
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    departments: {
      type: Array,
      default: []
    },
    keyword: {
      type: String,
      default: ""
    },
    curModel: {}
  },
  watch: {
    show() {
      this.visible = this.show;
    },
    keyword() {
      this.screenKeyWord = this.keyword;
    }
  },
  data() {
    return {
      defaultProps: {
        value: "id",
        label: "depName",
        children: "children"
      },
      visible: this.show,
      EmpList: [],
      screenKeyWord: null,
      //筛选的方案集合
      // screenPlanList: [],
      screenPlanChecked: [],
      screenDepChecked: [],
      //可变更的方案集合
      salaryPlanList: [],
      //批量操作时选中的人
      multipleSelection: [],
      //批量操作时选中的方案Id
      multiplePlanId: null
    };
  },
  methods: {
    onSearch() {
      console.log(this.screenKeyWord);
      console.log(this.screenPlanChecked);
      console.log(this.screenDepChecked);
      this.getEmpList(
        this.screenKeyWord,
        this.screenDepChecked,
        this.screenPlanChecked
      );
    },
    onResetSearch(){
      this.getEmpList();
    },
    getEmpList(keywrod, depIds, planIds) {
      const companyId = 1;
      const params = { keywrod, depIds, planIds, companyId };
      this.$http.get("salary/getEmpAndSalaryPlanList",
          { params }
        ).then(response => {
          this.EmpList = response.result;
          this.OriginalEmpList = JSON.parse(JSON.stringify(this.EmpList));
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getSalaryPlan() {
      this.$http.get(
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
    onSetDepartMent(value) {
      this.screenDepChecked = (value || []).map(m => m.id);
    },
    onSelectionChange(value) {
      this.multipleSelection = value;
    },
    onSumitSelection() {
      if (!this.multiplePlanId) {
        this.$message({
          message: "请先选择薪资方案",
          type: "warning"
        });
        return;
      }
      this.multipleSelection.forEach(emp => {
        emp.planId = this.multiplePlanId;
      });
      this.clearSelection();
    },
    onClearSelection() {
      this.$refs.multipleTable.clearSelection();
    },
    onConfirm() {
      const changes = [];
      this.OriginalEmpList.forEach((original, index) => {
        if (this.EmpList[index].planId != original.planId) {
          changes.push(this.EmpList[index]);
        }
      });
      console.log(changes);
    }
  },
  created() {
    console.log(this.departments);
    this.getEmpList();
    this.getSalaryPlan();
  }
};
</script>
<style lang="less" scoped>
@import "../index";
/*调整薪资方案弹框*/
.dia-search-dep-wrap {
  padding-right: 20px;
  margin-right: 20px;
  vertical-align: top;
  .search-input {
    font-size: 0;
    .s-input {
      width: 160px;
      margin-right: 10px;
    }
    .search-dep,.salaryplan{
      width: 104px;
      margin-right: 10px;
    }
    .light-button{
      margin-left: 20px;
      margin-right: 10px;
    }
    .s-btn {
      background: @base;
      color: @ff;
    }
    .el-input__inner {
      @h: 30px;
      height: @h;
      line-height: 30px;
    }
  }
  .search-tree-result {
    margin-top: 30px;
  }
}
.search-result-wrap {
  width: 100%;
  .top-menu,
  .el-link--default {
    color: @base;
  }
  .el-link--default {
    font-size: 12px;
  }
  .top-menu {
    font-size: 14px;
    margin-bottom: 8px;
    span.pick-num {
      width: 412px;
      display: inline-block;
    }
  }
}
.batch-handle-warp {
  background: #fafafa;
  margin-top: 10px;
  color: @middle;
  @h: 60px;
  height: @h;
  font-size: 14px;
  line-height: @h;
  span.pick-num {
    color: @base;
    padding: 5px 19px;
    border-right: 1px solid @light;
  }
  p.batch-handle-p {
    display: inline-block;
    padding: 0 20px;
    .el-input__inner {
      width: 100px;
      height: 30px;
      line-height: 30px;
    }
  }
  button.batch-handle-btn {
    border: 0;
    background: #fafafa;
    font-size: 12px;
    &:nth-of-type(1) {
      color: @base;
      padding-left: 20px;
      font-size: 13px;
      border-left: 1px solid @light;
      border-radius: 0;
    }
  }
}
.dia-adjust-table {
  /deep/th {
    background: #f7f7f7;
  }
}
</style>
