<template>
  <div class="stru-table">
    <el-table
      v-loading="isloading"
      :data="tableData"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      default-expand-all
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      <el-table-column prop="depName" label="公司层级" width="280"></el-table-column>
      <el-table-column prop="leader" label="负责人" width="160"></el-table-column>
      <el-table-column prop="num" label="总人数" width="140"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            class="ope-table-btn"
            @click.native.prevent="addChild(scope.row, tableData)"
            type="text"
            size="small"
          >查看人员</el-button>
          <el-button
            class="ope-table-btn"      
            @click.native.prevent="openAdd(scope.row, tableData)"
            type="text"
            size="small"
          >新增子集</el-button>
          <el-button
            class="ope-table-btn"
            v-if="scope.$index!=0"
            @click.native.prevent="toMove(scope.row, tableData)"
            type="text"
            size="small"
          >移动</el-button>
          <el-button
            v-if="scope.$index!=0"
            class="ope-table-btn"
            @click.native.prevent="toMerge(scope.row, tableData)"
            type="text"
            size="small"
          >合并</el-button>
          <el-button class="ope-table-btn" @click.native.prevent="edit(scope.row, tableData)" type="text" size="small">编辑</el-button>
          <el-button
            v-if="scope.$index!=0"
            class="ope-table-btn"
            @click.native.prevent="delChild(scope.row, tableData)"
            type="text"
            size="small"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--添加子集弹框-->
    <addChildDialog :show.sync="showaddchildDialog" :parentModel="addModel" @addChilds="addChilds"></addChildDialog>
    <!--编辑的弹框-->
    <editNode :show.sync="showEdit" :model="eidtModel" @editSave="editSave"></editNode>
    <!--合并弹框-->
    <mergeDialog
      v-if="showMerge"
      :show.sync="showMerge"
      :cur-model="mergeModel"
      :data-source="tableData[0]"
      @mergeEnd="mergeEnd"
    ></mergeDialog>
    <!--移动弹框-->
    <moveDialog
      v-if="showMove"
      :show.sync="showMove"
      :cur-model="moveModel"
      :data-source="tableData[0]"
      @moveEnd="moveEnd"
    ></moveDialog>
  </div>
</template>

<script>
import addChildDialog from "../components/addChildDialog";
import editNode from "../components/editNode";
import mergeDialog from "../components/mergeDialog";
import moveDialog from "../components/moveDialog";
import { setTimeout } from "timers";
export default {
  data() {
    return {
      tableData: [],
      showaddchildDialog: false,
      showEdit: false, //是否显示编辑弹框
      showMerge: false,
      mergetoSpl: "请选择 ", //要合并到的地方
      showMove: false,
      eidtModel: null,
      addModel: null,
      moveModel:null,
      mergeModel:null,
      isExpand: true,
      isloading:false,
    };
  },
  components: {
    addChildDialog,
    editNode,
    mergeDialog,
    moveDialog
  },
  methods: {
    getData() {
      this.isloading = true;
      const url = '/deplist/getStructure';
      // const url = 'https://www.easy-mock.com/mock/5d15cbc238f5145ef5374a93/example/api/deplist/getStructer';
    this.$http.get(url,{
      params:{
        companyId:1
      }
    }).then(response => {
        // data.content.tableData.findRecursion(f => {
        //   f.id = Number(f.id);
        // });
        this.tableData = [response.result];
      }).finally(t=>{
      this.isloading = false;
    });
    },
    openAdd(model) {
      this.addModel = model;
      this.showaddchildDialog = true;
    },
    addChilds(models) {
      models.forEach(t=>{
        t.num = 0;
      })
      // models = models.map(m => {
      //   return {
      //     depName: m.depName,
      //     leader: m.leader,
      //     id: m.id,
      //     num: 0
      //   };
      // });

      // let curObj = [this.oc.datasource].findRecursion(
      //   f => f.id == this.addNodeId
      // );
      if (!this.addModel.children) this.addModel.children = [];
      this.addModel.children = this.addModel.children.concat(models);
      // this.oc.init();
    },

    //编辑
    edit(model) {
      this.eidtModel = model;
      this.showEdit = true;
    },
    editSave(newModel) {
      this.eidtModel.depName = newModel.depName;
      this.eidtModel.leader = newModel.leader;
    },
    // 移动
    toMove(model) {
      this.moveModel = model;
      this.showMove = true;
    },
    moveEnd(item){
      console.log(item);
    },
    // 合并
    toMerge(model) {
      this.mergeModel = model;
      this.showMerge = true;
    },
    mergeEnd(){

    },
    handlePickSpl(data) {
      this.mergetoSpl = data.label;
    },
    //删除区域
    delChild(model) {
      console.log(model);
      // if (model.children && model.children.length) {
      //   this.$message({
      //     message: "不能删除，此项已有子节点",
      //     type: "warning"
      //   });
      //   return;
      // }
      // if (model.num != 0) {
      //   this.$message({
      //     message: "不能删除，此项已有成员",
      //     type: "warning"
      //   });
      //   return;
      // }   
      const url = '';
      // const url = 'https://www.easy-mock.com/mock/5d15cbc238f5145ef5374a93/example';
      this.$confirm("确认删除？").then(() => {
        this.$http
          .get(`${url}/deplist/deleteDep`, {params:{
            id: model.id
          }})
          .then(res => {
            this.tableData.findRecursion(f => {
              const index = (f.children || []).findIndex(
                      m => m.id == model.id
              );
              if (index > -1) f.children.splice(index, 1);
            });
          });
      });
    }
  },
  created() {
    this.getData();
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
  }
};
</script>
<style lang="less" scoped>
  @import "../../../styles/colors";
.stru-table {
  padding-top: 32px;
  .ope-table-btn{
    font-size: 13px;
    margin-left: 0;
    color: @base;
  }
}
table.t-dialog {
  border-collapse: separate;
  border-spacing: 10px 10px;
}
/deep/.el-table [class*="el-table__row--level"] .el-table__expand-icon {
  display: inline-block;
  width: 20px;
  line-height: 20px;
  height: 20px;
  text-align: center;
  margin-right: 3px;
}
</style>
