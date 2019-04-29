<template>
  <div id="system">
    <!-- 菜单栏 -->
    <div class="menu" >
      <el-row class="tac">
        <!-- <el-col :span="12">
          <h5>默认颜色</h5>
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>导航一</span>
              </template>
              <el-menu-item-group>
                <template slot="title">分组一</template>
                <el-menu-item index="1-1">选项1</el-menu-item>
                <el-menu-item index="1-2">选项2</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="分组2">
                <el-menu-item index="1-3">选项3</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="1-4">
                <template slot="title">选项4</template>
                <el-menu-item index="1-4-1">选项1</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-menu-item index="2">
              <i class="el-icon-menu"></i>
              <span slot="title">导航二</span>
            </el-menu-item>
            <el-menu-item index="3" disabled>
              <i class="el-icon-document"></i>
              <span slot="title">导航三</span>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-setting"></i>
              <span slot="title">导航四</span>
            </el-menu-item>
          </el-menu>
        </el-col>-->
        <el-col :style="back">
          <h5>Logo&Name</h5>
          <img src="../assets/menuLine.png" alt="">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#7690C7"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>工作台</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1">选项1</el-menu-item>
                <el-menu-item index="1-2">选项2</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="分组2">
                <el-menu-item index="1-3">选项3</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="1-4">
                <template slot="title">选项4</template>
                <el-menu-item index="1-4-1">选项1</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-menu-item index="2">
              <i class="el-icon-menu"></i>
              <span slot="title">导航二</span>
            </el-menu-item>
            <el-menu-item index="3" disabled>
              <i class="el-icon-document"></i>
              <span slot="title">导航三</span>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-setting"></i>
              <span slot="title">导航四</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </div>
    <!-- 菜单信息 -->
    <div id="menuMess">
      <!-- 公共 -->
      <div class="comm"></div>
      <!-- 主要内容（介绍及信息） -->
      <div id="main">
        <!-- 信息介绍 XXXX -->
        <div class="introduce"></div>
        <!-- 信息内容 -->
        <div class="message"></div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      back: {
        backgroundImage: "url(" + require("../assets/menubg.png") + ")"
      }
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>


<style scoped>
#system {
  width: 1405px;
  height: 855px;
  margin-top: 20px;
  border: 1px solid #e4e4e4;
}
.menu{
  text-align: center;
}
h5 {
  text-align: center;
  font-size: 15px;
  color: white;
  font-weight:normal;
  /* background: red; */
  margin-top: 30px;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}
.el-col{
  width: 179px;
  height: 855px;
}
.el-menu-item{
  min-width: 0;
}
</style>