<template>
  <el-select
    :value="valueTitle"
    :clearable="clearable"
    :placeholder="placeholder"
    @clear="clearHandle"
    size="medium"
    ref="selectTree"
    :title="selectTitle"
  >
    <el-option :value="valueTitle" :label="valueTitle">
      <el-tree
        id="tree-option"
        ref="tree"
        :show-checkbox="multiple"
        :accordion="accordion"
        :data="options"
        :props="props"
        :node-key="props.value"
        :default-expanded-keys="defaultExpandedKey"
        @node-click="handleNodeClick"
        @check-change="checkNodeChange"
      ></el-tree>
    </el-option>
  </el-select>
</template>

<script>
import { setTimeout } from "timers";
export default {
  name: "select-tree",
  props: {
    /* 配置项 */
    props: {
      type: Object,
      default: () => {
        return {
          value: "id", // ID字段名
          label: "depName", // 显示名称
          children: "children" // 子级字段名
        };
      }
    },
    /* 选项列表数据(树形结构的对象数组) */
    options: {
      type: Array,
      default: () => {
        return [];
      }
    },
    /* 初始值 */
    value: {
      type: Number,
      default: () => {
        return null;
      }
    },
    multipleValue: {
      type: Array,
      default: () => {
        return [];
      }
    },
    /* 可清空选项 */
    clearable: {
      type: Boolean,
      default: () => {
        return true;
      }
    },
    /* 自动收起 */
    accordion: {
      type: Boolean,
      default: () => {
        return false;
      }
    },
    /* 必须末级 */
    mustlast: {
      type: Boolean,
      default: () => {
        return false;
      }
    },
    /* 多选 */
    multiple: {
      type: Boolean,
      default: () => {
        return false;
      }
    },
    placeholder: {
      type: String,
      default: "请选择"
    }
  },
  data() {
    return {
      valueId: this.value, // 初始值
      valueTitle: "",
      selectTitle: "",
      defaultExpandedKey: []
    };
  },
  mounted() {
    this.initHandle();
    Array.prototype.findRecursion = function(funCompareOrValue) {
      var result = null;
      if (this) {
        for (var i = 0; i < this.length; i++) {
          if (funCompareOrValue(this[i], i)) {
            result = this[i];
            break;
          } else {
            var childs = this[i].children;
            if (childs) {
              result = childs.findRecursion(funCompareOrValue);
              if (result != null) break;
            }
          }
        }
      }
      return result;
    };
  },
  methods: {
    // 初始化值
    initHandle() {
      if (this.multipleValue.length) {
        this.$refs.tree.setCheckedKeys(this.multipleValue);
      } else if (this.valueId) {
        this.valueTitle = this.$refs.selectTree.getNode(this.valueId).data[
          this.props.label
        ]; // 初始化显示
        this.$refs.selectTree.setCurrentKey(this.valueId); // 设置默认选中
        this.defaultExpandedKey = [this.valueId]; // 设置默认展开
      }
      this.$nextTick(() => {
        let scrollWrap = document.querySelectorAll(
          ".el-scrollbar .el-select-dropdown__wrap"
        )[0];
        let scrollBar = document.querySelectorAll(
          ".el-scrollbar .el-scrollbar__bar"
        );
        scrollWrap.style.cssText =
          "margin: 0px; max-height: none; overflow: hidden;";
        scrollBar.forEach(ele => (ele.style.width = 0));
        if (this.multipleValue.length) this.checkNodeChange();
      });
    },
    // 切换选项
    handleNodeClick(node) {
      if (node.disabled) return;
      if (this.mustlast && node.children && node.children.length) return;
      if (this.multiple) return;

      this.valueTitle = node[this.props.label];
      this.valueId = node[this.props.value];
      this.$emit("getValue", this.valueId);
      this.defaultExpandedKey = [];
      if (!node.children || !node.children.length) this.$refs.selectTree.blur();
    },
    // 清除选中
    clearHandle() {
      this.valueTitle = "";
      this.valueId = null;
      this.defaultExpandedKey = [];
      this.clearSelected();
      this.$refs.tree.setCheckedKeys([]);
      this.$emit("getValue", null);
    },
    /* 清空选中样式 */
    clearSelected() {
      let allNode = document.querySelectorAll("#tree-option .el-tree-node");
      allNode.forEach(element => element.classList.remove("is-current"));
    },
    checkNodeChange(data, isChecked, isChildChecked) {
      const checkedNodes = this.$refs.tree.getCheckedNodes();
      let checkedDeps = [];
      checkedNodes.forEach(node => {
        const temp = checkedDeps.findRecursion(f => f.id == node.id);
        if (temp) return;
        checkedDeps.push(node);
      });
      this.selectTitle = checkedDeps.map(m => m.depName).toString();
      this.valueTitle =
        this.selectTitle.length > 15
          ? `${checkedDeps[0].depName}...等${checkedDeps.length}个选择`
          : this.selectTitle;

      console.log(this.selectTitle, this.valueTitle);
      this.$emit("getValue", checkedDeps);
    }
  },
  watch: {
    value() {
      this.valueId = this.value;
      this.initHandle();
    }
  }
};
</script>

<style scoped>
.el-scrollbar .el-scrollbar__view .el-select-dropdown__item {
  height: auto;
  max-height: 274px;
  padding: 0;
  overflow: hidden;
  overflow-y: auto;
}
.el-select-dropdown__item.selected {
  font-weight: normal;
}
ul li >>> .el-tree .el-tree-node__content {
  height: auto;
  padding: 0 20px;
}
.el-tree-node__label {
  font-weight: normal;
}
.el-tree >>> [aria-disabled="true"] .el-tree-node__content {
  cursor: not-allowed;
}
.el-tree >>> [aria-disabled="true"] .el-tree-node__label {
  color: #c0c4cc !important;
}
.el-tree >>> .is-current:not([aria-disabled="true"]) .el-tree-node__label {
  color: #409eff;
  font-weight: 700;
}
.el-tree
  >>> .is-current:not([aria-disabled="true"])
  .el-tree-node__children
  .el-tree-node__label {
  color: #606266;
  font-weight: normal;
}
</style>
