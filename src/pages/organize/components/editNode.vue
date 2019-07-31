<template>
  <div class="dialog-container">
    <el-dialog title="编辑" :visible.sync="visible" @close="$emit('update:show', false)" width="30%">
      <table v-if="visible" class="t-dialog">
        <tr>
          <td class="t-r">*公司名称</td>
          <td>
            <el-input placeholder="请填写" v-model="newModel.depName"></el-input>
          </td>
        </tr>
        <tr>
          <td class="t-r">负责人</td>
          <td>
            <!--<el-autocomplete-->
                    <!--class=""-->
                    <!--v-model="newModel.leader"-->
                    <!--value-key="empName"-->
                    <!--:fetch-suggestions="querySearch"-->
                    <!--placeholder="请输入负责人"-->
                    <!--:trigger-on-focus="false"-->
                    <!--@select="handleSelect($event,item)"-->
            <!--&gt;</el-autocomplete>-->
            <empvague
                    :searchemp="newModel.leader"
                    @getValue="getValue"
                    placeholder-val="请输入负责人">

            </empvague>
            <!--<el-input placeholder="请输入负责人" v-model="newModel.leader"></el-input>-->
          </td>
        </tr>
      </table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="$emit('update:show', false)">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import empvague from '../../../components/empVague'
  export default {
  props: {
    model: {},
    show: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    show() {
      this.visible = this.show;
      if (this.visible) this.newModel = $.extend({}, this.model);
      console.log(this.newModel);
    }
  },
  components:{
    empvague
  },
  data() {
    return {
      visible: this.show,
      newModel: null
    };
  },
  methods: {
    save() {
      if (!this.newModel.depName) {
        this.$message({
          message: "名称不能为空",
          type: "warning"
        });
        return;
      }

      console.log(this.newModel);
      // return;
      const url = '';
      // const url = 'https://www.easy-mock.com/mock/5d15cbc238f5145ef5374a93/example';
      const params = {
        companyId:1,
        leaderId:this.newModel.leaderId,
        leader:this.newModel.leader,
        depId:this.newModel.depId,
        depName:this.newModel.depName,
        id:this.newModel.id
      }
      console.log(params);
      this.$http.post(`${url}/deplist/editDep`, params)
        .then(response => {
          this.$emit("update:show", false);
          this.$emit("editSave", this.newModel);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getValue(item){
      // console.log(this.newModel);
      this.newModel.leader=item.empName;
      this.newModel.leaderId= item.empId;
    }
    // 模糊查询
    // querySearch(queryString, cb) {
    //   this.$http.get('/emplist/getEmpVague',{params:{
    //       nameNumPhone:queryString,
    //       companyId:1
    //     }}).then(res=>{
    //     const content = res.result;
    //     // 调用 callback 返回建议列表的数据
    //     var results = queryString ? content.filter(this.createFilter(queryString)) : content;
    //     console.log(results);
    //     cb(results);
    //   })
    // },
    // createFilter(queryString) {
    //   return (data) => {
    //     return (data.empName.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
    //   };
    // },
    // handleSelect(item,paramsItem) {
    //   paramsItem.leaderId = item.empId;
    // }
  }
};
</script>

<style lang="less" scoped>

</style>
