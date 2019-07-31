<template>
    <div id="detail">
        <div class="detail_header">
            <employeeComm ></employeeComm>
        </div>
        <div class="message" style="padding:0 25px 0 15px;">
            <div class="detail_mess" id="nice-scroll">

                <div class="aside" style="position:fixed;">
                    <ul direction="vertical" finish-status="wait" :active="activeStep" class="anchor">
                        <li v-for="(item, index) in stepsArr" :key="index" :title="item.title" @click="jump(index)"
                            :class="[index === activeStep?'clickbtn':'']">
                            {{item.title}}
                        </li>
                    </ul>
                </div>
                <div class="aside_Information">
                    <div class="basic step-jump" style="padding-bottom:20px;">
                        <ul class="basic_instro" style="margin-bottom:23px;">
                            <li>基本信息</li>
                            <li class="icon" @click="editBasic" v-if="flagBasic">
                                <i class="iconfont icon-bianjixiugai-copy" style="font-size:13px;"></i>
                                <span>修改信息</span>
                            </li>
                            <el-row v-else="flagBasic = true" class="iconButton">
                                <el-button type="primary" :plain="true" @click=saveBasic>保存</el-button>
                                <el-button :plain="true" @click="cancelBasic">取消</el-button>
                            </el-row>
                        </ul>
                        <div class="basic_mess" v-if="flagBasic">
                            <div style="height:310px;">
                                <ul>
                                    <li>
                                        <strong>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名:</strong>
                                        <span>{{empDetails.empName}}</span>
                                    </li>

                                    <li>
                                        <strong>部&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;门:</strong>
                                        <span>{{empDetails.depName}}</span>
                                    </li>
                                    <li>
                                        <strong>手机号码:</strong>
                                        <span>{{empDetails.telephone}}</span>
                                    </li>
                                    <li>
                                        <strong>出生日期:</strong>
                                        <span>{{empDetails.birthday|formatDate}}</span>
                                    </li>
                                    <li>
                                        <strong>有无子女:</strong>
                                        <!-- 1-有，2-无 -->
                                        <span>{{empDetails.haveChild === 1?'有':''||empDetails.haveChild === 2?'无':''}}</span>
                                    </li>
                                    <li>
                                        <strong>证件类型:</strong>
                                        <!-- 1-身份证，2-护照，3-军官证，4-港澳台同胞证 -->
                                        <span>{{empDetails.idCardType === 1?'身份证':''||empDetails.idCardType === 2?'护照':''||empDetails.idCardType === 3?'军官证':''||empDetails.idCardType === 4?'港澳台同胞证':''}}</span>
                                    </li>
                                    <li>
                                        <strong>约定转正日期:</strong>
                                        <span>{{empDetails.offcialDate|formatDate}}</span>
                                    </li>
                                    <li>
                                        <strong>是否取得学位:</strong>
                                        <span>是</span>
                                    </li>

                                </ul>
                                <ul>
                                    <li>
                                        <strong>性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别:</strong>
                                        <span>{{empDetails.sex === 1?'男':''||empDetails.sex === 2?'女':''}}</span>
                                    </li>
                                    <li>
                                        <strong>职&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;位:</strong>
                                        <span>{{empDetails.position}}</span>
                                    </li>
                                    <li>
                                        <strong>电子邮箱:</strong>
                                        <span>{{empDetails.email}}</span>
                                    </li>
                                    <li>
                                        <strong>民&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;族:</strong>
                                        <span>{{empDetails.nationalityId}}</span>
                                    </li>
                                    <li>
                                        <strong>婚姻状况:</strong>
                                        <!-- 1-已婚，2-未婚 -->
                                        <span>{{empDetails.marriageStatus === 1?'已婚':''||empDetails.marriageStatus === 2?'未婚':''}}</span>
                                    </li>
                                    <li>
                                        <strong>毕业院校:</strong>
                                        <span>{{empDetails.highEducationSchool}}</span>
                                    </li>
                                    <li>
                                        <strong>实际转正日期:</strong>
                                        <span>{{empDetails.actualCorrectionDate|formatDate}}</span>
                                    </li>
                                    <li class="company_contract">
                                        <strong>合同主体:</strong>
                                        <span title="北京小微律政信息技术有限公司">{{empDetails.mainCompanyId}}</span>
                                    </li>
                                </ul>
                                <ul style="margin-right:40px;">
                                    <li>
                                        <strong>证件号码:</strong>
                                        <span>{{empDetails.idCardNum}}</span>
                                    </li>
                                    <!-- <li>
                                        <strong>工作城市:</strong>
                                        <span>河北省</span>
                                    </li> -->
                                    <li>
                                        <strong>员工工号:</strong>
                                        <span>{{empDetails.empNum}}</span>
                                    </li>
                                    <li>
                                        <strong>最高学历:</strong>
                                        <!-- 1-中专，2-高中，3-高职（大专），4-本科，5-硕士，6-博士，7-博士后 -->
                                        <span>{{empDetails.highestEducation === 1?'中专':''||empDetails.highestEducation === 2?'高中':''
                                            ||empDetails.highestEducation === 3?'高职(大专)':''||empDetails.highestEducation === 4?'本科':''
                                            ||empDetails.highestEducation === 5?'硕士':''||empDetails.highestEducation === 6?'博士':''
                                            ||empDetails.highestEducation === 7?'博士后':''}}</span>
                                    </li>
                                    <li>
                                        <strong>籍&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;贯:</strong>
                                        <span>{{empDetails.birthplace}}</span>
                                    </li>
                                    <li>
                                        <strong>专&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;业:</strong>
                                        <span>{{empDetails.highEducationMajor}}</span>
                                    </li>
                                    <li>
                                        <strong>紧急联系人:</strong>
                                        <span>{{empDetails.emergContact}}</span>
                                    </li>
                                    <li class="nowAddress">
                                        <strong>现居住地址:</strong>
                                        <span :title="empDetails.homeAddress">{{empDetails.homeAddress}}</span>
                                    </li>
                                </ul>
                                <ul>
                                    <li>
                                        <strong>入职日期:</strong>
                                        <span>{{empDetails.entryTime | formatDate}}</span>
                                    </li>
                                    <!-- <li>
                                        <strong>工作地点:</strong>
                                        <span>石家庄市</span>
                                    </li> -->
                                    <li>
                                        <strong>员工类型:</strong>
                                        <!-- （1-全职，2-兼职，3-实习，4-外派） -->
                                        <span>{{empDetails.empType === 1?'全职':''||empDetails.empType === 2?'兼职':''||empDetails.empType === 3?'实习':''||empDetails.empType === 4?'外派':''}}</span>
                                    </li>
                                    <li>
                                        <strong>政治面貌:</strong>
                                        <!-- 1-党员，2-团员，3-群众 -->
                                        <span>{{empDetails.politicalStatus===1?'党员':''||empDetails.politicalStatus===2?'团员':''||empDetails.politicalStatus===3?'群众':''}}</span>
                                    </li>
                                    <li>
                                        <strong>户口类型:</strong>
                                        <!-- 1-城镇户口，2-农村户口 -->
                                        <span>{{empDetails.accountType === 1?'城镇户口':''|| empDetails.accountType === 2?'农村户口':''}}</span>
                                    </li>
                                    <li>
                                        <strong>毕业时间:</strong>
                                        <span>{{empDetails.highEducationFinishDate |formatDate}}</span>
                                    </li>
                                    <li>
                                        <strong>紧急电话:</strong>
                                        <span>{{empDetails.emergContactTelephone}}</span>
                                    </li>
                                    <li class="residence">
                                        <strong>户口所在地:</strong>
                                        <span :title="empDetails.accountLocation">{{empDetails.accountLocation}}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <el-form v-else="flagBasic = true" :model="basic" :inline="true" ref="basic"
                            class="demo-ruleForm basicform">
                            <el-row>
                                <el-col :span="6" class="col_icon">
                                    <el-form-item prop="name" id="wrapName">
                                        <span>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：</span>
                                        <el-divider direction="vertical"></el-divider>
                                        <el-input v-model="basic.name" placeholder="请填写" id="name"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6" class="col_icon">
                                    <el-form-item prop="sex" id="wrap">
                                        <span>性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：</span>
                                        <el-divider direction="vertical"></el-divider>
                                        <el-select v-model="basic.sex" placeholder="请选择">
                                            <el-option label="男" value="1"></el-option>
                                            <el-option label="女" value="2"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6" class="col_icon">
                                    <el-form-item prop="idNum" id="wrapIdNum">
                                        <span>证件号码：</span>
                                        <el-divider direction="vertical"></el-divider>
                                        <el-input v-model="basic.idNum" placeholder="请填写" id="idNum"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6" class="col_icon">
                                    <el-form-item prop="entryDate" id="wrapEntryDate">
                                        <span>入职日期：</span>
                                        <el-divider direction="vertical"></el-divider>
                                        <el-date-picker v-model="basic.entryDate" type="date" placeholder="选择日期">
                                        </el-date-picker>
                                    </el-form-item>
                                </el-col>

                                <el-col :span="6" class="col_icon section">
                                    <el-form-item prop="section" id="wrapSection">
                                        <span>部&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;门：</span>
                                        <el-divider direction="vertical"></el-divider>
                                        <el-select v-model="basic.section" placeholder="请选择">
                                            <el-option label="男" value="1"></el-option>
                                            <el-option label="女" value="2"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <i class="iconfont icon-tianjia" @click="staffSection"></i>
                                </el-col>
                                <el-col :span="6" class="col_icon">
                                    <el-form-item prop="post" id="wrapPost">
                                        <span>职&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;位：</span>
                                        <el-divider direction="vertical"></el-divider>
                                        <el-input v-model="basic.post" placeholder="请填写" id="idNum"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item prop="post" id="wrapPost" style="margin-left:8px">
                                        <span>工作城市：</span>
                                        <el-divider direction="vertical"></el-divider>
                                        <el-input v-model="basic.workCity" placeholder="请填写" id="idNum"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item prop="post" id="wrapPost" style="margin-left:8px">
                                        <span>工作地点：</span>
                                        <el-divider direction="vertical"></el-divider>
                                        <el-input v-model="basic.workAddress" placeholder="请填写" id="idNum"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6" class="staffNum">
                                    <em></em>
                                    <el-form-item prop="staffId" id="wrapStaffId">
                                        <span>员工工号：</span>
                                        <el-divider direction="vertical"></el-divider>
                                        <el-input v-model="basic.staffId" placeholder="请填写" id="idNum">
                                        </el-input>
                                    </el-form-item>
                                    <i class="iconfont icon-yuangongguanli" @click="staff"></i>
                                </el-col>
                                <el-col :span="6" class="col_icon">
                                    <el-form-item prop="staffType" id="wrapStaffType">
                                        <span>员工类别：</span>
                                        <el-divider direction="vertical"></el-divider>
                                        <el-select v-model="basic.staffType" placeholder="请选择">
                                            <el-option label="男" value="1"></el-option>
                                            <el-option label="女" value="2"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6" class="col_icon company">
                                    <el-form-item prop="post" id="wrapCompany">
                                        <span>合同公司：</span>
                                        <el-divider direction="vertical"></el-divider>
                                        <el-select v-model="basic.company" placeholder="请选择">
                                            <el-option label="男" value="1"></el-option>
                                            <el-option label="女" value="2"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <i class="iconfont icon-tianjia" @click="staffComponent"></i>
                                </el-col>
                                <el-col :span="6" class="col_icon">
                                    <el-form-item prop="phoneNum" id="wrapPhoneNum">
                                        <span>手机号码：</span>
                                        <el-divider direction="vertical"></el-divider>
                                        <el-input v-model="basic.phoneNum" placeholder="请填写" id="name"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6" class="col_icon">
                                    <el-form-item prop="email" id="wrap">
                                        <span>电子邮箱：</span>
                                        <el-divider direction="vertical"></el-divider>
                                        <el-input v-model="basic.email" placeholder="请填写" id="name"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6" class="col_icon">
                                    <el-form-item prop="highEducation" id="wrapIdNum">
                                        <span>最高学历：</span>
                                        <el-divider direction="vertical"></el-divider>
                                        <el-input v-model="basic.highEducation" placeholder="请填写" id="idNum">
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <em></em>
                                    <el-form-item prop="status" id="wrap">
                                        <span>政治面貌：</span>
                                        <el-divider direction="vertical"></el-divider>
                                        <el-input v-model="basic.status" placeholder="请填写" id="name">
                                        </el-input>
                                    </el-form-item>
                                </el-col>

                                <el-col :span="6">
                                    <em></em>
                                    <el-form-item prop="dateBirth" id="wrapName">
                                        <span>出生日期：</span>
                                        <el-divider direction="vertical"></el-divider>
                                        <el-date-picker v-model="basic.dateBirth" type="date" placeholder="选择日期">
                                        </el-date-picker>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6" class="col_icon" id="IDType">
                                    <em></em>
                                    <el-form-item prop="dateBirth" id="wrapName">
                                        <span>证件类型：</span>
                                        <el-divider direction="vertical"></el-divider>
                                        <el-select v-model="basic.IDType" placeholder="请选择">
                                            <el-option label="身份证" value="1"></el-option>
                                            <el-option label="女" value="2"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <em></em>
                                    <el-form-item prop="dateBirth" id="wrapName">
                                        <span>毕业院校：</span>
                                        <el-divider direction="vertical"></el-divider>
                                        <el-input v-model="basic.graduate" placeholder="请填写" id="name">
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <em></em>
                                    <el-form-item prop="dateBirth" id="wrapName">
                                        <span>专业：</span>
                                        <el-divider direction="vertical"></el-divider>
                                        <el-input v-model="basic.major" placeholder="请填写" id="name">
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <em></em>
                                    <el-form-item prop="dateBirth" id="wrapName">
                                        <span>毕业时间：</span>
                                        <el-divider direction="vertical"></el-divider>
                                        <el-date-picker v-model="basic.GraduateTime" type="date" placeholder="选择日期">
                                        </el-date-picker>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6" class="whether">
                                    <em></em>
                                    <el-form-item prop="whether" id="wrapName">
                                        <span>是否取得学位：</span>
                                        <el-divider direction="vertical"></el-divider>
                                        <el-select v-model="basic.whether" placeholder="请选择">
                                            <el-option label="是" value="1"></el-option>
                                            <el-option label="否" value="2"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <em></em>
                                    <el-form-item prop="nation" id="wrap">
                                        <span>民&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;族：</span>
                                        <el-divider direction="vertical"></el-divider>
                                        <el-input v-model="basic.nation" placeholder="请填写" id="name"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <em></em>
                                    <el-form-item prop="nativePlace" id="wrapIdNum">
                                        <span>籍&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;贯：</span>
                                        <el-divider direction="vertical"></el-divider>
                                        <el-input v-model="basic.nativePlace" placeholder="请填写" id="idNum">
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <em></em>
                                    <el-form-item prop="type" id="wrap">
                                        <span>户口类型：</span>
                                        <el-divider direction="vertical"></el-divider>
                                        <el-select v-model="basic.type" placeholder="请选择">
                                            <el-option label="男" value="1"></el-option>
                                            <el-option label="女" value="2"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>

                                <el-col :span="6">
                                    <em></em>
                                    <el-form-item prop="children" id="wrapName">
                                        <span>有无子女：</span>
                                        <el-divider direction="vertical"></el-divider>
                                        <el-select v-model="basic.children" placeholder="请选择">
                                            <el-option label="有" value="1"></el-option>
                                            <el-option label="无" value="2"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <em></em>
                                    <el-form-item prop="marriage" id="wrap">
                                        <span>婚姻状况：</span>
                                        <el-divider direction="vertical"></el-divider>
                                        <el-select v-model="basic.marriage" placeholder="请选择">
                                            <el-option label="已婚" value="1"></el-option>
                                            <el-option label="未婚" value="2"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <em></em>
                                    <el-form-item prop="linkman" id="wrapphone">
                                        <span>紧急联系人：</span>
                                        <el-divider direction="vertical"></el-divider>
                                        <el-input v-model="basic.linkman" placeholder="请填写" id="idNum">
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <em></em>
                                    <el-form-item prop="phone" id="wrap">
                                        <span>紧急电话：</span>
                                        <el-divider direction="vertical"></el-divider>
                                        <el-input v-model="basic.phone" placeholder="请填写" id="name"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6" id="agreed" class="col_icon">
                                    <em></em>
                                    <el-form-item prop="phone" id="wrap">
                                        <span>约定转正日期：</span>
                                        <el-divider direction="vertical"></el-divider>
                                        <el-date-picker v-model="basic.agreed" type="date" placeholder="选择日期">
                                        </el-date-picker>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6" id="practical" class="col_icon">
                                    <em></em>
                                    <el-form-item prop="phone" id="wrap">
                                        <span>实际转正日期：</span>
                                        <el-divider direction="vertical"></el-divider>
                                        <el-date-picker v-model="basic.practical" type="date" placeholder="选择日期">
                                        </el-date-picker>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6" class="col_address">
                                    <el-form-item prop="address" id="wrap">
                                        <span>现居住地址：</span>
                                        <el-divider direction="vertical"></el-divider>
                                        <el-input v-model="basic.address" placeholder="请填写" id="name">
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6" class="col_place">
                                    <el-form-item prop="residentCity" id="wrap">
                                        <span>户口所在地：</span>
                                        <el-divider direction="vertical"></el-divider>
                                        <el-input v-model="basic.residentCity" placeholder="请填写" id="name">
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form>
                    </div>
                    <div class="contract step-jump">
                        <ul class="basic_instro" style="margin-bottom:23px;margin-top: 18px;">
                            <li>合同信息</li>
                            <li class="icon" @click="editContract" v-if="flagContract">
                                <i class="iconfont icon-bianjixiugai-copy" style="font-size:13px;"></i>
                                <span>修改信息</span>
                            </li>
                            <el-row v-else="flagContract = true" class="iconButton">
                                <el-button type="primary" :plain="true" @click="saveContract">保存</el-button>
                                <el-button :plain="true" @click="cancelContract">取消</el-button>
                            </el-row>
                        </ul>
                        <div class="contract_con" v-if="flagContract">
                            <p>
                                <strong style="margin-right:9px; margin-bottom: 20px;">签订合同次数:</strong>
                                <span>2次</span>
                            </p>
                            <!-- <table class="contract_table" style="border-collapse: collapse">
                                <tr class="table_tr">
                                    <td rowspan="2" class="rowspan">
                                        <h5>2</h5>
                                    </td>
                                    <td class="table_td">
                                        <strong>合同编号：</strong>
                                        <span title="BJ000001">{{empDetails.empNum}}</span>
                                    </td>
                                    <td class="table_td1">
                                        <strong>合同类型：</strong>
                                        <span title="劳动合同">劳动合同</span>
                                    </td>
                                    <td class="table_td2">
                                        <strong>合同公司：</strong>
                                        <span title="北京小微律政信息技术有限公司">北京小微律政信息技术有限公司</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="table_td">
                                        <strong>合同签订日：</strong>
                                        <span title="2018/1/12">2018/1/12</span>
                                    </td>
                                    <td class="table_td1">
                                        <strong>合同生效日：</strong>
                                        <span title="2018/1/12">2018/1/12</span>
                                    </td>
                                    <td class="table_td2">
                                        <strong>合同结束日：</strong>
                                        <span title="2018/1/12">2018/1/12</span>
                                    </td>
                                </tr>
                            </table> -->
                            <table class="contract_table" style="border-collapse: collapse">
                                <tr class="table_tr">
                                    <td rowspan="2" class="rowspan">
                                        <h5>1</h5>
                                    </td>
                                    <td class="table_td">
                                        <strong>合同编号：</strong>
                                        <span title="empDetails.empNum">{{empDetails.empNum}}</span>
                                    </td>
                                    <td class="table_td1">
                                        <strong>合同类型：</strong>
                                        <span title="劳动合同">劳动合同</span>
                                    </td>
                                    <td class="table_td2">
                                        <strong>合同公司：</strong>
                                        <span title="北京小微律政信息技术有限公司">北京小微律政信息技术有限公司</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="table_td">
                                        <strong>合同签订日：</strong>
                                        <span title="2018/1/12">2018/1/12</span>
                                    </td>
                                    <td class="table_td1">
                                        <strong>合同生效日：</strong>
                                        <span title="2018/1/12">2018/1/12</span>
                                    </td>
                                    <td class="table_td2">
                                        <strong>合同结束日：</strong>
                                        <span title="2018/1/12">2018/1/12</span>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div v-else="flagContract = true">
                            <el-form :inline="true" ref="contract" class="demo-ruleForm contractform"
                                v-for="item in contract" :key="item.value">
                                <div class="information_first">
                                    <h4>2</h4>
                                    <div style="margin-top:-91px; width:879px; margin-left:22px">
                                        <el-row>
                                            <el-col :span="7">
                                                <el-form-item prop="contractType" id="type" style="margin-left:10px;">
                                                    <span>合同编号：</span>
                                                    <el-divider direction="vertical"></el-divider>
                                                    <el-input v-model="item.SetColumn" placeholder="请填写" id="name">
                                                    </el-input>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="7" class="col_icon">
                                                <el-form-item prop="contractType" id="type">
                                                    <span>合同类型：</span>
                                                    <el-divider direction="vertical"></el-divider>
                                                    <el-select v-model="item.contractType" placeholder="请选择">
                                                        <el-option label="已婚" value="1"></el-option>
                                                        <el-option label="未婚" value="2"></el-option>
                                                    </el-select>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="7" class="col_icon">
                                                <el-form-item prop="contractType" id="type">
                                                    <span>合同公司：</span>
                                                    <el-divider direction="vertical"></el-divider>
                                                    <el-select v-model="item.company" placeholder="请选择">
                                                        <el-option label="已婚" value="1"></el-option>
                                                        <el-option label="未婚" value="2"></el-option>
                                                    </el-select>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="7" class="col_icon">
                                                <el-form-item prop="startTime" id="wrap">
                                                    <span>合同签订日：</span>
                                                    <el-divider direction="vertical"></el-divider>
                                                    <el-date-picker v-model="item.startTime" type="date"
                                                        placeholder="选择日期">
                                                    </el-date-picker>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="7" class="col_icon">
                                                <el-form-item prop="actualDate" id="wrapIdNum">
                                                    <span>合同生效日：</span>
                                                    <el-divider direction="vertical"></el-divider>
                                                    <el-date-picker v-model="item.actualDate" type="date"
                                                        placeholder="选择日期">
                                                    </el-date-picker>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="7" class="col_icon">
                                                <el-form-item prop="positive" id="wrapName">
                                                    <span>合同结束日：</span>
                                                    <el-divider direction="vertical"></el-divider>
                                                    <el-date-picker v-model="item.positive" type="date"
                                                        placeholder="选择日期">
                                                    </el-date-picker>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                    </div>
                                </div>
                            </el-form>
                            <h6 @click='addContract' style="cursor:pointer">+ 添加更多历史合同信息</h6>
                        </div>
                    </div>
                    <div class="salary step-jump" style="padding-bottom:20px;">
                        <ul class="basic_instro">
                            <li>薪资信息</li>
                            <li class="icon" @click="editSalary" v-if="flagSalary">
                                <i class="iconfont icon-bianjixiugai-copy" style="font-size:13px;"></i>
                                <span>修改信息</span>
                            </li>
                            <el-row v-else="flagSalary = true" class="iconButton">
                                <el-button type="primary" :plain="true" @click="saveSalary">保存</el-button>
                                <el-button :plain="true" @click="cancelSalary">取消</el-button>
                            </el-row>
                        </ul>
                        <div class="salary_con" style="overflow: hidden" v-if="flagSalary">
                            <ul>
                                <li style="width:26%">
                                    <strong>薪资方案：</strong>
                                    <span>方案一</span>
                                </li>
                                <li style="width:65%">
                                    <strong>全额计薪开始时间：</strong>
                                    <span>2019 / 06 / 31</span>
                                </li>
                            </ul>
                            <ul>
                                <li class="title" style="width:26%">试用期各薪资项及金额</li>
                                <li style="width:30%">
                                    <strong>试用期基本工资：</strong>
                                    <span>20000元/月</span>
                                </li>
                                <li style="width:25%">
                                    <strong>交通补贴：</strong>
                                    <span>200元/月</span>
                                </li>
                                <li>
                                    <strong>餐&nbsp;&nbsp;&nbsp;&nbsp;补：</strong>
                                    <span>200元/月</span>
                                </li>
                            </ul>
                            <ul>
                                <li class="title" style="width:26%">转正后各薪资项及金额</li>
                                <li style="width:30%">
                                    <strong>基本薪资：</strong>
                                    <span>20000元/月</span>
                                </li>
                                <li style="width:25%">
                                    <strong>交通补贴：</strong>
                                    <span>200元/月</span>
                                </li>
                                <li>
                                    <strong>餐&nbsp;&nbsp;&nbsp;&nbsp;补：</strong>
                                    <span>200元/月</span>
                                </li>
                            </ul>
                            <ul>
                                <li style="width:26%">
                                    <strong>工资卡号1:</strong>
                                    <span>6217000010030158712</span>
                                </li>
                                <li style="width:30%">
                                    <strong>开户行:</strong>
                                    <span>北京市朝阳区支行</span>
                                </li>
                                <li style="width:25%">
                                    <strong>用途描述:</strong>
                                    <span>工资</span>
                                </li>
                            </ul>
                            <ul>
                                <li style="width:26%">
                                    <strong>工资卡号2:</strong>
                                    <span>6217000010030158712</span>
                                </li>
                                <li style="width:30%">
                                    <strong>开户行:</strong>
                                    <span>北京市朝阳区支行</span>
                                </li>
                                <li style="width:25%">
                                    <strong>用途描述:</strong>
                                    <span>工资</span>
                                </li>
                            </ul>

                            <div class="salary_table">
                                <p style="margin-bottom:10px;">近<span>3</span>个月工资条</p>
                                <el-table :data="tableData" :header-cell-style="{background:'#eef1f6',color:'#606266'}"
                                    style="border:2px solid rgba(247,247,247,1); border-bottom:0; ">
                                    <el-table-column prop="month" label="月份" fixed width="81"
                                        :show-overflow-tooltip="true">
                                    </el-table-column>
                                    <el-table-column prop="baseSalary" width="90" :show-overflow-tooltip="true">
                                        <template slot="header" slot-scope="scope">
                                            <span class="icon-circle icon-co-1"></span>基本薪资
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="postSalary" width="86" :show-overflow-tooltip="true">
                                        <template slot="header" slot-scope="scope">
                                            <span class="icon-circle icon-co-1"></span>岗位薪资
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="dueDays" width="100" :show-overflow-tooltip="true">
                                        <template slot="header" slot-scope="scope">
                                            <span class="icon-circle icon-co-1"></span>应出勤时数
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="periodDay" width="130" :show-overflow-tooltip="true">
                                        <template slot="header" slot-scope="scope">
                                            <span class="icon-circle icon-co-1"></span>试用期出勤时数
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="formalPeriod" width="130" :show-overflow-tooltip="true">
                                        <template slot="header" slot-scope="scope">
                                            <span class="icon-circle icon-co-1"></span>正式期出勤时数
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="attendanceWage" width="91" :show-overflow-tooltip="true">
                                        <template slot="header" slot-scope="scope">
                                            <span class="icon-circle icon-co-1"></span>出勤工资
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="sales" width="91" :show-overflow-tooltip="true">
                                        <template slot="header" slot-scope="scope">
                                            <span class="icon-circle icon-co-2"></span>业绩提成
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="meritPay" width="91" :show-overflow-tooltip="true">
                                        <template slot="header" slot-scope="scope">
                                            <span class="icon-circle icon-co-2"></span>绩效工资
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="bonus" width="91" :show-overflow-tooltip="true">
                                        <template slot="header" slot-scope="scope">
                                            <span class="icon-circle icon-co-2"></span>全勤奖
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="subsidies1" width="91" :show-overflow-tooltip="true">
                                        <template slot="header" slot-scope="scope">
                                            <span class="icon-circle icon-co-3"></span>津贴1
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="subsidies2" width="91" :show-overflow-tooltip="true">
                                        <template slot="header" slot-scope="scope">
                                            <span class="icon-circle icon-co-3"></span>津贴2
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="backPay" width="91" :show-overflow-tooltip="true">
                                        <template slot="header" slot-scope="scope">
                                            <span class="icon-circle icon-co-4"></span>补发工资
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="deductions" width="91" :show-overflow-tooltip="true">
                                        <template slot="header" slot-scope="scope">
                                            <span class="icon-circle icon-co-5"></span>考勤扣款
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="lateFees" width="100" :show-overflow-tooltip="true">
                                        <template slot="header" slot-scope="scope">
                                            <span class="icon-circle icon-co-5"></span>个人滞纳金
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="deductPay" width="91" :show-overflow-tooltip="true">
                                        <template slot="header" slot-scope="scope">
                                            <span class="icon-circle icon-co-3"></span>补扣工资
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="netPay" width="91" :show-overflow-tooltip="true">
                                        <template slot="header" slot-scope="scope">
                                            <span class="icon-circle icon-co-6"></span>应发工资
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="aged" width="91" :show-overflow-tooltip="true">
                                        <template slot="header" slot-scope="scope">
                                            <span class="icon-circle icon-co-7"></span>养老
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="dryDock" width="91" :show-overflow-tooltip="true">
                                        <template slot="header" slot-scope="scope">
                                            <span class="icon-circle icon-co-7"></span>失业
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="medical" width="91" :show-overflow-tooltip="true">
                                        <template slot="header" slot-scope="scope">
                                            <span class="icon-circle icon-co-7"></span>医疗
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="injury" width="91" :show-overflow-tooltip="true">
                                        <template slot="header" slot-scope="scope">
                                            <span class="icon-circle icon-co-7"></span>工伤
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="birth" width="91" :show-overflow-tooltip="true">
                                        <template slot="header" slot-scope="scope">
                                            <span class="icon-circle icon-co-7"></span>生育
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="hoseFund" width="100" :show-overflow-tooltip="true">
                                        <template slot="header" slot-scope="scope">
                                            <span class="icon-circle icon-co-7"></span>住房公积金
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="income" label="累计收入额(截止上月)" width="150"
                                        :show-overflow-tooltip="true">
                                    </el-table-column>
                                    <el-table-column prop="reduction" label="累计减免额(截止上月)" width="150"
                                        :show-overflow-tooltip="true">
                                    </el-table-column>
                                    <el-table-column prop="incomeMoney" label="累计收入额" width="103"
                                        :show-overflow-tooltip="true">
                                    </el-table-column>
                                    <el-table-column prop="reductionMoney" label="累计减免额" width="103"
                                        :show-overflow-tooltip="true">
                                    </el-table-column>
                                    <el-table-column prop="children" label="本月子女教育" width="103"
                                        :show-overflow-tooltip="true">
                                    </el-table-column>
                                    <el-table-column prop="conEducation" label="本月继续教育" width="103"
                                        :show-overflow-tooltip="true">
                                    </el-table-column>
                                    <el-table-column prop="loanInterest" label="本月住房贷款利息" width="140"
                                        :show-overflow-tooltip="true">
                                    </el-table-column>
                                    <el-table-column prop="hoseRents" label="本月住房租金" width="103"
                                        :show-overflow-tooltip="true">
                                    </el-table-column>
                                    <el-table-column prop="elder" label="本月赡养老人" width="103"
                                        :show-overflow-tooltip="true">
                                    </el-table-column>
                                    <el-table-column prop="taxPaid" label="累计已缴税额" width="103"
                                        :show-overflow-tooltip="true">
                                    </el-table-column>
                                    <el-table-column prop="payTax" label="当月应缴个税" width="103"
                                        :show-overflow-tooltip="true">
                                    </el-table-column>
                                    <el-table-column prop="netPayroll" label="实发工资" width="91"
                                        :show-overflow-tooltip="true">
                                    </el-table-column>
                                    <el-table-column prop="remark" label="备注" :show-overflow-tooltip="true">
                                    </el-table-column>
                                </el-table>
                            </div>
                            <div class="salary_table_1">
                                <p style="margin:20px 0 19px 0">薪资调整记录</p>
                                <el-table :data="tableData1" :header-cell-style="{background:'#eef1f6',color:'#606266'}"
                                    style="width: 970px;border:2px solid rgba(247,247,247,1); border-bottom:0;  ">
                                    <el-table-column prop="adjustItem" label="调整项" width="107"
                                        :show-overflow-tooltip="true">
                                    </el-table-column>
                                    <el-table-column prop="beforeAdjust" label="调整前" width="81"
                                        :show-overflow-tooltip="true">
                                    </el-table-column>
                                    <el-table-column prop="afterAdjust" label="调整后" width="81"
                                        :show-overflow-tooltip="true">
                                    </el-table-column>
                                    <el-table-column prop="effectiveTime" label="生效时间" width="113"
                                        :show-overflow-tooltip="true">
                                    </el-table-column>
                                    <el-table-column prop="adjustReason" label="调整原因" width="200"
                                        :show-overflow-tooltip="true">
                                    </el-table-column>
                                    <el-table-column prop="operator" label="操作人" width="97"
                                        :show-overflow-tooltip="true">
                                    </el-table-column>
                                    <el-table-column prop="operationTime" label="操作时间" :show-overflow-tooltip="true">
                                    </el-table-column>
                                </el-table>
                            </div>
                        </div>
                        <div v-else="flagSalary = true" class="flagSalary">
                            <el-form :inline="true" ref="salary" class="demo-ruleForm salaryform">
                                <el-row>
                                    <el-col class="scheme" :span="7">
                                        <el-form-item>
                                            <span class="tag">薪资方案：</span>
                                            <el-divider direction="vertical"></el-divider>
                                            <el-select v-model="salary.scheme" placeholder="请选择">
                                                <el-option label="区域一" value="1"></el-option>
                                                <el-option label="区域二" value="2"></el-option>
                                            </el-select>
                                        </el-form-item>
                                        <i class="iconfont icon-tianjia" style="color: #D6CBCE; font-size: 23px;"
                                            @click="salaryClick"></i>
                                    </el-col>
                                    <el-col class="scheme" id="startDate" :span="6">
                                        <el-form-item>
                                            <span class="tag">全额计薪开始日期：</span>
                                            <el-divider direction="vertical"></el-divider>
                                            <el-date-picker v-model="salary.startDate" type="date" placeholder="选择日期">
                                            </el-date-picker>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="7" class="title">
                                        <h2>试用期各薪资项及金额</h2>
                                    </el-col>
                                    <el-col :span="9" class="col_icon title">
                                        <el-form-item prop="duringPeriod" id="wrapName">
                                            <span class="tag">试用期基本薪资：</span>
                                            <el-divider direction="vertical"></el-divider>
                                            <el-input v-model="salary.duringPeriod" placeholder="请填写"
                                                @focus="chageName(false)" @blur="chageName(true)" id="name">
                                            </el-input>
                                        </el-form-item><b>元/月</b>
                                    </el-col>
                                    <el-col :span="4" class="title margin">
                                        <i>交通补贴：</i>
                                        <b>200元/月</b>
                                    </el-col>
                                    <el-col :span="3" class="title margin">
                                        <i>餐补：</i>
                                        <b>200元/月</b>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="7" class="title">
                                        <h2>转正后各薪资项及金额</h2>
                                    </el-col>
                                    <el-col :span="9" class="col_icon title">
                                        <el-form-item prop="current" id="wrapIdNum">
                                            <span class="tag">当前基本薪资：</span>
                                            <el-divider direction="vertical"></el-divider>
                                            <el-input v-model="basic.current" placeholder="请填写"
                                                @focus="chageIdNum(false)" @blur="chageIdNum(true)" id="idNum">
                                            </el-input>
                                        </el-form-item><b>元/月</b>
                                    </el-col>
                                    <el-col :span="4" class="title margin">
                                        <i>交通补贴：</i>
                                        <b>200元/月</b>
                                    </el-col>
                                    <el-col :span="3" class="title margin">
                                        <i>餐补：</i>
                                        <b>200元/月</b>
                                    </el-col>
                                </el-row>

                                <el-row class="wages">
                                    <el-col :span="8">
                                        <el-form-item prop="wagesCard" id="wrap">
                                            <span>工资卡号1：</span>
                                            <el-divider direction="vertical"></el-divider>
                                            <el-input v-model="salary.wagesCard" placeholder="请填写" id="name">
                                            </el-input>
                                        </el-form-item>
                                    </el-col>

                                    <el-col :span="8">
                                        <el-form-item prop="openingBank" id="wrapName">
                                            <span>开户行：</span>
                                            <el-divider direction="vertical"></el-divider>
                                            <el-input v-model="salary.openingBank" placeholder="请填写" id="name">
                                            </el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item prop="userStories" id="wrapName">
                                            <span>用途描述：</span>
                                            <el-divider direction="vertical"></el-divider>
                                            <el-input v-model="salary.userStories" placeholder="请填写" id="name">
                                            </el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>

                                <el-row class="wages" v-for="item in salary" :key="item.value">
                                    <el-col :span="8">
                                        <el-form-item prop="wagesCard1" id="wrap">
                                            <span>工资卡号2：</span>
                                            <el-divider direction="vertical"></el-divider>
                                            <el-input v-model="item.wagesCard1" placeholder="请填写"
                                                @focus="chageIdNum(false)" @blur="chageIdNum(true)" id="name">
                                            </el-input>
                                        </el-form-item>
                                    </el-col>

                                    <el-col :span="8">
                                        <el-form-item prop="openingBank1" id="wrapName">
                                            <span>开户行：</span>
                                            <el-divider direction="vertical"></el-divider>
                                            <el-input v-model="item.openingBank1" placeholder="请填写"
                                                @focus="chageName(false)" @blur="chageName(true)" id="name"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item prop="userStories1" id="wrapName">
                                            <span>用途描述：</span>
                                            <el-divider direction="vertical"></el-divider>
                                            <el-input v-model="item.userStories1" placeholder="请填写"
                                                @focus="chageName(false)" @blur="chageName(true)" id="name"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </el-form>
                            <h6 @click='addpay' style="cursor:pointer">+ 添加更多工资卡</h6>
                        </div>

                    </div>
                    <div class="welfare step-jump" style="padding-bottom:20px">
                        <ul class="basic_instro" style="margin-bottom:23px;margin-top: 18px;">
                            <li>福利信息</li>
                            <li class="icon" @click="editWelfare" v-if="flagWelfare">
                                <i class="iconfont icon-bianjixiugai-copy" style="font-size:13px;"></i>
                                <span>修改信息</span>
                            </li>
                            <el-row v-else="flagWelfare = true" class="iconButton">
                                <el-button type="primary" :plain="true" @click="saveWelfare">保存</el-button>
                                <el-button :plain="true" @click="cancelWelfare">取消</el-button>
                            </el-row>
                        </ul>
                        <div class="welfare_con" v-if="flagWelfare">
                            <ul>
                                <li style="width:30%">
                                    <strong style="margin-right:20px;">社保公积金方案:</strong>
                                    <span>方案一</span>
                                </li>
                                <li>
                                    <strong style="margin-right:20px;">缴纳户口类型:</strong>
                                    <span>城镇</span>
                                </li>
                            </ul>
                            <ul>
                                <li style="width:30%">
                                    <strong style="margin-right:20px;">社保缴纳基数:</strong>
                                    <span>5000元</span>
                                </li>
                                <li style="width:30%">
                                    <strong style="margin-right:20px;">社保起缴月:</strong>
                                    <span>2017-08-12</span>
                                </li>
                                <li>
                                    <strong style="margin-right:20px;">社保停缴月:</strong>
                                    <span>2017-08-12</span>
                                </li>
                            </ul>
                            <ul>
                                <li style="width:30%">
                                    <strong style="margin-right:20px;">公积金缴纳基数:</strong>
                                    <span>5000元</span>
                                </li>
                                <li style="width:30%">
                                    <strong style="margin-right:20px;">公积金起缴月:</strong>
                                    <span>2017-08-12</span>
                                </li>
                                <li>
                                    <strong style="margin-right:20px;">公积金停缴月:</strong>
                                    <span>2017-08-12</span>
                                </li>
                            </ul>
                            <div class="welfare_table">
                                <p style="margin:0 0 19px 0">福利调整记录</p>
                                <el-table :data="tableData2"
                                    style="width: 970px;border:2px solid rgba(247,247,247,1); border-bottom:0;">
                                    <el-table-column prop="settlingTime" label="调整时间" width="113"
                                        :show-overflow-tooltip="true">
                                    </el-table-column>
                                    <el-table-column prop="beforeAdjust" label="调整前" width="123"
                                        :show-overflow-tooltip="true">
                                    </el-table-column>
                                    <el-table-column prop="afterAdjust" label="调整后" width="123"
                                        :show-overflow-tooltip="true">
                                    </el-table-column>
                                    <el-table-column prop="adjustReason" label="调整原因" width="221"
                                        :show-overflow-tooltip="true">
                                    </el-table-column>
                                    <el-table-column prop="operator" label="操作人" width="97"
                                        :show-overflow-tooltip="true">
                                    </el-table-column>
                                    <el-table-column prop="operationTime" label="操作时间" :show-overflow-tooltip="true">
                                    </el-table-column>
                                </el-table>
                            </div>
                        </div>
                        <div v-else="flagWelfare = true">
                            <el-form :model="welfare" :inline="true" ref="welfare" label-width="100px"
                                class="demo-ruleForm welfareform">
                                <el-row>
                                    <el-col class="socialface" :span="7">
                                        <el-form-item>
                                            <span>社保公积金方案：</span>
                                            <el-divider direction="vertical"></el-divider>
                                            <el-select v-model="welfare.scheme" placeholder="请选择">
                                                <el-option label="方案一" value="1"></el-option>
                                                <el-option label="方案二" value="2"></el-option>
                                            </el-select>
                                        </el-form-item>
                                        <i class="iconfont icon-tianjia"
                                            style="color: #D6CBCE; font-size: 23px; line-height:41px;"
                                            @click="scheme"></i>
                                    </el-col>
                                    <el-col :span="6" class="residence_type">
                                        <el-form-item>
                                            <span>缴纳户口类型：</span>
                                            <el-divider direction="vertical"></el-divider>
                                            <el-select v-model="welfare.type" placeholder="请选择">
                                                <el-option label="城镇" value="1"></el-option>
                                                <el-option label="农业" value="2"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="7" class="startSocial">
                                        <el-form-item prop="startSocial" id="wrapIdNum">
                                            <span>社保起缴月：</span>
                                            <el-divider direction="vertical"></el-divider>
                                            <el-date-picker v-model="welfare.startSocial" type="month"
                                                placeholder="选择日期">
                                            </el-date-picker>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="7" class="cardinal">
                                        <el-form-item prop="endSocial" id="wrapIdNum">
                                            <span>社保缴纳基数：</span>
                                            <el-divider direction="vertical"></el-divider>
                                            <el-input v-model="welfare.cardinal" placeholder="请填写"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="7" class="endSocial socialEnd">
                                        <el-form-item prop="endSocial" id="wrapIdNum">
                                            <span>社保停缴月：</span>
                                            <el-divider direction="vertical"></el-divider>
                                            <el-date-picker v-model="welfare.endSocial" type="month" placeholder="选择日期">
                                            </el-date-picker>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="7" class="endSocial socialStart">
                                        <el-form-item prop="startfund" id="wrapIdNum">
                                            <span>公积金起缴月：</span>
                                            <el-divider direction="vertical"></el-divider>
                                            <el-date-picker v-model="welfare.startfund" type="month" placeholder="选择日期">
                                            </el-date-picker>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="7" class="fundcardinal endSocial">
                                        <el-form-item prop="startfund" id="wrapIdNum">
                                            <span>公积金缴纳基数：</span>
                                            <el-divider direction="vertical"></el-divider>
                                            <el-input v-model="welfare.fundcardinal" placeholder="请填写"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="7" class="endSocial socialStart">
                                        <el-form-item prop="endfund" id="wrapIdNum">
                                            <span>公积金停缴月：</span>
                                            <el-divider direction="vertical"></el-divider>
                                            <el-date-picker v-model="welfare.endfund" type="month" placeholder="选择日期">
                                            </el-date-picker>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </el-form>
                            </el-form>
                        </div>

                    </div>
                    <div class="education step-jump">
                        <ul class="basic_instro" style="margin-top: 18px;">
                            <li>教育经历</li>
                            <li class="icon" @click="editEducation" v-if="flagEducation">
                                <i class="iconfont icon-bianjixiugai-copy" style="font-size:13px;"></i>
                                <span>修改信息</span>
                            </li>
                            <el-row v-else="flagEducation = true" class="iconButton">
                                <el-button type="primary" :plain="true" @click="saveEducation">保存</el-button>
                                <el-button :plain="true" @click="cancelEducation">取消</el-button>
                            </el-row>
                        </ul>
                        <div class="education_con" v-if="flagEducation">
                            <ul>
                                <li style="margin-right: 71px;">
                                    <strong>学校：</strong>
                                    <span>北京大学</span>
                                </li>
                                <li style="margin-right:97px;">
                                    <strong>专业：</strong>
                                    <span>计算机科学与技术</span>
                                </li>
                                <li style="margin-right:81px;">
                                    <strong>入学时间：</strong>
                                    <span>2008-09-08</span>
                                </li>
                                <li>
                                    <strong>结业时间：</strong>
                                    <span>2012-09-08</span>
                                </li>
                                <li style="width: 100%">
                                    <strong>是否取得学位：</strong>
                                    <!-- （1-是，2-否） -->
                                    <span>{{empDetails.highEducationDegree === 1?'是':''||empDetails.highEducationDegree === 2?'否':''}}</span>
                                </li>
                                <li style="margin-right: 73px;">
                                    <strong>教育证书照<em>1</em>：</strong>
                                    <span>无</span>
                                </li>
                                <li>
                                    <strong>教育证书照<em>2</em>:</strong>
                                    <span>无</span>
                                </li>
                            </ul>
                        </div>
                        <div style="margin-top:26px" v-else="flagEducation = true">
                            <el-form :model="education" :inline="true" ref="education"
                                class="demo-ruleForm educationform">
                                <el-row>
                                    <el-col :span="6" class="major">
                                        <el-form-item prop="school" id="wrapName">
                                            <span>学校：</span>
                                            <el-divider direction="vertical"></el-divider>
                                            <el-input v-model="education.school" placeholder="请填写" id="name"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6" class="major">
                                        <el-form-item prop="major" id="wrap">
                                            <span>专业：</span>
                                            <el-divider direction="vertical"></el-divider>
                                            <el-input v-model="education.major" placeholder="请填写" id="name"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6" class="entrydate">
                                        <el-form-item prop="admission" id="wrapIdNum">
                                            <span>入学时间：</span>
                                            <el-divider direction="vertical"></el-divider>
                                            <el-date-picker v-model="education.admission" type="date"
                                                placeholder="选择日期">
                                            </el-date-picker>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6" class="entrydate">
                                        <el-form-item prop="completion" id="wrapIdNum">
                                            <span>结业时间：</span>
                                            <el-divider direction="vertical"></el-divider>
                                            <el-date-picker v-model="education.completion" type="date"
                                                placeholder="选择日期">
                                            </el-date-picker>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-form-item label="是否取得学位：" class="degree">
                                    <el-radio-group v-model="basic.idNum">
                                        <el-radio label="是"></el-radio>
                                        <el-radio label="否"></el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </el-form>
                            <div class="education_picture certificate">
                                <em>教育证书照1：</em>
                                <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/"
                                    :on-remove="handleRemove" :on-preview="handlePictureCardPreview"
                                    :show-file-list="false" :on-success="handleAvatarSuccess"
                                    :before-upload="beforeAvatarUpload">
                                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon">新增照片</i>
                                </el-upload>
                                <el-dialog :visible.sync="dialogVisible">
                                    <img width="100%" :src="dialogImageUrl" alt="">
                                </el-dialog>
                            </div>
                            <div class="education_picture">
                                <em>教育证书照2：</em>
                                <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/"
                                    :on-remove="handleRemove" :on-preview="handlePictureCardPreview"
                                    :show-file-list="false" :on-success="handleAvatarSuccess"
                                    :before-upload="beforeAvatarUpload">
                                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon">新增照片</i>
                                </el-upload>
                                <el-dialog :visible.sync="dialogVisible">
                                    <img width="100%" :src="dialogImageUrl" alt="">
                                </el-dialog>
                            </div>
                        </div>
                    </div>
                    <div class="train step-jump">
                        <ul class="basic_instro" style="margin-bottom:23px;margin-top: 18px;">
                            <li>培训经历</li>
                            <li class="icon" @click="editTrain" v-if="flagTrain">
                                <i class="iconfont icon-bianjixiugai-copy" style="font-size:13px;"></i>
                                <span>修改信息</span>
                            </li>
                            <el-row v-else="flagTrain = true" class="iconButton">
                                <el-button type="primary" :plain="true" @click="saveTrain">保存</el-button>
                                <el-button :plain="true" @click="cancelTrain">取消</el-button>
                            </el-row>
                        </ul>
                        <div class="train_con" v-if="flagTrain">
                            <i class="iconfont icon-shibaibiaoqing"
                                style="width: 24px; height: 24px; margin-right: 16px;color:rgba(0,0,0,0.25);"></i>
                            <span>暂无数据</span>
                        </div>
                        <div v-else="flagTrain = true">
                            <el-form :model="train" :inline="true" ref="train" class="demo-ruleForm trainform">
                                <el-row>
                                    <el-col :span="6">
                                        <el-form-item prop="companyName" id="wrapName">
                                            <span>公司名称：</span>
                                            <el-divider direction="vertical"></el-divider>
                                            <el-input v-model="train.companyName" placeholder="请填写" id="name">
                                            </el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item prop="position" id="wrap">
                                            <span>担任职位：</span>
                                            <el-divider direction="vertical"></el-divider>
                                            <el-input v-model="train.position" placeholder="请填写" id="name"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item prop="startingTime" id="wrapIdNum">
                                            <span>起始时间：</span>
                                            <el-divider direction="vertical"></el-divider>
                                            <el-date-picker v-model="train.startingTime" type="date" placeholder="选择日期">
                                            </el-date-picker>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item prop="finalTime" id="wrapIdNum">
                                            <span>终止时间：</span>
                                            <el-divider direction="vertical"></el-divider>
                                            <el-date-picker v-model="train.finalTime" type="date" placeholder="选择日期">
                                            </el-date-picker>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </el-form>
                            <h6 @click='trainExperience' style="cursor:pointer">+ 添加更多培训经历</h6>
                        </div>
                    </div>
                    <div class="work step-jump">
                        <ul class="basic_instro" style="margin-bottom:23px;margin-top: 18px;">
                            <li>工作经历</li>
                            <li class="icon" @click="editWork" v-if="flagWork">
                                <i class="iconfont icon-bianjixiugai-copy" style="font-size:13px;"></i>
                                <span>修改信息</span>
                            </li>
                            <el-row v-else="flagWork = true" class="iconButton">
                                <el-button type="primary" :plain="true" @click="saveWork">保存</el-button>
                                <el-button :plain="true" @click="cancelWork">取消</el-button>
                            </el-row>
                        </ul>
                        <div class="work_con" v-if="flagWork">
                            <ul style="margin-bottom: 20px">
                                <li style="margin-right: 20px;">
                                    <strong style="margin-right:3px;">公司名称:</strong>
                                    <span>北京奇妙幻想科技有限公司</span>
                                </li>
                                <li style="margin-right: 81px;">
                                    <strong style="margin-right:3px;">担任职位:</strong>
                                    <span>新媒体运营</span>
                                </li>
                                <li style="margin-right:53px;">
                                    <strong style="margin-right:3px;">起始年月:</strong>
                                    <span>2012-08 至 2017 - 07</span>
                                </li>
                                <li style="margin-right: 81px;">
                                    <strong style="margin-right:3px;">月收入:</strong>
                                    <span>10000元</span>
                                </li>
                            </ul>
                            <ul>
                                <li style="margin-right: 125px;">
                                    <strong style="margin-right:3px;">工作描述:</strong>
                                    <span>这里显示工作描述这里显示工作描述这里显示</span>
                                </li>
                                <li>
                                    <strong style="margin-right:3px;">离职原因:</strong>
                                    <span>这里显示工作描述这里显示工作描述这里显示</span>
                                </li>
                            </ul>
                        </div>
                        <div v-else="flagWork = true">
                            <el-form :model="work" :inline="true" ref="work" label-width="100px"
                                class="demo-ruleForm workform">
                                <el-row>
                                    <el-col :span="6">
                                        <el-form-item prop="companyName" id="wrapName">
                                            <span>公司名称：</span>
                                            <el-divider direction="vertical"></el-divider>
                                            <el-input v-model="work.companyName" placeholder="请填写" id="name"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item prop="position" id="wrap">
                                            <span>担任职位：</span>
                                            <el-divider direction="vertical"></el-divider>
                                            <el-input v-model="work.position" placeholder="请填写" id="name"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="10" class="startingTime">
                                        <el-form-item prop="startingTime" id="wrapIdNum">
                                            <span>起始年月：</span>
                                            <el-divider direction="vertical"></el-divider>
                                            <el-date-picker v-model="work.startingTime" type="daterange"
                                                range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                                            </el-date-picker>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8" id="wrapPresent">
                                        <el-form-item prop="present">
                                            <span>月收入：</span>
                                            <el-divider direction="vertical"></el-divider>
                                            <el-input v-model="work.present" placeholder="请填写" id="idNum">
                                            </el-input>
                                        </el-form-item><b>元/月</b>
                                    </el-col>
                                </el-row>
                            </el-form>
                            <div class="work_mess">
                                <em>工作描述：</em>
                                <el-input type="textarea" placeholder="请填写" v-model="work.textarea1">
                                </el-input>
                            </div>
                            <div class="work_mess work_reason">
                                <em>离职原因：</em>
                                <el-input type="textarea" placeholder="请填写" v-model="work.textarea2">
                                </el-input>
                            </div>
                            <h6 @click='workExperience' style="cursor:pointer">+ 添加更多工作经历</h6>
                        </div>
                    </div>

                    <div class="picture step-jump">
                        <ul class="basic_instro" style="margin-bottom:23px;margin-top: 18px;">
                            <li>图片附件</li>
                            <li class="icon" @click="editPicture" v-if="flagPicture">
                                <i class="iconfont icon-bianjixiugai-copy" style="font-size:13px;"></i>
                                <span>修改信息</span>
                            </li>
                            <el-row v-else="flagPicture = true" class="iconButton">
                                <el-button type="primary" :plain="true" @click="savePicture">保存</el-button>
                                <el-button :plain="true" @click="cancelPicture">取消</el-button>
                            </el-row>
                        </ul>
                        <div class="picture_con" v-if="flagPicture">
                            <i class="iconfont icon-shibaibiaoqing"
                                style="width: 24px; height: 24px; margin-right: 16px;color:rgba(0,0,0,0.25);"></i>
                            <span>暂无数据</span>
                        </div>
                        <div v-else="flagPicture">
                            <div class="picture_upload">
                                <em>图片1：</em>
                                <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/"
                                    :on-remove="handleRemove" :on-preview="handlePictureCardPreview"
                                    :show-file-list="false" :on-success="handleAvatarSuccess"
                                    :before-upload="beforeAvatarUpload">
                                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon">新增照片</i>
                                </el-upload>
                                <el-dialog :visible.sync="dialogVisible">
                                    <img width="100%" :src="dialogImageUrl" alt="">
                                </el-dialog>
                            </div>
                            <div class="picture_upload1">
                                <em>图片2：</em>
                                <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/"
                                    :on-remove="handleRemove" :on-preview="handlePictureCardPreview"
                                    :show-file-list="false" :on-success="handleAvatarSuccess"
                                    :before-upload="beforeAvatarUpload">
                                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon">新增照片</i>
                                </el-upload>
                                <el-dialog :visible.sync="dialogVisible">
                                    <img width="100%" :src="dialogImageUrl" alt="">
                                </el-dialog>
                            </div>
                            <h6 @click='addPicture' style="cursor:pointer">+ 添加更多图片信息</h6>
                        </div>
                    </div>
                    <div class="moveRecord step-jump">
                        <ul class="basic_instro" style="margin-bottom:23px;margin-top: 18px;">
                            <li>异动记录</li>
                        </ul>
                        <div class="moveRecord_con">
                            <div class="transaction">
                                <p style="margin:0 0 20px 0">
                                    <strong style="margin-right: 20px;">2019-04-04</strong>
                                    <strong>异动类型：&nbsp;&nbsp;<em style="font-style: normal;">晋升</em></strong>
                                </p>
                                <ul style="margin-right: 64px;">
                                    <li>
                                        <strong>原部门：</strong>
                                        <span>销售一部</span>
                                    </li>
                                    <li>
                                        <strong>异动原因：</strong>
                                        <span>这里显示异动原因</span>
                                    </li>
                                </ul>
                                <ul style="margin-right: 108px;">
                                    <li>
                                        <strong>调整后：</strong>
                                        <span>销售二部</span>
                                    </li>
                                </ul>
                                <ul style="margin-right: 86px;">
                                    <li>
                                        <strong>原岗位：</strong>
                                        <span>销售经理</span>
                                    </li>
                                </ul>
                                <ul>
                                    <li>
                                        <strong>调整后：</strong>
                                        <span>方案二</span>
                                    </li>
                                </ul>
                            </div>
                            <div class="transaction">
                                <p style="margin:0 0 20px 0">
                                    <strong style="margin-right: 20px;">2019-04-04</strong>
                                    <strong>异动类型：&nbsp;&nbsp;<em style="font-style: normal;">晋升</em></strong>
                                </p>
                                <ul style="margin-right: 64px;">
                                    <li>
                                        <strong>原部门：</strong>
                                        <span>销售一部</span>
                                    </li>
                                    <li>
                                        <strong>异动原因：</strong>
                                        <span>这里显示异动原因</span>
                                    </li>
                                </ul>
                                <ul style="margin-right: 108px;">
                                    <li>
                                        <strong>调整后：</strong>
                                        <span>销售二部</span>
                                    </li>
                                </ul>
                                <ul style="margin-right: 86px;">
                                    <li>
                                        <strong>原岗位：</strong>
                                        <span>销售经理</span>
                                    </li>
                                </ul>
                                <ul>
                                    <li>
                                        <strong>调整后：</strong>
                                        <span>方案二</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="dialog">
            <backpay v-if="backpayVisible" :backpayVisible.sync="backpayVisible"></backpay>
            <staffId v-if="staffIdVisible" :staffIdVisible.sync="staffIdVisible"></staffId>
            <staffCompany v-if="companyVisible" :companyVisible.sync="companyVisible"></staffCompany>
            <department v-if="departmentVisible" :departmentVisible.sync="departmentVisible"></department>
        </div>
    </div>
</template>

<script>

    // 导入滚动条插件
    // import $ from 'jquery'
    // import 'jquery.nicescroll'

    // 引入员工信息公共组件
    import employeeComm from '../../components/employee/employeeComm.vue'
    import staffId from '../../components/employee/staffId.vue'
    import staffCompany from '../../components/employee/company.vue'
    import backpay from '../../components/employee/backpay.vue'

    import department from '../../components/employee/department.vue'
    export default {
        components: {
            employeeComm,
            staffId,
            staffCompany,
            department,
            backpay
        },
        data() {
            return {
                // 员工详情
                empDetails: [],
                //弹框
                departmentVisible: false,
                staffIdVisible: false,
                companyVisible: false,
                backpayVisible: false,

                // 修改
                flagBasic: true,
                flagContract: true,
                flagSalary: true,
                flagEducation: true,
                flagTrain: true,
                flagWork: true,
                flagWelfare: true,
                flagPicture: true,

                // 图片
                dialogVisible: false,
                dialogImageUrl: '',
                imageUrl: '',

                // 锚点
                activeStep: 0,
                active: '',
                // 锚点
                stepsArr: [
                    { title: '基本信息' },
                    { title: '合同信息' },
                    { title: '薪资信息' },
                    { title: '福利信息' },
                    { title: '教育经历' },
                    { title: '培训经历' },
                    { title: '工作经历' },
                    { title: '图片附件' },
                    { title: '异动记录' }
                ],


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
                contract: [{
                    SetColumn: '',
                    company: '',
                    startTime: '',
                    actualDate: '',
                    expiryDate: '',
                    positive: ''
                }],
                work: {
                    companyName: '',
                    position: '',
                    startingTime: '',
                    finalTime: '',
                    present: '',
                    textarea1: '',
                    textarea2: ''
                },
                education: {
                    school: '',
                    major: '',
                    admission: '',
                    completion: '',
                    resource: ''
                },
                salary: [{
                    scheme: '',
                    startDate: '',
                    duringPeriod: '',
                    current: '',
                    wagesCard: '',
                    openingBank: '',
                    userStories: '',
                    wagesCard1: '',
                    openingBank1: '',
                    userStories1: ''
                }],
                welfare: {
                    scheme: '',
                    fund: '',
                    startSocial: '',
                    endSocial: '',
                    startfund: '',
                    endfund: ''
                },
                train: {
                    companyName: '',
                    position: '',
                    startingTime: '',
                    finalTime: ''
                },

                tableData: [{
                    month: '2019-05',
                    baseSalary: '5000元',
                    postSalary: '800元',
                    dueDays: '22天',
                    periodDay: '10天',
                    formalPeriod: '12天',
                    attendanceWage: '8000.00',
                    sales: '0.00',
                    meritPay: '0.00',
                    bonus: '0.00',
                    subsidies1: '500.00',
                    subsidies2: '500.00',
                    backPay: '0.00',
                    deductions: '500.00',
                    lateFees: '0.00',
                    deductPay: '0.00',
                    netPay: '75000.00',
                    aged: '500.00',
                    dryDock: '0.00',
                    medical: '0.00',
                    injury: '0.00',
                    birth: '0.00',
                    hoseFund: '500.00',
                    income: '20000.00',
                    reduction: '10000.00',
                    incomeMoney: '26500.00',
                    reductionMoney: '17000.00',
                    children: '1000.00',
                    conEducation: '0.00',
                    loanInterest: '0.00',
                    hoseRents: '0.00',
                    elder: '0.00',
                    taxPaid: '85.00',
                    payTax: '200.00',
                    netPayroll: '6300.00',
                    remark: ''
                }, {
                    month: '2019-05',
                    baseSalary: '5000元',
                    postSalary: '800元',
                    dueDays: '22天',
                    periodDay: '10天',
                    formalPeriod: '12天',
                    attendanceWage: '8000.00',
                    sales: '0.00',
                    meritPay: '0.00',
                    bonus: '0.00',
                    subsidies1: '500.00',
                    subsidies2: '500.00',
                    backPay: '0.00',
                    deductions: '500.00',
                    lateFees: '0.00',
                    deductPay: '0.00',
                    netPay: '75000.00',
                    aged: '500.00',
                    dryDock: '0.00',
                    medical: '0.00',
                    injury: '0.00',
                    birth: '0.00',
                    hoseFund: '500.00',
                    income: '20000.00',
                    reduction: '10000.00',
                    incomeMoney: '26500.00',
                    reductionMoney: '17000.00',
                    children: '1000.00',
                    conEducation: '0.00',
                    loanInterest: '0.00',
                    hoseRents: '0.00',
                    elder: '0.00',
                    taxPaid: '85.00',
                    payTax: '200.00',
                    netPayroll: '6300.00',
                    remark: ''
                }],
                tableData1: [{
                    adjustItem: '基本薪资',
                    beforeAdjust: '5000',
                    afterAdjust: '6000',
                    effectiveTime: '2019-04-15',
                    adjustReason: '原因',
                    operator: '秦羽然',
                    operationTime: '2019-04-17 09:30'
                },
                {
                    adjustItem: '基本薪资',
                    beforeAdjust: '5000',
                    afterAdjust: '6000',
                    effectiveTime: '2019-04-15',
                    adjustReason: '原因',
                    operator: '秦羽然',
                    operationTime: '2019-04-17 09:30'
                }],
                tableData2: [{
                    settlingTime: '2019-04-15',
                    beforeAdjust: '方案一',
                    afterAdjust: '方案二',
                    adjustReason: '原因',
                    operator: '秦羽然',
                    operationTime: '2019-04-17 09:30'
                }, {
                    settlingTime: '2019-04-15',
                    beforeAdjust: '方案一',
                    afterAdjust: '方案二',
                    adjustReason: '原因',
                    operator: '秦羽然',
                    operationTime: '2019-04-17 09:30'
                }]
            }
        },
        // 时间转换
        filters: {
            formatDate: function (value) {
                let date = new Date(value);
                let y = date.getFullYear();
                let MM = date.getMonth() + 1;
                MM = MM < 10 ? ('0' + MM) : MM;
                let d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                return y + '/' + MM + '/' + d;
            }
        },
        methods: {
            // 获取员工详情
            getEmpDetails() {
                var empId = Number(this.$route.query.id);
                // console.log(empId);
                this.$http.get("/emplist/getEmpInfo", {
                    params: {
                        id: empId
                    }
                }).then(data => {
                    this.empDetails = data.result
                })
            },
            // 图片上传
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
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
            // 移除图片
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            // 图片预览
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },

            // 修改
            editContract() {
                this.flagContract = false;
            },
            editBasic() {
                this.flagBasic = false;
            },
            editSalary() {
                this.flagSalary = false;
            },
            editEducation() {
                this.flagEducation = false;
            },
            editTrain() {
                this.flagTrain = false;
            },
            editWork() {
                this.flagWork = false;
            },
            editWelfare() {
                this.flagWelfare = false;
            },
            editPicture() {
                this.flagPicture = false;
            },

            // 添加更多信息
            addContract() {
                console.log(this.contract);
                this.contract.push({
                    SetColumn: '',
                    company: '',
                    startTime: '',
                    actualDate: '',
                    expiryDate: '',
                    positive: ''
                });
            },
            workExperience() {

            },
            addpay() {
                this.salary.push({
                    wagesCard1: '',
                    openingBank1: '',
                    userStories1: ''
                })
            },
            trainExperience() {

            },
            addPicture() {

            },


            // 保存成功及取消提示
            saveBasic() {
                this.$message({
                    showClose: true,
                    message: '基本信息编辑成功并保存',
                    type: 'success',
                    center: true
                });
                this.flagBasic = true;
            },
            saveContract() {
                this.$message({
                    showClose: true,
                    message: '合同信息编辑成功并保存',
                    type: 'success',
                    center: true
                });
                this.flagContract = true;
            },
            saveSalary() {
                this.$message({
                    showClose: true,
                    message: '薪资信息编辑成功并保存',
                    type: 'success',
                    center: true
                });
                this.flagSalary = true;
            },
            saveWelfare() {
                this.$message({
                    showClose: true,
                    message: '福利信息编辑成功并保存',
                    type: 'success',
                    center: true
                });
                this.flagWelfare = true;
            },
            saveEducation() {
                this.$message({
                    showClose: true,
                    message: '教育经历编辑成功并保存',
                    type: 'success',
                    center: true
                });
                this.flagEducation = true;
            },
            saveTrain() {
                this.$message({
                    showClose: true,
                    message: '培训经历编辑成功并保存',
                    type: 'success',
                    center: true
                });
                this.flagTrain = true;
            },
            saveWork() {
                this.$message({
                    showClose: true,
                    message: '工作经历编辑成功并保存',
                    type: 'success',
                    center: true
                });
                this.flagWork = true;
            },
            savePicture() {
                this.$message({
                    showClose: true,
                    message: '图片附件编辑成功并保存',
                    type: 'success',
                    center: true
                });
                this.flagPicture = true;
            },


            cancelBasic() {
                this.$message({
                    showClose: true,
                    message: '基本信息取消编辑,并退出',
                    center: true
                });
                this.flagBasic = true;
            },
            cancelContract() {
                this.$message({
                    showClose: true,
                    message: '合同信息取消编辑,并退出',
                    center: true
                });
                this.flagContract = true;
            },
            cancelSalary() {
                this.$message({
                    showClose: true,
                    message: '薪资信息取消编辑,并退出',
                    center: true
                });
                this.flagSalary = true;
            },
            cancelWelfare() {
                this.$message({
                    showClose: true,
                    message: '福利信息取消编辑,并退出',
                    center: true
                });
                this.flagWelfare = true;
            },
            cancelEducation() {
                this.$message({
                    showClose: true,
                    message: '教育经历取消编辑,并退出',
                    center: true
                });
                this.flagEducation = true;
            },
            cancelTrain() {
                this.$message({
                    showClose: true,
                    message: '培训经历取消编辑,并退出',
                    center: true
                });
                this.flagTrain = true;
            },
            cancelWork() {
                this.$message({
                    showClose: true,
                    message: '工作经历取消编辑,并退出',
                    center: true
                });
                this.flagWork = true;
            },
            cancelPicture() {
                this.$message({
                    showClose: true,
                    message: '图片附件取消编辑,并退出',
                    center: true
                });
                this.flagPicture = true;
            },



            // 锚点
            // 当元素滚动条被滚动时运行的脚本
            onScroll() {
                // var box = document.getElementById('box')
                // var t = document.documentElement.scrollTop || document.body.scrollTop
                // box.style.top = t + 'px'
                var jump = document.querySelectorAll('.step-jump')

                var distance =
                    document.documentElement.scrollTop ||
                    window.pageYOffset ||
                    document.body.scrollTop
                jump.forEach((item, index) => {
                    if (distance >= item.offsetTop) {
                        this.activeStep = index;
                    }
                })
            },
            // 锚点点击
            jump(index) {
                console.log(index);
                this.activeStep = index;

                let jump = document.querySelectorAll('.step-jump');

                // 通过 offsetTop 获取对象到窗体顶部的距离，然后赋值给 scrollTop，实现锚点的功能
                let total = jump[index].offsetTop
                console.log(total)
                // scrollTop滚动条距离页面的距离
                let distance =
                    document.documentElement.scrollTop ||
                    window.pageYOffset ||
                    document.body.scrollTop
                // console.log(distance)
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


            // i
            staffSection() {
                this.departmentVisible = true;
            },
            // 员工工号弹窗
            staff() {
                this.staffIdVisible = true;
            },
            // 合同公司
            staffComponent() {
                this.companyVisible = true;
            },
            salaryClick() {
                this.$router.push("/salary");
            },

        },
        mounted() {
            // 锚点
            this.$nextTick(function () {
                window.addEventListener('scroll', this.onScroll)
            })
            this.getEmpDetails();
        },
    }
</script>
<style scoped>
    .icon {
        font-size: 12px;
        position: absolute;
        right: 92px;
        cursor: pointer;
    }

    >>>.el-input--prefix .el-input__inner {
        padding: 0 19px 0 24px;
    }

    >>>.el-input__prefix {
        left: -4px;
    }

    >>>.el-input__suffix {
        right: 0;
    }

    .basicform>>>.el-input__inner {
        border: 0;
    }

    .col_icon::before {
        content: '*';
        color: rgba(25, 114, 234, 1);
        line-height: 3;
    }

    >>>.el-form {
        float: none;
    }

    >>>.el-form span {
        padding-left: 4px;
    }

    #type>>>.el-divider {
        margin-left: 16px;
    }

    .iconButton button:first-child {
        position: absolute;
        right: 73px;
    }

    .iconButton button:last-child {
        position: absolute;
        right: 8px;
    }



    .contract>>>.el-input {
        width: 140px;
    }

    .contract>>>.el-form-item__content {
        line-height: 41px;
    }

    >>>.el-divider {
        margin: 0 0 0 4px;
        height: 20px;
        color: rgba(153, 153, 153, 1);
    }

    >>>.el-form-item__error {
        top: 3px;
        left: 100px;
        line-height: 30px;
    }

    >>>.el-form--inline .el-form-item {
        float: none;
        margin-left: 3px;
        width: 235px;
        border: 1px solid rgba(153, 153, 153, 1);
    }

    /* 详情顶部 */
    .detail_header {
        background: rgba(255, 255, 255, 1);
        overflow: hidden;
        position: relative;
    }

    /* 详情信息 */
    #detail .detail_mess {
        background: rgba(255, 255, 255, 1);
        box-shadow: 2px 0px 16px 0px rgba(3, 33, 136, 0.2);
        border-radius: 8px;
        margin-top: 6px;
        padding: 25px 59px 25px 0;
        position: relative;
    }

    .detail_mess .aside {
        width: 0;
        float: none;
        margin-top: 3px;
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

    .anchor {
        padding: 0;
        margin-top: 0;
    }

    .anchor li {
        width: 75px;
        height: 30px;
        text-align: center;
        font-size: 12px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 30px;
        cursor: default;
        background: rgba(255, 255, 255, 1);
        box-shadow: 3px 2px 2px 0px rgba(0, 0, 0, 0.04);
        border-radius: 0px 2px 2px 0px;
        margin-bottom: 2px;
    }

    /* 信息详情 */
    .aside_Information {
        margin-left: 125px;
    }

    /* ------------基本信息--------------- */
    .aside_Information .basic {
        border-radius: 2px;
        border-bottom: 1px solid rgba(151, 151, 151, 1);
    }

    .basic .section>>>.el-form-item {
        width: 175px;
        margin-right: 0;
    }

    .basic .section>>>.el-input {
        width: 95px;
    }

    .basic .section i {
        font-size: 23px;
        color: #D6CBCE;
    }

    .basic .staffNum>>>.el-form-item {
        width: 175px;
        margin-right: 0;
    }

    .basic .staffNum>>>.el-input {
        width: 93px;
    }

    .basic .staffNum i {
        font-size: 23px;
        color: #D6CBCE;
        line-height: 40px;
    }

    .basic .whether>>>.el-input {
        width: 89px;
    }

    #IDType em {
        margin-left: -3px;
    }

    #IDType>>>.el-form-item {
        margin-left: 0;
    }

    #agreed em {
        margin-left: -3px;

    }

    #agreed>>>.el-form-item {
        margin-left: 0;
    }

    #practical em {
        margin-left: -3px;

    }

    #practical>>>.el-form-item {
        margin-left: 0;
    }

    #practical>>>.el-input {
        width: 101px;
    }

    .basic .company>>>.el-form-item {
        width: 175px;
        margin-right: 0;
    }

    .basic .company>>>.el-input {
        width: 93px;
    }

    .basic .company i {
        font-size: 23px;
        line-height: 40px;
        color: #D6CBCE;
    }

    /* 公共部分 start*/
    .aside_Information .basic_instro {
        height: 20px;
        margin: 0;
        padding: 0;
    }

    .aside_Information .basic_instro li {
        float: left;
    }

    .aside_Information .basic_instro li span {
        display: inline-block;
        font-size: 13px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        line-height: 18px;
    }

    .aside_Information .basic_instro li:first-child {
        font-size: 14px;
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        color: rgba(22, 96, 253, 1);
        line-height: 20px;
    }

    .aside_Information strong {
        display: inline-block;
        font-size: 13px;
        font-family: PingFangSC-Medium;
        color: rgb(54, 19, 19);
        line-height: 18px;
    }

    .aside_Information span {
        display: inline-block;
        font-size: 13px;
        font-family: PingFangSC-Regular;
        color: rgba(102, 102, 102, 1);
        line-height: 18px;
    }

    /* 公共部分 end */
    .aside_Information .basic .basic_mess {
        margin: 0;
        padding: 0;

    }

    .aside_Information .basic .basic_instro li strong {
        display: inline-block;
        font-size: 13px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: 18px;
    }

    .aside_Information .basic .basic_instro li:last-child {
        font-size: 12px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        line-height: 17px;
    }

    .basic .basic_mess {
        overflow: hidden;
    }

    .basic_mess p {
        margin: 0;
    }

    .aside_Information .basic .basic_mess ul li {
        margin-bottom: 20px;
    }

    .aside_Information .basic .basic_mess ul {
        padding: 0;
        margin: 0;
        float: left;
    }

    .aside_Information .basic .basic_mess ul:first-child {
        margin-right: 41px;
    }

    .aside_Information .basic .basic_mess ul:nth-child(2) {
        margin-right: 41px;
    }

    .aside_Information .basic .basic_mess ul:nth-child(3) {
        margin-right: 29px;
    }


    /*basic 修改内容 */
    .basic>>>.el-form-item {
        width: 198px;
    }

    .basic>>>.el-input {
        width: 99px;
    }

    .basic>>>.el-form-item__content {
        line-height: 42px;
    }

    .col_address>>>.el-form-item {
        margin-left: 8px;
    }

    .col_address .el-divider {
        margin: 0 0 0 8px;
    }

    .col_place>>>.el-form-item {
        margin-left: 8px;
    }

    .col_place .el-divider {
        margin: 0 0 0 8px;
    }

    #wrapphone>>>.el-input {
        width: 102px;
    }

    .el-col em {
        margin-left: 5px;
    }

    .basic #agreed .el-divider {
        margin-left: -8px;
    }

    .basic #agreed>>>.el-input {
        width: 101px;
    }

    .basic #practical .el-divider {
        margin-left: -8px;
    }

    .basic #practical>>>.el-input {
        width: 102px;
    }

    .company_contract {
        line-height: 20px;
    }

    .company_contract {
        width: 190px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .nowAddress {
        width: 190px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .residence {
        width: 190px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    /*--------------- 合同信息 -----------*/
    .aside_Information .contract {
        border-radius: 2px;
        border-bottom: 1px solid rgba(151, 151, 151, 1);
        overflow: hidden;
        padding-bottom: 20px;
    }

    .contract_table {
        margin-bottom: 15px;
        border: 1px solid rgba(247, 247, 247, 1);
    }

    .contract_table td {
        overflow: hidden;
        /*超出部分隐藏*/
        text-overflow: ellipsis;
        /* 超出部分显示省略号 */
        white-space: nowrap;
    }

    .contract_table .rowspan {
        width: 20px;
        line-height: 80px;
        text-align: center;
        background: rgba(247, 247, 247, 1);
    }

    .contract_table .table_tr {
        border-bottom: 1px solid rgba(247, 247, 247, 1);
    }

    .table_td {
        padding-left: 31px;
        width: 230px;
    }

    .table_td1 {
        width: 230px;
    }

    .contract h6 {
        display: block;
        height: 32px;
        border: 1px dashed rgba(102, 102, 102, 1);
        margin-bottom: 0;
        text-align: center;
        line-height: 32px;
        font-size: 14px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        margin-top: 19px;
        color: rgba(0, 0, 0, 0.65);
        background: rgba(255, 255, 255, 1);
    }

    .contract>>>.el-form-item__content {
        line-height: 42px;
    }

    .contractform>>>.el-input__inner {
        border: 0;
    }

    /* 编辑 */
    .contract h4 {
        width: 20px;
        height: 91px;
        line-height: 91px;
        text-align: center;
        font-size: 13px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(102, 102, 102, 1);
        background: rgba(247, 247, 247, 1);
    }

    .contract>>>.el-form-item {
        margin-bottom: 0;
    }

    /*--------------- 薪资信息 ------------*/
    .aside_Information .salary {
        border-radius: 2px;
        border-bottom: 1px solid rgba(151, 151, 151, 1);
    }

    .salary .basic_instro {
        margin-bottom: 23px;
        margin-top: 18px;
    }

    .salary .salary_con ul {
        line-height: 40px;
    }

    .salary .salary_con ul li {
        float: left;
    }

    .salary .salary_con ul li em {
        font-size: 13px;
        font-family: PingFangSC-Semibold;
        font-style: normal;
        color: rgba(51, 51, 51, 1);
        line-height: 18px;
    }


    /* 近三个月薪资条 */
    .salary .salary_table {
        margin-top: 211px;
    }

    .salary_table>>>.el-table__header {
        width: 150px !important;
    }

    .salary_table>>>.el-tooltip {
        padding: 0 7px;
    }

    .salary .salary_table p {
        font-size: 13px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        line-height: 18px;
    }

    .salaryform>>>.el-input__inner {
        border: 0;
    }

    /* 修改表格样式操作 ---pattern.less*/
    .salary_table>>>tr {
        height: 48px;
    }

    .salary_table>>>.el-table th {
        padding: 0;
        height: 48px;
        font-size: 13px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        line-height: 18px;
    }

    /* 薪资调整记录 */
    .salary .salary_table_1 p {
        font-size: 13px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        line-height: 18px;
    }

    .salary_table_1>>>.el-table th {
        padding: 0;
        height: 48px;
        font-size: 13px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        line-height: 18px;
    }


    .salary>>>.el-form-item__content {
        line-height: 42px;
    }

    .salary>>>.el-input {
        width: 113px;
    }

    .salary .wages>>>.el-form-item {
        width: 281px;
    }

    .salary b {
        font-size: 13px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
    }

    .salary .col_icon:first-child {
        margin-left: -5px;
    }

    .salary .col_icon_last {
        margin-left: 5px;
    }

    .salary .scheme {
        margin-left: 2px;
    }

    .salary .scheme>>>.el-form-item__label {
        margin-left: 5px;
    }

    .salary .scheme>>>.el-input {
        width: 131px;
    }

    .salary .scheme i {
        font-size: 27px;
        line-height: 39px;
        color: #D6CBCE;
    }

    .salary h6 {
        display: block;
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


    /* 编辑 */
    .salary .title {
        font-size: 13px;
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        color: rgba(51, 51, 51, 1);
    }

    .flagSalary h2 {
        margin-left: 8px;
        font-size: 13px;
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        color: rgba(51, 51, 51, 1);
        line-height: 42px;
    }

    .flagSalary .scheme {
        margin-left: 3px;
    }

    .flagSalary .margin {
        line-height: 42px;
    }

    .flagSalary .scheme>>>.el-form-item {
        width: 213px;
        margin-right: 0;
    }

    .flagSalary>>>.el-form-item__content {
        line-height: 43px;
    }

    .flagSalary #startDate>>>.el-form-item {
        width: 265px;
    }

    .flagSalary i {
        font-style: normal;
    }

    .icon-co-1 {
        width: 10px;
        height: 10px;
        background: rgba(38, 127, 246, 0.6);
        border-radius: 100%;
        margin-right: 4px;
    }

    .icon-co-2 {
        width: 10px;
        height: 10px;
        background: rgba(246, 175, 38, 0.6);
        border-radius: 100%;
        margin-right: 4px;
    }

    .icon-co-3 {
        width: 10px;
        height: 10px;
        background: rgba(246, 38, 203, 0.6);
        border-radius: 100%;
        margin-right: 4px;
    }

    .icon-co-4 {
        width: 10px;
        height: 10px;
        background: rgba(255, 54, 67, 1);
        border-radius: 100%;
        margin-right: 4px;
    }

    .icon-co-5 {
        width: 10px;
        height: 10px;
        background: rgba(255, 115, 151, 1);
        border-radius: 100%;
        margin-right: 4px;
    }

    .icon-co-6 {
        width: 10px;
        height: 10px;
        background: rgba(38, 127, 246, 0.6);
        border-radius: 100%;
        margin-right: 4px;
    }

    .icon-co-7 {
        width: 10px;
        height: 10px;
        background: rgba(46, 28, 172, 0.6);
        border-radius: 100%;
        margin-right: 4px;
    }

    .salary>>>.el-table_1_column_13 {
        font-size: 13px;
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        color: rgba(42, 120, 248, 1);
        cursor: default;
    }

    .salary>>>.el-table_1_column_16 {
        font-size: 13px;
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        color: rgba(42, 120, 248, 1);
        cursor: default;
    }

    /* ---------------教育经历 -------------*/
    .aside_Information .education {
        border-radius: 2px;
        border-bottom: 1px solid rgba(151, 151, 151, 1);
        overflow: hidden;
        padding-bottom: 20px;
    }

    .education .basic_instro {
        margin-bottom: 10px;
    }

    .educationform>>>.el-input__inner {
        border: 0;
    }

    .education .education_con ul {
        padding: 0;
    }

    .education .education_con ul li {
        float: left;
        margin-bottom: 10px;
    }

    .education .education_con ul em {
        font-size: 13px;
        font-style: normal;
        font-family: PingFangSC-Medium;
        color: rgba(0, 0, 0, 0.85);
        line-height: 22px;
    }

    .education .education_con ul li span {
        display: inline-block;
        font-size: 13px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        line-height: 18px;
    }

    .education>>>.el-form-item {
        width: 205px;
    }

    .education>>>.el-input {
        width: 123px;
    }

    .education .degree {
        border: 0;
    }

    .education .degree>>>.el-radio {
        position: initial;
        top: 0;
        margin-right: 0;
    }

    .education .degree>>>.el-radio__input {
        visibility: initial;
    }

    .education .degree>>>.el-radio__label {
        background: none;
        font-size: 13px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        margin-right: 10px;
    }

    /* 上传教育图片 */
    .education .el-form {
        height: 98px;
    }

    .education_picture em {
        display: inline-block;
        font-size: 13px;
        font-style: normal;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(0, 0, 0, 0.85);
        margin-bottom: 10px;
    }

    .education_picture:nth-of-type(1) {
        margin-right: 102px;
    }

    .education_picture {
        float: left;
    }

    .education>>>.avatar-uploader {
        width: 385px;
        height: 100px;
        border-radius: 2px;
        text-align: center;
        line-height: 100px;
        font-size: 13px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
    }

    .education>>>.el-input {
        line-height: 42px;
    }

    .education .major>>>.el-input {
        width: 149px;
    }

    .education>>>.el-form-item {
        margin-bottom: 10px;
    }

    /*---------------- 培训经历 --------------*/
    .aside_Information .train {
        border-radius: 2px;
        border-bottom: 1px solid rgba(151, 151, 151, 1);
    }

    .train .train_con {
        height: 63px;
        text-align: center;
    }

    .trainform>>>.el-input__inner {
        border: 0;
    }

    .train .train_con span {
        display: inline-block;
        font-size: 16px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.25);
        line-height: 24px;
    }

    .train>>>.el-form-item {
        width: 213px;
    }

    .train h6 {
        display: block;
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
        margin: 0 0 20px 0;
    }

    .train>>>.el-input {
        width: 130px;
        line-height: 41px;
    }

    /*------------------- 工作经历 ---------------*/
    .aside_Information .work {
        border-radius: 2px;
        border-bottom: 1px solid rgba(151, 151, 151, 1);
        overflow: hidden;
        padding-bottom: 20px;
    }

    .workform>>>.el-input__inner {
        border: 0;
    }


    .work .work_con ul {
        height: 18px;
        padding: 0;
    }

    .work .work_con ul li {
        float: left;
        line-height: 20px;
    }

    .work .startingTime>>>.el-form-item {
        width: 302px;
    }

    .work .startingTime>>>.el-date-editor {
        width: 220px;
    }

    .work h6 {
        display: block;
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
        margin-top: 150px;
    }

    .work>>>.el-form-item {
        width: 200px;
    }

    .work>>>.el-form-item__content {
        line-height: 42px;
    }

    .work>>>#wrapPresent .el-input {
        width: 92px;
    }

    .work #wrapPresent b {
        font-size: 13px;
        line-height: 40px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
    }

    .work_mess em {
        font-size: 13px;
        font-style: normal;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(0, 0, 0, 0.85);
        display: inline-block;
        margin-bottom: 10px;
    }

    .work_mess {
        width: 385px;
        float: left;
    }

    .work_reason {
        float: right;
    }

    .work_mess>>>.el-textarea textarea {
        width: 385px;
        height: 100px;
        border-radius: 2px;
    }

    .work>>>.el-input {
        width: 118px;
    }

    /*------------------ 福利信息 ------------------*/
    .aside_Information .welfare {
        border-radius: 2px;
        border-bottom: 1px solid rgba(151, 151, 151, 1);
    }

    .welfareform>>>.el-input__inner {
        border: 0;
    }


    .welfare .welfare_con ul {
        padding: 0;
        overflow: hidden;
        margin: 0;
    }

    .welfare .welfare_con ul li {
        float: left;
        margin-bottom: 20px;
    }

    /* 福利调整记录 */
    .welfare .welfare_table p {
        font-size: 13px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        line-height: 18px;
    }

    .welfare_table>>>.el-table th {
        padding: 0;
        height: 48px;
        font-size: 13px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        line-height: 18px;
    }

    .welfare>>>.el-row .el-form-item {
        width: 213px;
    }

    .welfare .row_first>>>.el-divider {
        margin-left: 5px;
    }

    #welfareFund>>>.el-divider {
        margin-left: 17px;
    }

    .welfare .row_last>>>.el-divider {
        margin-left: -7px;
    }

    .welfare>>>.el-select {
        line-height: 41px;
        width: 130px;
    }

    .welfare .fundcardinal>>>.el-divider {
        margin-left: -7px;
    }

    .welfare .cardinal>>>.el-input {
        width: 105px;
    }

    .welfare .endSocial>>>.el-input {
        width: 103px;
    }

    .welfare .socialStart>>>.el-input {
        width: 115px;
    }

    .welfare .socialEnd>>>.el-input {
        width: 128px;
    }

    .welfare .endSocial>>>.el-divider {
        margin-left: -7px;
    }

    .welfare .startSocial>>>.el-date-editor {
        width: 100px;
        line-height: 41px;
    }

    .welfare .startSocial>>>.el-input {
        width: 118px;
    }

    .welfare .startFund>>>.el-date-editor {
        width: 116px;
        line-height: 41px;
    }

    .welfare .socialface>>>.el-form-item {
        margin-right: 0;
    }

    .welfare .socialface .el-select {
        width: 92px;
    }

    .welfare>>>.el-form-item__content {
        line-height: 42px;
    }

    .welfare .residence_type .el-select {
        width: 105px;
    }

    /*--------------- 图片附件 ----------------------*/
    .aside_Information .picture {
        border-radius: 2px;
        border-bottom: 1px solid rgba(151, 151, 151, 1);
        overflow: hidden;
    }

    .picture .picture_con {
        height: 63px;
        text-align: center;
        padding-bottom: 17px;
    }

    .picture .picture_con span {
        display: inline-block;
        font-size: 16px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.25);
        line-height: 24px;
    }

    .picture .basic_instro .icon {
        float: right;
        font-size: 12px;
    }

    .picture h6 {
        display: block;
        height: 32px;
        border: 1px dashed rgba(102, 102, 102, 1);
        margin-bottom: 20px;
        text-align: center;
        line-height: 32px;
        font-size: 14px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.65);
        background: rgba(255, 255, 255, 1);
    }

    .picture em {
        display: inline-block;
        font-style: normal;
        font-size: 13px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(0, 0, 0, 0.85);
        margin-bottom: 5px;
    }

    .picture .picture_upload:first-child {
        float: left;
        margin-right: 100px;
    }

    /*------ 异动记录 ----*/
    .aside_Information .moveRecord {
        padding-bottom: 20px;
        overflow: hidden;
    }

    .moveRecord_con div {
        float: left;
        margin-bottom: 20px;
    }

    .moveRecord_con p em {
        font-size: 13px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        line-height: 18px;
    }

    .moveRecord_con ul {
        float: left;
        padding: 0;
        margin: 0;
    }

    .moveRecord_con ul li {
        margin-bottom: 10px;
    }


    /* 图片上传 */
    .avatar-uploader>>>.el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader>>>.el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 13px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        width: 385px;
        line-height: 100px;
        text-align: center;
    }

    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>