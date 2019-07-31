<template>
  <div class="dialog-container">
    <el-dialog
      :visible.sync="visible"
      @close="$emit('update:show', false)"
      title="合并子节点"
      width="30%">
      <table>
        <tr>
          <td class="t-r">合并到：</td>
          <td>
            <selecttree
              :clearable="isClearable"
              :mustlast="true"
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
  inject:['reload'],
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
        value: "id",
        label: "depName",
        children: "children"
      },
      visible: this.show
    };
  },
  methods: {
    getValue(value) {
      this.valueId = value;
    },
    confirm() {
      const params = {
        sourceId:this.curModel.id,
        targetId:this.valueId
      };
      // params.parentId = this.valueId;
      const url = '';
      // const url = 'https://www.easy-mock.com/mock/5d15cbc238f5145ef5374a93/example';
      this.$http.get(`${url}/deplist/mergeDep`, {params}).then(response => {
        this.reload();
      }).catch(function(error) {
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