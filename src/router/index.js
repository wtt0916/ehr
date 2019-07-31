import Vue from 'vue'
import Router from 'vue-router'

import index from '../pages/index/index'
import login from '../pages/login/index'
import struct from '../pages/organize/struct/index.vue'//组织规划->组织架构页
import picture from '../pages/organize/struct/picture.vue'//组织规划->组织架构页的架构图子页面
import table from '../pages/organize/struct/table.vue'//组织规划->组织架构页的组织管理子页面

// 社保公积金
import welfareSet from '../pages/welfare/welfareSet'
import addSub from '../pages/welfare/addSub'
import welfareParameter from '../pages/welfare/welfareParameter'
import account from '../pages/welfare/account'
import newPlan from '../pages/welfare/newPlan'
import examine from '../pages/welfare/examine'
import history from '../pages/welfare/historyView'
           

import salaryPlan from '../pages/salary/plan/index'//薪资管理->薪资方案列表
import salaryaddPlay from '../pages/salary/plan/addPlan'//薪资管理->薪资方案列表->新增方案
import salarymodifyPlay from '../pages/salary/plan/modifyPlan'//薪资管理->薪资方案列表->新增方案
import salaryplanDetail from '../pages/salary/plan/plannDetail'//薪资管理->薪资方案->薪资方案详情
import salarydeduction from '../pages/salary/deduction/index'//薪资管理->附加专项扣除
import salaryAccount from '../pages/salary/account/index'//薪资管理->核算薪资列表
import salaryManualUpdate from '../pages/salary/account/manualUpdate'//薪资管理->核算薪资列表->手动修正
import salaryHistory from '../pages/salary/history/index'//薪资管理->历史薪资
import salaryHistoryDetail from '../pages/salary/history/detail'//薪资管理->历史薪资->详情
import salaryHistoryImport from '../pages/salary/history/importPage'//薪资管理->历史薪资->导入历史
import salaryReplenish from '../pages/salary/replenish/index'//薪资管理->补发补扣

import info from '../pages/setting/info'//设置->企业信息
import auth from '../pages/setting/auth/index'//设置->企业信息
import setauth from '../pages/setting/auth/setAuth'//设置->权限配置
import email from '../pages/setting/email'//设置->企业发件邮箱
import contractCompany from '../pages/setting/contractCompany'//设置->企业发件邮箱

// 员工管理
import employeeDetails from '../pages/staffManage/employeeDetails'
import staffEdit from '../pages/staffManage/staffEdit'
import employeesList from '../pages/staffManage/employeesList'
import empLead from '../pages/staffManage/empLead'  //员工列表导入    

// 统计报表
import statement from '../pages/statement/index'
import departmentStaff from '../pages/statement/departmentStaff'
import salaryAnalysis from '../pages/statement/salaryAnalysis'
import staffComposition from '../pages/statement/staffComposition'
import welfareAnalysis from '../pages/statement/welfareAnalysis'


Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    //首页
    {
      path: '/',
      component:index
    },
    // 登录
    {
      path: '/login',
      component: login,
      children:[{
        path:'index',
        component: index
      }]
    },
    //组织规划-组织架构
    {
      path: '/organize/',
      component: struct,
      children:[{
        path:'picture',
        component: picture
      },{
        path:'table',
        component: table
      }]
    },
    // 社保公积金
    {
      path:'/welfareSet',
      component:welfareSet
    },
    {
      path:'/addSub',
      component:addSub
    },
    {
      path:'/welfareParameter',
      component:welfareParameter
    },
    {
      path:'/account',
      component:account
    },
    {
      path:'/newPlan',
      component:newPlan 
    },
    {
      path:'/examine',
      component:examine 
    },
    {
      path:'/history',
      component:history 
    },

    //薪资模块
    {
      path:'/salary',
      component:salaryPlan
    },{
      path:'/salary/planDetail',
      component:salaryplanDetail
    },{
      path:'/salary/addPlan',
      component:salaryaddPlay
    },{
      path:'/salary/modifyPlan',
      component:salarymodifyPlay
    },{
      path:'/salary/deduction',
      component:salarydeduction
    },
    {
      path:'/salary/account',
      component:salaryAccount
    },
    {
      path:'/salary/manualUpdate',
      component:salaryManualUpdate
    },
    {
      path:'/salary/history',
      component:salaryHistory
    },{
      path:'/salary/hisDetail',
      component:salaryHistoryDetail
    },{
      path:'/salary/hisImport',
      component:salaryHistoryImport
    },{
      path:'/salary/replenish',
      component:salaryReplenish
    },

    //设置
    {
      path:'/setting/info',
      component:info
    },
    {
      path:'/setting',
      component:auth
    },
    {
      path:'/setting/setAuth',
      component:setauth
    },{
      path:'/setting/email',
      component:email
    },
    {
      path:'/setting/contractCompany',
      component:contractCompany
    },
    
    // 员工管理
    {
      path:'/employeeDetails',
      component:employeeDetails
    },{
      path:'/staffEdit',
      component:staffEdit
    },{
      path:'/employeesList',
      component:employeesList
    },{
      path:'/empLead',
      component:empLead
    },

    // 统计报表
    {
      path:'/statement',
      component:statement
    },
    {
      path:'/departmentStaff',
      component:departmentStaff
    },{
      path:'/salaryAnalysis',
      component:salaryAnalysis
    },{
      path:'/staffComposition',
      component:staffComposition
    },{
      path:'/welfareAnalysis',
      component:welfareAnalysis
    }
    // {
    //   path:'/statement',
    //   component:statement,
    //   children:[{
    //     path:'/departmentStaff',
    //     component: departmentStaff
    //   },
    //   {
    //     path:'/statement/salaryAnalysis',
    //     component: salaryAnalysis
    //   },
    //   {
    //     path:'/statement/staffComposition',
    //     component: staffComposition
    //   },
    //   {
    //     path:'/statement/welfareAnalysis',
    //     component: welfareAnalysis
    //   }]
    // }

    // {
    //   path:'/outSet',    //外勤配置
    //   name:'outSet',
    //   component:outSet ,
    //   meta:{
    //     keepAlive:false //需要被缓存的组件
    //  },
    // },
    // {
    //   path:'/apply',    //外勤申请单
    //   name:'apply',
    //   component:apply ,
    //   meta:{
    //     keepAlive:false //需要被缓存的组件
    //  },
    // },
    // {
    //   path:'/applyUpdate',    //外勤申请单
    //   name:'applyUpdate',
    //   component:applyUpdate ,
    //   meta:{
    //     keepAlive:false //需要被缓存的组件
    //  },
    // },
  ]
})




// {"msg":"成功","code":"200",
// "data":{
// "permissions":{"outTask":{"modify":2074,"submit":2075,"apply":2077}},
// "navLists":[
//   {"path":"outTask","name":"外勤任务","active":false},
//   {"path":"assignment","name":"外勤分派","active":false},
//   {"path":"outSet","name":"外勤设置","active":false}
// ],
// "employer":{"name":"鲍翠敏","pic":0,"position":null}
// }
// }