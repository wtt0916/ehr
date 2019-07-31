<template>
  <div>
    <el-dialog
      class="zy-dialog-pub zy-dialog-pub-large head-wrap"
      title="延长减免周期"
      :visible.sync="visible"
      @close="$emit('update:show', false)"
    >
      <div class="head-top">
        <el-image
          class="header-img"
          src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
        >
          <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline"></i>
          </div>
        </el-image>
        <div class="right-info">
          <div class="info-top">
            <h4 class="user-name">{{emp.empName}}</h4>
            <span class="other-info">{{emp.empNum}}</span>
          </div>
          <p class="other-info">{{emp.depName}} - {{emp.position}}</p>
        </div>
      </div>
      <div class="head-body">
        <p class="describe">减免项：{{typeName||'未知项'}}</p>
        <ul class="deduction-item">
          <li>
            <div class="right-item">
              <span>当前减免金额：{{curDeduction.perSub}}元</span>
              <span>当前减免周期：{{curDeduction.startDate}} 至 {{curDeduction.endDate}}</span>
              <i class="icon-right el-icon-error icon-unenable"></i>
            </div>
            <div class="border">
              <div class="zy-edit-pub">
                <div class="left-title">减免金额：</div>
                <el-input
                  v-model="newDeduction.perSub"
                  class="right-enter right-enter-height"
                  placeholder="请输入内容"
                  type="number"
                  min="0"
                ></el-input>
              </div>
              <el-date-picker
                class="time-scope"
                v-model="newDeduction.range"
                @change="onDateChange($event,newDeduction)"
                value-format="yyyyMM"
                type="monthrange"
                range-separator="至"
                start-placeholder="开始月份"
                end-placeholder="结束月份"
              ></el-date-picker>
            </div>
          </li>
        </ul>
        <div slot="footer" class="dialog-footer t-c">
          <el-button class="button default-button" @click="$emit('update:show', false)">取 消</el-button>
          <el-button type="primary" class="blue-button" @click="onConfirm">确 定</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    delayedModel: {}
  },
  watch: {
    show() {
      this.visible = this.show;
    }
  },
  data() {
    return {
      visible: this.show,
      itemConfig: [
        {
          name: "子女教育",
          code: "children",
          type: 1,
          isMultiple: true
        },
        {
          name: "住房租金",
          code: "tenant",
          type: 2,
          isMultiple: false
        },
        {
          name: "住房贷款利息",
          code: "loan",
          type: 3,
          isMultiple: false
        },
        {
          name: "赡养老人",
          code: "support",
          type: 4,
          isMultiple: false
        },
        {
          name: "继续教育",
          code: "education",
          type: 5,
          isMultiple: false
        }
      ],
      configStructure: {
        perSub: "",
        // range: [],//有鬼，如果初始化数据时加上这个，就不能双向绑定了
        startDate: "",
        endDate: ""
      },
      emp: this.delayedModel.emp,
      curDeduction: this.delayedModel.deduction,
      newDeduction: {},
      typeName: ""
    };
  },
  methods: {
    onConfirm() {
      //校验是否有未填写的信息
      const checke =
        !this.newDeduction.startDate ||
        !this.newDeduction.endDate ||
        !this.newDeduction.perSub;
      if (checke) {
        this.$message({
          message: "存在尚未填写完整的信息，请补充完整后再确定",
          type: "warning"
        });
        return;
      }
      delete this.newDeduction.range;
      delete this.newDeduction.addTime;
      delete this.newDeduction.updateTime;
      console.log(this.newDeduction);
      this.$http.post("/empAdditional/saveOrUpdateAdditional", [this.newDeduction]).then(response => {
        this.$emit("delayedCallback", this.newDeduction);
        this.$emit("update:show", false);
      });
    },
    onDateChange(value, item) {
      if (!value) (item.startDate = ""), (item.endDate = "");
      else (item.startDate = value[0]), (item.endDate = value[1]);
    }
  },
  mounted() {
    //先将当前 扣除项 对象，深拷贝一份给新的对象
    this.newDeduction = JSON.parse(JSON.stringify(this.curDeduction));
    //再把输入项结构中配置的 金额、时间属性 覆盖到新的对象中，让新对象里的金额、时间为空
    Object.assign(this.newDeduction, this.configStructure);
    //！！！！此处需确认是否需要前端手动设置status为1 生效
    this.newDeduction.status = 1;
    //从扣除项配置中，匹配到与当前项type相同的配置，确定 扣除项名称
    this.typeName = (
      this.itemConfig.find(f => f.type == this.newDeduction.type) || {}
    ).name;
  }
};
</script>
<style lang="less" scoped>
@import "../index";
</style>
