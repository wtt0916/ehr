<template>
  <div>
    <el-dialog
      class="zy-dialog-pub zy-dialog-pub-xlarge head-wrap dia-start-replenish"
      title="选择员工"
      top="4vh"
      :visible.sync="visible"
      @close="$emit('update:show', false)">
      <div class="head-top">
        <div class="zy-search-pub">
          <div class="search-item">
            <el-input class="search-input" placeholder="姓名/工号" v-model="screenKeyWord"></el-input>
            <selecttree
              placeholder="部门"
              :multiple="true"
              :options="departments"
              @getValue="onSetDepartMent($event)"
              ref="selectTree"
              class="search-dep"/>
          </div>
          <div class="search-btns">
            <el-button class="his-search light-btn" @click="onSearch">搜索</el-button>
          </div>
        </div>
      </div>
      <div class="dia-table-select">
        <el-table :data="empList" height="355" border>
          <el-table-column prop="empName" label="姓名" width="100"></el-table-column>
          <el-table-column prop="empNum" label="工号" width="100"></el-table-column>
          <el-table-column prop="depName" label="部门" width="100"></el-table-column>
          <el-table-column prop="position" label="职位"></el-table-column>
          <el-table-column width="130" label="类别">
            <template slot-scope="scope">
              <el-select v-model="scope.row.type" class="search-select" placeholder="类别">
                <el-option
                  :key="item.id"
                  v-for="item in categorys"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column width="160" label="薪资项及金额">
            <template slot-scope="scope">
              <div>
                <span
                  v-for="(model,index) in scope.row.empSalaryBackDetail"
                  :key="index"
                >{{model.optionName}}:{{model.optionFee}}</span>
                <el-link v-if="!scope.row.empSalaryBackDetail" @click="onShowItem(scope.row)">
                  请编辑
                  <i class="el-icon-edit-outline el-icon--right"></i>
                </el-link>
                <el-link v-if="scope.row.empSalaryBackDetail" @click="onShowItem(scope.row)">
                  <i class="el-icon-edit-outline el-icon--right"></i>
                </el-link>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="total" label="总额"></el-table-column>
          <el-table-column width="150" label="归属月份">
            <template slot-scope="scope">
              <!--default-value-->
              <el-date-picker
                      v-model="scope.row.belongMonth"
                      value-format="yyyyMM"
                      class="belongmonth"
                      type="month"
                      placeholder="选择月"></el-date-picker>
              <!--<el-select v-model="scope.row.belongMonth" class="search-select" placeholder="归属月份">-->
                <!--<el-option-->
                  <!--:key="item.label"-->
                  <!--v-for="item in belongMonths"-->
                  <!--:label="item.label"-->
                  <!--:value="item.value"-->
                <!--&gt;</el-option>-->
              <!--</el-select>-->
            </template>
          </el-table-column>
          <el-table-column width="150" label="执行月份">
            <template slot-scope="scope">
              <el-date-picker
                      v-model="scope.row.executeMonth"
                      value-format="yyyyMM"
                      class="belongmonth"
                      type="month"
                      placeholder="选择月"></el-date-picker>
              <!--<el-select v-model="scope.row.executeMonth" class="search-select" placeholder="执行月份">-->
                <!--<el-option-->
                  <!--:key="item.label"-->
                  <!--v-for="item in executeMonths"-->
                  <!--:label="item.label"-->
                  <!--:value="item.value"-->
                <!--&gt;</el-option>-->
              <!--</el-select>-->
            </template>
          </el-table-column>
          <el-table-column width="130px" label="是否计税">
            <template slot-scope="scope">
              <el-select v-model="scope.row.taxation" class="search-select" placeholder="是否计税">
                <el-option
                  :key="item.id"
                  v-for="item in taxations"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="remark" label="备注">
            <template slot-scope="scope">
              <el-input v-model="scope.row.remark" placeholder="请输入"></el-input>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button
                type="text"
                class="btn-table-del"
                icon="el-icon-delete"
                size="small"
                @click="onRemove(scope.$index)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div slot="footer" class="dialog-footer t-c">
        <el-button class="button default-button" @click="$emit('update:show', false)">取 消</el-button>
        <el-button type="primary" class="blue-button" @click="onConfirm">确 定</el-button>
      </div>
    </el-dialog>
    <add-replenish-Option
      v-if="isShowSetSaItem"
      :show.sync="isShowSetSaItem"
      :model="curModel"
      @optionChange="optionChange"
    />
  </div>
</template>
<script>
import selecttree from "../../../components/selectTree";
import addReplenishOption from "./addReplenishOption";
export default {
  components: {
    selecttree,
    addReplenishOption
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    model: {},
    curmonth:''//当前计薪月
  },
  watch: {
    show() {
      this.visible = this.show;
    }
  },
  data() {
    return {
      visible: this.show,
      isShowSetSaItem: false,
      screenKeyWord: null,
      screenDepChecked: null,
      empList: [],
      departments: [],
      searchDepartment: "",
      categorys: [{
          id: 1,
          name: "补发"
        }, {
          id: 2,
          name: "补扣"
        }],
      taxations: [{
          id: 1,
          name: "计税"
        }, {
          id: 2,
          name: "不计税"
        }],
      belongMonths: [],
      executeMonths: [],
      curModel: null
    };
  },
  methods: {
    onConfirm() {
      // console.log(this.empList);
      // return;
      //此处应该做为空限制，待接口确认需要哪些参数后进行
      const url='';
      let params = [];
      // const url='https://www.easy-mock.com/mock/5d15cbc238f5145ef5374a93/example';
      for(let i=0;i<this.empList.length;i++){
        const item= this.empList[i];
        if(!item.type || !item.total || !item.empSalaryBackDetail || !item.executeMonth || !item.belongMonth || !item.taxation){
          this.$message({
            message: `员工${item.empName}有未填写的内容`,
            type: "warning"
          });
          return;
        }
        params.push({
          companyId:1,
          empId:item.empId,
          type:item.type,
          status:item.status,
          total:item.total,
          empSalaryBackDetail:item.empSalaryBackDetail,
          belongMonth:item.belongMonth,
          executeMonth:item.executeMonth,
          taxation:item.taxation,
          remark:item.remark
        });
      }
      this.$http.post(`${url}/empSalaryBack/insert`,params).then(res=>{
        console.log(res.result);
        this.$emit("update:show", false);
        this.$emit("onAddResult", this.empList);
      })

      // const changes = [];
      // this.OriginalEmpList.forEach((original, index) => {
      //   if (this.EmpList[index].planId != original.planId) {
      //     changes.push(this.EmpList[index]);
      //   }
      // });
    },
    onDepartments() {
      const url = '/deplist/getStructure',
              params = {companyId:1};
      // const url = 'https://www.easy-mock.com/mock/5d15cbc238f5145ef5374a93/example/api/deplist/getStructer';
      this.$http.get(url, {params}).then(response => {
        this.departments = [response.result];
      });
    },
    onSetDepartMent(value) {
      this.screenDepChecked = (value || []).map(m => m.depId);
    },
    onSearch() {
      const params = {
        companyId:1,
        depIds:this.screenDepChecked?(this.screenDepChecked.join()):null,
        nameNumPhone:this.screenKeyWord
      }
      this.$http.get("/emplist/getEmpPage",{params}).then(res => {
        this.empList = res.result.map(m => {
          return {
            depId: m.depId,
            depName: m.depName,
            empId: m.empId,
            empName: m.empName,
            empNum: m.empNum,
            empType: m.empType,
            position: m.position,
            total:0
          };
        });
        console.log(this.empList);
      });
    },
    onShowItem(model) {
      this.curModel = model;
      this.isShowSetSaItem = true;
    },
    onRemove(index) {
      this.empList.splice(index, 1);
    },
    optionChange(options,empSalaryBackDetail) {
      // console.log(options);
      options = options.map(item=>{
        item.status?(item.status = 1):(item.status = 2)
        return item;
      });
      this.curModel.total = 0;
      // console.log(options);
      options.forEach(t=>{
        delete t.optionType;
        delete t.type;
        this.curModel.total += Number(t.optionFee);
      })
      this.curModel.empSalaryBackDetail = options;
      const index = this.empList.findIndex(f => f.empId == this.curModel.empId);
      this.empList.splice(index, 1, this.curModel);
    }
  },
  mounted() {
    this.onDepartments();
  }
};
</script>
<style lang="less" scoped>
@import "../index";
  .belongmonth{
    @w:128px;
    width: @w;
    /deep/.el-input__inner{
      width: @w !important;
    }
  }
</style>
