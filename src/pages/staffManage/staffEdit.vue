<template>
    <div class="staffEdit">
        <div class="detail_header">

            <!-- <employeeComm></employeeComm> -->
            <div class="dh_top">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <!-- <el-breadcrumb-item><a href="/">员工管理</a></el-breadcrumb-item> -->
                    <el-breadcrumb-item>员工列表</el-breadcrumb-item>
                    <el-breadcrumb-item>员工详情</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="dh_bottom">
                <dl class="dh_bottom_l">
                    <div class="avatar">
                        <el-upload style="float: left" class="avatar-uploader"
                            action="http://gateway.testlvzheng.com/common-api/fileupload/upload" :show-file-list="false"
                            :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </div>
                    <dd>
                        <div class="dh_bottom_l_mess" style="line-height:36px;">
                            <strong>{{empInformation.empList.empName?empInformation.empList.empName:'---'}}</strong>
                            <!--  === 1?'全职':''|| empContracts.empListDO.empType === 2?'兼职':''
                                    || empContracts.empListDO.empType === 3?'实习':''|| empContracts.empListDO.empType === 4?'外派':'' -->
                            <!-- <span>全职</span>
                            <span style="background:rgba(17,207,73,1)">转正</span> -->
                        </div>
                        <ul>
                            <li><span>岗位：</span><span>{{empInformation.empList.depId?empInformation.empList.depId:''}}</span>&nbsp;-&nbsp;<span>{{empInformation.empList.position?empInformation.empList.position:'---'}}</span>
                            </li>
                            <!-- <li><span>入职日期：</span>2年5天</li> -->
                            <li><span>入职时间：</span>{{empInformation.empList.entryTime?empInformation.empList.entryTime:'---'}}
                            </li>
                        </ul>
                    </dd>
                </dl>
            </div>
        </div>
        <div id="staffEdit">
            <div class="message">
                <div class="detail_mess" id="nice-scroll">
                    <div class="aside">
                        <ul direction="vertical" finish-status="wait" :active="activeStep">
                            <li v-for="(item, index) in stepsArr" :key="index" :title="item.title" @click="jump(index)"
                                :class="[index === activeStep?'clickbtn':'']">
                                {{item.title}}
                            </li>
                        </ul>
                    </div>
                    <el-form class="aside_search" :inline="true" label-width="100px" :rules="rules"
                        :model="empInformation" ref="empInformation">
                        <div class="basic step-jump activeStep">
                            <h3>基本信息</h3>
                            <el-form class="demo-ruleForm">
                                <el-form-item prop="empName">
                                    <h6>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：</h6>
                                    <em></em>
                                    <el-input v-model="empInformation.empList.empName" placeholder="请填写"></el-input>
                                </el-form-item>
                                <el-form-item prop="sex">
                                    <h6>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：</h6>
                                    <em></em>
                                    <el-select v-model="empInformation.empList.sex" placeholder="请选择">
                                        <el-option label="男" value="1"></el-option>
                                        <el-option label="女" value="2"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item class="pact" prop="mainCompanyId">
                                    <h6>合同主体：</h6>
                                    <em></em>
                                    <el-select v-model="empInformation.empList.mainCompanyId" placeholder="请选择">
                                        <el-option v-for="(item,index) in companyId" :key="index"
                                            :label="item.mainCompanyName" :value="item.mainCompanyId">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item class="section" prop="depId">
                                    <h6>部&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;门：</h6>
                                    <em></em>
                                    <el-input v-model="empInformation.empList.depId" placeholder="请填写"></el-input>
                                    <i class="iconfont icon-tianjia" @click="staffSection"></i>
                                </el-form-item>

                                <el-form-item prop="position">
                                    <h6>职&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;位：</h6>
                                    <em></em>
                                    <el-input v-model="empInformation.empList.position" placeholder="请填写"></el-input>
                                </el-form-item>
                                <el-form-item class="pact" prop="empType">
                                    <h6>员工类型：</h6>
                                    <em></em>
                                    <!-- （1-全职，2-兼职，3-实习，4-外派）  -->
                                    <el-select v-model="empInformation.empList.empType" placeholder="请选择">
                                        <el-option label="全职" value="1"></el-option>
                                        <el-option label="兼职" value="2"></el-option>
                                        <el-option label="实习" value="3"></el-option>
                                        <el-option label="外派" value="4"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item class="section pact icon">
                                    <h6>员工工号：</h6>
                                    <!-- <em></em> -->
                                    <el-input v-model="empInformation.empList.empNum" placeholder="请填写"></el-input>
                                    <!-- <i class="iconfont icon-yuangongguanli" @click="staff"></i> -->
                                    <i class="iconfont icon-yuangongguanli"></i>
                                </el-form-item>
                                <el-form-item class="pact date" prop="entryTime">
                                    <h6>入职日期：</h6>
                                    <em></em>
                                    <el-date-picker type="datetime" format="yyyy-MM-dd HH:mm:ss"
                                        value-format="yyyy-MM-dd HH:mm:ss" v-model="empInformation.empList.entryTime"
                                        placeholder="选择日期">
                                    </el-date-picker>
                                </el-form-item>

                                <el-form-item class="pact" prop="idCardType">
                                    <h6>证件类型：</h6>
                                    <em></em>
                                    <!-- （1-身份证，2-护照，3-军官证，4-港澳台同胞证） -->
                                    <el-select v-model="empInformation.empList.idCardType" placeholder="请选择">
                                        <el-option label="身份证" value="1"></el-option>
                                        <el-option label="护照" value="2"></el-option>
                                        <el-option label="军官证" value="3"></el-option>
                                        <el-option label="港澳台同胞证" value="4"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item class="pact" prop="idCardNum">
                                    <h6>证件号码：</h6>
                                    <em></em>
                                    <el-input v-model="empInformation.empList.idCardNum" placeholder="请填写"></el-input>
                                </el-form-item>
                                <el-form-item class="icon date">
                                    <h6>出生日期：</h6>
                                    <el-date-picker type="datetime" format="yyyy-MM-dd HH:mm:ss"
                                        value-format="yyyy-MM-dd HH:mm:ss" v-model="empInformation.empList.birthday"
                                        placeholder="选择日期">
                                    </el-date-picker>
                                </el-form-item>
                                <el-form-item class="pact" prop="telephone">
                                    <h6>手机号码：</h6>
                                    <em></em>
                                    <el-input v-model="empInformation.empList.telephone" placeholder="请填写"></el-input>
                                </el-form-item>

                                <el-form-item class="pact" prop="email">
                                    <h6>电子邮箱：</h6>
                                    <em></em>
                                    <el-input v-model="empInformation.empList.email" placeholder="请填写"></el-input>
                                </el-form-item>
                                <el-form-item class="pact" prop="highestEducation">
                                    <h6>最高学历：</h6>
                                    <em></em>
                                    <!-- （1-中专，2-高中，3-高职（大专），4-本科，5-硕士，6-博士，7-博士后） -->
                                    <el-select v-model="empInformation.empList.highestEducation" placeholder="请选择">
                                        <el-option label="中专" value="1"></el-option>
                                        <el-option label="高中" value="2"></el-option>
                                        <el-option label="高职（大专）" value="3"></el-option>
                                        <el-option label="本科" value="4"></el-option>
                                        <el-option label="硕士" value="5"></el-option>
                                        <el-option label="博士" value="6"></el-option>
                                        <el-option label="博士后" value="7"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item class="icon date">
                                    <h6>毕业院校：</h6>
                                    <el-input v-model="empInformation.empList.highEducationSchool" placeholder="请填写">
                                    </el-input>
                                </el-form-item>
                                <el-form-item class="icon">
                                    <h6>专&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;业：</h6>
                                    <el-input v-model="empInformation.empList.highEducationMajor" placeholder="请填写">
                                    </el-input>
                                </el-form-item>
                                <el-form-item class="date padh" prop="highEducationDegree">
                                    <h6>是否取得学位：</h6>
                                    <em></em>
                                    <el-select v-model="empInformation.empList.highEducationDegree" placeholder="请选择">
                                        <el-option label="是" value="1"></el-option>
                                        <el-option label="否" value="2"></el-option>
                                    </el-select>
                                </el-form-item>

                                <el-form-item class="date" prop="highEducationFinishDate">
                                    <h6>毕业时间：</h6>
                                    <em></em>
                                    <el-date-picker type="datetime" format="yyyy-MM-dd HH:mm:ss"
                                        value-format="yyyy-MM-dd HH:mm:ss"
                                        v-model="empInformation.empList.highEducationFinishDate" placeholder="选择日期">
                                    </el-date-picker>
                                </el-form-item>
                                <el-form-item class="pact" prop="nationalityId">
                                    <h6>民&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;族：</h6>
                                    <em></em>
                                    <el-select v-model="empInformation.empList.nationalityId" placeholder="请选择">
                                        <el-option v-for="(item,index) in nation" :key="index" :label="item.name"
                                            :value="item.id" />

                                    </el-select>
                                </el-form-item>
                                <el-form-item class="icon pact">
                                    <h6>籍&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;贯：</h6>
                                    <el-input v-model="empInformation.empList.birthplace" placeholder="请填写"></el-input>
                                </el-form-item>
                                <el-form-item class="icon pact">
                                    <h6>政治面貌：</h6>
                                    <!-- （1-党员，2-团员，3-群众 -->
                                    <el-select v-model="empInformation.empList.politicalStatus" placeholder="请选择">
                                        <el-option label="党员" value="1"></el-option>
                                        <el-option label="团员" value="2"></el-option>
                                        <el-option label="群众" value="3"></el-option>
                                    </el-select>
                                </el-form-item>

                                <el-form-item class="pact" prop="marriageStatus">
                                    <h6>婚姻状况：</h6>
                                    <em></em>
                                    <!-- 1-已婚，2-未婚） -->
                                    <el-select v-model="empInformation.empList.marriageStatus" placeholder="请选择">
                                        <el-option label="已婚" value="1"></el-option>
                                        <el-option label="未婚" value="2"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item class="pact" prop="haveChild">
                                    <h6>有无子女：</h6>
                                    <em></em>
                                    <!-- （1-有，2-无） -->
                                    <el-select v-model="empInformation.empList.haveChild" placeholder="请选择">
                                        <el-option label="有" value="1"></el-option>
                                        <el-option label="无" value="2"></el-option>
                                    </el-select>
                                </el-form-item>

                                <!-- <el-form-item class="icon pact">
                                    <h6>工作城市：</h6>
                                    <el-select v-model="information.sex" placeholder="请选择">
                                        <el-option label="男" value="1"></el-option>
                                        <el-option label="女" value="2"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item class="icon">
                                    <h6>工作地点：</h6>
                                    <el-input v-model="information.empList.accountLocation" placeholder="请填写"></el-input>
                                </el-form-item> -->

                                <el-form-item class="pact" prop="accountType">
                                    <h6>户口类型：</h6>
                                    <em></em>
                                    <!-- （1-城镇户口，2-农村户口） , -->
                                    <el-select v-model="empInformation.empList.accountType" placeholder="请选择">
                                        <el-option label="城镇户口" value="1"></el-option>
                                        <el-option label="农村户口" value="2"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item class="padfive" prop="accountLocation">
                                    <h6>户口所在地：</h6>
                                    <em></em>
                                    <el-input v-model="empInformation.empList.accountLocation" placeholder="请填写">
                                    </el-input>
                                </el-form-item>
                                <el-form-item class="icon padfive">
                                    <h6>现居住地址：</h6>
                                    <el-input v-model="empInformation.empList.homeAddress" placeholder="请填写"></el-input>
                                </el-form-item>
                                <el-form-item class="icon padfive padh">
                                    <h6>紧急联系人：</h6>
                                    <el-input v-model="empInformation.empList.emergContact" placeholder="请填写">
                                    </el-input>
                                </el-form-item>

                                <el-form-item class="date1 padh" prop="offcialDate">
                                    <h6>约定转正日期：</h6>
                                    <em></em>
                                    <el-date-picker type="datetime" format="yyyy-MM-dd HH:mm:ss"
                                        value-format="yyyy-MM-dd HH:mm:ss" v-model="empInformation.empList.offcialDate"
                                        placeholder="选择日期">
                                    </el-date-picker>
                                </el-form-item>
                                <el-form-item class="date1 padh" prop="actualCorrectionDate">
                                    <h6>实际转正日期：</h6>
                                    <em></em>
                                    <el-date-picker type="datetime" format="yyyy-MM-dd HH:mm:ss"
                                        value-format="yyyy-MM-dd HH:mm:ss"
                                        v-model="empInformation.empList.actualCorrectionDate" placeholder="选择日期">
                                    </el-date-picker>
                                </el-form-item>
                                <el-form-item class="icon lastphone padh">
                                    <h6>紧急联系电话：</h6>
                                    <el-input v-model="empInformation.empList.emergContactTelephone" placeholder="请填写">
                                    </el-input>
                                </el-form-item>
                            </el-form>
                        </div>
                        <div class="contract step-jump activeStep">
                            <h3 class="basic_instro" style="margin-top: 18px;">
                                合同信息
                            </h3>
                            <el-form class="demo-ruleForm">
                                <div class="information_first" v-for="(item,index) in empInformation.empContracts"
                                    :key="item.value">
                                    <h4>{{index+1}}</h4>
                                    <div class="contractMes">
                                        <el-row style="margin-bottom:10px;">
                                            <el-form-item prop="contractNum">
                                                <h6>合同编号：</h6>
                                                <em></em>
                                                <el-input v-model="item.contractNum" placeholder="请填写"></el-input>
                                            </el-form-item>
                                            <el-form-item prop="type">
                                                <h6>合同类型：</h6>
                                                <em></em>
                                                <el-select v-model="item.type" placeholder="请选择">
                                                    <el-option label="劳动合同" value="1"></el-option>
                                                    <el-option label="劳务合同" value="2"></el-option>
                                                    <el-option label="实习合同" value="3"></el-option>
                                                </el-select>
                                            </el-form-item>
                                            <el-form-item prop="companyId">
                                                <h6>合同公司：</h6>
                                                <em></em>
                                                <el-select v-model="item.mainCompanyId" placeholder="请选择">
                                                    <el-option v-for="(item,index) in companyId" :key="index"
                                                        :label="item.mainCompanyName" :value="item.mainCompanyId" />
                                                </el-select>
                                            </el-form-item>
                                        </el-row>
                                        <el-row>
                                            <el-form-item class="date padh" prop="contractSigningDate">
                                                <h6>合同签订日：</h6>
                                                <em></em>
                                                <el-date-picker type="datetime" format="yyyy-MM-dd HH:mm:ss"
                                                    value-format="yyyy-MM-dd HH:mm:ss"
                                                    v-model="item.contractSigningDate" placeholder="选择日期">
                                                </el-date-picker>
                                            </el-form-item>
                                            <el-form-item class="date padh" prop="startDate">
                                                <h6>合同生效日：</h6>
                                                <em></em>
                                                <el-date-picker type="datetime" format="yyyy-MM-dd HH:mm:ss"
                                                    value-format="yyyy-MM-dd HH:mm:ss" v-model="item.startDate"
                                                    placeholder="选择日期">
                                                </el-date-picker>
                                            </el-form-item>
                                            <el-form-item class="date padh" prop="endDate">
                                                <h6>合同结束日：</h6>
                                                <em></em>
                                                <el-date-picker type="datetime" format="yyyy-MM-dd HH:mm:ss"
                                                    value-format="yyyy-MM-dd HH:mm:ss" v-model="item.endDate"
                                                    placeholder="选择日期">
                                                </el-date-picker>
                                            </el-form-item>
                                        </el-row>
                                    </div>
                                </div>
                            </el-form>
                            <p @click='addContract' style="cursor:pointer">+ 添加更多历史合同信息</p>
                        </div>
                        <!-- <div class="salary step-jump activeStep">
                            <h3 class="basic_instro" style="margin-top: 18px;">
                                薪资信息
                            </h3>
                            <el-form class="demo-ruleForm">
                                <el-row>
                                    <el-form-item class="padh plan" style="margin-right:20px;">
                                        <h6>薪资方案：</h6>
                                        <el-select v-model="empInformation.empSalaryInfo.empPlanConfigVO.salaryPlanName"
                                            placeholder="请选择">
                                            <el-option v-for="(item,index) in empSalaryPlan" :key="index"
                                                :label="item.planName" :value="item.id" />
                                        </el-select>
                                        <i class="iconfont icon-tianjia" @click="salaryClick"></i>
                                    </el-form-item>
                                    <el-form-item class="date1 contractDate">
                                        <h6>全额计薪开始日：</h6>
                                        <em></em>
                                        <el-date-picker v-model="basic.entryDate" type="datetime"
                                            format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"
                                            placeholder="选择日期">
                                        </el-date-picker>
                                    </el-form-item>
                                </el-row>
                                <el-row>
                                    <el-form-item style="width:24%;">
                                        <h5>试用期各薪资项及金额</h5>
                                    </el-form-item>
                                    <el-form-item class="padfive">
                                        <h6>试用期薪资：</h6>
                                        <em></em>
                                        <el-input v-model="basic.name" placeholder="请填写"></el-input>
                                    </el-form-item><b>元/月</b>
                                    <el-form-item style="width:20%">
                                        <i class="font">交通补贴：</i>
                                        <i>200元/月</i>
                                    </el-form-item>
                                    <el-form-item>
                                        <i class="font">餐&nbsp;&nbsp;&nbsp;&nbsp;补：</i>
                                        <i>200元/月</i>
                                    </el-form-item>
                                </el-row>
                                <el-row>
                                    <el-form-item style="width:24%;">
                                        <h5>转正后各薪资项及金额</h5>
                                    </el-form-item>
                                    <el-form-item class="padfive">
                                        <h6 style="padding-right:22px;">基本薪资：</h6>
                                        <em></em>
                                        <el-input v-model="basic.name" placeholder="请填写"></el-input>
                                    </el-form-item><b>元/月</b>
                                    <el-form-item style="width:20%">
                                        <i class="font">交通补贴：</i>
                                        <i>200元/月</i>
                                    </el-form-item>
                                    <el-form-item>
                                        <i class="font">餐&nbsp;&nbsp;&nbsp;&nbsp;补：</i>
                                        <i>200元/月</i>
                                    </el-form-item>
                                </el-row> -->

                        <!-- <el-row class="wages">
                                    <el-form-item class="padh paycard">
                                        <h6>工资卡号<span>1</span>：</h6>
                                        <el-input v-model="empInformation.empSalaryInfo.empBankCardDOS.cardNum"
                                            placeholder="请填写"></el-input>
                                    </el-form-item>
                                    <el-form-item class="padh paycard">
                                        <h6>开户行：</h6>
                                        <el-input v-model="empInformation.empSalaryInfo.empBankCardDOS.bankSource"
                                            placeholder="这里显示用户行信息"></el-input>
                                    </el-form-item>
                                    <el-form-item class="padh paycard">
                                        <h6>用途描述：</h6>
                                        <el-input v-model="empInformation.empSalaryInfo.empBankCardDOS.remark"
                                            placeholder="这里显示用途"></el-input>
                                    </el-form-item>
                                </el-row> -->

                        <!-- <el-row class="wages1"
                                    v-for="(item,index) in empInformation.empSalaryInfo.empBankCardDOS"
                                    :key="item.value">
                                    <el-form-item class="padh paycard">
                                        <h6>工资卡号<span>{{index+1}}</span>：</h6>
                                        <el-input v-model="item.cardNum" placeholder="请填写"></el-input>
                                    </el-form-item>
                                    <el-form-item class="padh paycard">
                                        <h6>开户行：</h6>
                                        <el-input v-model="item.bankSource" placeholder="这里显示用户行信息"></el-input>
                                    </el-form-item>
                                    <el-form-item class="padh paycard">
                                        <h6>用途描述：</h6>
                                        <el-input v-model="item.remark" placeholder="这里显示用途"></el-input>
                                    </el-form-item>
                                </el-row>
                            </el-form>
                            <p @click='addWageCard' style="cursor:pointer">+ 添加更多工资卡</p>
                        </div> -->
                        <div class="welfare step-jump activeStep">
                            <h3 class="basic_instro" style="margin-bottom:23px;margin-top: 18px;">
                                社保福利
                            </h3>
                            <el-form class="demo-ruleForm">
                                <el-row>
                                    <el-form-item class="padh plansocial">
                                        <h6>社保公积金方案：</h6>
                                        <el-select v-model="empInformation.empFundPlan.planName" placeholder="请选择">
                                            <el-option v-for="(item,index) in planName" :key="index"
                                                :label="item.planName" :value="item.id" />
                                        </el-select>
                                        <i class="iconfont icon-tianjia" @click="scheme"></i>
                                    </el-form-item>
                                    <el-form-item class="padh plansocial">
                                        <h6>缴纳户口类型：</h6>
                                        <em v-if="isFundStart || isInsuranceStart"></em>
                                        <el-select v-model="empInformation.empFundPlan.fundBaseVO.feeAccountType"
                                            placeholder="请选择">
                                            <el-option label="城镇户口" value="1"></el-option>
                                            <el-option label="农村户口" value="2"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-row>
                                <el-row>
                                    <el-form-item class="date1">
                                        <h6>社保起缴月：</h6>
                                        <el-date-picker v-model="empInformation.empFundPlan.fundBaseVO.fundStart"
                                            type="datetime" format="yyyyMM" value-format="yyyyMM" placeholder="选择日期"
                                            clear-icon
                                            @blur="handleBlur(empInformation.empFundPlan.fundBaseVO.fundStart, 1)">
                                        </el-date-picker>
                                    </el-form-item>
                                    <el-form-item class="basicfund" style="padding-left:17px;">
                                        <h6>社保缴纳基数：</h6>
                                        <el-input v-model="empInformation.empFundPlan.fundBaseVO.fundBase"
                                            placeholder="请填写"></el-input>
                                    </el-form-item>
                                    <el-form-item class="date1">
                                        <h6>社保停缴月：</h6>
                                        <em v-if="isFundStart"></em>
                                        <el-date-picker v-model="empInformation.empFundPlan.fundBaseVO.fundEnd"
                                            type="datetime" format="yyyyMM" value-format="yyyyMM" placeholder="选择日期">
                                        </el-date-picker>
                                    </el-form-item>
                                </el-row>
                                <el-row>
                                    <el-form-item class="padh date1">
                                        <h6>公积金起缴月：</h6>
                                        <el-date-picker v-model="empInformation.empFundPlan.fundBaseVO.insuranceStart"
                                            type="datetime" format="yyyyMM" value-format="yyyyMM" placeholder="选择日期"
                                            clear-icon
                                            @blur="handleBlur(empInformation.empFundPlan.fundBaseVO.insuranceStart, 2)">
                                        </el-date-picker>
                                    </el-form-item>
                                    <el-form-item class="padh basicfund" style="padding-left:17px;">
                                        <h6>公积金缴纳基数：</h6>
                                        <el-input v-model="empInformation.empFundPlan.fundBaseVO.insuranceBase"
                                            placeholder="请填写"></el-input>
                                    </el-form-item>
                                    <el-form-item class="padh date1">
                                        <h6>公积金停缴月：</h6>
                                        <em v-if="isInsuranceStart"></em>
                                        <el-date-picker v-model="empInformation.empFundPlan.fundBaseVO.insuranceEnd"
                                            type="datetime" format="yyyyMM" value-format="yyyyMM" placeholder="选择日期">
                                        </el-date-picker>
                                    </el-form-item>
                                </el-row>
                            </el-form>
                        </div>
                        <div class="education step-jump activeStep">
                            <h3 class="basic_instro" style="margin-top: 18px;">
                                教育经历
                            </h3>
                            <el-form class="demo-ruleForm">
                                <el-row>
                                    <el-form-item>
                                        <h6>学校：</h6>
                                        <el-input v-model="empInformation.empEducations[0].school" placeholder="请填写">
                                        </el-input>
                                    </el-form-item>
                                    <el-form-item>
                                        <h6>专业：</h6>
                                        <el-input v-model="empInformation.empEducations[0].magor" placeholder="请填写">
                                        </el-input>
                                    </el-form-item>
                                    <el-form-item class="date">
                                        <h6>入学时间：</h6>
                                        <el-date-picker v-model="empInformation.empEducations[0].joinDate" type="datetime"
                                            format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"
                                            placeholder="选择日期">
                                        </el-date-picker>
                                    </el-form-item>
                                    <el-form-item class="date">
                                        <h6>结业时间：</h6>
                                        <el-date-picker v-model="empInformation.empEducations[0].finishDate"
                                            type="datetime" format="yyyy-MM-dd HH:mm:ss"
                                            value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期">
                                        </el-date-picker>
                                    </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-form-item label="是否取得学位：" class="degree">
                                    <el-radio-group v-model="empInformation.empEducations[0].degree">
                                        <el-radio label="是"></el-radio>
                                        <el-radio label="否"></el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </el-form>
                            <div class="education_picture">
                                <el-form-item prop="image" class="image"
                                    v-for="(item,index) in empInformation.empEducations[0].materList" :key="index">
                                    <em>教育证书照{{index+1}}：</em>
                                    <el-upload class="avatar-uploader" style="float: left"
                                        action="http://gateway.testlvzheng.com/common-api/fileupload/upload"
                                        :show-file-list="false" :on-success="handleAvatarSuccess"
                                        :before-upload="beforeAvatarUpload">
                                        <img v-if="item.materialPath" :src="'https://images.lvzheng.com/'+item.materialPath" class="avatar">
                                        <i v-else class="el-icon-plus avatar-uploader-icon">新增照片</i>
                                    </el-upload>
                                </el-form-item>
                            </div>
                            <p @click='addeduction' style="cursor:pointer" class="educationp">+ 添加更多照片信息</p>
                        </div>
                        <div class="train step-jump activeStep">
                            <h3 class="basic_instro" style="margin-top: 18px;">
                                培训经历
                            </h3>
                            <el-form class="demo-ruleForm" v-for="item in empInformation.empTrains" :key="item.value">
                                <el-row>
                                    <el-form-item class="institution">
                                        <h6>培训组织机构：</h6>
                                        <el-input v-model="item.school" placeholder="请填写">
                                        </el-input>
                                    </el-form-item>
                                    <el-form-item>
                                        <h6>培训内容：</h6>
                                        <el-input v-model="item.magor" placeholder="请填写">
                                        </el-input>
                                    </el-form-item>
                                    <el-form-item class="date1">
                                        <h6>培训起始时间：</h6>
                                        <el-date-picker v-model="item.joinDate" type="datetime"
                                            format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"
                                            placeholder="选择日期">
                                        </el-date-picker>
                                    </el-form-item>
                                    <el-form-item class="date1">
                                        <h6>培训终止时间：</h6>
                                        <el-date-picker v-model="item.finishDate" type="datetime"
                                            format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"
                                            placeholder="选择日期">
                                        </el-date-picker>
                                    </el-form-item>
                                </el-row>
                            </el-form>
                            <p @click='trainExperience' style="cursor:pointer">+ 添加更多培训经历</p>
                        </div>
                        <div class="work step-jump activeStep">
                            <h3 class="basic_instro" style="margin-top: 18px;">
                                工作经历
                            </h3>
                            <el-form class="demo-ruleForm" :key="item.value"
                                v-for="(item,index) in empInformation.empWorkings" style="margin-bottom: 20px;">
                                <el-row>
                                    <el-form-item class="padh">
                                        <h6>公司名称：</h6>
                                        <el-input v-model="item.companyNameOld" placeholder="请填写">
                                        </el-input>
                                    </el-form-item>
                                    <el-form-item class="padh">
                                        <h6>担任职位：</h6>
                                        <el-input v-model="item.position" placeholder="请填写">
                                        </el-input>
                                    </el-form-item>
                                    <el-form-item class="date">
                                        <h6>起始年月：</h6>
                                        <el-date-picker v-model="item.startDate" type="datetime"
                                            format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"
                                            placeholder="选择日期">
                                        </el-date-picker>
                                    </el-form-item>
                                    <el-form-item class="date padh">
                                        <h6>终止年月：</h6>
                                        <el-date-picker v-model="item.endDate" type="datetime"
                                            format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"
                                            placeholder="选择日期">
                                        </el-date-picker>
                                    </el-form-item>
                                    <el-form-item class="section">
                                        <h6>月收入：</h6>
                                        <el-input v-model="item.income" placeholder="请填写">
                                        </el-input>
                                    </el-form-item><b>元/月</b>
                                </el-row>
                                <el-row>
                                    <div class="workmess" style="margin-right:30px;">
                                        <h4>工作描述：</h4>
                                        <el-input type="textarea" placeholder="请填写" v-model="item.workDesc">
                                        </el-input>
                                    </div>
                                    <div class="work_mess">
                                        <h4>离职原因：</h4>
                                        <el-input type="textarea" placeholder="请填写" v-model="item.dimissionDesc">
                                        </el-input>
                                    </div>
                                </el-row>

                            </el-form>

                            <p @click='workExperience' style="cursor:pointer">+ 添加更多工作经历</p>
                        </div>

                        <div class="picture step-jump activeStep">
                            <h3 class="basic_instro" style="margin-top: 18px;">
                                上传图片
                            </h3>
                            <div class="picture_upload">
                                <el-form-item prop="image" class="image" v-for="(item,index) in empInformation.materialLists" :key="index">
                                    <em>图片<em>{{index+1}}</em>：</em>
                                    <el-upload class="avatar-uploader"
                                        action="http://gateway.testlvzheng.com/common-api/fileupload/upload"
                                        :show-file-list="false" :on-success="(value)=> handleAvatarSuccessImage(item, value)"
                                        :before-upload="beforeAvatarUpload">
                                        <img v-if="item.materialPath" :src="'https://images.lvzheng.com/'+item.materialPath" class="avatar">
                                        <i v-else class="el-icon-plus avatar-uploader-icon">新增照片</i>
                                    </el-upload>
                                </el-form-item>
                                <!-- <el-form-item prop="image1" class="image" v-for="(item,index) in empInformation.materialLists">
                                    <em>图片<em>{{index+2}}</em>：</em>
                                   <el-upload class="avatar-uploader"
                                        action="http://gateway.testlvzheng.com/common-api/fileupload/upload"
                                        :show-file-list="false" :on-success="handleAvatarSuccess"
                                        :before-upload="beforeAvatarUpload">
                                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                        <i v-else class="el-icon-plus avatar-uploader-icon">新增照片</i>
                                    </el-upload>
                                </el-form-item> -->
                            </div>
                            <p @click='addPicture' style="cursor:pointer">+ 添加更多图片信息</p>
                        </div>
                        <el-form-item class="footer">
                            <el-button @click="">取消</el-button>
                            <el-button type="primary" @click="onSubmit('empInformation')">提交</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>


        <!-- 引入弹框 -->
        <!-- <staffId v-if="staffIdVisible" :staffIdVisible.sync="staffIdVisible"></staffId> -->
        <staffCompany v-if="companyVisible" :companyVisible.sync="companyVisible"></staffCompany>
        <department v-if="departmentVisible" :departmentVisible.sync="departmentVisible"></department>
    </div>


</template>

<script>
    // import staffId from '../../components/employee/staffId.vue'
    import staffCompany from '../../components/employee/company.vue'
    import department from '../../components/employee/department.vue'
    import nation from './nation'

    // import vuescroll from 'vuescroll';
    export default {
        data() {
            return {
                imageUrl: '',

                loading: '',   //加载
                nation: {},  //民族

                planName: [],// 社保方案
                empSalaryPlan: [],  //薪资方案
                companyId: [],

                // 锚点
                activeStep: 0,
                num: 2,
                departmentVisible: false,
                // staffIdVisible: false,
                companyVisible: false,

                show: true,

                isFundStart: false,
                isInsuranceStart: false,

                // 锚点
                stepsArr: [
                    { title: '基本信息' },
                    { title: '合同信息' },
                    { title: '薪资信息' },
                    { title: '福利信息' },
                    { title: '教育经历' },
                    { title: '培训经历' },
                    { title: '工作经历' },
                    { title: '图片附件' }
                ],

                // 员工信息
                empInformation: {
                    empList: {  //基本信息
                        companyId: 1,
                        empId: null,
                        empName: null,
                        sex: null,
                        mainCompanyId: null,
                        position: null,
                        depId: 190710000001707,
                        empType: null,
                        empNum: null,
                        entryTime: null,
                        idCardType: null,
                        idCardNum: null,
                        birthday: null,
                        telephone: null,
                        email: null,
                        highestEducation: null,
                        highEducationSchool: null,
                        highEducationMajor: null,
                        highEducationDegree: null,
                        highEducationFinishDate: null,
                        nationalityId: null,
                        birthplace: null,
                        politicalStatus: null,
                        marriageStatus: null,
                        haveChild: null,
                        accountType: null,
                        accountLocation: null,
                        homeAddress: null,
                        emergContact: null,
                        offcialDate: null,
                        actualCorrectionDate: null,
                        emergContactTelephone: null
                    },
                    empContracts: [  //合同信息
                        {
                            companyId: 1,
                            empId: null,
                            contractNum: null,
                            type: null,
                            mainCompanyId: null,
                            contractSigningDate: null,
                            endDate: null,
                            startDate: null

                        }
                    ],
                    empFundPlan: {    //社保信息   
                        companyId: 1,
                        empId: null,
                        planId: 0,
                        planName: null,
                        fundBaseVO: {
                            feeAccountType: null,
                            fundBase: null,
                            fundEnd: null,
                            fundStart: null,
                            insuranceBase: null,
                            insuranceEnd: null,
                            insuranceStart: null
                        }
                    },
                    empTrains: [    //培训经历
                        {
                            companyId: 1,
                            empId: null,
                            finishDate: null,
                            joinDate: null,
                            magor: null,
                            school: null
                        }
                    ],
                    // empSalaryInfo: {   //薪资信息
                    //     empBankCardDOS: [
                    //         {
                    //             bankSource: null,
                    //             cardNum: null,
                    //             remark: null,
                    //         }
                    //     ],
                    //     empPlanConfigVO: {
                    //         companyId: 0,
                    //         empId: 0,
                    //         empSalarys: [
                    //             {
                    //                 beforeFee: 0,
                    //                 companyId: 0,
                    //                 configId: 0,
                    //                 empId: 0,
                    //                 fee: 0,
                    //                 id: 0,
                    //                 month: 0,
                    //                 optionId: 0,
                    //                 optionName: null,
                    //                 planId: 0,
                    //                 status: 0
                    //             }
                    //         ],
                    //         id: 0,
                    //         mapId: 0,
                    //         month: 0,
                    //         planId: 0,
                    //         salaryPlanName: null,
                    //         status: 0,
                    //         type: 0
                    //     },
                    //     month: 0,
                    //     salaryAndTotalVO: {
                    //         columns: {
                    //             allowance: {},
                    //             fund: {},
                    //             stable: {},
                    //             sub: {},
                    //             unstable: {}
                    //         },
                    //         companyCost: 0,
                    //         empSalarys: [
                    //             {
                    //                 actualTotal: 0,
                    //                 addtionalOption: {
                    //                     perIncomeTax: 0,
                    //                     perIncomeTotal: 0,
                    //                     perMonthSub1: 0,
                    //                     perMonthSub2: 0,
                    //                     perMonthSub3: 0,
                    //                     perMonthSub4: 0,
                    //                     perMonthSub5: 0,
                    //                     perSubTotal: 0,
                    //                     preIncomeTotal: 0,
                    //                     preSubTotal: 0
                    //                 },
                    //                 allowanceOptionList: [
                    //                     {
                    //                         optionFee: 0,
                    //                         optionId: 0,
                    //                         optionName: null,
                    //                         optionType: 0,
                    //                         planId: 0
                    //                     }
                    //                 ],
                    //                 attendanceSalary: 0,
                    //                 attendanceSubFee: 0,
                    //                 depId: 0,
                    //                 depName: null,
                    //                 empId: 0,
                    //                 empName: null,
                    //                 empNum: null,
                    //                 empStatus: 0,
                    //                 empType: 0,
                    //                 fundOptionList: [
                    //                     {
                    //                         optionFee: 0,
                    //                         optionId: 0,
                    //                         optionName: null,
                    //                         optionType: 0,
                    //                         planId: 0
                    //                     }
                    //                 ],
                    //                 officialAttendance: 0,
                    //                 orgAttendance: 0,
                    //                 orgTotal: 0,
                    //                 personalLateFee: 0,
                    //                 planId: 0,
                    //                 planName: null,
                    //                 position: null,
                    //                 remark: null,
                    //                 salaryId: 0,
                    //                 stableOptionList: [
                    //                     {
                    //                         optionFee: 0,
                    //                         optionId: 0,
                    //                         optionName: null,
                    //                         optionType: 0,
                    //                         planId: 0
                    //                     }
                    //                 ],
                    //                 subOptionList: [
                    //                     {
                    //                         optionFee: 0,
                    //                         optionId: 0,
                    //                         optionName: null,
                    //                         optionType: 0,
                    //                         planId: 0
                    //                     }
                    //                 ],
                    //                 supplyAddTotal: {
                    //                     id: 0,
                    //                     supplyTotal: 0,
                    //                     taxation: 0,
                    //                     type: 0
                    //                 },
                    //                 supplySubTotal: {
                    //                     id: 0,
                    //                     supplyTotal: 0,
                    //                     taxation: 0,
                    //                     type: 0
                    //                 },
                    //                 taxReduce: 0,
                    //                 trialAttendance: 0,
                    //                 unstableOptionList: [
                    //                     {
                    //                         optionFee: 0,
                    //                         optionId: 0,
                    //                         optionName: "string",
                    //                         optionType: 0,
                    //                         planId: 0
                    //                     }
                    //                 ]
                    //             }
                    //         ],
                    //         joinSalaryIds: [
                    //             0
                    //         ],
                    //         leaveSalaryIds: [
                    //             0
                    //         ],
                    //         month: 0,
                    //         salaryNum: 0,
                    //         salaryTotal: 0
                    //     }
                    // },
                    empWorkings: [    //工作经历
                        {
                            companyId: 1,
                            companyNameOld: null,
                            dimissionDesc: null,
                            endDate: null,
                            income: null,
                            position: null,
                            startDate: null,
                            workDesc: null,
                        }
                    ],

                    empEducations: [   //教育信息
                        {
                            companyId: 1,
                            empId: null,
                            school: null,
                            magor: null,
                            joinDate: null,
                            finishDate: null,
                            degree: null,
                            materList: [
                                {
                                    companyId: 1,
                                    depId:null,
                                    materialId: null,
                                    materialName: null,
                                    materialPath: null,
                                }
                            ],
                        }
                    ],
                    materialLists: [
                        {
                            companyId: 1,
                            materialId: null,
                            materialName: null,
                            materialPath: null,
                        }
                    ]
                },
                basic: {
                    name: '',
                    sex: '',
                    idNum: '',
                    entryDate: '',
                    section: '',
                    post: '',
                    major: '',
                    GraduateTime: '',
                    practical: '',
                    agreed: '',
                    workCity: '',
                    workAddress: '',
                    staffId: '',
                    staffType: '',
                    phoneNum: '',
                    IDType: '',
                    email: '',
                    graduate: '',
                    highEducation: '',
                    status: '',
                    dateBirth: '',
                    nation: '',
                    nativePlace: '',
                    type: '',
                    children: '',
                    marriage: '',
                    linkman: '',
                    phone: '',
                    address: '',
                    residentCity: '',
                    company: ''
                },
                welfare: {
                    scheme: '',
                    fund: '',
                    startSocial: '',
                    cardinal: '',
                    fundcardinal: '',
                    endSocial: '',
                    startfund: '',
                    endfund: '',
                    type: ''
                },


                // 验证
                rules: { 
                    empName: [
                        { required: true, message: '请输入姓名', trigger: 'change' }
                    ],
                    sex: [
                        { required: true, message: '请选择性别', trigger: 'change' }
                    ],
                    mainCompanyId: [
                        { required: true, message: '请选择公司主体', trigger: 'change' }
                    ],
                    depId: [
                        { required: true, message: '请选择部门', trigger: 'change' }
                    ],
                    position: [
                        { required: true, message: '请输入职位', trigger: 'change' }
                    ],
                    empType: [
                        { required: true, message: '请选择员工类型', trigger: 'change' }
                    ],
                    entryDate: [
                        { required: true, message: '请选择入职日期', trigger: 'change' }
                    ],
                    idCardType: [
                        { required: true, message: '请选择证件类型', trigger: 'change' }
                    ],
                    idCardNum: [
                        { required: true, message: '请输入证件号码', trigger: 'change' }
                    ],
                    telephone: [
                        { required: true, message: '请输入手机号码', trigger: 'change' }
                    ],
                    email: [
                        { required: true, message: '请输入电子邮箱', trigger: 'change' }
                    ],
                    highestEducation: [
                        { required: true, message: '请选择最高学历', trigger: 'change' }
                    ],
                    highEducationDegree: [
                        { required: true, message: '请选择学位', trigger: 'change' }
                    ],
                    highEducationFinishDate: [
                        { required: true, message: '请选择毕业时间', trigger: 'change' }
                    ],
                    nationalityId: [
                        { required: true, message: '请选择民族', trigger: 'change' }
                    ],
                    marriageStatus: [
                        { required: true, message: '请选择婚姻状况', trigger: 'change' }
                    ],
                    haveChild: [
                        { required: true, message: '请选择有无子女', trigger: 'change' }
                    ],
                    accountType: [
                        { required: true, message: '请选择户口类型', trigger: 'change' }
                    ],
                    accountLocation: [
                        { required: true, message: '请输入户口所在地', trigger: 'change' }
                    ],
                    offcialDate: [
                        { required: true, message: '请选择约定转正日期', trigger: 'change' }
                    ],
                    actualCorrectionDate: [
                        { required: true, message: '请选择实际转正日期', trigger: 'change' }
                    ]
                },
            }

        },
        components: {
            // staffId,
            staffCompany,
            department
        },

        methods: {
            // 教育经历图片上传
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
                console.log(res, file,this.imageUrl);
                // this.empInformation.empEducations[0].materList[0].materialId = 
                this.empInformation.empEducations[0].materList[0].materialName = file.name;
                this.empInformation.empEducations[0].materList[0].materialPath = res.result;

            },
            //上传图片区域
            handleAvatarSuccessImage(item,response, file, fileList){
                console.log(item,response,file,fileList)
                item.materialPath = response.result;
                // item.materialPath = response.result
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },


            // 员工工号弹窗
            // staff() {
            //     this.staffIdVisible = true;
            // },

            // 合同公司
            staffComponent() {
                this.companyVisible = true;
            },
            // 跳转至社保
            scheme() {
                this.$router.push("/newPlan");
            },

            staffSection() {
                this.departmentVisible = true;
            },

            // 添加合同信息功能
            addContract() {
                this.empInformation.empContracts.push({
                    companyId: 1,
                    empId: null,
                    contractNum: null,
                    type: null,
                    mainCompanyId: null,
                    contractSigningDate: null,
                    endDate: null,
                    startDate: null
                });
            },
            addWageCard() {
                this.empInformation.empSalaryInfo.empBankCardDOS.push({
                    bankSource: null,
                    cardNum: null,
                    remark: null,
                });
            },
            addeduction() {
                this.empInformation.empEducations[0].materList.push({
                    companyId: 1,
                    depId:null,
                    materialId: null,
                    materialName: null,
                    materialPath: null,
                    materialType: null
                })

            },
            trainExperience() {
                this.empInformation.empTrains.push({
                    companyId: 1,
                    empId: null,
                    finishDate: null,
                    joinDate: null,
                    magor: null,
                    school: null
                });
            },
            workExperience() {
                this.empInformation.empWorkings.push({
                    companyId: 1,
                    empId: null,
                    companyNameOld: null,
                    dimissionDesc: null,
                    endDate: null,
                    income: null,
                    position: null,
                    startDate: null,
                    workDesc: null,
                });
            },
            addPicture() {
                this.empInformation.materialLists.push({
                    companyId: 1,
                    materialId: null,
                    materialName: null,
                    materialPath: null,
                })
            },

            // 社保 input *
            handleBlur(data, num) {
                if (data !== '') {
                    Number(num) === 1 ? this.isFundStart = true : this.isInsuranceStart = true;
                }
            },

            salaryClick() {
                this.$router.push("/salary");
            },

            // ---------锚点
            // 当元素滚动条被滚动时运行的脚本
            onScroll() {
                // var box = document.getElementById('box')
                // var t = document.documentElement.scrollTop || document.body.scrollTop
                // box.style.top = t + 'px'
                var jump = document.querySelectorAll('.activeStep');
                var distance =
                    document.documentElement.scrollTop ||
                    document.body.scrollTop

                jump.forEach((item, index) => {
                    if (distance >= item.offsetTop) {
                        this.activeStep = index
                    }
                })
            },
            // 锚点点击
            jump(index) {
                this.activeStep = index;
                let jump = document.querySelectorAll('.step-jump')
                // 通过 offsetTop 获取对象到窗体顶部的距离，然后赋值给 scrollTop，实现锚点的功能
                let total = jump[index].offsetTop
                // scrollTop滚动条距离页面的距离
                let distance =
                    document.documentElement.scrollTop ||
                    window.pageYOffset ||
                    document.body.scrollTop
                // 平滑滚动，时长500ms，每10ms一跳，共50跳
                let step = total / 50
                if (total > distance) {
                    smoothDown()
                } else {
                    let newTotal = distance - total
                    step = newTotal / 50
                    smoothUp()
                }
                function smoothDown() {
                    if (distance < total) {
                        distance += step
                        document.body.scrollTop = distance
                        document.documentElement.scrollTop = distance
                        window.pageYOffset = distance
                        setTimeout(smoothDown, 10)
                    } else {
                        document.body.scrollTop = total
                        document.documentElement.scrollTop = total
                        window.pageYOffset = total
                    }
                }
                function smoothUp() {
                    if (distance > total) {
                        distance -= step
                        document.body.scrollTop = distance
                        document.documentElement.scrollTop = distance
                        window.pageYOffset = distance
                        setTimeout(smoothUp, 10)
                    } else {
                        document.body.scrollTop = total
                        document.documentElement.scrollTop = total
                        window.pageYOffset = total
                    }
                }
            },

            //新增员工提交
            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log(111, valid)
                        this.$http.post('/emplist/empAdd', this.empInformation)
                            .then(data => {
                                console.log(222);
                                if (data.code === 0) {
                                    this.$message({
                                        message: '添加员工成功',
                                        type: 'sucess'
                                    });
                                    this.$router.push({ path: '/employeesList' })
                                }
                            })
                    } else {
                        return false;
                    }
                })
            },
            // 薪资方案
            getsalaryPlan() {
                this.$http.get('/salaryPlan/queryList', {
                    params: {
                        companyId: 1
                    }
                }).then(res => {
                    this.empSalaryPlan = res.result;
                })
            },

            // 社保公积金方案
            getFundPlan() {
                this.$http.get('/fundPlanList/list', {
                    params: {
                        companyId: 1
                    }
                }).then(data => {
                    this.planName = data.result;
                })
            },


            //  提交信息到列表页信息
            getEmpPage() {
                this.$http.get('/emplist/getEmpPage', {
                    params: {
                        companyId: 1
                    }
                }).then(data => {
                    console.log(11, data);
                })
            },



            // 获取部门信息
            getStructureByPermits() {
                this.$http.get('/deplist/getStructureByPermits', {
                    params: {
                        id: 1
                    }
                }).then(data => {
                    console.log(1111, data.result);
                })
            },

            // 获取合同公司
            getCompanyList() {
                this.$http.get('/maincompanylist/queryMainCompanyList', {
                    params: {
                        companyId: 1,
                        pageSize: 10,
                        pageNum: 0
                    }
                }).then(data => {
                    console.log(data.result);
                    this.companyId = data.result;
                })
            },
        },


        created() {
            this.getCompanyList();
            this.getsalaryPlan();  //获取薪资方案
            this.getFundPlan();   //获取社保公积金方案
        },

        mounted() {
            this.nation = nation
            console.log(nation);
            // 锚点
            this.$nextTick(function () {
                window.addEventListener('scroll', this.onScroll)
            })

            this.getStructureByPermits();


        },
    }

</script>

<style lang="less">
    @import 'index';

    /* 面包屑 */
    .detail_header .el-breadcrumb {
        width: 191px;
        height: 18px;
        font-size: 13px;
        font-weight: 500;
        color: rgba(153, 153, 153, 1);
        line-height: 18px;
        padding: 16px 0 0 30px;
        float: left;
        cursor: default;
    }

    .dh_top {
        height: 53px;
    }

    .dh_bottom {
        margin: 0 0 17px 72px;
    }




    .dh_bottom_l dt {
        width: 46px;
        height: 50px;
        border: 1px dashed rgb(49, 13, 13);
        margin-right: 21px;
        float: left;
    }

    .dh_bottom_l_mess {
        strong {
            height: 35px;
            font-size: 24px;
            display: inline-block;
            font-family: PingFangSC-Semibold;
            font-weight: 600;
            color: rgba(51, 51, 51, 1);
            line-height: 33px;
            margin-bottom: 1px;

        }

        span {
            width: 40px;
            height: 18px;
            display: inline-block;
            text-align: center;
            background: rgba(24, 144, 255, 1);
            border-radius: 2px;
            opacity: 0.5;
            font-size: 12px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            line-height: 17px;
        }
    }

    .dh_bottom_l ul {
        font-size: 13px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        height: 35px;
        float: left;
        padding: 0;
        margin: 0;

        li {
            float: left;
            margin-right: 16px;
        }
    }

    #staffEdit {
        padding: 0 20px;
    }

    /deep/.el-tooltip__popper {
        width: 130px;
        font-size: 11px;
        box-shadow: 0 0 5px #999;
    }

    .col_icon::before {
        content: '*';
        color: rgba(25, 114, 234, 1);
        line-height: 3;
    }

    /*------ 详情顶部 ------*/
    .detail_header {
        background: rgba(255, 255, 255, 1);
        overflow: hidden;
        position: relative;
    }

    /* 详情信息 */
    .detail_mess {
        background: rgba(255, 255, 255, 1);
        box-shadow: 2px 0px 16px 0px rgba(3, 33, 136, 0.2);
        border-radius: 8px;
        margin-top: 6px;
        padding-right: 32px;
        padding-top: 25px;
        position: relative;
        overflow: hidden;

    }

    /*---- aside--- */
    .detail_mess .aside {
        width: 75px;
        position: fixed;
    }

    .detail_mess .aside ul {
        padding-left: 0;
        margin-top: 3px;

        li {
            width: 75px;
            height: 30px;
            text-align: center;
            line-height: 30px;
            background: rgba(255, 255, 255, 1);
            box-shadow: 3px 5px 7px 0px rgba(0, 0, 0, 0.04);
            border-radius: 0px 2px 2px 0px;
            margin-bottom: 1px;
            font-size: 12px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
            cursor: default;
        }
    }

    .detail_mess .aside ul li.clickbtn {
        width: 90px;
        height: 30px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 3px 2px 4px 0px rgba(0, 0, 0, 0.13);
        border-radius: 0px 2px 2px 0px;
        font-size: 12px;
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        color: rgba(22, 96, 253, 1);
    }

    /*---------- 编辑信息--------- */

    .message {
        position: relative;
    }

    /* 编辑公共部分 */
    .aside_search h3 {
        margin: 0;
        font-size: 14px;
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        color: rgba(22, 96, 253, 1);
        line-height: 20px;
        margin-bottom: 9px;
    }

    .aside_search strong {
        font-size: 13px;
        font-weight: 500;
        padding-left: 4px;
        padding-right: 10px;
        color: rgba(51, 51, 51, 1);
        border-right: 1px solid rgba(153, 153, 153, 1);
    }

    .salary_con em {
        display: inline-block;
        margin-left: -19px;
        margin-right: 60px;
        font-style: normal;
        font-size: 13px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        line-height: 18px;
    }


    /*-------- 编辑基本信息 -------*/
    .aside_search .basic {
        border-bottom: 1px solid rgba(153, 153, 153, 1);

        .el-scrollbar .el-scrollbar__view .el-select-dropdown__item {
            height: auto;
            max-height: 274px;
            padding: 0;
            overflow: hidden;
            overflow-y: auto;
        }
    }

    /*----- 编辑合同信息 -------*/
    .aside_search .contract {
        border-radius: 2px;
        border-bottom: 1px solid rgba(151, 151, 151, 1);
        padding-bottom: 20px;


        .information_first {
            margin-bottom: 20px;
            height: 82px;
        }

        h4 {
            width: 20px;
            height: 91px;
            line-height: 91px;
            text-align: center;
            font-size: 13px;
            font-weight: 500;
            color: rgba(102, 102, 102, 1);
            background: rgba(247, 247, 247, 1);
            float: left;
        }

        .contractMes {
            float: left;
            margin-left: 10px;
        }

        p {
            height: 32px;
            border: 1px dashed rgba(102, 102, 102, 1);
            margin-bottom: 0;
            text-align: center;
            line-height: 32px;
            font-size: 14px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: rgba(0, 0, 0, 0.65);
            background: rgba(255, 255, 255, 1);
        }

        /deep/.el-form-item {
            margin-bottom: 0;
        }
    }

    /*------ 编辑薪资信息 ----*/

    .aside_search .salary {
        border-radius: 2px;
        border-bottom: 1px solid rgba(151, 151, 151, 1);
        padding-bottom: 20px;

        /deep/.el-col {
            float: none;
        }

        b {
            display: inline-block;
            padding: 10px 0;
            font-size: 13px;
            margin-left: -9px;
            margin-right: 42px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: rgba(102, 102, 102, 1);
        }

        i {
            font-size: 13px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: rgba(102, 102, 102, 1);
            font-style: normal;
        }

        .font {
            font-size: 13px;
            font-family: PingFangSC-Semibold;
            font-weight: 600;
            color: rgba(51, 51, 51, 1);
        }

        p {
            height: 32px;
            border: 1px dashed rgba(102, 102, 102, 1);
            margin-bottom: 0;
            text-align: center;
            line-height: 32px;
            font-size: 14px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: rgba(0, 0, 0, 0.65);
            background: rgba(255, 255, 255, 1);
        }
    }


    /*------- 编辑教育经历 -------*/
    .aside_search .education {
        border-radius: 2px;
        border-bottom: 1px solid rgba(151, 151, 151, 1);
        padding-bottom: 20px;
        overflow: hidden;

        p {
            margin-top: 30px;
            height: 32px;
            border: 1px dashed rgba(102, 102, 102, 1);
            margin-bottom: 0;
            text-align: center;
            line-height: 32px;
            font-size: 14px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: rgba(0, 0, 0, 0.65);
            background: rgba(255, 255, 255, 1);
        }

        em {
            float: left;
        }

        b {
            display: inline-block;
            padding: 10px 0;
            font-size: 13px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: rgba(102, 102, 102, 1);
        }

        i {
            font-size: 13px;
            font-weight: 400;
            color: rgba(102, 102, 102, 1);
        }

        /deep/.avatar-uploader-icon {
            width: 356px;
        }

        /deep/.el-row {
            margin-bottom: -15px;
        }

        .degree {
            margin-bottom: -2px;
        }

        /deep/.el-form-item__label {
            width: 110px !important;
        }

        .education_picture {

            em {
                font-size: 13px;
                font-style: normal;
                font-weight: 500;
                color: rgba(0, 0, 0, 0.85);
                float: left;
            }

            /deep/.avatar-uploader {
                float: left;
            }
        }

    }



    /*-------- 培训经历 ----------*/
    .aside_search .train {
        border-radius: 2px;
        border-bottom: 1px solid rgba(151, 151, 151, 1);
        padding-bottom: 20px;

        p {
            height: 32px;
            border: 1px dashed rgba(102, 102, 102, 1);
            margin-bottom: 0;
            text-align: center;
            line-height: 32px;
            font-size: 14px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: rgba(0, 0, 0, 0.65);
            background: rgba(255, 255, 255, 1);
        }
    }


    /*--------- 工作经历 ---------*/
    .aside_search .work {
        border-radius: 2px;
        border-bottom: 1px solid rgba(151, 151, 151, 1);
        padding-bottom: 20px;
        overflow: hidden;

        p {
            height: 32px;
            border: 1px dashed rgba(102, 102, 102, 1);
            margin-bottom: 0;
            text-align: center;
            line-height: 32px;
            font-size: 14px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: rgba(0, 0, 0, 0.65);
            margin-top: 20px;
            background: rgba(255, 255, 255, 1);
        }

        b {
            display: inline-block;
            padding: 10px 0;
            font-size: 13px;
            margin-left: -9px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: rgba(102, 102, 102, 1);
        }

        .workmess {
            float: left;
        }

        h4 {
            font-size: 13px;
            font-weight: 500;
            color: rgba(0, 0, 0, 0.85);
            float: left;
        }

        /deep/.el-textarea {
            width: 385px;
            border-radius: 2px;
        }

        /deep/.el-textarea__inner {
            height: 100px;
        }

    }



    /*--------- 福利信息 ----------*/
    .aside_search .welfare {
        border-radius: 2px;
        border-bottom: 1px solid rgba(151, 151, 151, 1);
        padding-bottom: 15px;
    }

    /*--------- 图片附件 ---------*/
    .picture {
        i {
            font-size: 13px;
            font-weight: 400;
            color: rgba(102, 102, 102, 1);
        }

        p {
            height: 32px;
            border: 1px dashed rgba(102, 102, 102, 1);
            margin-bottom: 0;
            text-align: center;
            line-height: 32px;
            font-size: 14px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: rgba(0, 0, 0, 0.65);
            margin-top: 20px;
            background: rgba(255, 255, 255, 1);
        }

        .image {
            /deep/.el-form-item__content {
                line-height: 21px;
            }
        }
    }

    .el-upload-dragger {
        width: 385px;
        height: 100px;
    }

    .bz_inp {
        width: 40%;
    }

    .bt_inp {
        width: 40%;
    }

    .avatar-uploader .el-upload {
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        line-height: 100px;
        text-align: center;
    }

    .aside_search .picture {
        border-radius: 2px;
        border-bottom: 1px solid rgba(151, 151, 151, 1);
        padding-bottom: 20px;
        margin-bottom: 100px;
        overflow: hidden;


        .picture_upload {
            overflow: hidden;

            em {
                font-style: normal;
                font-size: 13px;
                font-weight: 500;
                color: rgba(0, 0, 0, 0.85);
            }

            /deep/.avatar-uploader {
                float: right;
            }
        }
    }

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }


    /* 底部确认 */
    .footer {
        /* width:calc(100vw - 215px); */
        width: 100%;
        line-height: 30px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 2px 0px 16px 0px rgba(3, 33, 136, 0.2);
        border-radius: 4px;
        position: fixed;
        z-index: 2;
        bottom: 0;
        left: 179px;
        z-index: 2001;
        text-align: center;
        margin-bottom: 0 !important;

        /deep/.el-button {
            width: 80px;
            height: 28px;
            margin-top: 14px;
            border-radius: 2px;
        }
    }
</style>