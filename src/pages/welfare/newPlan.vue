<template>
  <div class="planView">
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">社保公积金</el-breadcrumb-item>
        <el-breadcrumb-item>
          <a href="/">缴纳方案</a>
        </el-breadcrumb-item>
        <el-breadcrumb-item>查看</el-breadcrumb-item>
      </el-breadcrumb>
      <el-button @click="Return">返回</el-button>
    </div>
    <div class="viewDetails">
      <el-form :rules="rules" ref="form" :model="form" style="width:100%" class="con_form">
        <div>
          <el-col :span="5">
            <el-form-item prop="planName" label="方案名称：" label-width="82px">
              <el-input v-model="form.planName" placeholder="请填写方案名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2.5">
            <el-form-item prop="mainCompanyId">
              <el-select v-model="form.mainCompanyId" placeholder="缴纳主体" style="width:100px">
                <el-option
                  v-for="item in mainCompanyList"
                  :key="item.mainCompanyId"
                  :label="item.mainCompanyName"
                  :value="item.mainCompanyId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>&nbsp;
          <el-col :span="2.5">
            <el-form-item prop="provinceValue">
              <el-select
                @change="provinceChange"
                v-model="form.provinceValue"
                placeholder="缴纳省"
                style="width:100px"
              >
                <el-option
                  v-for="item in provinceList"
                  :key="item.addressId"
                  :label="item.addressName"
                  :value="item.addressId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="2.5">
            <el-form-item prop="cityValue">
              <el-select v-model="form.cityValue" placeholder="缴纳区" style="width:100px">
                <el-option
                  v-for="item in cityList"
                  :key="item.addressId"
                  :label="item.addressName"
                  :value="item.addressId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item prop="start" class="radio-btn">
              <el-checkbox @change="checkboxChange" v-model="form.checkbox">是否启用</el-checkbox>
            </el-form-item>
          </el-col>
        </div>
        <div class="social">
          <p>
            <span>社保</span>
            <span>共{{socialNum}}个缴纳项</span>
          </p>
          <p class="social_header">
            <el-col style="text-align:center" :span="3">缴纳项名称</el-col>
            <el-col style="text-align:center" :span="7">
              基数范围
              <el-checkbox v-model="socialChecked" style="margin-left:8px">是否自动匹配所有缴纳项</el-checkbox>
            </el-col>
            <el-col style="text-align:center" :span="2">缴纳对象</el-col>
            <el-col style="text-align:center" :span="5">城镇户口缴纳比例</el-col>
            <el-col style="text-align:center" :span="5">非城镇户口缴纳比例</el-col>
            <el-col style="text-align:center" :span="2">是否缴纳</el-col>
          </p>
          <div class="social_data" v-for="(item,index) in form.socialDate" :key="index">
            <el-col :span="3">
              <el-form-item
                v-if="index>=5"
                :prop="`socialDate.${index}.optionName`"
                :rules="socialDateRules.optionName"
                style="padding-top: 35px;"
              >
                <el-input style="width:80%" v-model="item.optionName" placeholder="请填写名称"></el-input>
                <i style="cursor: pointer;" class="el-icon-delete" @click="del_social(index)"></i>
              </el-form-item>
              <p v-else>{{item.optionName}}</p>
            </el-col>
            <el-col :span="7" class="base">
              <el-form-item
                style="width:55%"
                :prop="item.status ? `socialDate.${index}.baseStart`:`socialDate.${index}.id`"
                :rules="socialDateRules.baseStart"
              >
                <el-input
                  type="number"
                  style="width:85%"
                  @input="inp_inputStart"
                  v-model="item.baseStart"
                  :disabled="!item.status"
                  placeholder="请填写基数下限"
                ></el-input>&nbsp; ㅡ
              </el-form-item>
              <el-form-item
                style="width:45%"
                :prop="item.status ? `socialDate.${index}.baseEnd`:`socialDate.${index}.id`"
                :rules="socialDateRules.baseEnd"
              >
                <el-input
                  type="number"
                  :disabled="!item.status"
                  @input="inp_inputEnd"
                  style="width:100%"
                  v-model="item.baseEnd"
                  placeholder="请填写基数上限"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <p style="height:50px;line-height:50px;">公司</p>
              <p style="height:50px;line-height:50px;">个人</p>
            </el-col>
            <el-col :span="5">
              <p class="radio1">
                <el-form-item
                  :prop="item.status ? `socialDate.${index}.companyRatio1`:`socialDate.${index}.id`"
                  :rules="socialDateRules.companyRatio1"
                >
                  <el-input
                    type="number"
                    :disabled="!item.status"
                    v-model="item.companyRatio1"
                    placeholder="请填写基数下限"
                  ></el-input>
                </el-form-item>
                <span>%</span>
              </p>

              <p v-if="item.optionName=='医疗保险'" class="radio_else">
                <el-form-item
                  :prop="item.status ? `socialDate.${index}.personalRatio1`:`socialDate.${index}.id`"
                  :rules="socialDateRules.personalRatio1"
                >
                  <el-input
                    type="number"
                    :disabled="!item.status"
                    v-model="item.personalRatio1"
                    placeholder="请填写"
                  ></el-input>
                  <span>%</span>
                  <span>+</span>
                </el-form-item>
                <el-form-item
                  :prop="item.status ? `socialDate.${index}.exFee1`:`socialDate.${index}.id`"
                  :rules="socialDateRules.exFee1"
                >
                  <el-input :disabled="!item.status" v-model="item.exFee1" placeholder="请填写"></el-input>
                  <span>元</span>
                </el-form-item>
              </p>
              <p v-else class="radio1">
                <el-form-item
                  :prop="item.status ? `socialDate.${index}.personalRatio1`:`socialDate.${index}.id`"
                  :rules="socialDateRules.personalRatio1"
                >
                  <el-input
                    type="number"
                    :disabled="!item.status"
                    v-model="item.personalRatio1"
                    placeholder="请填写基数下限"
                  ></el-input>
                </el-form-item>
                <span>%</span>
              </p>
            </el-col>
            <el-col :span="5">
              <p class="radio1">
                <el-form-item
                  :prop="item.status ? `socialDate.${index}.companyRatio2`:`socialDate.${index}.id`"
                  :rules="socialDateRules.companyRatio2"
                >
                  <el-input
                    type="number"
                    :disabled="!item.status"
                    v-model="item.companyRatio2"
                    placeholder="请填写基数下限"
                  ></el-input>
                </el-form-item>
                <span>%</span>
              </p>
              <p v-if="item.optionName=='医疗保险'" class="radio_else">
                <el-form-item
                  :prop="item.status ? `socialDate.${index}.personalRatio2`:`socialDate.${index}.id`"
                  :rules="socialDateRules.personalRatio2"
                >
                  <el-input
                    type="number"
                    :disabled="!item.status"
                    v-model="item.personalRatio2"
                    placeholder="请填写"
                  ></el-input>
                  <span>%</span>
                  <span>+</span>
                </el-form-item>
                <el-form-item
                  :prop="item.status ? `socialDate.${index}.exFee2`:`socialDate.${index}.id`"
                  :rules="socialDateRules.exFee2"
                >
                  <el-input
                    type="number"
                    :disabled="!item.status"
                    v-model="item.exFee2"
                    placeholder="请填写"
                  ></el-input>
                  <span>元</span>
                </el-form-item>
              </p>
              <p v-else class="radio1">
                <el-form-item
                  :prop="item.status ? `socialDate.${index}.personalRatio2`:`socialDate.${index}.id`"
                  :rules="socialDateRules.personalRatio2"
                >
                  <el-input
                    type="number"
                    :disabled="!item.status"
                    v-model="item.personalRatio2"
                    placeholder="请填写基数下限"
                  ></el-input>
                </el-form-item>
                <span>%</span>
              </p>
            </el-col>
            <el-col :span="2">
              <el-switch v-model="item.status" active-color inactive-color="#d4d3d3"></el-switch>
            </el-col>
          </div>
          <div class="addtr" @click="addtr">
            <span>+ 添加更多自定义缴纳项</span>
          </div>
        </div>
        <div class="social" style="padding-bottom: 90px;">
          <p>
            <span>公积金</span>
            <span>共{{fundlNum}}个缴纳项</span>
          </p>
          <p class="social_header">
            <el-col style="text-align:center" :span="3">缴纳项名称</el-col>
            <el-col style="text-align:center" :span="7">
              基数范围
              <el-checkbox v-model="fundChecked" style="margin-left:8px">是否自动匹配所有缴纳项</el-checkbox>
            </el-col>
            <el-col style="text-align:center" :span="2">缴纳对象</el-col>
            <el-col style="text-align:center" :span="5">城镇户口缴纳比例</el-col>
            <el-col style="text-align:center" :span="5">非城镇户口缴纳比例</el-col>
            <el-col style="text-align:center" :span="2">是否缴纳</el-col>
          </p>
          <div class="social_data" v-for="(item,index) in form.fundDate" :key="index">
            <el-col :span="3">
              <el-form-item
                v-if="index>=2"
                :prop="item.status ? `fundDate.${index}.optionName`:`fundDate.${index}.id`"
                :rules="fundDateRules.optionName"
                style="padding-top: 35px;"
              >
                <el-input
                  :disabled="!item.status"
                  style="width:80%"
                  v-model="item.optionName"
                  placeholder="请填写名称"
                ></el-input>
                <i style="cursor: pointer;" class="el-icon-delete" @click="del_fund(index)"></i>
              </el-form-item>
              <p v-else>{{item.optionName}}</p>
            </el-col>
            <el-col :span="7" class="base">
              <el-form-item
                style="width:55%"
                :prop="item.status ? `fundDate.${index}.baseStart`:`fundDate.${index}.id`"
                :rules="fundDateRules.baseStart"
              >
                <el-input
                  type="number"
                  @input="inp_inputStart1"
                  :disabled="!item.status"
                  style="width:85%"
                  v-model="item.baseStart"
                  placeholder="请填写基数下限"
                ></el-input>&nbsp; ㅡ
              </el-form-item>
              <el-form-item
                style="width:45%"
                :prop="item.status ? `fundDate.${index}.baseEnd`:`fundDate.${index}.id`"
                :rules="fundDateRules.baseEnd"
              >
                <el-input
                  type="number"
                  @input="inp_inputEnd1"
                  :disabled="!item.status"
                  style="width:100%"
                  v-model="item.baseEnd"
                  placeholder="请填写基数上限"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <p style="height:50px;line-height:50px;">公司</p>
              <p style="height:50px;line-height:50px;">个人</p>
            </el-col>
            <el-col :span="5">
              <p class="radio1">
                <el-form-item
                  :prop="item.status ? `fundDate.${index}.companyRatio1`:`fundDate.${index}.id`"
                  :rules="fundDateRules.companyRatio1"
                >
                  <el-input
                    type="number"
                    :disabled="!item.status"
                    v-model="item.companyRatio1"
                    placeholder="请填写基数下限"
                  ></el-input>
                </el-form-item>
                <span>%</span>
              </p>

              <p class="radio1">
                <el-form-item
                  :prop="item.status ? `fundDate.${index}.personalRatio1`:`fundDate.${index}.id`"
                  :rules="fundDateRules.personalRatio1"
                >
                  <el-input
                    type="number"
                    :disabled="!item.status"
                    v-model="item.personalRatio1"
                    placeholder="请填写基数下限"
                  ></el-input>
                </el-form-item>
                <span>%</span>
              </p>
            </el-col>
            <el-col :span="5">
              <p class="radio1">
                <el-form-item
                  :prop="item.status ? `fundDate.${index}.companyRatio2`:`fundDate.${index}.id`"
                  :rules="fundDateRules.companyRatio2"
                >
                  <el-input
                    type="number"
                    :disabled="!item.status"
                    v-model="item.companyRatio2"
                    placeholder="请填写基数下限"
                  ></el-input>
                </el-form-item>
                <span>%</span>
              </p>
              <p class="radio1">
                <el-form-item
                  :prop="item.status ? `fundDate.${index}.personalRatio2`:`fundDate.${index}.id`"
                  :rules="fundDateRules.personalRatio2"
                >
                  <el-input
                    type="number"
                    :disabled="!item.status"
                    v-model="item.personalRatio2"
                    placeholder="请填写基数下限"
                  ></el-input>
                </el-form-item>
                <span>%</span>
              </p>
            </el-col>
            <el-col :span="2">
              <el-switch v-model="item.status" active-color inactive-color="#d4d3d3"></el-switch>
            </el-col>
          </div>
          <div class="addtr" @click="addfund">
            <span>+ 添加更多自定义缴纳项</span>
          </div>
        </div>
      </el-form>
    </div>
    <!-- <div class="package">
      <social></social>
      <fund></fund>
    </div>-->
    <div class="footer">
      <el-button @click="Return">取消</el-button>
      <el-button type="primary" @click="submit('form')">提交</el-button>
    </div>
  </div>
</template>

<script>
import social from "./social";
import fund from "./fund";
import { log } from "util";
export default {
  data() {
    var numValue = (rule, value, callback) => {
      if (!value) {
        callback(new Error("不可为空"));
        return false;
      } else {
        value = value.toString();
        if (0 > value || value > 9999) {
          callback(new Error("范围在0-9999之间"));
        }
        if (value.split(".")[1]) {
          if (value.split(".")[1].length > 2) {
            callback(new Error("只能保留两位小数点"));
          } else {
            callback();
          }
        }
      }
      callback();
    };
    var percentileValue = (rule, value, callback) => {
      console.log(value);
      if (!value) {
        callback(new Error("不可为空"));
        return false;
      } else {
        console.log(value);
        console.log(value < 0.01);
        if (0.01 > value || value > 100) {
          callback(new Error("范围在0.01-100之间"));
        }
      }
      callback();
    };
    return {
      mainCompanyList: [], //缴纳主体
      provinceList: [], //省
      cityList: [], //区
      form: {
        checkbox: true,
        socialDate: [],
        fundDate: [],
        cityValue: "",
        provinceValue: "",
        mainCompanyId: "",
        planName: ""
      },
      socialDateRules: {
        optionName: [
          { required: true, message: "请填写缴纳项名称", trigger: "blur" }
        ],
        baseStart: [{ required: true, validator: numValue }],
        baseEnd: [{ required: true, validator: numValue }],
        companyRatio1: [{ required: true, validator: percentileValue }],
        personalRatio1: [{ required: true, validator: percentileValue }],
        companyRatio2: [{ required: true, validator: percentileValue }],
        personalRatio2: [{ required: true, validator: percentileValue }],
        exFee1: [{ required: true, validator: numValue }],
        exFee2: [{ required: true, validator: numValue }]
      },
      fundDateRules: {
        optionName: [
          { required: true, message: "请填写缴纳项名称", trigger: "blur" }
        ],
        baseStart: [{ required: true, validator: numValue }],
        baseEnd: [{ required: true, validator: numValue }],
        companyRatio1: [{ required: true, validator: percentileValue }],
        personalRatio1: [{ required: true, validator: percentileValue }],
        companyRatio2: [{ required: true, validator: percentileValue }],
        personalRatio2: [{ required: true, validator: percentileValue }]
      },
      socialNum: "",
      fundlNum: "",
      socialChecked: true,
      fundChecked: true,
      rules: {
        planName: [
          { required: true, message: "请填写方案名称", trigger: "blur" }
        ],
        mainCompanyId: [
          {
            required: true,
            message: "请选择缴纳主体",
            trigger: "change"
          }
        ],
        provinceValue: [
          {
            required: true,
            message: "请选择缴纳省",
            trigger: "change"
          }
        ],
        cityValue: [
          {
            required: true,
            message: "请选择缴纳区",
            trigger: "change"
          }
        ]
      },
      cityCode: ""
    };
  },
  //   components: {
  //     social,
  //     fund
  //   },
  methods: {
    Return() {
      this.$router.push({ path: "/welfareSet" });
    },
    //社保基数范围input事件
    inp_inputStart(val) {
      if (this.socialChecked) {
        this.form.socialDate.map(item => {
          item.baseStart = val;
        });
      }
    },
    inp_inputEnd(val) {
      if (this.socialChecked) {
        this.form.socialDate.map(item => {
          item.baseEnd = val;
        });
      }
    },
    //公积金基数范围input事件
    inp_inputStart1(val) {
      if (this.fundChecked) {
        this.form.fundDate.map(item => {
          item.baseStart = val;
        });
      }
    },
    inp_inputEnd1(val) {
      if (this.fundChecked) {
        this.form.fundDate.map(item => {
          item.baseEnd = val;
        });
      }
    },
    //是否启用
    checkboxChange(val) {
      this.checkbox = val;
    },
    //删除社保
    del_social(index) {
      this.form.socialDate.splice(index, 1);
    },
    //删除公积金
    del_fund(index) {
      this.form.fundDate.splice(index, 1);
    },
    //添加社保
    addtr() {
      this.form.socialDate.push({
        optionName: "",
        baseStart: null,
        baseEnd: null,
        companyRatio1: null,
        personalRatio1: null,
        companyRatio2: null,
        personalRatio2: null,
        status: true,
        statusT: true,
        optionType: 1,
        isTrue: "111"
      });
    },
    //添加公积金
    addfund() {
      this.form.fundDate.push({
        optionName: "",
        baseStart: null,
        baseEnd: null,
        companyRatio1: null,
        personalRatio1: null,
        companyRatio2: null,
        personalRatio2: null,
        status: true,
        statusT: true,
        optionType: 2,
        exFee1: 0,
        exFee2: 0,
        isTrue: "111"
      });
    },

    //提交
    submit(form) {
      let obj = {};
      let url;
      obj.companyId = 1;
      obj.planName = this.form.planName; //方案名称
      obj.mainCompanyId = this.form.mainCompanyId; //主体
      obj.provinceId = this.form.provinceValue; //省
      obj.cityId = this.form.cityValue; //区
      obj.status = this.form.checkbox ? 1 : 2; //是否启用
      obj.insurances = this.form.socialDate; //公积金
      obj.funds = this.form.fundDate; //公积金
      if (this.$route.query.id) {
        url = "/fundPlanList/updateFundPlan";
        obj.id = this.$route.query.id;
      } else {
        url = "/fundPlanList/addFundPlan";
      }
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.form.fundDate.map(item => {
            item.status = item.status == true ? 2 : 1;
          });
          this.form.socialDate.map(item => {
            item.status = item.status == true ? 2 : 1;
          }); //社保
          this.$http.post(url, obj).then(res => {
            if (res.code == 0) {
              this.$router.push({ path: "/welfareSet" });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //缴纳主体
    getMainList() {
      this.$http
        .get("/fundPlanList/queryMainList", {
          params: {
            companyId: 1
          }
        })
        .then(res => {
          if (res.code == 0) {
            this.mainCompanyList = res.result;
          }
        });
    },
    //或取省
    getProvince() {
      this.$http
        .get("/fundPlanList/getAddress", {
          params: {
            parentId: 1
          }
        })
        .then(res => {
          if (res.code == 0) {
            this.provinceList = res.result;
          }
        });
    },
    //省change
    provinceChange(val) {
      this.form.provinceValue = val;
      this.form.cityValue = "";
      this.getCity(val);
    },
    //获取区
    getCity(val) {
      this.$http
        .get("/fundPlanList/getAddress", {
          params: {
            parentId: val
          }
        })
        .then(res => {
          if (res.code == 0) {
            this.cityList = res.result;
          }
        });
    },
    //获取社保方案项
    getSocialList() {
      this.$http
        .get("/fundPlanList/getOptionList", {
          params: {
            companyId: 1
          }
        })
        .then(res => {
          if (res.code == 0) {
            this.form.socialDate = res.result.insurance;
            this.socialNum = this.form.socialDate.length;
            if (this.form.socialDate) {
              this.form.socialDate.map(item => {
                delete item.type;
                delete item.addTime;
                delete item.updateTime;
                item.status = item.status == 1 ? true : false;
              });
            }

            this.form.fundDate = res.result.fund;
            this.fundlNum = this.form.fundDate.length;
            if (this.form.fundDate) {
              this.form.fundDate.map(item => {
                delete item.type;
                delete item.addTime;
                delete item.updateTime;
                item.status = item.status == 1 ? true : false;
              });
            }
          }
        });
    },
    //编辑获取数据
    getList(id) {
      this.$http
        .get("/fundPlanList/getDetail", {
          params: {
            id: id
          }
        })
        .then(res => {
          if (res.code == 0) {
            this.form.planName = res.result.planName;
            this.form.mainCompanyId = res.result.mainCompanyId;
            this.form.provinceValue = Number(res.result.provinceId);
            this.form.checkbox = res.result.status == 1 ? true : false;
            this.getCity(this.form.provinceValue);
            this.form.cityValue = Number(res.result.cityId);
            this.form.socialDate = res.result.insurances;
            this.form.socialDate.map(item => {
              item.status = item.status == 1 ? true : false;
            });
            this.form.fundDate = res.result.funds;
            this.form.fundDate.map(item => {
              item.status = item.status == 1 ? true : false;
            });
          }
        });
    }
  },
  created() {
    this.getMainList();
    this.getProvince();
    this.getSocialList();
    if (this.$route.query.id) {
      this.getList(this.$route.query.id);
    }
  }
};
</script>

<style scoped lang="less">
.planView {
  margin: 0 20px 0 19px;

  /deep/.el-input__inner {
    font-size: 13px;
    font-weight: 400;
    // color: rgba(189, 193, 198, 1);
  }

  .breadcrumb {
    height: 52px;
    padding: 17px 10px 0;
    position: relative;
    /deep/.el-breadcrumb {
      float: left;
      font-size: 13px;
      font-weight: 500;
      color: rgba(153, 153, 153, 1);
    }
    /deep/.el-button {
      position: absolute;
      padding: 8px 15px;
      right: 0;
    }

    // .breadcrumb_r {
    //   padding: 5px 18px;
    //   float: right;
    //   text-align: center;
    //   font-size: 12px;
    //   font-weight: 500;
    //   border: 1px solid #b0b0b0;
    //   color: rgba(102, 102, 102, 1);
    // }
  }

  .viewDetails {
    padding-bottom: 60px;

    // height: 55px;
    min-height: e("calc(100vh - 255px)");
    // padding: 18px 0 6px 30px;
    margin-bottom: 10px;
    // background: rgba(255, 255, 255, 1);
    // box-shadow: 2px 0px 16px 0px rgba(3, 33, 136, 0.2);
    // border-radius: 4px;

    /deep/.el-input {
      font-size: 12px;
    }

    /deep/.el-form-item {
      float: left;
      margin-bottom: 0;

      .el-form-item__label {
        font-size: 12px;
      }

      /deep/.el-form-item__content {
        margin-right: 10px;
      }
    }

    .radio-btn {
      /deep/.el-radio {
        top: 0;
        margin-right: -67px;
      }

      /deep/.el-radio__input {
        visibility: inherit;
      }

      /deep/.el-radio__label {
        background: transparent;
        font-size: 14px;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.65);
        margin-left: 5px;
      }
    }
  }

  .con_form {
    & > div:nth-child(1) {
      height: 50px;
      padding: 18px 20px;
      background: #fff;
      border-radius: 4px;
      box-shadow: 2px 0px 16px 0px rgba(3, 33, 136, 0.2);
    }
  }
  .package {
    background: white;
    padding: 0 30px 18px;
  }

  .footer {
    width: e("calc(100vw - 200px)");
    line-height: 60px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 2px 0px 16px 0px rgba(3, 33, 136, 0.2);
    border-radius: 4px;
    text-align: center;
    position: fixed;
    bottom: 0;
    z-index: 1;

    /deep/.el-button {
      width: 80px;
      height: 28px;
      border-radius: 2px;
    }
  }
}
.social {
  margin-top: 20px;
  padding: 0 30px;
  background: #fff;
  padding-bottom: 40px;
  & > p:nth-child(1) {
    border-bottom: 1px solid #dedede;
    padding: 15px 0;
    position: relative;
    & > span:nth-child(1) {
      font-size: 14px;
      font-weight: 600;
      color: rgba(38, 127, 246, 1);
    }
    & > span:nth-child(2) {
      position: absolute;
      right: 0;
      font-size: 13px;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      border-left: 1px solid #dedede;
      padding-left: 19px;
    }
  }
}
.social_header {
  height: 50px;
  line-height: 50px;
  background: #f7f7f7;
  color: #333;
  font-weight: 600;
  font-size: 14px;
  margin-top: 10px;
  /deep/ .el-checkbox {
    color: #333;
    font-weight: 600;
  }
}
.social_data {
  background: #fff;
  height: 120px;
  line-height: 120px;
  margin-top: 10px;
  /deep/.el-col {
    text-align: center;
    height: 120px;
    line-height: 120px;
    padding: 5px 0;
  }
}
.base {
  /deep/ .el-form-item {
    padding-top: 35px;
  }
}
.radio1 {
  height: 60px;
  line-height: 45px;
  padding-right: 5px;
  /deep/.el-form-item {
    width: 85%;
  }
  /deep/.el-form-item__content {
    margin-right: 0 !important;
  }
}
.radio_else {
  height: 60px;
  line-height: 45px;
  padding-right: 5px;
  /deep/.el-form-item {
    width: 50%;
    /deep/ .el-input {
      width: 70%;
    }
  }
  /deep/.el-form-item__content {
    margin-right: 0 !important;
  }
}
.addtr {
  line-height: 32px;
  text-align: center;
  background: rgba(255, 255, 255, 1);
  border-radius: 4px;
  border: 1px dashed rgba(102, 102, 102, 1);
  font-size: 14px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.65);
  margin-top: 10px;
  cursor: pointer;
}
/deep/.el-form-item.is-success .el-input__inner {
  border-color: #dcdfe6 !important;
}
// 处理input type = number的上下箭头
/deep/input::-webkit-outer-spin-button,
/deep/input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
}
/deep/input[type="number"] {
  -moz-appearance: textfield !important;
}
</style>