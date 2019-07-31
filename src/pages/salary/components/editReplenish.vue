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
            <el-select v-model="model.type" class="search-select" placeholder="类别" size="small">
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
          <td>归属月份：{{model.belongMonth}}
            <el-date-picker
                    v-model="model.belongMonth"
                    value-format="yyyyMM"
                    class="search-select"
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
            <el-select v-model="model.executeMonth" class="search-select" placeholder="执行月份">
              <el-option
                    :key="item.label"
                    v-for="item in executeMonths"
                    :label="item.label"
                    :value="item.value"
              ></el-option>
            </el-select>
          </td>
        </tr>
        <tr>
          <td colspan="4">备注：<el-input style="width: 93%;" v-model="model.remark" placeholder="请输入内容"></el-input></td>
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
    };
  },
  methods: {
    onConfirm() {
      this.$emit("handleUpdate", this.model);
      this.$emit("update:show", false);

    },
  },
  mounted() {
    this.model=  JSON.parse(JSON.stringify(this.curModel));
  }
};
</script>
<style lang="less" scoped>
@import "../index";
</style>
