<template>
    <div class="import-page">
        <!--面包屑及按钮区域-->
        <div class="zy-bg-breadcrumb">
            <div class="menu-area">
                <div class="comm">
                    <el-breadcrumb class="bread" separator="/">
                        <el-breadcrumb-item>
                            <a href="/salary">薪资管理</a>
                        </el-breadcrumb-item>
                        <el-breadcrumb-item>
                            <a href="/salary/history">历史薪资</a>
                        </el-breadcrumb-item>
                        <el-breadcrumb-item>
                            <a>导入历史薪资</a>
                        </el-breadcrumb-item>
                    </el-breadcrumb>
                </div>

            </div>
        </div>
        <div class="import-content">
            <div class="import-wrap">
                <importfile :datas="tableData"></importfile>
                <!--步骤条区域-->
                <!--<div class="step-wrap">-->
                    <!--<el-steps class="steps" :active="active" finish-status="success">-->
                        <!--<el-step title="下载模板/上传文件"></el-step>-->
                        <!--<el-step title="数据解析"></el-step>-->
                        <!--<el-step title="完成导入"></el-step>-->
                    <!--</el-steps>-->
                <!--</div>-->

                <!--选择模板区域-->
                <!--<div class="pick-model">-->
                    <!--<el-table-->
                            <!--:data="tableData"-->
                            <!--border-->
                            <!--height="140"-->
                            <!--style="width: 100%">-->
                        <!--<el-table-column-->
                                <!--prop="date"-->
                                <!--label="固定薪资"-->
                                <!--width="380">-->
                            <!--<template slot-scope="scope">-->
                                <!--<el-checkbox class="import-item" v-model="checked">基本薪资</el-checkbox>-->
                                <!--<el-checkbox class="import-item" v-model="checked">岗位薪资</el-checkbox>-->
                                <!--<el-checkbox class="import-item" v-model="checked">基本薪资</el-checkbox>-->
                                <!--<el-button class="import-btn" @click="onCustom(scope.row)"><i class="el-icon-plus"></i>自定义</el-button>-->
                            <!--</template>-->
                        <!--</el-table-column>-->
                        <!--<el-table-column-->
                                <!--prop="name"-->
                                <!--label="浮动薪资"-->
                                <!--width="380">-->
                            <!--<template slot-scope="scope">-->
                                <!--<el-checkbox class="import-item" v-model="checked">基本薪资</el-checkbox>-->
                                <!--<el-checkbox class="import-item" v-model="checked">岗位薪资</el-checkbox>-->
                                <!--<el-checkbox class="import-item" v-model="checked">基本薪资</el-checkbox>-->
                                <!--<el-button class="import-btn"><i class="el-icon-plus"></i>自定义</el-button>-->
                            <!--</template>-->
                        <!--</el-table-column>-->
                        <!--<el-table-column-->
                                <!--prop="address"-->
                                <!--label="津补贴"-->
                                <!--width="380">-->
                            <!--<template slot-scope="scope">-->
                                <!--<el-checkbox class="import-item" v-model="checked">基本薪资</el-checkbox>-->
                                <!--<el-checkbox class="import-item" v-model="checked">岗位薪资</el-checkbox>-->
                                <!--<el-checkbox class="import-item" v-model="checked">基本薪资</el-checkbox>-->
                                <!--<el-button class="import-btn"><i class="el-icon-plus"></i>自定义</el-button>-->
                            <!--</template>-->
                        <!--</el-table-column>-->
                        <!--<el-table-column-->
                                <!--prop="address"-->
                                <!--label="薪资扣减项"-->
                                <!--width="380">-->
                            <!--<template slot-scope="scope">-->
                                <!--<el-checkbox class="import-item" v-model="checked">基本薪资</el-checkbox>-->
                                <!--<el-checkbox class="import-item" v-model="checked">岗位薪资</el-checkbox>-->
                                <!--<el-checkbox class="import-item" v-model="checked">基本薪资</el-checkbox>-->
                                <!--<el-button class="import-btn"><i class="el-icon-plus"></i>自定义</el-button>-->
                            <!--</template>-->
                        <!--</el-table-column>-->
                        <!--<el-table-column-->
                                <!--prop="address"-->
                                <!--label="社保缴纳项"-->
                                <!--width="380">-->
                            <!--<template slot-scope="scope">-->
                                <!--<el-checkbox class="import-item" v-model="checked">基本薪资</el-checkbox>-->
                                <!--<el-checkbox class="import-item" v-model="checked">岗位薪资</el-checkbox>-->
                                <!--<el-checkbox class="import-item" v-model="checked">基本薪资</el-checkbox>-->
                                <!--<el-button class="import-btn"><i class="el-icon-plus"></i>自定义</el-button>-->
                            <!--</template>-->
                        <!--</el-table-column>-->
                        <!--<el-table-column-->
                                <!--prop="address"-->
                                <!--label="公积金缴纳项"-->
                                <!--width="380">-->
                            <!--<template slot-scope="scope">-->
                                <!--<el-checkbox class="import-item" v-model="checked">基本薪资</el-checkbox>-->
                                <!--<el-checkbox class="import-item" v-model="checked">岗位薪资</el-checkbox>-->
                                <!--<el-checkbox class="import-item" v-model="checked">基本薪资</el-checkbox>-->
                                <!--<el-button class="import-btn"><i class="el-icon-plus"></i>自定义</el-button>-->
                            <!--</template>-->
                        <!--</el-table-column>-->
                    <!--</el-table>-->
                <!--</div>-->

                <!--上传区域-->
                <!--<div class="file-upload">-->
                    <!--<p class="down-file-area">请先<a class="down-file" href="">下载模板</a>，完善模板内容后上传</p>-->
                    <!--<div>-->
                        <!--<el-upload-->
                                <!--class="upload-import"-->
                                <!--action="https://jsonplaceholder.typicode.com/posts/"-->
                                <!--:on-preview="handlePreview"-->
                                <!--:on-remove="handleRemove"-->
                                <!--:before-remove="beforeRemove"-->
                                <!--:multiple="false"-->
                                <!--:limit="1"-->
                                <!--:on-exceed="handleExceed"-->
                                <!--:file-list="fileList">-->
                            <!--<el-input v-model="fileList[0].name" class="uploat-show-input"></el-input>-->
                            <!--<el-button class="btn-upload" size="small">选择文件</el-button>-->
                            <!--<el-button class="next-step" slot="tip" type="primary" size="small">下一步</el-button>-->
                        <!--</el-upload>-->
                    <!--</div>-->
                    <!--<p class="upload-tips">文件表头有误，请核对后重新上传</p>-->
                <!--</div>-->
            </div>
        </div>

        <!--弹框区域-->
        <!--<el-dialog class="zy-dialog-pub zy-dialog-pub-large custom-item" title="自定义公积金缴纳项" :visible.sync="isShowCustom">-->
            <!--<div class="head-body">-->
                <!--<div v-for="(itemname,$index) in itemnameList" class="item">-->
                    <!--<span>缴纳项名称：</span>-->
                    <!--<el-input v-model="itemname.planname" placeholder="请输入"></el-input>-->
                    <!--<el-button class="dia-btn-add-custom" v-if="itemnameList.length-1 == $index" icon="el-icon-plus" @click="handleContinueAdd">继续添加</el-button>-->
                <!--</div>-->
                <!--<div slot="footer" class="dialog-footer t-c">-->
                    <!--<el-button class="button default-button" @click="isShowCustom = false">取 消</el-button>-->
                    <!--<el-button type="primary" class="blue-button" @click="handleCustom">确 定</el-button>-->
                <!--</div>-->
            <!--</div>-->
        <!--</el-dialog>-->
    </div>
</template>
<script>
    import importfile from '../../../components/importFile'
    export default {
        components:{
            importfile
        },
        data(){
            return{
                checked:true,
                active:0,
                fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
                tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }],

                // 自定义弹框
                isShowCustom:false,
                dialogAddType:'0',
                itemnameList:[{
                    planname:''
                }],
            }
        },
        methods:{
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            },
            //确认自定义缴纳项
            handleCustom(){

            },
            // 继续添加
            handleContinueAdd(){
                this.itemnameList.push({
                    planname:''
                })
            },
            // 添加更多薪资项
            onAddMoreItem(type){
                this.dialogAddType = type;
                this.itemnameList = [{planname:''}]
                this.isShowAddItem = true;
            },
            //点击自定义按钮
            onCustom(item){
                console.log(item);
                this.isShowCustom = true;
            }
        }
    }
</script>
<style lang="less" scoped>
    @import "../../../styles/colors";
    .import-page{
        position: relative;
        padding: 68px 20px;
        .import-content{
            position: relative;
            background:@ff;
            padding: 30px;
            box-shadow:2px 0px 16px 0px rgba(3,33,136,0.2);
            border-radius:4px;
        }
        .import-wrap{
            width: 720px;
            margin: 0 auto;
            .steps{
                padding: 38px 65px;
                /deep/.el-step__head.is-success{
                    border-color: @stepcolor;
                    color: @stepcolor;
                }
                /deep/.el-step__title.is-success{
                    color: @stepcolor;
                    font-size: 14px;
                }
                /deep/.el-step__title.is-process,/deep/.el-step__head.is-process,/deep/.el-step__title.is-wait,/deep/.el-step__head.is-wait{
                    color: @middle;
                    border-color: @middle;
                    font-weight: normal;
                    font-size: 14px;
                }
                /deep/.el-step__icon{
                    width: 20px;
                    height: 20px;
                    font-size: 13px;
                }
            }
            .pick-model{
                .import-item{
                    margin-right: 10px;
                    //选中方块
                    /deep/.el-checkbox__inner{
                        width:20px;
                        height:20px;
                        border-radius:4px;
                        border: 1px solid #999;
                    }
                    /deep/.el-checkbox__input.is-checked .el-checkbox__inner, /deep/.el-checkbox__input.is-indeterminate .el-checkbox__inner{
                        background: @base;
                        border: 1px solid @base;
                    }
                    /deep/.el-checkbox__input.is-indeterminate .el-checkbox__inner::before{
                        content: '';
                        position: absolute;
                        display: block;
                        background-color: #fff;
                        height: 10px;
                        width: 10px;
                        left: 50%;
                        top:50%;
                        transform: translate(-50%,-50%);
                    }
                    /deep/.el-checkbox__inner::after{
                        width: 6px;
                        height: 12px;
                        left: 5px;
                    }
                    //总选中按钮
                    /deep/.is-indeterminate{
                        .el-checkbox__inner{
                            background: @base;
                        }
                    }
                    /deep/.el-checkbox__label{
                        font-size: 13px;
                        color: @base;
                    }
                }
                .import-btn{
                    font-size: 13px;
                    border: 0;
                    background: transparent
                }
                /deep/.el-table{
                    th{
                        background: #f7f7f7;
                        padding: 8px 0;
                    }
                    .el-table__body{
                        height: 100%;
                    }
                }
            }
            .file-upload{
                text-align: center;
                background: #fafafa;
                padding: 70px 0 38px;
                margin-top: 20px;
                .down-file-area,.upload-tips{
                    line-height: 1;
                    margin-bottom: 24px;
                }
                .down-file-area{
                    font-size: 13px;
                    color: #000;
                    a.down-file{
                        color: @base;
                        text-decoration: underline;
                    }
                }
                .upload-tips{
                    font-size: 13px;
                    color: @redcolor;
                    margin-top: 24px;
                }
                .uploat-show-input{
                    width: 180px;
                    /deep/.el-input__inner{
                        height: 30px;
                        line-height: 30px;
                    }
                }
                .upload-import{
                    .next-step{
                        background: @base;
                    }
                    .btn-upload,.next-step{
                        width: 80px;
                    }
                    .uploat-show-input,.btn-upload,.next-step{
                        margin-left: 10px;
                    }
                    /deep/.el-upload-list{
                        display: none;
                    }
                }
            }
        }

        /*弹框区域*/
        .custom-item{
            .el-input{
                width: 300px;
            }
            /deep/.el-input__inner{
                @h:30px;
                height: @h;
                line-height: @h;
            }
            .dia-btn-add-custom{
                font-size: 13px;
            }
            .item{
                margin-bottom: 20px;
            }
        }
    }
</style>