<template>
    <div class="set-auth">
        <!--面包屑及按钮区域-->
        <div class="zy-bg-breadcrumb">
            <div class="menu-area">
                <div class="comm">
                    <el-breadcrumb class="bread" separator="/">
                        <el-breadcrumb-item>
                            <a href="/setting">薪资管理</a>
                        </el-breadcrumb-item>
                        <el-breadcrumb-item>
                            <a>权限配置</a>
                        </el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
            </div>
        </div>
        <div class="sets">
            <h6 class="set">角色：薪资专员</h6>
            <div class="sets-table-wrap">
                <el-table
                        :data="tableData"
                        style="width: 100%">
                    <el-table-column
                            prop="date"
                            label="日期"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="姓名"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="address"
                            label="地址">
                    </el-table-column>
                </el-table>
                <table>
                    <tr>
                        <td>
                            <ul>
                                <li>
                                    一级菜单
                                </li>
                                <li>
                                    二级菜单
                                </li>
                                <li>
                                    三级菜单
                                </li>
                                <li>
                                    功能点
                                </li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <ul>
                                <li>
                                    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">组织规划</el-checkbox>
                                </li>
                                <li>
                                    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                                        <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                                    </el-checkbox-group>
                                </li>
                            </ul>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
    const cityOptions = ['上海', '北京', '广州', '深圳'];
    export default {
        data() {
            return{
                tableData:[],
                checkAll: false,
                checkedCities: ['上海', '北京'],
                cities: cityOptions,
                isIndeterminate: true
            }
        },
        methods: {
            handleCheckAllChange(val) {
                this.checkedCities = val ? cityOptions : [];
                this.isIndeterminate = false;
            },
            handleCheckedCitiesChange(value) {
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.cities.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
            }
        }
    }
</script>
<style lang="less" scoped>
    @import "../../../styles/colors";
    .set-auth{
        position: relative;
        padding: 68px 20px;
        .sets{
            position: relative;
            background:@ff;
            padding: 30px;
            box-shadow:2px 0px 16px 0px rgba(3,33,136,0.2);
            border-radius:4px;
            background: @ff;
            .sets-table-wrap{

            }
        }
    }
</style>