<template>
  <div>
    <el-dialog
      class="zy-dialog-pub zy-dialog-pub-xlarge dialog-item-list"
      title="新增附加专项扣除员工"
      top="4vh"
      :visible.sync="visible"
      @close="$emit('update:show', false)">
      <div class="head-top">
        <div class="zy-search-pub">
          <div class="search-item">
            <el-input class="search-input" placeholder="姓名/工号" v-model="addSearch"></el-input>
            <selecttree
                    placeholder="部门"
                    :options="departments"
                    @getValue="onSetDepartMent($event)"
                    ref="selectTree"
                    class="search-dep"/>
          </div>
          <div class="search-btns">
            <el-button class="his-search light-btn" @click="onAddDiaSearch">搜索</el-button>
          </div>
        </div>
      </div>
      <div class="dialog-body">
        <el-table class="table-wrap" :data="empList" style="width: 100%" height="380">
          <el-table-column prop="empName" label="姓名" width="100"></el-table-column>
          <el-table-column prop="empNum" label="工号" width="140"></el-table-column>
          <el-table-column prop="depName" label="部门" width="160"></el-table-column>
          <el-table-column prop="position" label="职位" width="160"></el-table-column>
          <el-table-column prop="position" label="项目" width="440">
            <template slot-scope="scope">
              <el-checkbox
                v-for="(item,index) in scope.row.deItemlist"
                :key="index"
                v-model="item.checked"
                @change="onClickItem(item,scope.row,scope.$index)"
              >{{item.name}}</el-checkbox>
            </template>
          </el-table-column>
          <template v-for="item in itemConfig">
            <el-table-column
              v-if="item.visible"
              :key="item.type"
              :label="item.name"
              :width="item.isMultiple? 500:460"
            >
              <template slot-scope="scope" v-if="scope.row[`isShow${item.code}`]">
                <template v-if="item.isMultiple">
                  <div
                    v-for="(child,childindex) in scope.row[`${item.code}Config`]"
                    :key="childindex"
                    class="multi">
                    <span
                      class="dia-btn-delchild"
                      v-show="!!childindex"
                      @click="onDelChild(scope.row,childindex)"
                    ></span>
                    <div class="month-deduction">
                      <el-link
                        class="btn-childtitle"
                        :underline="false"
                        @click="onAddChild(scope.row)"
                      >
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
                      ></el-date-picker>
                    </div>
                  </div>
                </template>
              </template>
            </el-table-column>
          </template>
          <el-table-column label="操作" width="80" fixed="right">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                icon="el-icon-delete"
                @click="delAddItem(scope.row,scope.$index)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div slot="footer" class="dialog-footer t-c">
        <el-button class="button default-button" @click="$emit('update:show', false)">取 消</el-button>
        <el-button type="primary" class="blue-button" @click="onConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import selecttree from "../../../components/selectTree";
  export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  components:{
    selecttree
  },
  watch: {
    show() {
      this.visible = this.show;
    }
  },
  data() {
    return {
      visible: this.show,
      addSearch: null,
      departments: [],
      // isShowChildEdu: false, //是否显示添加子女列
      // isShowRent: false, //是否显示住房租金列
      // isShowLoan: false, //是否显示住房贷款利息
      // isShowSupport: false, //是否显示赡养老人
      // isShowEducation: false, //是否显示赡养老人
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
        range: []
      }
    };
  },
  methods: {
    onDepartments() {
      // const url = "https://www.easy-mock.com/mock/5d15cbc238f5145ef5374a93/example/api/deplist/getStructer";
      const url = "/deplist/getStructure";
      const params = {
        companyId:1
      }
      this.$http.get(url, {params}).then(response => {
        this.departments = [response.result];
      });
    },
    onSetDepartMent(value) {
      console.log(value);
      this.depChecked = value;
    },
    onConfirm() {
      let items = [];
      //循环整个列表
      this.empList.forEach(emp => {
        //遍历专项扣除集合
        this.itemConfig.forEach(item => {
          //在列表当前行， 如果扣除项 isshow 为false，则未勾选，跳出
          if (!emp[`isShow${item.code}`]) return;
          // 已勾选，取得扣除项对应 Config对象
          const config = emp[`${item.code}Config`];
          // 如果Config是数组，子女扣除
          if (config instanceof Array) {
            items = items.concat(
              config.map(c => {
                return {
                  companyId: 1,
                  mainCompanyId:emp.mainCompanyId,
                  empId: emp.empId,
                  empName: emp.empName,
                  perSub: c.perSub,
                  startDate: c.range[0] || "",
                  endDate: c.range[1] || "",
                  status: 1,
                  type: item.type
                };
              })
            );
          } else {
            // 如果Config是对象，其余4项
            items.push({
              companyId: 1,
              mainCompanyId:emp.mainCompanyId,
              empId: emp.empId,
              empName: emp.empName,
              perSub: config.perSub,
              startDate: config.range ? Number(config.range[0]) : "",
              endDate: config.range ? Number(config.range[1]) : "",
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
      // console.log(items);
      this.$http.post("/empAdditional/batchAdd", items).then(response => {
        console.log(response.result);
        // 1、这里有可能response 返回了新增的那几项，如果返回了，则替换 items 传回父组件
        // 2、如果没有返回则在 addCallback回调里直接刷新列表吧。
        this.$emit("addCallback", items);
        this.$emit("update:show", false);
      });
      // this.$emit("addCallback", items);
      // this.$emit("update:show", false);
    },
    onAddDiaSearch() {
      const nameNumPhone = this.addSearch,
              depId = this.depChecked;
      // const url = "https://www.easy-mock.com/mock/5d15cbc238f5145ef5374a93/example/emplist/getEmpPage";
      const url = "emplist/getEmpPage";
      this.$http(url, {
        params: {
          companyId:1,
          nameNumPhone,
          depId
        }
      }).then(res => {
        //(1-子女教育，2-住房租金，3-住房贷款利息，4-赡养老人，5-继续教育)
        //循环列表
        res.result.forEach(item => {
          //遍历专项扣除集合，给列表中每一行增加Config对象 ，和 isShow对象， deItemlist
          item.deItemlist = this.itemConfig.map(m => {
            //如果是多选则返回数组，如果是对象则返回对象
            item[`${m.code}Config`] = m.isMultiple
              ? JSON.parse(JSON.stringify([this.configStructure]))
              : JSON.parse(JSON.stringify(this.configStructure));
            item[`isShow${m.code}`] = false;

            return { name: m.name, value: m.type, checked: false };
          });
        });
        this.empList = res.result;
      });
    },
    //新增专项扣除删除
    delAddItem(item, index) {
      this.empList.splice(index, 1);
    },
    // 添加子女
    onAddChild(item) {
      console.log(item);
      item.childrenConfig.push(
        JSON.parse(JSON.stringify(this.configStructure))
      );
    },
    //删除子女
    onDelChild(item, index) {
      item.childrenConfig.splice(index, 1);
    },
    //选择项
    //???有一些后续思考 每一行里的 deItemList 是否可以和 isShow[code] 相结合
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
    }
  },
  mounted() {
    // this.onAddDiaSearch();
    this.onDepartments();
  }
};
</script>
<style lang="less" scoped>
@import "../index";
</style>
