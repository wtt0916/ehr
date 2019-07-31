<template>
    <div class="social-con" id="social">
        <div class="social-con-title">
            <p>
                <span class="social-name">社保</span>
                <!-- <el-checkbox v-model="checked">是否自动适配所有缴纳项</el-checkbox> -->
                <span class="social-number">共<em>6</em>个缴纳项</span>
            </p>
        </div>
        <el-divider></el-divider>
        <div class="social_table">
            <el-form ref="form" class="con-form">
                <table class="con-table" style="text-align: left;">
                    <tr class="table_title">
                        <th class="name">缴纳项名称</th>
                        <th class="number">基数范围 <el-checkbox v-model="checked" style="margin-left:8px">是否自动匹配所有缴纳项
                            </el-checkbox>
                        </th>
                        <th class="pay-obj">缴纳对象</th>
                        <th class="city-proportion">城镇户口缴纳比例</th>
                        <th class="uncity-proportion">非城镇户口缴纳比例</th>
                        <th class="ispayment">是否缴纳</th>
                    </tr>
                    <tr :model="insurance">
                        <td class="sub-name">养老保险</td>
                        <td class="sub-number">
                            <el-row prop="Smin1">
                                <el-col :span="10">
                                    <el-input v-model="insurance.Smin1" placeholder="请填写基数下限" :disabled="insurance.Edit"></el-input>
                                </el-col>
                                <el-col :span="2">
                                    <span class="split-to">ㅡ</span>
                                </el-col>

                                <el-col :span="11">
                                    <el-input v-model="insurance.Smax1" placeholder="请填写基数上限" :disabled="insurance.Edit"></el-input>
                                </el-col>
                            </el-row>
                        </td>
                        <td class="pay-obj">
                            <p class="sub-pay-obj">公司</p>
                            <p class="sub-pay-obj">个人</p>
                        </td>
                        <td class="city-proportion" style="padding-top:8px;">
                            <el-row prop="ScomPaymin">
                                <el-col :span="20">
                                    <el-form-item>
                                        <el-input v-model="insurance.ScomPaymin" placeholder="请填写基数下限" :disabled="insurance.Edit">
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="2">
                                    <span>%</span>
                                </el-col>
                            </el-row>
                            <el-row prop="SperPaymin1">
                                <el-col :span="20">
                                    <el-input v-model="insurance.ScomPaymin1" placeholder="请填写基数下限" :disabled="insurance.Edit">
                                    </el-input>
                                </el-col>
                                <el-col :span="2">
                                    <span>%</span>
                                </el-col>
                            </el-row>
                        </td>
                        <td class="uncity-proportion" style="padding-top:8px;">
                            <el-row prop="SuncomPaymin1">
                                <el-col :span="20">
                                    <el-form-item>
                                        <el-input v-model="insurance.SuncomPaymin1" placeholder="请填写基数下限" :disabled="insurance.Edit">
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="2">
                                    <span>%</span>
                                </el-col>
                            </el-row>
                            <el-row prop="SunperPaymin1">
                                <el-col :span="20">
                                    <el-input v-model="insurance.SunperPaymin1" placeholder="请填写基数下限" :disabled="insurance.Edit">
                                    </el-input>
                                </el-col>
                                <el-col :span="2">
                                    <span>%</span>
                                </el-col>
                            </el-row>
                        </td>
                        <td class="ispayment">
                            <el-switch v-model="insurance.SisStart1" active-color="rgba(38,127,246,1)" active-value=true
                                active-text="√" inactive-text="×" inactive-color="rgba(217,217,217,1)"
                                inactive-value=false @change="changeInsurance($event)">
                            </el-switch>
                        </td>
                    </tr>

                    <tr :model="medicare">
                        <td class="sub-name">医疗保险</td>
                        <td class="sub-number">
                            <el-row prop="Smin1">
                                <el-col :span="10">
                                    <el-input v-model="medicare.Smin1" placeholder="请填写基数下限" :disabled="medicare.Edit"></el-input>
                                </el-col>
                                <el-col :span="2">
                                    <span class="split-to">ㅡ</span>
                                </el-col>

                                <el-col :span="11">
                                    <el-input v-model="medicare.Smax1" placeholder="请填写基数上限" :disabled="medicare.Edit"></el-input>
                                </el-col>
                            </el-row>
                        </td>
                        <td class="pay-obj">
                            <p class="sub-pay-obj">公司</p>
                            <p class="sub-pay-obj">个人</p>
                        </td>
                        <td class="city-proportion" style="padding-top:8px;">
                            <el-row prop="ScomPaymin1">
                                <el-col :span="20">
                                    <el-form-item>
                                        <el-input v-model="medicare.ScomPaymin" placeholder="请填写基数下限" :disabled="medicare.Edit">
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="2">
                                    <span>%</span>
                                </el-col>
                            </el-row>
                            <el-row prop="SperPaymin1">
                                <el-col :span="8">
                                    <el-input v-model="medicare.ScomPaymin1" placeholder="基数下限" :disabled="medicare.Edit">
                                    </el-input>
                                </el-col>
                                <el-col :span="1">
                                    <span>%</span>
                                </el-col>
                                <el-col :span="3">
                                    <span style="padding-left:8px">+</span>
                                </el-col>
                                <el-col :span="8">
                                    <el-input v-model="medicare.ScomPaymin2" placeholder="固定" :disabled="medicare.Edit">
                                    </el-input>
                                </el-col>
                                <span>元</span>
                            </el-row>
                        </td>
                        <td class="uncity-proportion" style="padding-top:8px;">
                            <el-row prop="SuncomPaymin1">
                                <el-col :span="20">
                                    <el-form-item>
                                        <el-input v-model="medicare.SuncomPaymin1" placeholder="请填写基数下限" :disabled="medicare.Edit">
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="2">
                                    <span>%</span>
                                </el-col>
                            </el-row>
                            <el-row prop="SunperPaymin1">
                                <el-col :span="8">
                                    <el-input v-model="medicare.SunperPaymin1" placeholder="基数下限" :disabled="medicare.Edit">
                                    </el-input>
                                </el-col>
                                <el-col :span="1">
                                    <span>%</span>
                                </el-col>
                                <el-col :span="3">
                                    <span style="padding-left:8px">+</span>
                                </el-col>
                                <el-col :span="8">
                                    <el-input v-model="medicare.ScomPaymin3" placeholder="固定" :disabled="medicare.Edit">
                                    </el-input>
                                </el-col>
                                <span>元</span>
                            </el-row>
                        </td>
                        <td class="ispayment">
                            <el-switch v-model="medicare.SisStart1" active-color="rgba(38,127,246,1)" active-value=true
                                active-text="√" inactive-text="×" inactive-color="rgba(217,217,217,1)"
                                inactive-value=false @change="changeMedicare($event)">
                            </el-switch>
                        </td>
                    </tr>
                    <tr :model="unemploye">
                        <td class="sub-name">失业保险</td>
                        <td class="sub-number">
                            <el-row prop="Smin1">
                                <el-col :span="10">
                                    <el-input v-model="unemploye.Smin1" placeholder="请填写基数下限" :disabled="unemploye.Edit"></el-input>
                                </el-col>
                                <el-col :span="2">
                                    <span class="split-to">ㅡ</span>
                                </el-col>

                                <el-col :span="11">
                                    <el-input v-model="unemploye.Smax1" placeholder="请填写基数上限" :disabled="unemploye.Edit"></el-input>
                                </el-col>
                            </el-row>
                        </td>
                        <td class="pay-obj">
                            <p class="sub-pay-obj">公司</p>
                            <p class="sub-pay-obj">个人</p>
                        </td>
                        <td class="city-proportion" style="padding-top:8px;">
                            <el-row prop="ScomPaymin1">
                                <el-col :span="20">
                                    <el-form-item>
                                        <el-input v-model="unemploye.ScomPaymin" placeholder="请填写基数下限" :disabled="unemploye.Edit">
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="2">
                                    <span>%</span>
                                </el-col>
                            </el-row>
                            <el-row prop="SperPaymin1">
                                <el-col :span="20">
                                    <el-input v-model="unemploye.ScomPaymin1" placeholder="请填写基数下限" :disabled="unemploye.Edit">
                                    </el-input>
                                </el-col>
                                <el-col :span="2">
                                    <span>%</span>
                                </el-col>
                            </el-row>
                        </td>
                        <td class="uncity-proportion" style="padding-top:8px;">
                            <el-row prop="SuncomPaymin1">
                                <el-col :span="20">
                                    <el-form-item>
                                        <el-input v-model="unemploye.SuncomPaymin1" placeholder="请填写基数下限" :disabled="unemploye.Edit">
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="2">
                                    <span>%</span>
                                </el-col>
                            </el-row>
                            <el-row prop="SunperPaymin1">
                                <el-col :span="20">
                                    <el-input v-model="unemploye.SunperPaymin1" placeholder="请填写基数下限" :disabled="unemploye.Edit">
                                    </el-input>
                                </el-col>
                                <el-col :span="2">
                                    <span>%</span>
                                </el-col>
                            </el-row>
                        </td>
                        <td class="ispayment">
                            <el-switch v-model="unemploye.SisStart1" active-color="rgba(38,127,246,1)" active-value=true
                                active-text="√" inactive-text="×" inactive-color="rgba(217,217,217,1)"
                                inactive-value=false @change="changeUnemploye($event)"> 
                            </el-switch>
                        </td>
                    </tr>
                    <tr :model="injury">
                        <td class="sub-name">工伤保险</td>
                        <td class="sub-number">
                            <el-row prop="Smin1">
                                <el-col :span="10">
                                    <el-input v-model="injury.Smin1" placeholder="请填写基数下限" :disabled="injury.Edit"></el-input>
                                </el-col>
                                <el-col :span="2">
                                    <span class="split-to">ㅡ</span>
                                </el-col>

                                <el-col :span="11">
                                    <el-input v-model="injury.Smax1" placeholder="请填写基数上限" :disabled="injury.Edit"></el-input>
                                </el-col>
                            </el-row>
                        </td>
                        <td class="pay-obj">
                            <p class="sub-pay-obj">公司</p>
                            <p class="sub-pay-obj">个人</p>
                        </td>
                        <td class="city-proportion" style="padding-top:8px;">
                            <el-row prop="ScomPaymin1">
                                <el-col :span="20">
                                    <el-form-item>
                                        <el-input v-model="injury.ScomPaymin" placeholder="请填写基数下限" :disabled="injury.Edit">
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="2">
                                    <span>%</span>
                                </el-col>
                            </el-row>
                            <el-row prop="SperPaymin1">
                                <el-col :span="20">
                                    <el-input v-model="injury.ScomPaymin1" placeholder="请填写基数下限" :disabled="injury.Edit">
                                    </el-input>
                                </el-col>
                                <el-col :span="2">
                                    <span>%</span>
                                </el-col>
                            </el-row>
                        </td>
                        <td class="uncity-proportion" style="padding-top:8px;">
                            <el-row prop="SuncomPaymin1">
                                <el-col :span="20">
                                    <el-form-item>
                                        <el-input v-model="injury.SuncomPaymin1" placeholder="请填写基数下限" :disabled="injury.Edit">
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="2">
                                    <span>%</span>
                                </el-col>
                            </el-row>
                            <el-row prop="SunperPaymin1">
                                <el-col :span="20">
                                    <el-input v-model="injury.SunperPaymin1" placeholder="请填写基数下限" :disabled="injury.Edit">
                                    </el-input>
                                </el-col>
                                <el-col :span="2">
                                    <span>%</span>
                                </el-col>
                            </el-row>
                        </td>
                        <td class="ispayment">
                            <el-switch v-model="injury.SisStart1" active-color="rgba(38,127,246,1)" active-value=true
                                active-text="√" inactive-text="×" inactive-color="rgba(217,217,217,1)"
                                inactive-value=false @change="changeInjury($event)">
                            </el-switch>
                        </td>
                    </tr>
                    <tr :model="rear" class="addCon">
                        <td class="sub-name">生育保险</td>
                        <td class="sub-number">
                            <el-row prop="Smin1">
                                <el-col :span="10">
                                    <el-input v-model="rear.Smin1" placeholder="请填写基数下限" :disabled="rear.Edit"></el-input>
                                </el-col>
                                <el-col :span="2">
                                    <span class="split-to">ㅡ</span>
                                </el-col>

                                <el-col :span="11">
                                    <el-input v-model="rear.Smax1" placeholder="请填写基数上限" :disabled="rear.Edit"></el-input>
                                </el-col>
                            </el-row>
                        </td>
                        <td class="pay-obj">
                            <p class="sub-pay-obj">公司</p>
                            <p class="sub-pay-obj">个人</p>
                        </td>
                        <td class="city-proportion" style="padding-top:8px;">
                            <el-row prop="ScomPaymin1">
                                <el-col :span="20">
                                    <el-form-item>
                                        <el-input v-model="rear.ScomPaymin" placeholder="请填写基数下限" :disabled="rear.Edit">
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="2">
                                    <span>%</span>
                                </el-col>
                            </el-row>
                            <el-row prop="SperPaymin1">
                                <el-col :span="20">
                                    <el-input v-model="rear.ScomPaymin1" placeholder="请填写基数下限" :disabled="rear.Edit">
                                    </el-input>
                                </el-col>
                                <el-col :span="2">
                                    <span>%</span>
                                </el-col>
                            </el-row>
                        </td>
                        <td class="uncity-proportion" style="padding-top:8px;">
                            <el-row prop="SuncomPaymin1">
                                <el-col :span="20">
                                    <el-form-item>
                                        <el-input v-model="rear.SuncomPaymin1" placeholder="请填写基数下限" :disabled="rear.Edit">
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="2">
                                    <span>%</span>
                                </el-col>
                            </el-row>
                            <el-row prop="SunperPaymin1">
                                <el-col :span="20">
                                    <el-input v-model="rear.SunperPaymin1" placeholder="请填写基数下限" :disabled="rear.Edit">
                                    </el-input>
                                </el-col>
                                <el-col :span="2">
                                    <span>%</span>
                                </el-col>
                            </el-row>
                        </td>
                        <td class="ispayment">
                            <el-switch v-model="rear.SisStart1" active-color="rgba(38,127,246,1)" active-value=true
                                active-text="√" inactive-text="×" inactive-color="rgba(217,217,217,1)"
                                inactive-value=false @change='changeRear($event)'>
                            </el-switch>
                        </td>
                    </tr>
                    <tr :model="write" class="write" v-for="(item,i) in write">
                        <td class="sub-name" style="cursor: pointer">
                            <el-input v-model="item.input" placeholder="缴纳项名称" :disabled="item.Edit">
                            </el-input>
                            <i class="el-icon-delete" style="font-size: 15px;"></i>
                        </td>
                        <td class="sub-number">
                            <el-row prop="Smin1">
                                <el-col :span="10">
                                    <el-input v-model="item.Smin1" placeholder="请填写基数下限" :disabled="item.Edit"></el-input>
                                </el-col>
                                <el-col :span="2">
                                    <span class="split-to">ㅡ</span>
                                </el-col>

                                <el-col :span="11">
                                    <el-input v-model="item.Smax1" placeholder="请填写基数上限" :disabled="item.Edit"></el-input>
                                </el-col>
                            </el-row>
                        </td>
                        <td class="pay-obj">
                            <p class="sub-pay-obj">公司</p>
                            <p class="sub-pay-obj">个人</p>
                        </td>
                        <td class="city-proportion" style="padding-top:8px;">
                            <el-row prop="ScomPaymin1">
                                <el-col :span="20">
                                    <el-form-item>
                                        <el-input v-model="item.ScomPaymin" placeholder="请填写基数下限" :disabled="item.Edit">
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="2">
                                    <span>%</span>
                                </el-col>
                            </el-row>
                            <el-row prop="SperPaymin1">
                                <el-col :span="20">
                                    <el-input v-model="item.ScomPaymin1" placeholder="请填写基数下限" :disabled="item.Edit">
                                    </el-input>
                                </el-col>
                                <el-col :span="2">
                                    <span>%</span>
                                </el-col>
                            </el-row>
                        </td>
                        <td class="uncity-proportion" style="padding-top:8px;">
                            <el-row prop="SuncomPaymin1">
                                <el-col :span="20">
                                    <el-form-item>
                                        <el-input v-model="item.SuncomPaymin1" placeholder="请填写基数下限" :disabled="item.Edit">
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="2">
                                    <span>%</span>
                                </el-col>
                            </el-row>
                            <el-row prop="SunperPaymin1">
                                <el-col :span="20">
                                    <el-input v-model="item.SunperPaymin1" placeholder="请填写基数下限" :disabled="item.Edit">
                                    </el-input>
                                </el-col>
                                <el-col :span="2">
                                    <span>%</span>
                                </el-col>
                            </el-row>
                        </td>
                        <td class="ispayment">
                            <el-switch v-model="item.SisStart1" active-color="rgba(38,127,246,1)" active-value=true
                                active-text="√" inactive-text="×" inactive-color="rgba(217,217,217,1)"
                                inactive-value=false @change='changeStatus($event,i)'>
                            </el-switch>
                        </td>
                    </tr>
                </table>
            </el-form>
        </div>
        <div class="addtr" @click="addtr">
            <span>+ 添加更多自定义缴纳项</span>
        </div>


    </div>
</template>

<script>
    export default {
        data() {
            return {
                addCon: [],
                checked: "",
                insurance: [{
                    Smin1: '',
                    Smax1: '',
                    ScomPaymin: '',
                    ScomPaymin1: '',
                    SuncomPaymin1: '',
                    SunperPaymin1: '',
                    SisStart1:false,
                    Edit:false
                }],
                medicare: [{
                    Smin1: '',
                    Smax1: '',
                    ScomPaymin: '',
                    ScomPaymin1: '',
                    ScomPaymin2: '',
                    ScomPaymin3: '',
                    SuncomPaymin1: '',
                    SunperPaymin1: '',
                    SisStart1:false,
                    Edit:false
                }],
                unemploye: [{
                    Smin1: '',
                    Smax1: '',
                    ScomPaymin: '',
                    ScomPaymin1: '',
                    SuncomPaymin1: '',
                    SunperPaymin1: '',
                    SisStart1:false,
                    Edit:false
                }],
                injury: [{
                    Smin1: '',
                    Smax1: '',
                    ScomPaymin: '',
                    ScomPaymin1: '',
                    SuncomPaymin1: '',
                    SunperPaymin1: '',
                    SisStart1:false,
                    Edit:false
                }],
                rear: [{
                    Smin1: '',
                    Smax1: '',
                    ScomPaymin: '',
                    ScomPaymin1: '',
                    SuncomPaymin1: '',
                    SunperPaymin1: '',
                    SisStart1:false,
                    Edit:false
                }],
                write:[{
                    input:'',
                    Smin1: '',
                    Smax1: '',
                    ScomPaymin: '',
                    ScomPaymin1: '',
                    SuncomPaymin1: '',
                    SunperPaymin1: '',
                    SisStart1:false,
                    Edit:false
                }],
            };
        },
        methods: {

            // 修改状态
            changeInsurance: function($event){
                this.insurance.Edit = !this.insurance.Edit;
            },
            changeMedicare: function($event){
                this.medicare.Edit = !this.medicare.Edit;
            },
            changeUnemploye: function($event){
                this.unemploye.Edit = !this.unemploye.Edit;
            },
            changeInjury: function($event){
                this.injury.Edit = !this.injury.Edit;
            },
            changeRear: function($event){
                this.rear.Edit = !this.rear.Edit;
            },
            changeStatus: function($event,i){
                this.write[i].Edit = !this.write[i].Edit;
            },
            // 添加信息
            addtr() {
                console.log(11);
                this.write.push({
                    input:'',
                    Smin1: '',
                    Smax1: '',
                    ScomPaymin: '',
                    ScomPaymin1: '',
                    SuncomPaymin1: '',
                    SunperPaymin1: '',
                    SisStart1: false,
                    Edit:false
                });
            },
        }
    };
</script>

<style scoped lang="less">
    #social {
        .line {
            text-align: center;
            line-height: 40px;
        }

        .social-name {
            margin-right: 30px;
        }

        .el-form {
            float: none;
        }

        .el-form-item {
            margin-bottom: 0;
        }

        .social-con-title {
            p {
                margin-bottom: 0;
                line-height: 50px;
                overflow: hidden;

                span:first-child {
                    float: left;
                    font-size: 14px;
                    font-family: PingFangSC-Semibold;
                    font-weight: 600;
                    color: rgba(38, 127, 246, 1);
                }

                span:last-child {
                    display: inline-block;
                    line-height: 20px;
                    float: right;
                    margin-top: 16px;
                    font-size: 13px;
                    padding-left: 19px;
                    border-left: 1px solid rgba(216, 216, 216, 1);
                    font-family: PingFangSC-Regular;
                    font-weight: 400;
                    color: rgba(102, 102, 102, 1);

                    em {
                        font-style: normal;
                    }
                }
            }
        }

        .el-divider {
            margin: 0;
        }

        .social_table {
            margin-top: 10px;

            .con-form {
                .con-table {
                    border-collapse: collapse;

                    .table_title {
                        height: 48px;
                        background: rgba(247, 247, 247, 1);
                        font-size: 14px;
                        font-family: PingFangSC-Semibold;
                        font-weight: 600;
                        color: rgba(51, 51, 51, 1);

                        .name {
                            width: 120px;
                            padding-left: 25px;
                            padding-right: 31px;
                        }

                        .number {
                            width: 350px;

                            /deep/.el-checkbox__label {
                                font-size: 13px;
                                font-family: PingFangSC-Regular;
                                font-weight: 400;
                                color: rgba(51, 51, 51, 1);
                            }
                        }

                        .pay-obj {
                            width: 100px;
                        }

                        .city-proportion {
                            width: 250px;
                        }

                        .uncity-proportion {
                            width: 250px;
                        }

                        .ispayment {
                            width: 100px;
                        }
                    }

                    .sub-name {
                        padding-left: 28px;
                    }

                    .sub-number {
                        /deep/.el-input {
                            width: 130px;
                        }

                        .split-to {
                            width: 19px;
                            line-height: 38px;
                            padding-left: 6px;
                        }
                    }

                    .city-proportion {
                        /deep/.el-input {
                            margin-bottom: 5px;
                        }

                        span {
                            line-height: 40px;
                            margin-left: 3px;
                        }
                    }

                    .uncity-proportion {
                        /deep/.el-input {
                            margin-bottom: 5px;
                        }

                        span {
                            line-height: 40px;
                            margin-left: 3px;
                        }
                    }
                    .write{
                        .sub-name{
                            /deep/.el-input{
                                width:97px;
                            }
                        }
                    }
                }
            }
        }

        .addtr {
            line-height: 32px;
            text-align: center;
            background: rgba(255, 255, 255, 1);
            border-radius: 4px;
            border: 1px dashed rgba(102, 102, 102, 1);
            font-size: 14px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: rgba(0, 0, 0, 0.65);
            margin-top: 10px;
            cursor: pointer;
        }


        .ispayment {
            /deep/.el-switch__label {
                position: absolute;
                display: none;
                color: #fff;
            }

            /deep/.el-switch__label--left {
                z-index: 9;
                left: 34px;
            }

            /deep/.el-switch__label--right {
                z-index: 9;
                left: -3px;
                top: 2px;
            }

            /deep/.el-switch__label.is-active {
                display: block;
            }

            /deep/.el-switch .el-switch__core,
            .el-switch .el-switch__label {
                width: 50px !important;
            }
        }
    }
</style>