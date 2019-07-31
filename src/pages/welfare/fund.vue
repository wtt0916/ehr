<template>
    <div class="fund-con" id="fund">
        <div class="fund-con-title">
            <p>
                <span class="fund-name">公积金</span>
                <!-- <el-checkbox v-model="checked">是否自动适配所有缴纳项</el-checkbox> -->
                <span class="fund-number">共<em>3</em>个缴纳项</span>
            </p>
        </div>
        <el-divider></el-divider>
        <div class="fund_table">
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
                    <tr :model="funds">
                        <td class="sub-name">公积金</td>
                        <td class="sub-number">
                            <el-row prop="Smin1">
                                <el-col :span="10">
                                    <el-input v-model="funds.Smin1" placeholder="请填写基数下限" :disabled="funds.Edit"></el-input>
                                </el-col>
                                <el-col :span="2">
                                    <span class="split-to">ㅡ</span>
                                </el-col>

                                <el-col :span="11">
                                    <el-input v-model="funds.Smax1" placeholder="请填写基数上限" :disabled="funds.Edit"></el-input>
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
                                        <el-input v-model="funds.ScomPaymin" placeholder="请填写基数下限" :disabled="funds.Edit">
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="2">
                                    <span>%</span>
                                </el-col>
                            </el-row>
                            <el-row prop="SperPaymin1">
                                <el-col :span="20">
                                    <el-input v-model="funds.ScomPaymin1" placeholder="请填写基数下限" :disabled="funds.Edit">
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
                                        <el-input v-model="funds.SuncomPaymin1" placeholder="请填写基数下限" :disabled="funds.Edit">
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="2">
                                    <span>%</span>
                                </el-col>
                            </el-row>
                            <el-row prop="SunperPaymin1">
                                <el-col :span="20">
                                    <el-input v-model="funds.SunperPaymin1" placeholder="请填写基数下限" :disabled="funds.Edit">
                                    </el-input>
                                </el-col>
                                <el-col :span="2">
                                    <span>%</span>
                                </el-col>
                            </el-row>
                        </td>
                        <td class="ispayment">
                            <!-- <el-form-item prop="SisStart1"> -->
                            <el-switch v-model="funds.SisStart1" active-color="rgba(38,127,246,1)" active-value=true
                                active-text="√" inactive-text="×" inactive-color="rgba(217,217,217,1)"
                                inactive-value=false @change='changeStatus2($event)'>
                            </el-switch>
                        </td>
                    </tr>

                    <tr :model="housingfund">
                        <td class="sub-name" :disabled="housingfund.Edit">补充公积金</td>
                        <td class="sub-number">
                            <el-row prop="Smin1">
                                <el-col :span="10">
                                    <el-input v-model="housingfund.Smin1" placeholder="请填写基数下限" :disabled="housingfund.Edit"></el-input>
                                </el-col>
                                <el-col :span="2">
                                    <span class="split-to">ㅡ</span>
                                </el-col>

                                <el-col :span="11">
                                    <el-input v-model="housingfund.Smax1" placeholder="请填写基数上限" :disabled="housingfund.Edit"></el-input>
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
                                        <el-input v-model="housingfund.ScomPaymin" placeholder="请填写基数下限" :disabled="housingfund.Edit">
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="2">
                                    <span>%</span>
                                </el-col>
                            </el-row>
                            <el-row prop="SperPaymin1">
                                <el-col :span="20">
                                    <el-input v-model="housingfund.ScomPaymin1" placeholder="请填写基数下限" :disabled="housingfund.Edit">
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
                                        <el-input v-model="housingfund.SuncomPaymin1" placeholder="请填写基数下限" :disabled="housingfund.Edit">
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="2">
                                    <span>%</span>
                                </el-col>
                            </el-row>
                            <el-row prop="SunperPaymin1">
                                <el-col :span="20">
                                    <el-input v-model="housingfund.SunperPaymin1" placeholder="请填写基数下限" :disabled="housingfund.Edit">
                                    </el-input>
                                </el-col>
                                <el-col :span="2">
                                    <span>%</span>
                                </el-col>
                            </el-row>
                        </td>
                        <td class="ispayment">
                            <el-switch v-model="housingfund.SisStart1" active-color="rgba(38,127,246,1)" active-text="√"
                                inactive-text="×" active-value=true inactive-color="rgba(217,217,217,1)"
                                inactive-value=false @change='changeStatus1($event)'>
                            </el-switch>
                        </td>
                    </tr>
                    <!-- <form></form> -->
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
                                    <el-form-item >
                                        <el-input v-model="item.SuncomPaymin1" placeholder="请填写基数下限" :disabled="item.Edit">
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="2">
                                    <span>%</span>
                                </el-col>
                            </el-row>
                            <el-row prop="SunperPaymin1" >
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
                checked: "",
                funds: {
                    Smin1: '',
                    Smax1: '',
                    ScomPaymin: '',
                    ScomPaymin1: '',
                    SuncomPaymin1: '',
                    SunperPaymin1: '',
                    SisStart1: '',
                    Edit:false
                },
                housingfund: [{
                    Smin1: '',
                    Smax1: '',
                    ScomPaymin: '',
                    ScomPaymin1: '',
                    ScomPaymin2: '',
                    SuncomPaymin1: '',
                    SunperPaymin1: '',
                    SisStart1: '',
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
                    SisStart1: false,
                    Edit:false
                }] ,
            };
        },
        methods: {
            // 添加信息
            addtr() {
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

            // 修改状态
            changeStatus: function($event,i){
                this.write[i].Edit = !this.write[i].Edit;
            },
            changeStatus1: function($event){
                this.housingfund.Edit = !this.housingfund.Edit;
            },
            changeStatus2: function($event){
                this.funds.Edit = !this.funds.Edit;
			}
        }
    };
</script>

<style scoped lang="less">
    #fund {
        margin-bottom: 100px;

        .line {
            text-align: center;
            line-height: 40px;
        }

        .fund-name {
            margin-right: 30px;
        }

        .el-form {
            float: none;
        }

        .el-form-item {
            margin-bottom: 0;
        }

        .fund-con-title {
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

        .fund_table {
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
                            width: 110px;
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
                font-size: 11px;
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