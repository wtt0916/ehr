<template>
  <div class="edit-de-dialog-components">
    <el-dialog
      class="zy-dialog-pub zy-dialog-pub-xlarge head-wrap dialog-item-list"
      title="编辑"
      top="4vh"
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
      <div class="dialog-body">
        <el-table class="table-wrap de-dialog" :data="empList" height="305" style="width: 100%">
          <el-table-column prop="position" label="项目" width="400">
            <template slot-scope="scope">
              <el-checkbox
                v-for="(item,index) in scope.row.deItemlist"
                class="de-dialog-checkbox"
                :key="index"
                v-model="item.checked"
                @change="onClickItem(item,scope.row,scope.$index)"
              >{{item.name}}</el-checkbox>
            </template>
          </el-table-column>
          <template v-for="item in itemConfig">
            <!--:width="item.isMultiple? 500:260"-->
            <el-table-column
              v-if="item.visible"
              :key="item.type"
              :label="item.name"
            :width="item.isMultiple? 500:460">
              <template slot-scope="scope" v-if="scope.row[`isShow${item.code}`]">
                <template v-if="item.isMultiple">
                  <div
                    v-for="(child,childindex) in scope.row[`${item.code}Config${item.isMultiple?'s':''}`]"
                    class="multi" :key="childindex">
                    <span class="dia-btn-delchild" v-show="!!childindex" @click="onDelChild(scope.row,childindex)"></span>
                    <div class="month-deduction">
                      <el-link
                        class="btn-childtitle"
                        :underline="false"
                        @click="onAddChild(scope.row)">
                        子女{{childindex+1}}每月减免
                        <i class="el-icon-plus el-icon--right"></i>
                      </el-link>
                      <el-input v-model="child.perSub" placeholder="请输入金额" type="number" min="0"></el-input>元
                    </div>
                    <div class="cycle">
                      <h6>减免周期</h6>
                      <el-date-picker
                        v-model="child.range"
                        type="monthrange"
                        value-format="yyyyMM"
                        start-placeholder="开始月份"
                        end-placeholder="结束月份"
                        @change="dateChange(child)"
                        @blur="dateChange(child)"
                      ></el-date-picker>
                    </div>
                  </div>
                </template>
                <template v-else>
                  <div class="multi">
                    <div class="month-deduction">
                      <h6>每月减免</h6>
                      <el-input
                        v-model="scope.row[`${item.code}Config`].perSub"
                        placeholder="请输入金额"
                        type="number"
                        min="0"
                      ></el-input>
                    </div>
                    <div class="cycle">
                      <h6>减免周期</h6>
                      <el-date-picker
                        v-model="scope.row[`${item.code}Config`].range"
                        type="monthrange"
                        value-format="yyyyMM"
                        start-placeholder="开始月份"
                        end-placeholder="结束月份"
                        @change="dateChange(scope.row[`${item.code}Config`])"
                        @blur="dateChange(scope.row[`${item.code}Config`])"
                      ></el-date-picker>
                    </div>
                  </div>
                </template>
              </template>
            </el-table-column>
          </template>
        </el-table>
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
      model: {},
      empList: [],
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
        startDate: "",
        endDate: ""
        // range: []
      }
    };
  },
  methods: {
    onConfirm() {
      let items = [];
      //循环整个列表
      this.empList.forEach(emp => {
        //遍历专项扣除集合
        this.itemConfig.forEach(item => {
          //在列表当前行， 如果扣除项 isshow 为false，则未勾选，跳出
          if (!emp[`isShow${item.code}`]){
            const oldConfig = this.curModel[`${item.code}Config${item.isMultiple ? "s" : ""}`];
            if(oldConfig instanceof Array && oldConfig.length>0){
              //说明之前是有值的，有值肯定是选中的
                items = items.concat(
                  oldConfig.map(c => {
                    return {
                      id: c.id,
                      companyId: 1,
                      mainCompanyId:emp.mainCompanyId,
                      empId: emp.empId,
                      empName: emp.empName,
                      perSub: c.perSub,
                      configId: c.configId,
                      startDate: c.startDate,
                      endDate: c.endDate,
                      status: 4,
                      type: item.type
                    };
                  })
                );
            }
            else if(oldConfig){
              items.push({
                id: oldConfig.id,
                companyId: 1,
                mainCompanyId:emp.mainCompanyId,
                empId: emp.empId,
                empName: emp.empName,
                perSub: oldConfig.perSub,
                configId: oldConfig.configId,
                startDate: oldConfig.startDate,
                endDate: oldConfig.endDate,
                status: 4,
                type: item.type
              });
            }
            return;
          };
          // 已勾选，取得扣除项对应 Config对象
          const config = emp[`${item.code}Config${item.isMultiple ? "s" : ""}`];
          // 如果Config是数组，子女扣除
          if (config instanceof Array) {
            items = items.concat(
              config.map(c => {
                return {
                  id: c.id,
                  companyId: 1,
                  mainCompanyId:emp.mainCompanyId,
                  empId: emp.empId,
                  empName: emp.empName,
                  perSub: c.perSub,
                  configId: c.configId,
                  startDate: c.range ? c.range[0] : "",
                  endDate: c.range ? c.range[1] : "",
                  status: 1,
                  type: item.type
                };
              })
            );
            this.curModel[`${item.code}Configs`].forEach(curModelItem=>{
              if(!items.find(i => i.id==curModelItem.id)){
                items.push({
                  id: curModelItem.id,
                  companyId: 1,
                  mainCompanyId:curModelItem.mainCompanyId,
                  empId: curModelItem.empId,
                  empName: curModelItem.empName,
                  perSub: curModelItem.perSub,
                  configId: curModelItem.configId,
                  startDate: curModelItem.startDate,
                  endDate: curModelItem.endDate,
                  status: 4,
                  type: curModelItem.type
                });
              }
            });

          } else {
            // 如果Config是对象，其余4项
            items.push({
              id: config.id,
              companyId: 1,
              mainCompanyId:emp.mainCompanyId,
              empId: emp.empId,
              empName: emp.empName,
              perSub: config.perSub,
              configId: config.configId,
              startDate: config.range ? config.range[0] : "",
              endDate: config.range ? config.range[1] : "",
              status: 1,
              type: item.type
            });
          }
        });
      });

      //校验是否有未填写的信息
      const checke = items.find(f => {
        return !f.startDate || !f.endDate || !f.perSub;
      });
      if (checke) {
        this.$message({
          message: "存在尚未填写完整的信息，请补充完整后再确定",
          type: "warning"
        });
        return;
      }
      this.$http.post("/empAdditional/saveOrUpdateAdditional", items).then(response => {
        console.log(response.result);
        // 1、这里有可能response 返回了新增的那几项，如果返回了，则替换 items 传回父组件
        // 2、如果没有返回则在 addCallback回调里直接刷新列表吧。
        this.$emit("editCallback", items);
        this.$emit("update:show", false);
      });
      // this.$http("eidtDeduction", {
      //   items
      // }).then(response => {
      //   this.$emit("editCallback", this.model);
      //   this.$emit("update:show", false);
      // });
      //其实不太建议用这个model去替换列表上对应的行，因为这个model经过编辑的处理，有一些特殊的控制的属性，返回列表的话无法保持一致性
      //建议是 返回此model，在列表的回调函数中，根据此model的id，去调接口单独查询这一项，替换到列表上。
      // this.$emit("editCallback", this.model);
      // this.$emit("update:show", false);
    },
    // 添加子女
    onAddChild(item) {
      item.childrenConfigs.push(
        JSON.parse(JSON.stringify(this.configStructure))
      );
    },
    //删除子女
    onDelChild(item, index) {
      item.childrenConfigs.splice(index, 1);
    },
    //选择项
    onClickItem(item, curRow, curRowIndex) {
      //取得当前操作的是集合中的哪一项 option
      const option = this.itemConfig.find(i => i.type == item.value);
      //将勾选状态 赋值 给 当前行的 isshow
      curRow[`isShow${option.code}`] = item.checked;
      // 互斥处理
      if (item.checked && option.type == 2) {
        curRow.deItemlist.find(f => f.value == 3).checked = false;
        curRow[`isShow${this.itemConfig.find(f => f.type == 3).code}`] = false;
      }
      if (item.checked && option.type == 3) {
        curRow.deItemlist.find(f => f.value == 2).checked = false;
        curRow[`isShow${this.itemConfig.find(f => f.type == 2).code}`] = false;
      }
      //更新视图
      this.$set(this.empList, curRowIndex, curRow);
      //判断 某个扣除项 是否 有行选中了。
      this.itemConfig.forEach(item => {
        item.visible = this.empList.some(s => {
          return s.deItemlist.find(i => i.value == item.type).checked == true;
        });
      });
    },
    dateChange(item) {
      if (item.range)
        (item.startDate = item.range[0]), (item.endDate = item.range[1]);
      else {
        (item.startDate = ""), (item.endDate = "");
      }
      this.$set(this.empList, 0, this.empList[0]);
    }
  },
  mounted() {
    //将要编辑的对象 深拷贝给 组件中的 主对象，避免操作父组件中数据
    this.model = JSON.parse(JSON.stringify(this.curModel));
    console.log(this.model);
    //遍历专项扣除配置（forEach和map二合一，故使用map循环）
    //给对象中增加isShow[code]属性
    //分别处理 批量 和 单个的range属性（range属性为前端使用的日期选择范围， 接口需要的和返回的都是单个的两个日期字段）
    //增加deItemlist数组（checkbox区域），只有return之后的代码是做这件事的。
    this.model.deItemlist = this.itemConfig.map(m => {
      let propertyName = `${m.code}Config`;
      if (m.isMultiple){ propertyName += "s";
        this.model[`isShow${m.code}`] = this.model[propertyName].length>0;
      }
      else this.model[`isShow${m.code}`] = this.model[propertyName] != null;


      if(this.model[propertyName] && (this.model[propertyName] instanceof Array ? this.model[propertyName].length>0 : true)){
        if (m.isMultiple) {
          this.model[propertyName].forEach(child => {
            child.range = [child.startDate, child.endDate].map(m=> m+'');
          });
        } else {
          this.model[propertyName].range = [
            this.model[propertyName].startDate+'',
            this.model[propertyName].endDate+''
          ];
        }
      }
      else{
        this.model[propertyName] = m.isMultiple  ? JSON.parse(JSON.stringify([this.configStructure]))  : JSON.parse(JSON.stringify(this.configStructure));
      }

      return {
        name: m.name,
        value: m.type,
        checked: this.model[`isShow${m.code}`]
      };
    });
    //和新增保持一样的逻辑，并满足el-table对数据源的要求，故转换为数组
    this.empList = [this.model];
    console.log(this.empList);

    //判断整列是否显示，没值得就不显示
    this.itemConfig.forEach(item => {
      item.visible = this.empList.some(s => {
        return s.deItemlist.find(i => i.value == item.type).checked == true;
      });
    });
  }
};
</script>
<style lang="less" scoped>
@import "../index";
  .de-dialog{
    /deep/.el-table__body{
      td{
        padding: 15px 0;
      }
    }
    .de-dialog-checkbox{
      line-height: 2;
    }
  }
.edit-de-dialog-components{
  .head-top{
    padding: 0 55px 15px;
  }
  .dialog-footer{
    margin-top: 20px;
  }
}

</style>
