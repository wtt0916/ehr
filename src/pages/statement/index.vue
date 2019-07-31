<template>
    <div id="diagram">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>统计报表</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="diagram_main">
            <div class="plan">
                <h3>组织规划</h3>
                <span @click="$router.push('/departmentStaff')">部门人员统计</span>
            </div>
            <div class="staff">
                <h3>员工管理</h3>
                <span @click="$router.push('/staffComposition')">人员构成分析</span>
            </div>
            <div class="welfare">
                <h3>薪资福利管理</h3>
                <span @click="$router.push('/salaryAnalysis')">薪资分析</span>
                <span @click="$router.push('/welfareAnalysis')">福利分析</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        data(){
            return{
                
            }
        }
    }
</script>

<style lang="less" scoped>
    @import 'index';

    .diagram_main {
        div {
            cursor: pointer;
        }

        div span:hover {
            background: rgba(255, 255, 255, 1);
            box-shadow: 0px 1px 17px 0px rgba(54, 78, 159, 0.29);
            transform: translate3d(0, -3px, 0);
        }

        h3 {
            font-size: 15px;
        }

        span {
            display: block;
            width: 270px;
            height: 100px;
            border: 1px solid #C9C9C9;
            text-align: center;
            line-height: 100px;
        }

        .welfare span {
            display: inline-block;
            margin-right: 30px;
        }
    }
</style>