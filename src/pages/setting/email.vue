<template>
    <div class="zy-company-email">
        <!--面包屑及按钮区域-->
        <div class="zy-bg-breadcrumb">
            <div class="menu-area">
                <div class="comm">
                    <el-breadcrumb class="bread" separator="/">
                        <el-breadcrumb-item>
                            <a href="/setting">系统设置</a>
                        </el-breadcrumb-item>
                        <el-breadcrumb-item>
                            <a>企业邮箱</a>
                        </el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
            </div>
        </div>
        <div class="company-email">
            <el-form :rules="rules" label-position="left" label-width="110px" ref="emailForm" :model="formCompanyEmail">
                <el-form-item label="邮箱账号："
                              prop="email">
                    <el-input v-model="formCompanyEmail.email"></el-input>
                </el-form-item>
                <el-form-item label="邮箱密码："
                              prop="password">
                    <el-input v-model="formCompanyEmail.password"></el-input>
                </el-form-item>
                <el-form-item label="服务器地址："
                              prop="url">
                    <el-input v-model="formCompanyEmail.url"></el-input>
                </el-form-item>
                <el-form-item label="端口号："
                              prop="port">
                    <el-input v-model="formCompanyEmail.port"></el-input>
                </el-form-item>
                <el-form-item label="协议："
                              prop="protocol">
                    <el-input v-model="formCompanyEmail.protocol"></el-input>
                </el-form-item>
                <el-form-item label="发件人名称："
                              prop="sendName">
                    <el-input v-model="formCompanyEmail.sendName"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button class="blue-button" type="primary" @click="submitForm('emailForm')">保存</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            formCompanyEmail: {
                email: '',
                password: '',
                url: '',
                port:'',
                protocol:'',
                sendName:''
            },
            rules: {
                email: [
                    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                ],
                password:[{ required: true, message: '请输入密码', trigger: 'blur' }],
                url:[{ required: true, message: '请输入服务器地址', trigger: 'blur' }],
                port:[{ required: true, message: '请输入端口号', trigger: 'blur' }],
                protocol:[{ required: true, message: '请输入协议', trigger: 'blur' }],
                sendName:[{ required: true, message: '请输入发件人名称', trigger: 'blur' }],
            }
        }
    },
    methods:{
        getData(){
            this.$http.get('/api/getEmail.json').then(res=>{
                const emailList = res.content;
                this.formCompanyEmail = emailList;
            })
        },
        submitForm(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$http.post('/api/submitForm.json',{
                        email:this.formCompanyEmail.email,
                        password:this.formCompanyEmail.password,
                        url:this.formCompanyEmail.url,
                        port:this.formCompanyEmail.port,
                        protocol:this.formCompanyEmail.protocol,
                        sendName:this.formCompanyEmail.sendName
                    }).then(res=>{
                        this.$message({
                            message: '保存成功',
                            type: 'success'
                        });
                    })
                } else {
                    return false;
                }
            });
        }
    },
    created() {
        this.getData()
    }
}
</script>
<style lang="less">
    @import "../../styles/colors";
    .zy-company-email{
        position: relative;
        padding: 68px 20px;
        .company-email{
            position: relative;
            background:@ff;
            padding: 30px;
            box-shadow:2px 0px 16px 0px rgba(3,33,136,0.2);
            border-radius:4px;
            overflow: hidden;
            .el-form-item__content{
                width: 300px;
            }
        }
    }
</style>