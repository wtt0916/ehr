<template>
  <el-dialog
    class="zy-dialog-pub zy-dialog-pub-large head-wrap setsaitem"
    title="编辑"
    :visible.sync="visible"
    @close="$emit('update:show', false)">
    <div class="head-top">
      <el-image
        class="header-img"
        :src="model.photoUrl">
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
      <table class="info-detail">
        <tr>
          <td>类别：
            <el-select v-model="model.type" class="search-select" placeholder="类别" size="small" @change="onTypeChange">
              <el-option :key="item.id" v-for="item in categorys" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </td>
          <td>是否计税：
            <el-select v-model="model.taxation" class="search-select" placeholder="是否计税">
              <el-option
                      :key="item.id"
                      v-for="item in taxations"
                      :label="item.name"
                      :value="item.id"
              ></el-option>
            </el-select>
          </td>
          <td>归属月份：
            <el-date-picker
                    v-model="model.belongMonth"
                    value-format="yyyyMM"
                    class="search-select select-month"
                    type="month"
                    placeholder="归属月份"></el-date-picker>
            <!--<el-select v-model="model.belongMonth" class="search-select" placeholder="归属月份">-->
              <!--<el-option-->
                      <!--:key="item.label"-->
                      <!--v-for="item in belongMonths"-->
                      <!--:label="item.label"-->
                      <!--:value="item.value"-->
              <!--&gt;</el-option>-->
            <!--</el-select>-->
          </td>
          <td>执行月份：
            <el-date-picker
                    v-model="model.executeMonth"
                    value-format="yyyyMM"
                    class="search-select select-month"
                    type="month"
                    placeholder="归属月份"></el-date-picker>
            <!--<el-select v-model="model.executeMonth" class="search-select" placeholder="执行月份">-->
              <!--<el-option-->
                    <!--:key="item.label"-->
                    <!--v-for="item in executeMonths"-->
                    <!--:label="item.label"-->
                    <!--:value="item.value"-->
              <!--&gt;</el-option>-->
            <!--</el-select>-->
          </td>
        </tr>
        <tr>
          <td colspan="4">备注：<el-input style="width: 94.5%;" v-model="model.remark" placeholder="请输入内容"></el-input></td>
        </tr>
      </table>
      <el-table
        :data="empSalaryBackDetail"
        border
        height="160"
        class="dia-set-sa-items-table"
        style="width: 100%">
        <el-table-column label="薪资项">
          <template slot-scope="scope">
            <span>{{scope.row.optionName}}</span>
            <span class="line"></span>
            <el-input v-model="scope.row.optionFee" placeholder="请输入内容"></el-input>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.status"></el-switch>
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
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    curModel: {}
  },
  watch: {
    show() {
      this.visible = this.show;
    }
  },
  data() {
    return {
      visible: this.show,
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
      model:{},
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
      belongMonths:[],
      executeMonths:[],

      //所有薪资项集合
      empSalaryBackDetail: [],
      empSalaryBackDetail1:[],
      empSalaryBackDetail2:[]
    };
  },
  methods: {
    onConfirm() {
      let ary = [];
      if(!this.model.belongMonth || !this.model.executeMonth){
        this.$message({
          showClose: true,
          message: '您选择的月份不完整',
          type: 'warning'
        })
        return;
      }

      this.empSalaryBackDetail.forEach(item=>{
        if(item.status){
          if(!item.optionFee){
            this.$message({
              showClose: true,
              message: '您有选中却未填写薪资的值',
              type: 'warning'
            })
          }
          else{
            item.backId = this.model.backId;
            delete item.addTime
            delete item.updateTime
            delete item.optionType
            item.status?(item.status = 1):(item.status = 2);
            ary.push(item)
          }
        }
      })
      if(!ary.length){
        this.$message({
          showClose: true,
          message: '没选薪资项',
          type: 'warning'
        });
        return;
      }

      this.model.empSalaryBackDetail = ary;

      if(this.model.empSalaryBackDetail.length>1){
        this.model.total = this.model.empSalaryBackDetail.reduce((total,cur)=>{
          let t= typeof total == 'number'? total : Number(total.optionFee);
          return t += Number(cur.optionFee);
        });
      }else{
        this.model.total = this.model.empSalaryBackDetail[0].optionFee;
      }


      delete this.model.addTime;
      delete this.model.updateTime;
      delete this.model.statusName;
      delete this.model.taxationName;
      delete this.model.typeName;

      this.$http.post('/empSalaryBack/update',this.model).then(t=>{
        this.$emit("handleUpdate", this.model);
        this.$emit("update:show", false);
      });


    },
    onTypeChange(value){
      this.getOption();
    },
    getOption(){
      if(this[`empSalaryBackDetail${this.model.type}`].length) {
        this.empSalaryBackDetail = this[`empSalaryBackDetail${this.model.type}`];
        return;
      }
      const url = '/salaryPlan/queryOptionList';
      const params = {
        companyId:1,
        inOptionType:[1,2,3]
        //【补发可选】：1-固定工资，2-浮动工资，3-津补贴；【补扣可选】：4-薪资扣减项。
        //项类型（1-固定工资，2-浮动工资，3-津补贴，4-薪资扣减项，5-社保，6-公积金，7-附加扣除, 8-薪资表固定导入项）
      }
      if(this.model.type!=1) params.inOptionType = [4]
      this.$http.post(url,params).then(t=>{

        t.result.forEach(item=>{
          delete item.id;//去掉薪资项id。如果传了则编辑的时候，无法添加新增的项
          delete item.type;//去掉薪资项type。如果传了则编辑的时候，无法添加新增的项
        })

        this.fomartOption(t.result);
      })
    },
    //循环接口返回的启用薪资项，找到所有薪资项里与其一样的项，设置为启用状态
    fomartOption(allSalaryBackDetail){
      this.model.empSalaryBackDetail.forEach(item=>{
        let ary = allSalaryBackDetail.find(t=>{
          return item.optionId === t.optionId;
        });
        if(ary){
          ary.status = true;
          ary.optionFee = item.optionFee;
          ary.id = item.id;
        }
      });
      //this.empSalaryBackDetail1 or 2,存的是真正的补发薪资项 和 补扣薪资项，以及当前选择情况;
      //this.empSalaryBackDetail 根据类型的切换，指向 empSalaryBackDetail1 或 empSalaryBackDetail2
      this.empSalaryBackDetail =this[`empSalaryBackDetail${this.model.type}`] = allSalaryBackDetail;
    }
  },
  mounted() {
    this.model=  JSON.parse(JSON.stringify(this.curModel));
    this.model.belongMonth = this.model.belongMonth.toString();
    this.model.executeMonth = this.model.belongMonth.toString();
    this.model.empSalaryBackDetail = (this.model.empSalaryBackDetail||[]).map(t=>{
      t.status==1?(t.status = true):(t.status = false);
      if(t.status) return t;
    })
    console.log(this.model);
    this.getOption()
    // this.model = this.model
  },
  created(){
  }
};
</script>
<style lang="less" scoped>
@import "../index";
@import "./replenish";
  .info-detail{
    .select-month{
      width: 100px;
      /deep/.el-input__inner{
        padding-right: 10px;
      }
    }
  }
</style>
