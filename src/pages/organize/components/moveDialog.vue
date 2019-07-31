<template>
  <div class="dialog-container">
    <el-dialog
      :visible.sync="visible"
      @close="$emit('update:show', false)"
      title="移动节点"
      width="30%">
      <table>
        <tr>
          <td class="t-r">移动到：</td>
          <td>
            <selecttree
              :clearable="isClearable"
              :mustlast="false"
              :props="defaultProps"
              :options="options"
              @getValue="getValue($event)"
            />
          </td>
        </tr>
      </table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="$emit('update:show', false)">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>

import selecttree from "../../../components/selectTree";
export default {
  components: {
    selecttree
  },
  props: {
    dataSource: {},
    show: {
      type: Boolean,
      default: false
    },
    isClearable: {
      type: Boolean,
      default: false
    },
    isAccordion: {
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
      defaultProps: {
        value: "depId",
        label: "depName",
        children: "children"
      },
      visible: this.show
    };
  },
  methods: {
    getValue(value) {
      console.log(value);
      this.valueId = value;//要移动到节点的depId
    },
    confirm() {
      console.log(this.curModel);
      // console.log(this.valueId);
      const params = this.curModel;
      params.parentId = this.valueId;
      // delete(params['relationship']);
      // delete(params['level']);
      [params].findRecursion(f=>{
        if(f.level) delete f.level;
        if(f.relationship) delete f.relationship;
      });
      const url = '';
      // const url = 'https://www.easy-mock.com/mock/5d15cbc238f5145ef5374a93/example';
      this.$http.post(`${url}/deplist/moveDep`, params).then(response => {
          [this.dataSource].findRecursion(f => {
            const index = (f.children || []).findIndex(
                    m => m.id == this.curModel.id
            );
            if (index > -1) {
              f.children.splice(index, 1);
            }
          });
          [this.dataSource].findRecursion(f => {
            if (f.depId == this.valueId) {
              if (!f.children) f.children = [];
              f.children.push(this.curModel);
            }
          });
          this.$emit("update:show", false);
          this.$emit("moveEnd", this.dataSource);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  created() {
    this.options = JSON.parse(JSON.stringify([this.dataSource]));
    this.options.findRecursion(f => {
      if (f.id == this.curModel.id) {
        f.disabled = true;
        (f.children || []).findRecursion(c => {
          c.disabled = true;
        });
        return;
      }
    });
  }
};
</script>