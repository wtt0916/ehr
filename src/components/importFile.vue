<template>
    <div class="import-file">
        <!--步骤条区域-->
        <div class="step-wrap">
            <el-steps class="steps" :active="active">
                <el-step title="下载模板/上传文件"></el-step>
                <el-step title="数据解析"></el-step>
                <el-step title="完成导入"></el-step>
            </el-steps>
        </div>

        <!--第一步-->
        <template v-if="active==1">
            <!--选择模板区域-->
            <div class="pick-model">
                <el-table
                        :data="datas"
                        border
                        height="140"
                        style="width: 100%">
                    <el-table-column
                            prop="date"
                            label="固定薪资"
                            width="380">
                        <template slot-scope="scope">
                            <el-checkbox class="import-item" v-model="checked">基本薪资</el-checkbox>
                            <el-checkbox class="import-item" v-model="checked">岗位薪资</el-checkbox>
                            <el-checkbox class="import-item" v-model="checked">基本薪资</el-checkbox>
                            <el-button class="import-btn" @click="onCustom(scope.row)"><i class="el-icon-plus"></i>自定义</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="浮动薪资"
                            width="380">
                        <template slot-scope="scope">
                            <el-checkbox class="import-item" v-model="checked">基本薪资</el-checkbox>
                            <el-checkbox class="import-item" v-model="checked">岗位薪资</el-checkbox>
                            <el-checkbox class="import-item" v-model="checked">基本薪资</el-checkbox>
                            <el-button class="import-btn"><i class="el-icon-plus"></i>自定义</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="address"
                            label="津补贴"
                            width="380">
                        <template slot-scope="scope">
                            <el-checkbox class="import-item" v-model="checked">基本薪资</el-checkbox>
                            <el-checkbox class="import-item" v-model="checked">岗位薪资</el-checkbox>
                            <el-checkbox class="import-item" v-model="checked">基本薪资</el-checkbox>
                            <el-button class="import-btn"><i class="el-icon-plus"></i>自定义</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="address"
                            label="薪资扣减项"
                            width="380">
                        <template slot-scope="scope">
                            <el-checkbox class="import-item" v-model="checked">基本薪资</el-checkbox>
                            <el-checkbox class="import-item" v-model="checked">岗位薪资</el-checkbox>
                            <el-checkbox class="import-item" v-model="checked">基本薪资</el-checkbox>
                            <el-button class="import-btn"><i class="el-icon-plus"></i>自定义</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="address"
                            label="社保缴纳项"
                            width="380">
                        <template slot-scope="scope">
                            <el-checkbox class="import-item" v-model="checked">基本薪资</el-checkbox>
                            <el-checkbox class="import-item" v-model="checked">岗位薪资</el-checkbox>
                            <el-checkbox class="import-item" v-model="checked">基本薪资</el-checkbox>
                            <el-button class="import-btn"><i class="el-icon-plus"></i>自定义</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="address"
                            label="公积金缴纳项"
                            width="380">
                        <template slot-scope="scope">
                            <el-checkbox class="import-item" v-model="checked">基本薪资</el-checkbox>
                            <el-checkbox class="import-item" v-model="checked">岗位薪资</el-checkbox>
                            <el-checkbox class="import-item" v-model="checked">基本薪资</el-checkbox>
                            <el-button class="import-btn"><i class="el-icon-plus"></i>自定义</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>

            <!--上传区域-->
            <div class="file-upload">
                <p class="down-file-area">请先<a class="down-file" href="">下载模板</a>，完善模板内容后上传</p>
                <div>
                    <el-upload
                            ref="uploadfile"
                            class="upload-import"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :on-success="handleSuccess"
                            :on-progress="handleProcess"
                            :on-change="handleChange"
                            :on-error="handleError"
                            :on-exceed="handleExceed"
                            :before-remove="beforeRemove"
                            :multiple="false"
                    >
                        <el-input v-model="fileList[0].name" class="uploat-show-input"></el-input>
                        <el-button class="btn-upload" size="small">选择文件</el-button>
                        <el-button v-if="isUploading" class="next-step" slot="tip" type="primary" size="small">上传中<i class="el-icon-loading"></i></el-button>
                        <el-button v-if="isShowNextBtn" class="next-step" slot="tip" type="primary" size="small" @click="onNext">下一步</el-button>
                    </el-upload>
                </div>
                <p class="upload-tips" v-show="isShowUploadTip">{{uploadTip}}</p>
            </div>
        </template>

        <!--第二步-->
        <template v-if="active==2">
            <div>数据解析中...</div>
        </template>

        <!--第三步-->
        <template v-if="active==3">
            <div class="upload-success-wrap t-c">
                <div class="icon-su el-icon-success"></div>
                <h4>导入成功</h4>
                <p class="su su-info">本次成功导入81条数据</p>
                <p class="su-wrong-info-wrap">
                    <span class="su su-wrong-info">另有2条错误数据未导入成功，</span>
                    <el-link type="primary">下载错误链接</el-link>
                </p>
                <el-button class="btn-cb button blue-button">{{btnSuccessCb}}</el-button>
            </div>
        </template>

        <!--弹框区域-->
        <el-dialog class="zy-dialog-pub zy-dialog-pub-large custom-item" title="自定义公积金缴纳项" :visible.sync="isShowCustom">
            <div class="head-body">
                <div v-for="(itemname,$index) in itemnameList" class="item">
                    <span>缴纳项名称：</span>
                    <el-input class="name" v-model="itemname.planname" placeholder="请输入"></el-input>
                    <el-button class="dia-btn-add-custom" v-if="itemnameList.length-1 == $index" icon="el-icon-plus" @click="handleContinueAdd">继续添加</el-button>
                </div>
                <div slot="footer" class="dialog-footer t-c">
                    <el-button class="button default-button" @click="isShowCustom = false">取 消</el-button>
                    <el-button type="primary" class="blue-button" @click="handleCustom">确 定</el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        props:{
            // 数据
            datas: {
                type: Array,
                default: () => {
                    return [];
                }
            },
            btnSuccessCb:{
                type:String,
                default:'返回上一页'
            }
        },
        data(){
            return{
                // 自定义弹框
                isShowCustom:false,
                isShowUploadTip:false,//是否显示上传错误结果提示
                uploadTip:'文件表头有误，请核对后重新上传',
                isUploading:false,//正在上传中的提示
                isShowNextBtn:false,//是否显示下一步按钮
                dialogAddType:'0',
                itemnameList:[{
                    planname:''
                }],
                checked:true,
                active:3,
                fileList:[{
                    name:''
                }]
            }
        },
        methods:{
            handleExceed(files, fileList) {
                console.log(fileList);
                console.log(files);
                this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            },
            //文件上传成功钩子
            handleSuccess(file,fileList){
                this.isUploading = false;
                this.isShowNextBtn = true;
                console.log(this.fileList);
                console.log('文件上传成功');
            },
            // 文件正在上传
            handleProcess(e,file,fileList){
                console.log(fileList);
                this.isShowUploadTip = false;
                this.fileList = fileList;
                this.isUploading = true;
                console.log('文件正在上传');
            },
            //文件替换
            handleChange(file,fileList){
                this.fileList = fileList.slice(-1);
                console.log(this.fileList);
            },
            //文件上传失败
            handleError(){
                this.isShowUploadTip = true;
                this.uploadTip = '文件上传失败，请重新上传'
            },
            //删除文件
            clearFile(){
                console.log('删除文件');
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
            },
            //下一步
            onNext(){
                this.active = 2;
                setTimeout(res=>{
                    this.active = 3
                },2000)
            }
        }
    }
</script>
<style lang="less" scoped>
    @import "../../src/styles/public";
.import-file{
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
    .custom-item{
        .item{
            .el-input{
                width: 300px;
                margin-right: 10px;
            }
        }
    }

    /*第三步上传成功*/
    .upload-success-wrap{
        background: #fafafa;
        padding: 38px 0 50px;
        .icon-su{
            font-size: 40px;
            color: @success;
        }
        .su{
            font-size:13px;
            font-family:PingFangSC-Regular;
            font-weight:400;
            line-height: 24px;
        }
        .su-info{
            color: @base;
        }
        .su-wrong-info-wrap{
            margin: 25px 0;
        }
        .su-wrong-info{
            color:rgba(0,0,0,0.65);
        }
        h4{
            font-size:20px;
            margin: 10px 0 2px;
            color:rgba(0,0,0,0.85);
            font-family:PingFangSC-Medium;
            font-weight:500;
            line-height:32px
        }
        .btn-cb{
            margin-top: 25px;
        }
    }
}
</style>