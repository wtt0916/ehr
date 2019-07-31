<template>
  <div class="dialog-container">
    <el-dialog title="添加组织架构" :visible.sync="visible" @close="$emit('update:show', false)">
      <div class="box">
        <main class="main">
          <div class="type-wrap">
            <span style="visibility: hidden">*</span>
            <span>类别：</span>
            <el-select v-model="type" placeholder="请选择">
              <el-option
                v-for="item in typeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div v-for="(item,$index) in list" :key="$index" class="info-wrap">
            <span>*</span>
            <span>名称：</span>
            <div class="info-title">
              <el-input placeholder="请填写" v-model="item.depName"></el-input>
            </div>
            <span>负责人：</span>
            <div class="info-name">
              <!--<el-autocomplete-->
                      <!--class=""-->
                      <!--v-model="item.leader"-->
                      <!--value-key="empName"-->
                      <!--:fetch-suggestions="querySearch"-->
                      <!--placeholder="请输入负责人"-->
                      <!--:trigger-on-focus="false"-->
                      <!--@select="handleSelect($event,item)"-->
              <!--&gt;</el-autocomplete>-->
              <el-select
                      v-model="item.leader"
                      filterable
                      remote
                      reserve-keyword
                      clearable
                      placeholder="请输入负责人"
                      :remote-method="querySearch"
                      :loading="loading"
                      @change="handleSelect($event,item)"
              >
                <el-option
                        v-for="(item,index) in queryEmpList"
                        :key="index"
                        :label="item.empName"
                        :value="item"
                ></el-option>
              </el-select>

              <!--<el-input placeholder="请输入负责人" v-model="item.leader"></el-input>-->
            </div>
          </div>
          <el-button class="continue-add" @click="conitueAdd">+ 继续添加</el-button>
        </main>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="$emit('update:show', false)">取 消</el-button>
        <el-button type="primary" @click="submitAdd">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    parentModel: {},
    show: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    show() {
      this.visible = this.show;
    }
  },
  data() {
    return {
      typeOptions: [
        {
          value: 1,
          label: "部门"
        }, {
          value: 2,
          label: "公司"
        }, {
          value: 3,
          label: "门店"
        }
      ],
      type: "",
      list: [
        {
          companyId: 1,
          // name: ""
        }
      ],
      visible: this.show,
      queryEmpList:[],
      loading:false
    };
  },
  methods: {
    newModel() {
      return {companyId:1, leader: "" };
      // return { guid: this.guid(), title: "", leader: "" };
    },
    conitueAdd() {
      this.list.push(this.newModel());
    },
    submitAdd() {
      if (!this.type) {
        this.$message({
          message: "请选择类别",
          type: "warning"
        });
        return;
      }
      if (this.list.find(f => !f.depName)) {
        this.$message({
          message: "名称不能为空",
          type: "warning"
        });
        return;
      }
      const params = this.list.map(res=>{
        res.parentId = this.parentModel.depId;
        res.depType = this.type;
        return res;
      })
      //同级不能有重复
      let isRepeat = false;
      for (let i = 0; i < params.length; i++) {
        isRepeat = (this.parentModel.children || []).find(f => {
          return f.depName == params[i].depName;
        });
        if (isRepeat) break;
      }
      if (isRepeat) {
        this.$message({
          message: `已存在${isRepeat.depName},请不要重复添加`,
          type: "waring"
        });
        return;
      }
      const addurl = '';
      // const addurl = 'https://www.easy-mock.com/mock/5d15cbc238f5145ef5374a93/example';
      this.$http.post(`${addurl}/deplist/addDep`, params).then(response => {
          // this.list.forEach((item, index) => {
          //   const contents = response.result;
          //   contents.forEach(t=>{
          //      if(item.name === t.depName){
          //        item.id = t.depId
          //      } // t.depId
          //   })
            // item.id = 3
            // item.id = response.result
            // item.id = response.data.list[index];
          // });
          this.$emit("update:show", false);
          this.$emit("addChilds", response.result);
          this.list = [this.newModel()];
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 模糊查询
    // querySearch(queryString, cb) {
    //   this.$http.get('/emplist/getEmpVague',{params:{
    //       nameNumPhone:queryString,
    //       companyId:1
    //     }}).then(res=>{
    //       const content = res.result;
    //       // 调用 callback 返回建议列表的数据
    //       var results = queryString ? content.filter(this.createFilter(queryString)) : content;
    //       console.log(results);
    //       cb(results);
    //   })
    // },
    querySearch(query) {
      if (!query) {
        this.queryEmpList = [];
        return;
      }
      this.loading = true;
      const url = '/emplist/getEmpVague';
      this.$http
              .get(url, {
                params: {
                  nameNumPhone: query,
                  companyId: 1
                }
              })
              .then(res => {
                const content = res.result;
                this.queryEmpList = content;
                this.loading = false;
              });
    },

    createFilter(queryString) {
      return (data) => {
        return (data.empName.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    handleSelect(item,paramsItem) {
      // item选中值
      // paramsItem要传参数
      paramsItem.leader = item.empName;
      paramsItem.leaderId =  item.empId;

    }
  }
};
</script>

<style lang="less" scoped>
.box {
  background: #fff;
  max-height: 340px;
}
.head {
  height: 50px;
  line-height: 50px;
  text-align: center;
  border-bottom: 1px solid #ccc;
  i {
    position: absolute;
    right: 20px;
    top: 16px;
  }
}
main.main {
  padding: 20px;
  height: 340px;
  max-height: 360px;
  overflow-y: scroll;
}
.el-select {
  width: 50%;
}
.info-wrap {
  margin-top: 16px;
}
.info-wrap div {
  display: inline-block;
}
.info-title {
  margin-right: 18px;
}
.continue-add {
  width: 100px;
  margin: 0 auto;
  display: block;
  margin-top: 20px;
}
</style>
