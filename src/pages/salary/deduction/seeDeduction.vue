<template>
  <el-dialog
    class="zy-dialog-pub zy-dialog-pub-large head-wrap"
    title="查看"
    :visible.sync="visible"
    @close="$emit('update:show', false)"
  >
    <div class="head-top">
      <el-image class="header-img" :src="model.photoUrl">
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
    <div class="head-body">
      <!-- <p class="describe">共 2 个减免项</p> -->
      <ul class="deduction-item">
        <li v-if="model.childrenConfigs.length">
          <div class="left">子女教育</div>
          <div class="middle">共{{model.childrenConfigs.length}}条</div>
          <div class="right">
            <div v-for="(item,index) in model.childrenConfigs" :key="index" class="right-item">
              <span>减免金额：{{item.perSub}}元</span>
              <span>减免周期：{{item.startDate}} 至 {{item.endDate}}</span>
              <i
                class="icon-right el-icon-success"
                :class="{'icon-enable':item.status==1,'icon-unenable':item.status==0}"
              ></i>
            </div>
          </div>
        </li>
        <li v-if="model.tenantConfig">
          <div class="left">住房租金</div>
          <div class="middle">共1条</div>
          <div class="right">
            <div class="right-item">
              <span>减免金额：{{model.tenantConfig.perSub}}元</span>
              <span>减免周期：{{model.tenantConfig.startDate}} 至 {{model.tenantConfig.endDate}}</span>
              <i
                class="icon-right el-icon-success"
                :class="{'icon-enable':model.tenantConfig.status==1,'icon-unenable':model.tenantConfig.status==0}"
              ></i>
            </div>
          </div>
        </li>
        <li v-if="model.loanConfig">
          <div class="left">住房贷款</div>
          <div class="middle">共1条</div>
          <div class="right">
            <div class="right-item">
              <span>减免金额：{{model.loanConfig.perSub}}元</span>
              <span>减免周期：{{model.loanConfig.startDate}} 至 {{model.loanConfig.endDate}}</span>
              <i
                class="icon-right el-icon-success"
                :class="{'icon-enable':model.loanConfig.status==1,'icon-unenable':model.loanConfig.status==0}"
              ></i>
            </div>
          </div>
        </li>
        <li v-if="model.supportConfig">
          <div class="left">赡养老人</div>
          <div class="middle">共1条</div>
          <div class="right">
            <div class="right-item">
              <span>减免金额：{{model.supportConfig.perSub}}元</span>
              <span>减免周期：{{model.supportConfig.startDate}} 至 {{model.supportConfig.endDate}}</span>
              <i
                class="icon-right el-icon-success"
                :class="{'icon-enable':model.supportConfig.status==1,'icon-unenable':model.supportConfig.status==0}"
              ></i>
            </div>
          </div>
        </li>
        <li v-if="model.educationConfig">
          <div class="left">继续教育</div>
          <div class="middle">共1条</div>
          <div class="right">
            <div class="right-item">
              <span>减免金额：{{model.educationConfig.perSub}}元</span>
              <span>减免周期：{{model.educationConfig.startDate}} 至 {{model.educationConfig.endDate}}</span>
              <i
                class="icon-right el-icon-success"
                :class="{'icon-enable':model.educationConfig.status==1,'icon-unenable':model.educationConfig.status==0}"
              ></i>
            </div>
          </div>
        </li>
      </ul>
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
    model: {}
  },
  watch: {
    show() {
      this.visible = this.show;
    }
  },
  data() {
    return {
      visible: this.show
    };
  },

  mounted() {
    console.log(this.model);
    // this.onAddDiaSearch();
  }
};
</script>
<style lang="less" scoped>
@import "../index";
</style>
