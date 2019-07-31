<template>
    <div class="department">
        <el-breadcrumb separator="/" style="margin-bottom: 10px;">
            <el-breadcrumb-item>统计报表</el-breadcrumb-item>
            <el-breadcrumb-item>部门人员统计</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="department_main">
            <p @click="chart" style="cursor: pointer;"><span>＜</span> &nbsp;返回</p>
            <div class="block">
                <div style="margin:10px 0 31px 0;">
                    <span class="demonstration">年度：</span>
                    <el-date-picker v-model="form" type="date" placeholder="选择日期">
                    </el-date-picker>
                    <span class="demonstration">部门：</span>
                    <el-select v-model="value" placeholder="请选择">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div id="myChart" style="width:600px; height: 400px;"></div>
            </div>
            <div id="Chart" style="width:600px; height: 400px; padding:30px 31px;"></div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                form: '',
                options: [{
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }, {
                    value: '选项3',
                    label: '蚵仔煎'
                }, {
                    value: '选项4',
                    label: '龙须面'
                }, {
                    value: '选项5',
                    label: '北京烤鸭'
                }],
                value: ''
            }
        },
        methods: {
            chart() {
                this.$router.push("/statement");
            },
            drawLine() {
                let myChart = this.$echarts.init(document.getElementById('myChart'))
                myChart.setOption({
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        x: 'left',
                        data: ['直达', '营销广告', '搜索引擎', '邮件营销', '联盟广告', '视频广告', '百度', '谷歌', '必应', '其他']
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            mark: { show: true },
                            dataView: { show: true, readOnly: false },
                            magicType: {
                                show: true,
                                type: ['pie', 'funnel']
                            },
                            restore: { show: true },
                            saveAsImage: { show: true }
                        }
                    },
                    calculable: false,
                    series: [
                        {
                            name: '访问来源',
                            type: 'pie',
                            selectedMode: 'single',
                            radius: [0, 70],

                            // for funnel
                            x: '20%',
                            width: '40%',
                            funnelAlign: 'right',
                            max: 1548,

                            itemStyle: {
                                normal: {
                                    label: {
                                        position: 'inner'
                                    },
                                    labelLine: {
                                        show: false
                                    }
                                }
                            },
                            data: [
                                { value: 335, name: '直达' },
                                { value: 679, name: '营销广告' },
                                { value: 1548, name: '搜索引擎', selected: true }
                            ]
                        },
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius: [100, 140],

                            // for funnel
                            x: '60%',
                            width: '35%',
                            funnelAlign: 'left',
                            max: 1048,

                            data: [
                                { value: 335, name: '直达' },
                                { value: 310, name: '邮件营销' },
                                { value: 234, name: '联盟广告' },
                                { value: 135, name: '视频广告' },
                                { value: 1048, name: '百度' },
                                { value: 251, name: '谷歌' },
                                { value: 147, name: '必应' },
                                { value: 102, name: '其他' }
                            ]
                        }
                    ], 
                })
            }
            
        },
        mounted() {
            this.drawLine();
        }

    }
</script>


<style lang="less" scoped>
    @import 'index';

    .department_main {
        background: white;
        margin: 0 27px 18px;
        box-shadow: 2px 0px 16px 0px rgba(3, 33, 136, 0.2);
        border-radius: 4px;
    }
</style>