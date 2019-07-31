<template>
    <div class="stru">
        <!--面包屑及按钮区域-->
        <div class="zy-bg-breadcrumb">
            <div class="menu-area">
                <div class="comm">
                    <el-breadcrumb class="bread" separator="/">
                        <el-breadcrumb-item>
                            <a href="">组织规划</a>
                        </el-breadcrumb-item>
                        <el-breadcrumb-item>
                            <a>组织架构</a>
                        </el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
            </div>
        </div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane v-for="tap in taps" :key="tap.name" :label="tap.label" :name="tap.name">
                <!--组织架构图区域-->
                <router-view v-if="tap.name==activeName"/>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                activeName: 'picture',
                taps:[{
                    label:'组织架构图',
                    name:'picture'
                },{
                    label:'组织管理',
                    name:'table'
                }]
            }
        },
        methods:{
            handleClick(tab,event){
                    this.$router.push({
                        path:tab.name
                    })
            }
        },
        created:function(){
            this.activeName = this.taps.find(f=> this.$route.path.indexOf(f.name)!=-1).name;
            console.log(this.activeName);
        }
    }
</script>

<style lang="less">
    @import "../../../styles/colors";
    .stru{
        position: relative;
        padding: 68px 20px;
        .el-tabs{
            position: relative;
            background:@ff;
            padding: 30px;
            box-shadow:2px 0px 16px 0px rgba(3,33,136,0.2);
            border-radius:4px;
        }
        .el-tabs__item{
            font-size: 13px;
        }
        .el-tabs__item.is-active{
            color: @base;
        }
        .el-tabs__item:hover {
            color: @base;
            cursor: pointer;
        }
        .el-tabs__active-bar{
            background: @base;
        }
        .el-table__header{
            th{
                font-size: 13px;
            }
        }
    }

</style>
