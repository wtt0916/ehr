<template>
  <div class="app">
    <!--如果登录-->
    <template v-if="isLoginPage">
      <router-view/>
    </template>

    <template v-if="!isLoginPage">
      <el-container style="height: 100%;">
        <el-header class="header" height="50">
          <el-row>
            <el-col :span="12">
              <img class="logo" src="data:image/jpeg;base64,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" alt>
              <!--<span class="company-name">北京佶象信息技术有限公司 - 人力资源管理系统</span>-->
            </el-col>
            <el-col :span="7">
              <!--搜索-->
              <div class="zy-search t-r">
                <el-autocomplete
                  class="input"
                  v-model="state"
                  :fetch-suggestions="querySearchAsync"
                  placeholder="员工姓名、工号、手机号"
                  @select="handleSelect">
                  <i class="el-icon-search el-input__icon" slot="prefix"></i>
                </el-autocomplete>
                <!--<input class="input" type="text" placeholder="员工姓名、工号、手机号">-->
                <!--<el-button class="btn" icon="el-icon-search"></el-button>-->
              </div>

              <!--<el-dropdown style="width:250px; height: 85px;">-->
              <!--<img class="profile-photo" src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2953424517,2592424793&fm=27&gp=0.jpg" alt="用户头像">-->
              <!--&lt;!&ndash;<i class="el-icon-setting" style="margin-right: 15px"></i>&ndash;&gt;-->
              <!--<span style="display:block; text-align: left; width:130px; height: 100%; float: right; margin-top: -76px;">1312</span>-->
              <!--<el-dropdown-menu slot="dropdown" style="width:19%;">-->
              <!--<el-dropdown-item>修改个人信息</el-dropdown-item>-->
              <!--<el-dropdown-item>退出登录</el-dropdown-item>-->
              <!--</el-dropdown-menu>-->
              <!--</el-dropdown>-->
            </el-col>
            <el-col :span="5">
              <!--个人信息-->
              <div class="zy-info t-r">
                <el-button icon="el-icon-search"></el-button>
                <span class="hr"></span>
                <img
                  class="head"
                  src="data:image/jpeg;base64,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"
                  alt
                >
                <div class="info t-l">
                  <span class="name">秦玉然</span>
                  <span class="tel">18311233045</span>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-header>

        <el-container class="zy-continer">
          <el-aside class="zy-el-aside"
            :width="isCollapse?'160':'81'"
            style="background-color: #fff;box-shadow:2px 0px 16px 0px rgba(3,33,136,0.2);">
            <el-menu
              :default-active="activedMenu()"
              :collapse="isCollapse"
              class="el-menu-wrap collapse-btn"
            >
              <!--展开/收起按钮-->
              <el-radio v-show="isCollapse" v-model="isCollapse" :label="false">
                <i class="el-icon-caret-right"></i>
              </el-radio>
              <el-radio v-show="!isCollapse" v-model="isCollapse" :label="true">
                <i class="el-icon-caret-left"></i>
              </el-radio>

              <!--nav树-->
              <el-menu-item index="/" @click="$router.push('/')">
                <i class="el-icon-gongzuotai"></i>
                <span slot="title">工作台</span>
              </el-menu-item>
              <el-submenu index="/organize/picture">
                <template slot="title">
                  <div @click="$router.push('/organize/picture')">
                    <i class="el-icon-zuzhi"></i>
                    <span slot="title" @click="$router.push('/organize/picture')">组织规划</span>
                  </div>
                </template>
                <el-menu-item-group>
                  <el-menu-item
                    index="/organize/picture"
                    @click="$router.push('/organize/picture')"
                    style="padding-left: 0"
                  >组织架构</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="employeesList">
                <template slot="title">
                  <div @click="$router.push('/employeesList')">
                    <i class="el-icon-yuangong"></i>
                    <span slot="title" >员工管理</span>
                  </div>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="/employeesList" style="padding-left: 0" @click="$router.push('/employeesList')">员工列表</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="/salary">
                <template slot="title">
                  <div @click="$router.push('/salary')">
                    <i class="el-icon-xinzi"></i>
                    <span slot="title">薪资管理</span>
                  </div>
                </template>
                <el-menu-item-group>
                  <el-menu-item
                    index="/salary"
                    @click="$router.push('/salary')"
                    style="padding-left: 0"
                  >薪资方案</el-menu-item>
                  <el-menu-item
                    index="/salary/deduction"
                    @click="$router.push('/salary/deduction')"
                    style="padding-left: 0"
                  >附加专项扣除</el-menu-item>
                  <el-menu-item
                    index="/salary/account"
                    @click="$router.push('/salary/account')"
                    style="padding-left: 0"
                  >核算薪资</el-menu-item>
                  <el-menu-item
                    index="/salary/replenish"
                    @click="$router.push('/salary/replenish')"
                    style="padding-left: 0"
                  >补发补扣</el-menu-item>
                  <el-menu-item
                    index="/salary/history"
                    @click="$router.push('/salary/history')"
                    style="padding-left: 0"
                  >历史薪资</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="/welfareSet">
                <template slot="title">
                  <div @click="$router.push('/welfareSet')">
                    <i class="el-icon-fuli"></i>
                    <span slot="title">社保公积金</span>
                  </div>
                </template>
                <el-menu-item-group>
                  <el-menu-item
                    index="/welfareSet"
                    @click="$router.push('/welfareSet')"
                    style="padding-left: 0"
                  >员工缴纳方案</el-menu-item>
                  <el-menu-item
                    index="/addSub"
                    @click="$router.push('/addSub')"
                    style="padding-left: 0"
                  >增减员清单</el-menu-item>
                  <el-menu-item index="/account" @click="$router.push('/account')" style="padding-left: 0">月度核算</el-menu-item>
                  <el-menu-item index="/welfareParameter" @click="$router.push('/welfareParameter')" style="padding-left: 0">历史台账</el-menu-item>
                </el-menu-item-group>
              </el-submenu>

              <!--<el-menu-item index="/statement" @click="$router.push('/statement')">-->
                <!--<i class="el-icon-tongji"></i>-->
                <!--<span slot="title">统计报表</span>-->
              <!--</el-menu-item>-->

              <el-submenu index="/setting">
                <template slot="title">
                  <div @click="$router.push('/setting')">
                    <i class="el-icon-shezhi"></i>
                    <span slot="title">系统设置</span>
                  </div>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="/setting" @click="$router.push('/setting')">权限配置</el-menu-item>
                  <el-menu-item index="/setting/info" @click="$router.push('/setting/info')">企业信息</el-menu-item>
                  <el-menu-item index="/setting/contractCompany" @click="$router.push('/setting/contractCompany')">合同主体</el-menu-item>
                  <el-menu-item index="/setting/email" @click="$router.push('/setting/email')">企业邮箱</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </el-aside>

          <el-main class="zy-main" :style="{marginLeft:isCollapse?'61px':'160px'}">
            <router-view v-if="isRouterAlive"/>
          </el-main>
        </el-container>
      </el-container>
    </template>
  </div>
</template>

<script>
export default {
  provide(){
    return {
      reload:this.reload
    }
  },
  data: function() {
    return {
      isLoginPage: false, //是否作为登录页面
      isCollapse: false, //左侧树是否收起状态
      // activeIndex:1,
      // 搜索按钮区域
      restaurants: [],
      state: "",
      timeout: null,
      isRouterAlive:true
    };
  },
  methods: {
    getData() {},
    // 搜索区域
    loadAll() {
      return [
        { value: "三全鲜食（北新泾店）", address: "长宁区新渔路144号" },
        {
          value: "Hot honey 首尔炸鸡（仙霞路）",
          address: "上海市长宁区淞虹路661号"
        },
        {
          value: "新旺角茶餐厅",
          address: "上海市普陀区真北路988号创邑金沙谷6号楼113"
        },
        { value: "泷千家(天山西路店)", address: "天山西路438号" },
        {
          value: "胖仙女纸杯蛋糕（上海凌空店）",
          address: "上海市长宁区金钟路968号1幢18号楼一层商铺18-101"
        },
        { value: "贡茶", address: "上海市长宁区金钟路633号" },
        {
          value: "豪大大香鸡排超级奶爸",
          address: "上海市嘉定区曹安公路曹安路1685号"
        },
        {
          value: "茶芝兰（奶茶，手抓饼）",
          address: "上海市普陀区同普路1435号"
        },
        { value: "十二泷町", address: "上海市北翟路1444弄81号B幢-107" },
        { value: "星移浓缩咖啡", address: "上海市嘉定区新郁路817号" },
        { value: "阿姨奶茶/豪大大", address: "嘉定区曹安路1611号" },
        { value: "新麦甜四季甜品炸鸡", address: "嘉定区曹安公路2383弄55号" },
        {
          value: "Monica摩托主题咖啡店",
          address: "嘉定区江桥镇曹安公路2409号1F，2383弄62号1F"
        },
        {
          value: "浮生若茶（凌空soho店）",
          address: "上海长宁区金钟路968号9号楼地下一层"
        },
        { value: "NONO JUICE  鲜榨果汁", address: "上海市长宁区天山西路119号" },
        { value: "CoCo都可(北新泾店）", address: "上海市长宁区仙霞西路" },
        {
          value: "快乐柠檬（神州智慧店）",
          address: "上海市长宁区天山西路567号1层R117号店铺"
        },
        {
          value: "Merci Paul cafe",
          address: "上海市普陀区光复西路丹巴路28弄6号楼819"
        },
        {
          value: "猫山王（西郊百联店）",
          address: "上海市长宁区仙霞西路88号第一层G05-F01-1-306"
        },
        { value: "枪会山", address: "上海市普陀区棕榈路" },
        { value: "纵食", address: "元丰天山花园(东门) 双流路267号" },
        { value: "钱记", address: "上海市长宁区天山西路" },
        { value: "壹杯加", address: "上海市长宁区通协路" },
        {
          value: "唦哇嘀咖",
          address: "上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元"
        },
        { value: "爱茜茜里(西郊百联)", address: "长宁区仙霞西路88号1305室" },
        {
          value: "爱茜茜里(近铁广场)",
          address:
            "上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺"
        },
        {
          value: "鲜果榨汁（金沙江路和美广店）",
          address: "普陀区金沙江路2239号金沙和美广场B1-10-6"
        },
        {
          value: "开心丽果（缤谷店）",
          address: "上海市长宁区威宁路天山路341号"
        },
        { value: "超级鸡车（丰庄路店）", address: "上海市嘉定区丰庄路240号" },
        { value: "妙生活果园（北新泾店）", address: "长宁区新渔路144号" },
        { value: "香宜度麻辣香锅", address: "长宁区淞虹路148号" },
        {
          value: "凡仔汉堡（老真北路店）",
          address: "上海市普陀区老真北路160号"
        },
        { value: "港式小铺", address: "上海市长宁区金钟路968号15楼15-105室" },
        { value: "蜀香源麻辣香锅（剑河路店）", address: "剑河路443-1" },
        { value: "北京饺子馆", address: "长宁区北新泾街道天山西路490-1号" },
        {
          value: "饭典*新简餐（凌空SOHO店）",
          address: "上海市长宁区金钟路968号9号楼地下一层9-83室"
        },
        {
          value: "焦耳·川式快餐（金钟路店）",
          address: "上海市金钟路633号地下一层甲部"
        },
        { value: "动力鸡车", address: "长宁区仙霞西路299弄3号101B" },
        { value: "浏阳蒸菜", address: "天山西路430号" },
        { value: "四海游龙（天山西路店）", address: "上海市长宁区天山西路" },
        {
          value: "樱花食堂（凌空店）",
          address: "上海市长宁区金钟路968号15楼15-105室"
        },
        { value: "壹分米客家传统调制米粉(天山店)", address: "天山西路428号" },
        {
          value: "福荣祥烧腊（平溪路店）",
          address: "上海市长宁区协和路福泉路255弄57-73号"
        },
        {
          value: "速记黄焖鸡米饭",
          address: "上海市长宁区北新泾街道金钟路180号1层01号摊位"
        },
        { value: "红辣椒麻辣烫", address: "上海市长宁区天山西路492号" },
        {
          value: "(小杨生煎)西郊百联餐厅",
          address: "长宁区仙霞西路88号百联2楼"
        },
        { value: "阳阳麻辣烫", address: "天山西路389号" },
        {
          value: "南拳妈妈龙虾盖浇饭",
          address: "普陀区金沙江路1699号鑫乐惠美食广场A13"
        }
      ];
    },
    querySearchAsync(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createStateFilter(queryString))
        : restaurants;

      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 3000 * Math.random());
    },
    createStateFilter(queryString) {
      return state => {
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    handleSelect(item) {
      console.log(item);
    },
    activedMenu() {
      let index = this.$route.path;
      if (index.indexOf("/organize/table")>-1) index = "/organize/picture";
      console.log(index)
      return index;
    },
    reload(){
      this.isRouterAlive = false;
      this.$nextTick(res=>{
        this.isRouterAlive = true;
      })
    }
  },
  created() {
    if (this.$route.path === "/login") this.isLoginPage = true;
    else this.getData();
  },
  mounted() {
    this.restaurants = this.loadAll();
  }
};
</script>
<style lang="less">
@import "styles/colors";
.app {
  height: 100%;
  color: @dark;
}
/*头部区域*/
.el-header {
  min-width: 1200px;
  border-bottom: 1px solid #f8f8f8;
  line-height: 50px;
  background: #fff;
  box-shadow: 4px 0px 16px 0px rgba(100, 141, 197, 0.48);
}
.header {
  position: fixed;
  z-index: 11;
  width: 100%;
  .logo {
    width: 86px;
    height: 30px;
    vertical-align: middle;
    margin-right: 70px;
  }
  .company-name {
    font-weight: 500;
    color: @base;
    font-family: PingFangSC-Medium;
  }
}
/* 图片修改 */
.profile-photo {
  @h: 38px;
  width: @h;
  height: @h;
  border-radius: @h;
  margin-right: 150px;
  background: #eee;
}
/* 搜索框 */
.zy-search {
  display: inline-block;
  position: relative;
  .el-button {
    padding: 6px;
  }
  .btn {
    position: absolute;
    right: 3px;
    top: 11.5px;
    color: @ff;
    background-color: @base;
    border-color: @base;
  }
  .input {
    .el-input {
      input {
        width: 320px;
        height: 28px;
        font-size: 14px;
        /*padding-left: 16px;*/
        /*padding-right: 35px;*/
        border: 1px solid @light;
        border-radius: 4px;
      }
    }
  }
}
/*个人信息*/
.zy-info {
  font-size: 0;
  padding: 0 12px 0 21px;
  span.hr {
    width: 1px;
    vertical-align: middle;
    display: inline-block;
    height: 30px;
    background: #d8d8d8;
    margin: 0 19px;
  }
  .el-button {
    vertical-align: middle;
  }
  img.head {
    @h: 38px;
    width: @h;
    height: @h;
    border-radius: @h;
    vertical-align: middle;
  }
  .info {
    display: inline-block;
    font-size: 14px;
    padding-left: 10px;
    vertical-align: middle;
    span {
      display: block;
      line-height: 20px;
    }
    span.tel {
      color: #666;
    }
    span.name {
    }
  }
}
/*内容区域*/
.zy-continer {
  padding-top: 50px;
  .zy-main {
    background: #f5f5f5;
    min-width: 1000px;
    padding: 0;
  }
}
/*左侧树区域*/
.zy-el-aside {
  position: fixed;
  left: 0;
  height: calc(100% - 50px);
  z-index: 5;
  .el-icon-gongzuotai {
    &:before {
      content: "";
      display: inline-block;
      height: 18px;
      width: 18px;
      background: url("./assets/images/icon-gongzuotai-default.png") no-repeat
        center/contain;
    }
  }
  .el-icon-zuzhi {
    &:before {
      content: "";
      display: inline-block;
      height: 18px;
      width: 18px;
      background: url("./assets/images/icon-zuzhi-default.png") no-repeat
        center/contain;
    }
  }
  .el-icon-yuangong {
    &:before {
      content: "";
      display: inline-block;
      height: 18px;
      width: 18px;
      background: url("./assets/images/icon-yuangong-default.png") no-repeat
        center/contain;
    }
  }
  .el-icon-xinzi {
    &:before {
      content: "";
      display: inline-block;
      height: 18px;
      width: 18px;
      background: url("./assets/images/icon-xinzi-default.png") no-repeat
        center/contain;
    }
  }
  .el-icon-fuli {
    &:before {
      content: "";
      display: inline-block;
      height: 18px;
      width: 18px;
      background: url("./assets/images/icon-fuli-default.png") no-repeat
        center/contain;
    }
  }
  .el-icon-tongji {
    &:before {
      content: "";
      display: inline-block;
      height: 18px;
      width: 18px;
      background: url("./assets/images/icon-tongji-default.png") no-repeat
        center/contain;
    }
  }
  .el-icon-shezhi {
    &:before {
      content: "";
      display: inline-block;
      height: 18px;
      width: 18px;
      background: url("./assets/images/icon-shezhi-default.png") no-repeat
        center/contain;
    }
  }
  .is-active {
    .el-icon-gongzuotai {
      &:before {
        background: url("./assets/images/icon-gongzuotai.png") no-repeat
          center/contain;
      }
    }
    .el-icon-zuzhi {
      &:before {
        background: url("./assets/images/icon-zuzhi.png") no-repeat
          center/contain;
      }
    }
    .el-icon-yuangong {
      &:before {
        background: url("./assets/images/icon-yuangong.png") no-repeat
          center/contain;
      }
    }
    .el-icon-xinzi {
      &:before {
        background: url("./assets/images/icon-xinzi.png") no-repeat
          center/contain;
      }
    }
    .el-icon-fuli {
      &:before {
        background: url("./assets/images/icon-fuli.png") no-repeat
          center/contain;
      }
    }
    .el-icon-tongji {
      &:before {
        background: url("./assets/images/icon-tongji.png") no-repeat
          center/contain;
      }
    }
    .el-icon-shezhi {
      &:before {
        background: url("./assets/images/icon-shezhi.png") no-repeat
          center/contain;
      }
    }
  }

  /*树的收缩按钮*/
  .collapse-btn {
    .el-radio {
      position: absolute;
      right: 0;
      top: 290px;
      z-index: 1;
      margin-right: 0;
    }
    .el-radio__input {
      visibility: hidden;
    }
    .el-radio__label{
      /* width: 8px; */
      height: 42px;
      display: inline-block;
      font-size: 10px;
      color: @ff;
      background: @base;
      line-height: 42px;
      text-align: center;
      padding-left: 0;
    }
  }

  /*展开的树*/
  .el-menu {
    border: none;
  }
  .el-menu-wrap {
    padding: 0 8px;
    & > li {
      min-width: 143px;
    }
  }

  //收起来的树
  .el-menu--collapse {
    & > li {
      min-width: auto;
    }
    .is-active {
      background: @base;
    }
  }
  .el-menu-item,
  .el-submenu__title {
    font-size: 14px;
    color: #666;
    height: 50px;
    font-weight: 400;
    line-height: 50px;
  }

  /*选中样式高亮*/
  .el-menu-wrap > .el-menu-item.is-active,
  .el-submenu.is-active.is-opened .el-submenu__title {
    color: #fff;
    z-index: 1;
    background: @base;
    box-shadow: 0px 0px 6px 0px rgba(39, 45, 210, 0.3);
    border-radius: 2px;
  }
  .el-menu-item.is-active {
    color: #333;
    font-weight: 600;
  }
  /*去掉有二级菜单的下拉箭头*/
  .el-icon-arrow-down:before {
    content: "";
  }
  /*二级菜单*/
  .el-submenu .el-menu-item {
    height: 40px;
    line-height: 40px;
    min-width: auto;
    font-size: 13px;
    padding-right: 40px;
    text-align: right;
  }
  /*一级菜单*/
  /*.el-submenu{*/
  /*min-width: 144px;*/
  /*}*/
  .el-main {
    padding: 0;
  }
  /*收缩起来样式*/
  .el-menu--collapse {
    width: 49px;
    padding: 0 4px;
    .el-submenu__title,
    .el-tooltip {
      padding: 0 5px !important;
      text-align: center;
    }
    .el-menu-item {
      padding: 0 !important;
    }
    i.el-icon-menu {
      width: 18px;
    }
  }
  /*收缩起来的二级菜单*/
  .el-menu--vertical .el-menu-item-group > ul {
    /*padding-left: 20px;*/
    li {
      padding-left: 20px !important;
    }
  }
}


</style>
