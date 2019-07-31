<template>
    <div class="cc">
        <!--面包屑及按钮区域-->
        <div class="zy-bg-breadcrumb">
            <div class="menu-area">
                <div class="comm">
                    <el-breadcrumb class="bread" separator="/">
                        <el-breadcrumb-item>
                            <a href="/setting">系统设置</a>
                        </el-breadcrumb-item>
                        <el-breadcrumb-item>
                            <a>合同主体</a>
                        </el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
                <div class="btns">
                    <el-button class="add-con-btn" type="primary" @click="isShowAddCC=true">新增合同主体</el-button>
                </div>
            </div>
        </div>
        <!--表格区域-->
        <div class="table-wraps zy-table-pub">
            <el-table v-loading="loading" class="table-wrap" :data="tableData" style="width: 100%">
                <el-table-column prop="companyName" label="合同主体名称"></el-table-column>
                <el-table-column prop="empNum" label="在职员工数"></el-table-column>
                <el-table-column prop="offNum" label="已离职员工数"></el-table-column>
                <el-table-column label="操作" width="120">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="editRole(scope.row,scope.$index)">编辑</el-button>
                        <el-button v-if="!scope.row.offNum || !scope.row.empNum" title="当前存在员工数，无法删除" type="text" class="table-btn-gray" size="small">删除</el-button>
                        <el-button v-else type="text" size="small" @click="delRole(scope.row,scope.$index)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    class="t-r cc-page"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="sizeAry"
                    :page-size="pageSize"
                    layout=" sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </div>
        <!--弹框区域-->
        <!--新增合同主体-->
        <el-dialog class="zy-dialog-pub" title="新增合同主体" :visible.sync="isShowAddCC">
            <el-form ref="dialogAdd" :model="addccForm" :rules="rules" size="mini">
                <el-form-item label="合同主体名称" label-width="120px" prop="name">
                    <el-input class="ccname" v-model="addccForm.name" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer t-c">
                <el-button class="button default-button" @click="isShowAddCC = false">取 消</el-button>
                <el-button type="primary" class="blue-button" @click="handleAddCC">确 定</el-button>
            </div>
        </el-dialog>
        <!--编辑合同主体-->
        <el-dialog class="zy-dialog-pub" title="编辑合同主体" :visible.sync="isShowEditCC">
            <el-form ref="dialogEdit" :model="editRoleForm" :rules="rules" size="mini">
                <el-form-item label="合同主体名称" label-width="120px" prop="name">
                    <el-input class="ccname" v-model="editRoleForm.name" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer t-c">
                <el-button class="button default-button" @click="isShowEditCC = false">取 消</el-button>
                <el-button type="primary" class="blue-button" @click="handleEditCC">保 存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                loading:false,
                tableData: [],
                sizeAry:[10, 20, 30, 50, 100],
                pageSize:10,
                currentPage: 1,
                total:0,

                isShowAddCC: false,
                addccForm: {
                    name:''
                },

                isShowEditCC:false,
                editRoleForm: {
                    name:''
                },
                currentEditItem:'',
                currentEditIndex:0,//当前操作编辑项id

                rules: {
                    name: [
                        { required: true, message: '请填写合同主体名称', trigger: 'blur' }
                    ]
                },

            }
        },
        methods:{
            //获取合同主体列表
            getData(){
                this.loading = true;
                this.$http
                    .get('https://www.easy-mock.com/mock/5d15cbc238f5145ef5374a93/example/api/getConCom').then(res=>{
                    const data = res.result;
                    this.tableData = data;
                }).finally(a=>{
                    this.loading = false;
                })
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.pageSize = val;
                this.getData()
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.pageNum = val;
                this.getData()
            },
            // 新增弹框点击确认按钮
            handleAddCC(){
                this.$refs['dialogAdd'].validate((valid) => {
                    if (valid) {
                        this.$http
                            .get('https://www.easy-mock.com/mock/5d15cbc238f5145ef5374a93/example/api/addRole').then(res=>{
                            const data = res.result;
                            this.tableData.unshift({
                                companyName:this.addccForm.name,
                                empNum:0,
                                offNum:0
                            })
                            this.isShowAddCC = false;
                            this.addccForm = {
                                name:''
                            }
                        })
                    } else {
                        return false;
                    }
                });
            },
            // 编辑
            editRole(item,index){
                console.log(item);
                this.editRoleForm = {
                    name:item.companyName
                }
                this.currentEditItem = item;
                this.currentEditIndex = index;
                this.isShowEditCC = true;
            },
            // 编辑弹框点击保存按钮
            handleEditCC(){
                let name = this.editRoleForm.name;
                this.$refs['dialogEdit'].validate((valid) => {
                    if (valid) {
                        // 判断有没有做修改处理
                        if(name===this.currentEditItem.name){
                            this.isShowEditCC = false;
                            return;
                        }
                        this.$http
                            .get('https://www.easy-mock.com/mock/5d15cbc238f5145ef5374a93/example/api/addRole',{
                                name
                            }).then(res=>{
                            this.currentEditItem.companyName = this.editRoleForm.name;
                            this.tableData.splice(this.currentEditIndex,1,this.currentEditItem)
                            this.isShowEditCC = false;
                        })
                    } else {
                        return false;
                    }
                });
            },
            //删除角色
            delRole(item,$index){
                this.$confirm(`确认删除合同主体${item.companyName}？`,'删除合同主体').then(() => {
                    this.$http
                        .get("https://www.easy-mock.com/mock/5d15cbc238f5145ef5374a93/example/api/delOrganize", {params:{
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
        }
    }
</script>

<style lang="less" scoped>
    @import "../../styles/table";
    .cc{
        position: relative;
        padding: 68px 20px;
        .zy-bg-breadcrumb{
            .btns{
                .add-con-btn{
                    width: 120px;
                }
            }
        }
        .table-wraps{
            position: relative;
            box-shadow:0px 1px 17px 0px rgba(54,78,159,0.29);
            border-radius: 4px;
            /deep/.table-btn-gray{
                span{
                    color: #BDC1C6;
                }
            }
            .cc-page{
                background: #fff;
                position: relative;
                box-shadow:0px 1px 17px 0px rgba(54,78,159,0.29);
            }
        }
        .ccname{
            /deep/.el-input__inner{
                height: 30px;
                line-height: 30px;
                width: 320px;
            }
        }
    }

</style>
