<template>
    <div class="add-plan zy-main-wraps">
        <div class="zy-bg-breadcrumb">
            <div class="menu-area">
                <div class="comm">
                    <el-breadcrumb class="bread" separator="/">
                        <el-breadcrumb-item>
                            <a href="/salary">薪资管理</a>
                        </el-breadcrumb-item>
                        <el-breadcrumb-item>
                            <a href="/salary">薪资方案</a>
                        </el-breadcrumb-item>
                        <el-breadcrumb-item>
                            <a>新增方案</a>
                        </el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
                <div class="btns">
                    <el-button @click="$router.push('/salary')">返回</el-button>
                </div>
            </div>
        </div>
        <div class="add">
            <h6 class="set">新增方案</h6>
            <div class="radio-button-area">
                <el-radio v-model="planInfo.status" label="1">已启用</el-radio>
                <el-radio v-model="planInfo.status" label="2">未启用</el-radio>
            </div>
            <div class="info-edit-table-wrap">
                <table>
                    <tr>
                        <td>
                            <div class="item-wrap">
                                <span class="icon-mustfill"> * </span>
                                <div class="border">
                                    <span class="left">方案名称：</span>
                                    <p>
                                        <el-input v-model="planInfo.planName" placeholder="请输入"></el-input>
                                    </p>
                                </div>
                            </div>
                            <div class="item-wrap can-change">
                                <span class="icon-mustfill"> * </span>
                                <div class="change-wrap">
                                    <div class="border">
                                        <span class="left">月记薪时长：</span>
                                        <p>
                                            <el-select v-model="salaryTimeType" placeholder="请选择">
                                                <el-option label="按法定计薪天数" value="1"></el-option>
                                                <el-option label="自定义" value="2"></el-option>
                                            </el-select>
                                        </p>
                                    </div>
                                    <div class="enter-num-wrap">
                                        <el-input v-show="salaryTimeType==2" class="enter-num" v-model="planInfo.workDay"></el-input>
                                        <span v-show="salaryTimeType==2">天</span>
                                        <el-input class="enter-num" v-model="planInfo.workHour"></el-input>
                                        <span>小时</span>
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div class="item-wrap">
                                <span class="icon-mustfill"> * </span>
                                <div class="border">
                                    <span class="left">计薪方式：</span>
                                    <p>
                                        <el-select v-model="planInfo.salaryType" placeholder="请选择">
                                            <el-option label="按天" value="1"></el-option>
                                            <el-option label="按小时" value="2"></el-option>
                                        </el-select>
                                    </p>
                                </div>
                            </div>
                            <div class="item-wrap can-change">
                                <span class="icon-mustfill"> * </span>
                                <div class="border">
                                    <span class="left">个税申报方式：</span>
                                    <p>
                                        <el-select v-model="planInfo.taxApply" placeholder="请选择">
                                            <el-option label="当月" value="1"></el-option>
                                            <el-option label="次月" value="2"></el-option>
                                        </el-select>
                                    </p>
                                </div>
                                <el-tooltip class="add-item" effect="dark" placement="right-start">
                                    <div slot="content">【个税申报方式】可选择当月或次月，若个税申报方式选</br>择次月，在使用此方案计算薪资时，首次计算薪资的员工“</br>个税起征点减免额”将以5000*2为始进行计算。</div>
                                    <el-button class="btn-tooltip" icon="el-icon-info"></el-button>
                                </el-tooltip>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
            <h6 class="set">薪资项</h6>
            <ul v-for="salary in addplanOptions" class="salary-item">
                <li>
                    <span class="item">{{salary.optionName}}</span>
                    <div class="item-detail">
                        <p v-for="(item,$index) in salary.items">
                            <span class="content">
                                {{item.optionName}}
                                <template v-if="item.salaryRecord && item.salaryRecord.computeMode==1">
                                    - 按员工薪资比例补贴，补贴比例为{{item.salaryRecord.computeValue}}，补贴月份为<span v-for="(m,index) in item.salaryRecord.recordMonth" :key="index">{{m}}月 </span>
                                </template>
                                <template v-if="item.salaryRecord && item.salaryRecord.computeMode==2">
                                    - 按员工固定薪资补贴，补贴金额为{{item.salaryRecord.computeValue}}，补贴月份为<span v-for="(m,index) in item.salaryRecord.recordMonth" :key="index">{{m}}月 </span>
                                </template>
                            </span>
                            <el-switch
                                    v-if="item.type==2"
                                    v-model="item.status"
                                    :width=36
                                    active-color="#267FF6"
                                    inactive-color="#BDC1C6">
                            </el-switch>
                            <span v-if="salary.itemType==3" @click="setCalcRules(item,$index)" class="handle-btn el-icon-setting">设置计算规则</span>
                            <span v-if="item.type == 2" @click="editItem(item,$index,salary.itemType)" class="handle-btn el-icon-edit">编辑</span>
                            <!--<span v-if="item.type == 2" @click="delItem(item,$index,salary.itemType)" class="handle-btn el-icon-delete">删除薪资项</span>-->
                        </p>
                    </div>
                </li>
                <li class="item-btn">
                    <el-button icon="el-icon-plus" @click="onAddItem(salary.itemType)">添加薪资项</el-button>
                </li>
            </ul>
            <div class="footer-btn">
                <el-button class="button default-button" @click="isShowCancelAdd = true">取消</el-button>
                <el-button class="button blue-button" @click="confirmAdd">提交</el-button>
            </div>
        </div>

        <!--弹框区域-->
        <!--添加薪资项-->
        <el-dialog class="zy-dialog-pub zy-dialog-pub-large add-salary-item add-fixed-item" :title="addDialogTitle" :visible.sync="isShowAddFixedItem">
            <el-table
                    :data="currentItemList"
                    border
                    class="dia-addfixed-item"
                    style="width: 100%">
                <el-table-column prop="optionName" label="姓名"></el-table-column>
                <el-table-column fixed="right" label="操作" width="100">
                    <template slot-scope="scope">
                        <el-switch v-if="addDialogType==1 && scope.row.optionId== 10000" v-model="scope.row.status" disabled></el-switch>
                        <el-switch v-else v-model="scope.row.status" @change="onChangeStatus(scope.row,scope.$index)"></el-switch>
                    </template>
                </el-table-column>
            </el-table>
            <div class="btn-table">
                <el-link icon="el-icon-plus" @click="isShowCustomArea = true">自定义</el-link>
            </div>
            <div class="add-item-wrap">
                <div v-show="isShowCustomArea" class="item">
                    <span>薪资项名称：</span>
                    <el-input v-model="optionName" placeholder="请输入内容"></el-input>
                    <el-button @click="handleSaveAdd" class="blue-button">保存</el-button>
                </div>
                <div slot="footer" class="dialog-footer t-c">
                    <el-button class="button default-button" @click="isShowAddFixedItem = false">取 消</el-button>
                    <el-button type="primary" class="blue-button" @click="onConfirmAddItem">确 定</el-button>
                </div>
            </div>
        </el-dialog>
        <!--设置计算规则-->
        <el-dialog class="zy-dialog-pub zy-dialog-pub-large calc-rules" title="设置计算规则" :visible.sync="isShowCalcRules">
            <el-form :model="setCalcRule" :rules="rules" ref="setCalcRule" label-width="96px" class="rule">
                <div class="head-top">
                    <el-form-item label="计算方式：" prop="computeMode">
                        <el-select v-model="setCalcRule.computeMode" placeholder="请选择">
                            <el-option label="按薪资比例" value="1"></el-option>
                            <el-option label="按固定金额" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div class="head-body">
                    <template v-if="setCalcRule.computeMode==2">
                        <el-form-item label="补贴金额：" prop="money">
                            <el-input v-model="setCalcRule.money" placeholder="请输入"></el-input>
                        </el-form-item>
                        <el-form-item label="补贴月份：" prop="month">
                            <el-select v-model="setCalcRule.recordMonth" :multiple="true" placeholder="请选择">
                                <el-option v-for="month in setCalcRule.monthList" :key="month.value" :label="month.month" :value="month.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </template>
                    <template v-else>
                        <el-form-item label="引用基数：" prop="baseOptions">
                            <div class="textarea-wrap">
                                <el-checkbox-group v-model="setCalcRule.baseOptions">
                                    <el-checkbox v-for="(item,index) in calcRulesList" :label="item.optionId" name="baseOptions" :disabled="item.optionId==10000" :key="index">{{item.optionName}}</el-checkbox>
                                </el-checkbox-group>
                            </div>
                        </el-form-item>
                        <el-form-item label="补贴比例：" prop="percent">
                            <el-input v-model="setCalcRule.percent" placeholder="请输入">
                                <i slot="suffix" class="el-input__icon el-icon-date"></i>
                            </el-input>
                        </el-form-item>
                        <el-form-item label="补贴月份：" prop="month">
                            <el-select v-model="setCalcRule.recordMonth" :multiple="true" placeholder="请选择">
                                <el-option v-for="month in setCalcRule.monthList" :key="month.value" :label="month.month" :value="month.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </template>
                    <div slot="footer" class="dialog-footer t-c">
                        <el-button class="button default-button" @click="isShowCalcRules = false">取 消</el-button>
                        <el-button type="primary" class="blue-button" @click="handleSetCalc">确 定</el-button>
                    </div>
                </div>
            </el-form>


        </el-dialog>
        <!--删除-->
        <el-dialog class="zy-dialog-pub zy-dialog-pub-medium" title="删除薪资项" :visible.sync="isShowDel">
            <p class="word-explain">确认删除薪资项{{curDelOption && curDelOption.optionName}}吗？</p>
            <div slot="footer" class="dialog-footer t-c">
                <el-button class="button default-button" @click="isShowDel = false">取 消</el-button>
                <el-button type="primary" class="blue-button" @click="onDel">确 定</el-button>
            </div>
        </el-dialog>
        <!--取消添加-->
        <el-dialog class="zy-dialog-pub zy-dialog-pub-medium" title="取消添加薪资项" :visible.sync="isShowCancelAdd">
            <p class="word-explain">确认取消添加此方案吗？</p>
            <div slot="footer" class="dialog-footer t-c">
                <el-button class="button default-button" @click="isShowCancelAdd = false">取 消</el-button>
                <el-button type="primary" class="blue-button" @click="handleCancel">确 定</el-button>
            </div>
        </el-dialog>
        <!--编辑-->
        <el-dialog class="zy-dialog-pub zy-dialog-pub-medium" title="编辑" :visible.sync="isShowEditOption">
            <el-form ref="dialogCopy" :model="copyPlanForm" :rules="rules" size="mini">
                <el-form-item label="薪资项名称" label-width="120px" prop="optionname">
                    <el-input v-model="copyPlanForm.optionname" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer t-c">
                <el-button class="button default-button" @click="isShowEditOption = false">取 消</el-button>
                <el-button type="primary" class="blue-button" @click="onEdit">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                planInfo:{
                    status: '1',//状态：1-启用，2-禁用，3-删除
                    planName:'',
                    workHour:'8',
                    workDay:'',
                    salaryType:'1',//计薪方式（1-天，2-小时）
                    taxApply:'1',//个税申报方式，1-当月，2-次月
                    planOptions:[]
                },
                // status: '1',//状态：1-启用，2-禁用，3-删除
                // planName:'',
                // salaryType:'',//计薪方式（1-天，2-小时）
                salaryTimeType:'1',
                // type 1系统的 2自定义
                //type:0-固定项不能删除修改启用，1-可删除，可编辑名称设置计算规则启用与否，自己添加的薪资项，2-非自己添加项，可设置启用与否，3-非自己添加项，可设置计算规则且可设置启用与否
                //itemType:1-固定工资，2-浮动工资，3-津补贴，4-薪资扣减项，5-五险一金，6-附加扣除
                addplanOptions:[{
                    optionName:'固定工资',
                    itemType:1,
                    items:[{
                        type:1,
                        optionId:10000,
                        optionType:1,
                        optionName:'基本薪资',
                        status:true
                    }],
                    allItems:[]
                },{
                    optionName:'浮动工资',
                    itemType:2,
                    items:[],
                    allItems:[]
                },{
                    optionName:'津贴补助',
                    itemType:3,
                    items:[],
                    allItems:[]
                },{
                    optionName:'薪资扣减项',
                    itemType:4,
                    items:[],
                    allItems:[]
                }],
                // 添加固定薪资项弹框addDialogType当前添加项
                isShowAddFixedItem:false,
                isShowCustomArea:false,
                optionName:'',
                //最新的添加薪资项
                //显示已有项
                currentItemList:[],
                addDialogType: 1,//当前弹框为哪一项添加1-固定工资，2-浮动工资，3-津补贴，4-薪资扣减项，5-五险一金，6-附加扣除
                addDialogTitle:'固定薪资',

                //编辑薪资项
                isShowEditOption:false,
                copyPlanForm:{
                    optionname:''
                },
                curEditOption:null,

                // 删除薪资项
                isShowDel:false,
                curDelOption:null,
                curDelOptionIndex:0,
                curDelOptionItemType:0,//当前删除的薪资项属于哪一类里的，用于数据动态删除

                // 设置计算规则
                isShowCalcRules:false,
                settingCalcItem:[],//当前选中要设置计算规则的项
                settingCalcItemIndex:0,//当前选中要设置计算规则的下标
                calcRulesList:[],//引用基数
                setCalcRule: {
                    computeMode:'1',//1-薪资比例，2-固定
                    baseOptions: ["10000"],
                    resource: '',
                    desc: '',
                    percent:'',
                    recordMonth:'',
                    money:'',
                    monthList:[]
                },

                //取消薪资方案的添加
                isShowCancelAdd:false,

                rules: {
                    recordMonth: [
                        { type: 'array', required: true, message: '请至少选择一个补贴月份', trigger: 'change' }
                    ],
                    resource: [
                        { required: true, message: '请选择活动资源', trigger: 'change' }
                    ],
                    desc: [
                        { required: true, message: '请填写活动形式', trigger: 'blur' }
                    ],

                    computeMode:[

                    ],
                    baseOptions:[

                    ],
                    percent:[{required: true, message: '请填写比例', trigger: 'blur' }],
                    money:[{required: true, message: '请填写金额', trigger: 'blur' }],
                    month:[],
                    optionname: [
                        { required: true, message: '请输入薪资项名称', trigger: 'blur' }
                    ]
                },
            }
        },
        methods:{
            // 获取所有薪资项
            getOption(){
                const params = {
                    companyId:1,
                    optionType:0
                }
              this.$http.get('/salaryPlan/getOptionList',{
                  params
              }).then(t=>{
                  const optionList = t.result;
                  optionList.forEach(item=>{
                      if(item.optionType < 5) this.addplanOptions[item.optionType-1].allItems.push(item);
                  })
              })
            },
            // 设置计薪规则获取月份
            getMonthList(){
                for (let i = 1;i<=12;i++){
                    this.setCalcRule.monthList.push({month:`${i}月`,value:i})
                }
                // this.setCalcRule.monthList
            },
            //设置计算规则
            setCalcRules(item,$index){
                // 获取引用基数
                const params = {
                    companyId:1,
                    inOptionType:[1,2]
                };
                this.$http.post('/salaryPlan/queryOptionList',params).then(t=>{
                    const data = t.result;
                    this.calcRulesList = data;
                })
                this.settingCalcItem = item;
                this.settingCalcItemIndex = $index;
                this.isShowCalcRules = true;
            },
            handleSetCalc(){
                this.$refs['setCalcRule'].validate((valid) => {
                    if (valid) {
                        const res = this.setCalcRule;
                        const params = {
                            companyId:1,
                            type:1,//写死 津补贴
                            optionId:this.settingCalcItem.optionId,
                            recordName:this.settingCalcItem.optionName,
                            computeMode:res.computeMode,
                            computeValue:res.computeMode==1?res.percent :res.money,
                            recordMonth:res.recordMonth
                        };
                        //如果是编辑
                        if(this.settingCalcItem.salaryRecord){
                            params.id = this.settingCalcItem.salaryRecord.id;
                        }
                        if(res.computeMode==1) params.baseOptions=res.baseOptions;
                        this.$http.post('/salaryPlan/setRecord',params).then(t=>{
                            const contents = t.result;
                            this.addplanOptions[2].items[this.settingCalcItemIndex].salaryRecord = contents;
                            this.isShowCalcRules = false;
                            this.$refs['setCalcRule'].resetFields()
                        })
                    } else {
                        console.log('设置薪资项error');
                        return false;
                    }
                });
            },
            // 添加薪资项
            onAddItem(optionType){
                // optionType:薪资类型（1-固定工资，2-浮动工资，3-津补贴，4-薪资扣减项，5-五险一金，6-附加扣除）
                this.addDialogType = optionType;
                switch (optionType) {
                    case 1:
                        this.addDialogTitle = '固定工资';
                        break;
                    case 2:
                        this.addDialogTitle = '浮动工资';
                        break;
                    case 3:
                        this.addDialogTitle = '津贴补助';
                        break;
                    case 4:
                        this.addDialogTitle = '薪资扣减项';
                        break;
                }
                this.currentItemList = this.addplanOptions[optionType-1].allItems.map(data=>{
                    if(optionType == 1 && data.optionId == 10000) data.status = 1
                    data.status==1 ?(data.status=true):(data.status==2?'data.status=false':'');
                    return data;
                });
                this.isShowAddFixedItem = true;
                // const params = {
                //     companyId:1,
                //     optionType
                // };
                // this.$http.get('/salaryPlan/getOptionList',{params}).then(res=>{
                //     let list = res.result;
                //     this.currentItemList = list.map(data=>{
                //         data.status==1?(data.status=true):(data.status==2?'data.status=false':'');
                //         return data;
                //     });
                //     this.isShowAddFixedItem = true;
                // })
            },
            onChangeStatus(item,index){
                console.log(item);
            },
            //保存薪资项
            handleSaveAdd(){
                const haveSameitem = this.currentItemList.some(item=>{
                    return item.optionName.indexOf(this.optionName)>-1;
                })
                if(haveSameitem){
                    console.log('已经有名称相同的薪资项了~')
                    return;
                }
                //添加薪资项
                const params = [{
                    companyId:1,
                    optionName:this.optionName,
                    optionType:this.addDialogType,
                    status:0,//状态写死
                    type:2//1-系统设置，2-自定义
                }];
                this.$http.post('/salaryPlan/addOption',params).then(res=>{
                    const data = res.result;
                    // switch只识别true和false
                    this.currentItemList.push(data[0]);
                    this.addplanOptions[this.addDialogType-1].allItems.push(data[0]);
                    this.isShowCustomArea = false;
                })
            },
            // 确认添加薪资项
            onConfirmAddItem(){
                let curPickItemlist = [];
                this.currentItemList.forEach(t=>{
                    if(t.status) curPickItemlist.push(t)
                })
                this.addplanOptions[this.addDialogType-1].items = curPickItemlist;
                this.isShowAddFixedItem = false;
            },
            //删除薪资项itemType当前删除所属哪一项
            delItem(item,$index,itemType){
                this.curDelOption = item;
                this.curDelOptionIndex = $index;
                this.curDelOptionItemType = itemType;
                this.isShowDel = true;
            },
            //确认删除薪资项
            onDel(){
                const params = {
                    optionId: this.curDelOption.optionId
                }
                this.$http.get('/delOption',{params}).then(res=>{
                    this.isShowDel = false;
                    this.addplanOptions[this.curDelOptionItemType - 1].items.splice(this.curDelOptionIndex,1);
                })
            },
            //编辑薪资项
            editItem(item,index,type){
                this.copyPlanForm.optionname = item.optionName;
                this.curEditOption = item;
                this.isShowEditOption = true;
            },
            onEdit(){
                const params = {
                    id:this.curEditOption.id,
                    optionId:this.curEditOption.optionId,
                    optionName:this.copyPlanForm.optionname
                };
                this.$http.post('/salaryPlan/updateOption',params).then(t=>{
                    // console.log(t);
                    this.curEditOption.optionName= params.optionName;
                    this.isShowEditOption = false;
                })
            },
            //确认添加此薪资方案
            confirmAdd(){
                if(!this.planInfo.planName){
                    this.$message({
                        showClose: true,
                        message: '请填写薪资方案名称',
                        type: 'warning'
                    })
                    return;
                }
                let options = null;
                this.addplanOptions.forEach(item=>{
                    item.items.forEach(t=>{
                        delete t.type;
                        t.companyId = 1;
                        this.planInfo.planOptions.push(t)
                        console.log(this.planInfo.planOptions);
                    })
                })
                this.planInfo.planOptions = this.planInfo.planOptions.map(item=>{
                    item.status?(item.status=1):(item.status=2)
                    return item;
                })
                this.planInfo.companyId = 1;
                let params = this.planInfo;
                let that = this;
                this.$http.post('/salaryPlan/addSalaryPlan',params).then(t=>{
                    this.$message({
                        message: '添加方案成功',
                        type: 'success',
                        onClose(){
                            that.$router.push('/salary')
                        }
                    });
                })
            },
            //确认取消添加薪资方案
            handleCancel(){
                this.$router.push('/salary')
            }
        },
        created(){
            this.getMonthList();
            this.getOption();
        }
    }
</script>
<style lang="less" scoped>
    @import "../../../styles/colors";
    .add-plan{
        .add{
            position: relative;
            overflow: hidden;
            padding: 30px 95px 95px;
            background:@ff;
            box-shadow:2px 0px 16px 0px rgba(3,33,136,0.2);
            border-radius:4px;
            /*是否启用radio-button区域*/
            .radio-button-area{
                padding-top: 20px;
                /deep/.el-radio__input.is-checked{
                    .el-radio__inner{
                        background: @base;
                        border-color: @base;
                    }
                    +.el-radio__label{
                        color: @base;
                    }
                }
            }
            /*薪资项区域*/
            .salary-item{
                font-size: 13px;
                padding-bottom: 10px;
                border-bottom: 1px solid @light;
                li{
                    overflow: hidden;
                }
                li:not(:last-child){
                    padding: 9px 0;
                }
                span.item{
                    float: left;
                    width: 82px;
                    font-family:PingFangSC-Medium;
                    font-weight:500;
                }
                .item-detail{
                    float: left;
                    color: @middle;
                    width: calc(100% - 82px);
                    p{
                        margin-top: 10px;
                        line-height: 1.4;
                        overflow: hidden;
                    }
                    p:first-child{
                        margin-top: 0;
                    }
                    .content{
                        float: left;
                    }
                    .handle-btn,.el-switch{
                        float: right;
                        cursor: pointer;
                        color: @base;
                        margin-left: 20px;
                        height: 20px;
                        line-height: 20px;
                        font-size: 12px;
                    }
                }
                .item-btn{
                    height: 30px;
                    border-radius:4px;
                    border:1px dashed @light;
                    text-align: center;
                    button{
                        border: none;
                        font-size:11px;
                        font-weight:400;
                        width: 100%;
                        height: 100%;
                        color:rgba(0,0,0,0.65);
                        span{
                            font-size: 14px;
                        }
                    }

                }
            }
            .footer-btn{
                @h:60px;
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                height: @h;
                line-height: @h;
                border-radius:2px;
                text-align: center;
                box-shadow:2px 0px 16px 0px rgba(3,33,136,0.2);
            }
        }
        /*输入框区域*/
        .info-edit-table-wrap{
            color: @light;
            margin-bottom: 20px;
            td:nth-child(2){
                padding-left: 35px;
            }
            .item-wrap{
                position: relative;
                span.icon-mustfill{
                    position: absolute;
                    left: -12px;
                    top: 15px;
                    color: @base;
                }
            }
            .border{
                border-radius:2px;
                border: 1px solid @light;
                padding: 0 0 0 10px;
                line-height: 1.3;
                margin-top: 10px;
                span.left{
                    border-right: 1px solid @light;
                    color: @dark;
                    min-width:75px;
                    display: inline-block;
                }
                p,.el-select{
                    width: 202px;
                }
                p{
                    display: inline-block;
                    margin: 0;
                    /deep/.el-input__inner{
                        border: 0;
                        text-align: center;
                        font-size: 13px;
                        color: #999;
                        padding-right: 0;
                        border: 0;
                    }
                    .el-input__suffix{
                        right: auto;
                    }
                }
            }
            /*月计薪时长部分特殊处理*/
            /deep/.can-change{
                overflow:hidden;
                span.icon-mustfill{
                    top: 25px;
                }
                p,.el-select{
                    width: 133px;
                }
                .change-wrap{
                    overflow: hidden;
                }
                .border,.enter-num-wrap{
                    float: left;
                }
                .enter-num{
                    width: 40px;
                    height: 40px;
                    margin: 10px 0 0 5px;
                    border: 1px solid @light;
                    border-radius: 2px;
                    .el-input__inner{
                        border: 0;
                        padding: 0;
                        text-align: center;
                    }
                }
                .btn-tooltip{
                    border: 0;
                }
                .add-item{
                    margin-top: 14px;
                    margin-left: 11px;
                }
            }
            .ml39{
                margin-left: 39px;
            }
        }
        /*添加薪资项弹框*/
        .add-salary-item{
            font-size: 13px;
            .head-top{
                padding: 20px 104px 15px 104px;
                ul.item-class{
                     font-size: 0;
                     display: inline-block;
                     li{
                         display: inline-block;
                         border: 1px solid @light;
                         font-size: 13px;
                         line-height: 22px;
                         height: 22px;
                         width: 80px;
                         text-align: center;
                         cursor: pointer;
                     }
                     li:nth-of-type(1),li:nth-of-type(2),li:nth-of-type(3){
                         border-right: 1px solid transparent;
                     }
                    li:hover{
                        border: 1px solid @base;
                    }
                     li.active{
                         border: 1px solid @base;
                         span{
                             color: @base;
                         }
                     }
                 }
            }
            .head-body{
                overflow-y: scroll;
                padding-bottom: 30px;
                .item{
                    font-size: 0;
                    margin-bottom: 10px;
                    span,.el-input,.el-button{
                        display: inline-block;
                        font-size: 13px;
                    }
                    .el-input{
                        width: 290px;
                        /deep/.el-input__inner{
                            height: 36px;
                            line-height: 36px;
                        }
                    }
                    .el-button{
                        padding: 10.5px 14px;
                        margin-left: 10px;
                    }
                }
            }
            .dialog-footer{
                position: absolute;
                bottom: 42px;
                left: 340px;
            }
        }
        .add-fixed-item{
            .dia-addfixed-item{
                /deep/td,th{
                    padding: 8px 0;
                }
            }
            .btn-table{
                width: 823px;
                padding: 10px;
                border-left: 1px solid #EBEEF5;
                border-right: 1px solid #EBEEF5;
                border-bottom: 1px solid #EBEEF5;
                a{
                    color: @base;
                }
                /deep/.el-link--inner{
                    font-size: 12px;
                }
            }
            .add-item-wrap{
                text-align: center;
                padding: 20px 0 70px;
                .item{
                    .el-input{
                        width: 290px;
                    }
                }
            }
        }
        /*设置计算规则*/
        .calc-rules{
            .rule{
                width: 100%;
            }
            .head-top{
                padding: 0 90px;
                /deep/.el-input__inner{
                    height: 36px;
                    line-height: 36px;
                }
            }
            .head-body{
                padding: 20px 30px;
                width: 660px;
            }
            .textarea-wrap{
                display: inline-block;
                border: 1px solid @light;
                width: 528px;
                height: 100px;
                padding: 10px 20px;
                border-radius:2px;
            }
            .el-input{
                width: 150px;
                span{
                    i.el-icon-date:before{
                        content: '%';
                    }
                }
            }
            /deep/.el-input__inner{
                width: 150px;
            }
        }

    }
</style>