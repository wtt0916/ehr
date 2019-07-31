<template>
  <el-dialog
    class="zy-dialog-pub zy-dialog-pub-large head-wrap setsaitem"
    title="薪资项及金额"
    top="4vh"
    :visible.sync="visible"
    @close="$emit('update:show', false)">
    <div class="head-top">
      <el-image class="header-img" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg">
        <div slot="error" class="image-slot">
          <i class="el-icon-picture-outline"></i>
        </div>
      </el-image>
      <div class="right-info">
        <div class="info-top">
          <h4 class="user-name">{{model.empName}}</h4>
          <span class="other-info">{{model.empNum}}</span>
        </div>
        <p class="other-info">{{model.depName}} - {{model.position}}</p>
      </div>
    </div>
    <div class="set-sa-items">
      <p class="itemtype">类别：{{model.type==1?'补发':'补扣'}}</p>
      <el-table :data="empSalaryBackDetail" border height="200" class="dia-set-sa-items-table">
        <el-table-column label="编辑薪资项">
          <template slot-scope="scope">
            <span>{{scope.row.optionName}}</span>
            <span class="line"></span>
            <el-input v-model="scope.row.optionFee" placeholder="请输入内容"></el-input>
            <span>元</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.status" @change="onChangeStatus(scope.row,scope.$index)"></el-switch>
          </template>
        </el-table-column>
      </el-table>
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
    model: {}
  },
  watch: {
    show() {
      this.visible = this.show;
    }
  },
  data() {
    return {
      visible: this.show,
      info: {},
      screenKeyWord: "",
      screenDepChecked: "",
      empList: [],
      departments: [],
      searchDepartment: "",
      categorys: [
        {
          id: 1,
          name: "补发"
        },
        {
          id: 2,
          name: "补扣"
        }
      ],
      taxations: [
        {
          id: 1,
          name: "计税"
        },
        {
          id: 2,
          name: "不计税"
        }
      ],
      belongMonths: [],
      executeMonths: [],
      empSalaryBackDetail: []
    };
  },
  methods: {
    getOption(){
      const url = '/salaryPlan/queryOptionList';
      const params = {
        companyId:1,
        inOptionType:[1,2,3]
        //【补发可选】：1-固定工资，2-浮动工资，3-津补贴；【补扣可选】：4-薪资扣减项。
        //项类型（1-固定工资，2-浮动工资，3-津补贴，4-薪资扣减项，5-社保，6-公积金，7-附加扣除, 8-薪资表固定导入项）
      }
      if(this.model.type!=1) params.inOptionType = [4]
      this.$http.post(url,params).then(t=>{
        this.empSalaryBackDetail = t.result;
      })
    },
    onConfirm() {
      const result = [];
      this.empSalaryBackDetail.forEach(item => {
        delete item.addTime;
        delete item.updateTime;
        if (item.status) result.push(item);
      });
      if (!result.length) {
        this.$message({
          message: "未选择薪资项",
          type: "warning"
        });
        return;
      }
      this.$emit("update:show", false);
      this.$emit("optionChange", result, this.empSalaryBackDetail);
    },
    onRemove(index) {
      this.empList.splice(index, 1);
    },
    onChangeStatus() {}
  },
  mounted() {
    if (this.model.empSalaryBackDetail && this.model.empSalaryBackDetail.length) {
      this.empSalaryBackDetail.forEach(item => {
        const cur = this.model.empSalaryBackDetail.find(f => f.id == item.id);
        if (cur) {
          item.optionFee = cur.optionFee;
          item.status = cur.status;
        }
      });
    }
  },
  created(){
    this.getOption()
  }
};
</script>
<style lang="less" scoped>
@import "../index";
</style>
