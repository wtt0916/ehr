<template>
    <div class="zy-company-info">
        <!--面包屑及按钮区域-->
        <div class="zy-bg-breadcrumb">
            <div class="menu-area">
                <div class="comm">
                    <el-breadcrumb class="bread" separator="/">
                        <el-breadcrumb-item>
                            <a href="/setting">薪资管理</a>
                        </el-breadcrumb-item>
                        <el-breadcrumb-item>
                            <a>薪资方案</a>
                        </el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
            </div>
        </div>
        <div class="company-info">
            <h6 class="set">企业信息</h6>
            <div class="info">
                <el-button v-show="!isEdit" class="edit-button" icon="el-icon-edit-outline" @click="isEdit=true">修改信息</el-button>
                <div class="save-area" v-show="isEdit">
                    <el-button class="blue-button save-button" @click="handleSave">保存</el-button>
                    <el-button class="button default button cancel-button" @click="isEdit=false">取消</el-button>
                </div>
                <div class="logo">
                    <img src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1986179278,1118313821&fm=27&gp=0.jpg" alt="">
                </div>
                <div class="info-table-wrap" v-show="!isEdit">
                    <table>
                        <tr>
                            <td>企业名称：{{info.companyName}}</td>
                        </tr>
                        <tr>
                            <td>公司人数：{{info.num?info.num:'-'}}</td>
                            <!--<td>联系人：{{info.concat?info.concat:'-'}}</td>-->
                        </tr>
                        <tr>
                            <td>所属行业：{{info.industry?info.industry:'-'}}</td>
                            <!--<td>联系电话：{{info.tel?info.tel:'-'}}</td>-->
                        </tr>
                        <tr>
                            <td>所在地区：{{info.province}}-{{info.city}}</td>
                            <!--<td>联系邮箱：{{info.email?info.email:'-'}}</td>-->
                        </tr>
                        <tr>
                            <td>详细地址：{{info.addr?info.addr:'-'}}</td>
                        </tr>
                    </table>
                </div>
                <!--编辑状态-->
                <div class="info-edit-table-wrap" v-show="isEdit">
                    <table>
                        <tr>
                            <td>
                                企业名称：{{info.companyName}}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="border">
                                    <span class="left">公司人数：</span>
                                    <!--<p>{{info.num}}</p>-->
                                    <p>
                                        <el-select v-model="info.num" placeholder="请选择">
                                            <el-option
                                                    v-for="item in info.numList"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </p>
                                </div>
                            </td>
                            <!--<td>-->
                                <!--<div class="border ml39">-->
                                    <!--<span class="left">联系人：</span>-->
                                    <!--<p>-->
                                        <!--<el-input v-model="info.concat" placeholder="请输入"></el-input>-->
                                        <!--&lt;!&ndash;{{info.concat}}&ndash;&gt;-->
                                    <!--</p>-->
                                <!--</div>-->
                            <!--</td>-->
                        </tr>
                        <tr>
                            <td>
                                <div class="border">
                                    <span class="left">所属行业：</span>
                                    <p>
                                        <el-select v-model="info.industry" placeholder="请选择">
                                            <el-option
                                                    v-for="item in info.numList"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </p>
                                </div>
                            </td>
                            <!--<td>-->
                                <!--<div class="border ml39">-->
                                    <!--<span class="left">联系电话：</span>-->
                                    <!--<p>-->
                                        <!--<el-input v-model="info.tel" placeholder="请输入"></el-input>-->
                                    <!--</p>-->
                                <!--</div>-->
                            <!--</td>-->
                        </tr>
                        <tr>
                            <td>
                                <div class="border">
                                    <span class="left">所在地区：</span>
                                    <p>
                                        <el-cascader
                                                :options="options"
                                                v-model="selectedOptions"
                                                @change="handleChange">
                                        </el-cascader>
                                    </p>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <!--<td>-->
                                <!--<div class="border">-->
                                    <!--<span class="left">联系邮箱：</span>-->
                                    <!--<p>-->
                                        <!--<el-input v-model="info.email" placeholder="请输入"></el-input>-->
                                    <!--</p>-->
                                <!--</div>-->
                            <!--</td>-->
                            <td>
                                <div class="border">
                                    <span class="left">详细地址：</span>
                                    <p>
                                        <el-input v-model="info.addr" placeholder="请输入"></el-input>
                                    </p>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import cityList from './city';
export default {
    data(){
        return {
            info:{},
            isEdit:true,

            concat:'',
            value:'',

            options: [{
                value: 'zhinan',
                label: '指南',
                children: [{
                    value: 'shejiyuanze',
                    label: '设计原则',
                    children: [{
                        value: 'yizhi',
                        label: '一致'
                    }, {
                        value: 'fankui',
                        label: '反馈'
                    }, {
                        value: 'xiaolv',
                        label: '效率'
                    }, {
                        value: 'kekong',
                        label: '可控'
                    }]
                }, {
                    value: 'daohang',
                    label: '导航',
                    children: [{
                        value: 'cexiangdaohang',
                        label: '侧向导航'
                    }, {
                        value: 'dingbudaohang',
                        label: '顶部导航'
                    }]
                }]
            }, {
                value: 'zujian',
                label: '组件',
                children: [{
                    value: 'basic',
                    label: 'Basic',
                    children: [{
                        value: 'layout',
                        label: 'Layout 布局'
                    }, {
                        value: 'color',
                        label: 'Color 色彩'
                    }, {
                        value: 'typography',
                        label: 'Typography 字体'
                    }, {
                        value: 'icon',
                        label: 'Icon 图标'
                    }, {
                        value: 'button',
                        label: 'Button 按钮'
                    }]
                }, {
                    value: 'form',
                    label: 'Form',
                    children: [{
                        value: 'radio',
                        label: 'Radio 单选框'
                    }, {
                        value: 'checkbox',
                        label: 'Checkbox 多选框'
                    }, {
                        value: 'input',
                        label: 'Input 输入框'
                    }, {
                        value: 'input-number',
                        label: 'InputNumber 计数器'
                    }, {
                        value: 'select',
                        label: 'Select 选择器'
                    }, {
                        value: 'cascader',
                        label: 'Cascader 级联选择器'
                    }, {
                        value: 'switch',
                        label: 'Switch 开关'
                    }, {
                        value: 'slider',
                        label: 'Slider 滑块'
                    }, {
                        value: 'time-picker',
                        label: 'TimePicker 时间选择器'
                    }, {
                        value: 'date-picker',
                        label: 'DatePicker 日期选择器'
                    }, {
                        value: 'datetime-picker',
                        label: 'DateTimePicker 日期时间选择器'
                    }, {
                        value: 'upload',
                        label: 'Upload 上传'
                    }, {
                        value: 'rate',
                        label: 'Rate 评分'
                    }, {
                        value: 'form',
                        label: 'Form 表单'
                    }]
                }, {
                    value: 'data',
                    label: 'Data',
                    children: [{
                        value: 'table',
                        label: 'Table 表格'
                    }, {
                        value: 'tag',
                        label: 'Tag 标签'
                    }, {
                        value: 'progress',
                        label: 'Progress 进度条'
                    }, {
                        value: 'tree',
                        label: 'Tree 树形控件'
                    }, {
                        value: 'pagination',
                        label: 'Pagination 分页'
                    }, {
                        value: 'badge',
                        label: 'Badge 标记'
                    }]
                }, {
                    value: 'notice',
                    label: 'Notice',
                    children: [{
                        value: 'alert',
                        label: 'Alert 警告'
                    }, {
                        value: 'loading',
                        label: 'Loading 加载'
                    }, {
                        value: 'message',
                        label: 'Message 消息提示'
                    }, {
                        value: 'message-box',
                        label: 'MessageBox 弹框'
                    }, {
                        value: 'notification',
                        label: 'Notification 通知'
                    }]
                }, {
                    value: 'navigation',
                    label: 'Navigation',
                    children: [{
                        value: 'menu',
                        label: 'NavMenu 导航菜单'
                    }, {
                        value: 'tabs',
                        label: 'Tabs 标签页'
                    }, {
                        value: 'breadcrumb',
                        label: 'Breadcrumb 面包屑'
                    }, {
                        value: 'dropdown',
                        label: 'Dropdown 下拉菜单'
                    }, {
                        value: 'steps',
                        label: 'Steps 步骤条'
                    }]
                }, {
                    value: 'others',
                    label: 'Others',
                    children: [{
                        value: 'dialog',
                        label: 'Dialog 对话框'
                    }, {
                        value: 'tooltip',
                        label: 'Tooltip 文字提示'
                    }, {
                        value: 'popover',
                        label: 'Popover 弹出框'
                    }, {
                        value: 'card',
                        label: 'Card 卡片'
                    }, {
                        value: 'carousel',
                        label: 'Carousel 走马灯'
                    }, {
                        value: 'collapse',
                        label: 'Collapse 折叠面板'
                    }]
                }]
            }, {
                value: 'ziyuan',
                label: '资源',
                children: [{
                    value: 'axure',
                    label: 'Axure Components'
                }, {
                    value: 'sketch',
                    label: 'Sketch Templates'
                }, {
                    value: 'jiaohu',
                    label: '组件交互文档'
                }]
            }],
            selectedOptions: [],
            selectedOptions2: []
        }
    },
    methods:{
        getData(){
            this.$http
                .get('/api/getCompanyInfo.json')
                .then(res=>{
                    const data = res.content;
                    this.info = data;
                })
        },
        handleEdit(){
            this.isEdit = true;
        },
        handleSave(){},
        handleChange(){

        }
    },
    created(){
        this.getData()
        console.log(cityList);
    }
}
</script>
<style lang="less">
    @import "../../styles/colors";
    .zy-company-info{
        position: relative;
        padding: 68px 20px;
        .company-info{
            position: relative;
            background:@ff;
            padding: 30px;
            box-shadow:2px 0px 16px 0px rgba(3,33,136,0.2);
            border-radius:4px;
            .info{
                position: relative;
                overflow: hidden;
                padding-top: 13px;
                font-size:13px;
                .edit-button{
                    position: absolute;
                    right: 0;
                    top: 20px;
                    border: 0;
                    font-size: 12px;
                    color: #666;
                    font-weight: normal;
                }
                .save-area{
                    position: absolute;
                    top: 20px;
                    right: 0;
                    button{
                        padding: 7px 17px;
                    }
                }
                .logo{
                    float: left;
                    margin-right: 40px;
                    padding-top: 10px;
                    img{
                        width: 200px;
                        height: 100px;
                    }
                }
                .info-table-wrap{
                    float: left;
                    font-weight:400;
                    color:#666;
                    td{
                        line-height: 2;
                        padding: 0 60px 0 20px;
                    }
                }
                .info-edit-table-wrap{
                    color: #999;
                    .border{
                        border-radius:2px;
                        border: 1px solid #999;
                        padding: 0 10px;
                        line-height: 1.3;
                        width: 272px;
                        margin-top: 10px;
                        span.left{
                            border-right: 1px solid #999;
                            color: #333;
                            min-width: 85px;
                            display: inline-block;
                        }
                        p{
                            display: inline-block;
                            margin: 0;
                            .el-input__inner{
                                border: 0;
                                text-align: center;
                                /*height: 15px;*/
                                /*line-height: 15px;*/
                                font-size: 13px;
                                color: #999;
                                padding-right: 0;
                            }
                            .el-input__suffix{
                                right: auto;
                            }
                        }
                    }
                    .ml39{
                        margin-left: 39px;
                    }
                }
            }
        }
    }
</style>