<template>
  <el-dialog
    class="zy-dialog-pub zy-dialog-pub-large head-wrap setsaitem"
    title="查看"
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
          <h4 class="user-name">{{model.empName}}</h4>
          <span class="other-info">{{model.empNum}}</span>
        </div>
        <p class="other-info">{{model.depName}} - {{model.position}}</p>
      </div>
    </div>
    <div class="set-sa-items">
      <table class="info-detail">
        <tr>
          <td>类别：{{model.typeName}}</td>
          <td>是否计税：{{model.taxationName}}</td>
          <td>归属月份：{{model.belongMonth}}</td>
          <td>执行月份：{{model.executeMonth}}</td>
        </tr>
        <tr>
          <td>批次号：{{model.batchId}}</td>
          <td>发起人：{{model.createrName}}</td>
          <td>发起时间：{{model.addTime}}</td>
        </tr>
        <tr>
          <td colspan="4">备注：{{model.remark}}</td>
        </tr>
      </table>
      <el-table
        :data="model.empSalaryBackDetail"
        border
        class="dia-set-sa-items-table"
        style="width: 100%"
      >
        <el-table-column label="薪资项">
          <template slot-scope="scope">
            <span>{{scope.row.optionName}}</span>
            <span class="line"></span>
            <span>{{scope.row.optionFee}} 元</span>
          </template>
        </el-table-column>
      </el-table>
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
  methods: {
  },
  created() {
  }
};
</script>
<style lang="less" scoped>
@import "../index";
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
</style>
