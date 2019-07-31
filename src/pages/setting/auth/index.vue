<template>
    <div class="auth ">
        <!--面包屑及按钮区域-->
        <div class="zy-bg-breadcrumb">
            <div class="menu-area">
                <div class="comm">
                    <el-breadcrumb class="bread" separator="/">
                        <el-breadcrumb-item>
                            <a href="">系统设置</a>
                        </el-breadcrumb-item>
                        <el-breadcrumb-item>
                            <a>权限配置</a>
                        </el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
                <div class="btns">
                    <el-button type="primary" @click="addRole">新增角色</el-button>
                </div>
            </div>
        </div>
        <!--表格区域-->
        <div class="table-wraps zy-table-pub">
            <el-table
                    v-loading="loading"
                    class="table-wrap"
                    :data="tableData"
                    style="width: 100%"
                    height="250">
                <el-table-column
                        fixed
                        prop="name"
                        label="角色名称"
                        width="140">
                </el-table-column>
                <el-table-column
                        prop="duty"
                        width="380"
                        label="角色职责">
                </el-table-column>
                <el-table-column
                        prop="num"
                        label="已分配人数"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="zip"
                        fixed="right"
                        label="操作"
                        width="240">
                    <template slot-scope="scope">
                        <el-button v-show="scope.$index" type="text" size="small" @click="editRole(scope.row)">编辑</el-button>
                        <el-button v-show="scope.$index" type="text" size="small" @click="toGiveauth(scope.row)">授权</el-button>
                        <el-button type="text" size="small" @click="distributeStaff(scope.row)">分配人员</el-button>
                        <el-button v-show="scope.$index" type="text" size="small" @click="delRole(scope.row,scope.$index)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!--弹框区域-->
        <!--新增角色-->
        <el-dialog class="zy-dialog-pub" title="新建角色" :visible.sync="isShowAddRole">
            <el-form ref="dialogAdd" :model="addRoleForm" :rules="rules" size="mini">
                <el-form-item label="角色名称" label-width="120px" prop="name">
                    <el-input v-model="addRoleForm.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="角色职责" label-width="120px" prop="duty">
                    <el-input v-model="addRoleForm.duty" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer t-c">
                <el-button class="button default-button" @click="isShowAddRole = false">取 消</el-button>
                <el-button type="primary" class="blue-button" @click="handleAddRole">确 定</el-button>
            </div>
        </el-dialog>
        <!--编辑角色-->
        <el-dialog class="zy-dialog-pub" title="编辑角色" :visible.sync="isShowEditRole">
            <el-form ref="dialogEdit" :model="editRoleForm" :rules="rules" size="mini">
                <el-form-item label="角色名称" label-width="120px" prop="name">
                    <el-input v-model="editRoleForm.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="角色职责" label-width="120px" prop="duty">
                    <el-input v-model="editRoleForm.duty" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer t-c">
                <el-button class="button default-button" @click="isShowEditRole = false">取 消</el-button>
                <el-button type="primary" class="blue-button" @click="handleEditRole">保 存</el-button>
            </div>
        </el-dialog>
        <!--分配人员-->
        <el-dialog class="zy-dialog-pub" title="分配人员" :visible.sync="isShowDistributeStaff">
            角色名称：{{currentDisedItem.name}}
            <div class="personnel">
                已分配人员：
                <el-tag>标签一</el-tag>
                <el-tag>标签二</el-tag>
            </div>
            <el-input
                    placeholder="姓名"
                    v-model="filterStaffText">
            </el-input>
            <el-tree
                    class="filter-tree"
                    :data="staffList"
                    default-expand-all
                    show-checkbox
                    :filter-node-method="filterNode"
                    ref="staffTree">
            </el-tree>
            <div slot="footer" class="dialog-footer t-c">
                <el-button class="button default-button" @click="isShowDistributeStaff = false">取 消</el-button>
                <el-button type="primary" class="blue-button" @click="handleSaveDisStaff">保 存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tableData: [],
                isShowAddRole: false,
                addRoleForm: {
                    name:'',
                    duty:''
                },

                isShowEditRole:false,
                editRoleForm: {
                    name:'',
                    duty:''
                },
                currentEditItem:'',

                rules: {
                    name: [
                        { required: true, message: '请输入角色名称', trigger: 'blur' }
                    ],
                    duty:[
                        {required: true, message: '请输入角色职责', trigger: 'blur'}
                    ]
                },

                currentDisedItem:'',
                isShowDistributeStaff:false,
                filterStaffText: '',
                staffList: [],
                loading:true
            }
        },
        watch: {
            filterStaffText(val) {
                this.$refs.staffTree.filter(val);
            }
        },
        methods:{
            //获取角色列表
            getData(){
                this.$http
                    .get('/api/getRole.json').then(res=>{
                        this.loading = false;
                        const data = res.content;
                        this.tableData = data.tableData;
                })
            },
            // 获取分配人员列表
            getStaffList(){
                this.$http
                    .get('/api/getStaffList.json').then(res=>{
                    const data = res.content;
                    console.log(res.content);
                    this.staffList = data;
                })
            },
            // 授权
            toGiveauth(item){
                this.$router.push({
                    path:'/setting/setAuth',
                    query:{
                        id:item.id
                    }
                })
            },
            //新增角色
            addRole(){
                this.isShowAddRole = true;
            },
            // 弹框点击确认按钮
            handleAddRole(){
                this.$refs['dialogAdd'].validate((valid) => {
                    if (valid) {
                        this.$http
                            .get('/api/addRole.json').then(res=>{
                                const data = res.content;
                                this.tableData.push(data)
                                this.isShowAddRole = false;
                                this.addRoleForm = {
                                    name:'',
                                    duty:''
                                }
                        })
                    } else {
                        return false;
                    }
                });
            },
            // 编辑
            editRole(item){
                this.editRoleForm = {
                    name:item.name,
                    duty:item.duty
                }
                this.currentEditItem = item;
                this.isShowEditRole = true;
            },
            // 编辑弹框点击保存按钮
            handleEditRole(){
                let name = this.editRoleForm.name,
                    duty = this.editRoleForm.duty;
                this.$refs['dialogEdit'].validate((valid) => {
                    if (valid) {
                        // 判断有没有做修改处理
                        if(name===this.currentEditItem.name && duty===this.currentEditItem.duty){
                            this.isShowEditRole = false;
                            return;
                        }
                        this.$http
                            .get('/api/addRole.json',{
                                name,
                                duty
                            }).then(res=>{
                            this.tableData.map(datas=>{
                                if (datas.id == this.currentEditItem.id){
                                    datas.name = this.editRoleForm.name;
                                    datas.duty = this.editRoleForm.duty;
                                }
                            })
                            this.isShowEditRole = false;
                        })
                    } else {
                        return false;
                    }
                });
            },

            // 分配员工
            distributeStaff(item){
                this.currentDisedItem = item;
                this.isShowDistributeStaff = true;
            },
            filterNode(value, data) {
                if (!value) return true;
                return data.label.indexOf(value) !== -1;
            },
            //分配员工弹框保存功能
            handleSaveDisStaff(){

            },
            //删除角色
            delRole(item,$index){
                console.log($index);
                this.$confirm("确认删除？").then(() => {
                    this.$http
                        .get("/api/delOrganize.json", {params:{
                                id:item.id
                            }})
                        .then(res => {
                            this.tableData.splice($index,1);
                        });
                });
            }
        },
        created(){
            this.getData();
            this.getStaffList();
        }
    }
</script>

<style lang="less">
    @import "../../../styles/table";
    .auth{
        position: relative;
        padding: 68px 20px;
        .table-wraps{
            position: relative;
            box-shadow:0px 1px 17px 0px rgba(54,78,159,0.29);
            border-radius: 4px;
            .table-wrap{
                min-height: 450px;
            }
        }
        /*弹框主体区域*/
        .el-dialog__body{
            overflow: hidden;
            .el-input{
                width: 270px;
            }
            .blue-button{
                margin-left: 10px;
            }
            .personnel{
                padding: 10px 0;
            }
        }
    }

</style>
