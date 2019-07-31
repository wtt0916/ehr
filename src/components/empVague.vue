<!--员工姓名模糊查询组件-->
<template>
    <div class="emp-vague">
        <!--<el-autocomplete-->
                <!--class=""-->
                <!--v-model="keyword"-->
                <!--value-key="empName"-->
                <!--:fetch-suggestions="querySearch"-->
                <!--:placeholder="placeholderVal"-->
                <!--:trigger-on-focus="false"-->
                <!--@select="handleSelect"-->
        <!--&gt;</el-autocomplete>-->
        <el-select
                v-model="keyword"
                filterable
                remote
                reserve-keyword
                clearable
                placeholder="请输入负责人"
                :remote-method="querySearch"
                :loading="loading"
                @change="handleSelect"
        >
            <el-option
                    v-for="(item,index) in queryEmpList"
                    :key="index"
                    :label="item.empName"
                    :value="item"
            ></el-option>
        </el-select>
    </div>
</template>
<script>
    export default {
        props:{
            placeholderVal:{
              type: String,
              default:'请输入负责人'
            },
            searchemp:{
              type:String,
              default:''
            },
            // 数据
            datas: {
                type: Array,
                default: () => {
                    return [];
                }
            },
            btnSuccessCb:{
                type:String,
                default:'返回上一页'
            }
        },
        data(){
            return{
                keyword:this.searchemp,
                queryEmpList:[],
                loading:false
            }
        },
        watch:{
            searchemp() {
                this.keyword = this.searchemp;
            }
        },
        methods:{
            // 模糊查询
            querySearch(query) {
                if (!query) {
                    this.queryEmpList = [];
                    return;
                }
                this.loading = true;
                const url = '/emplist/getEmpVague';
                this.$http
                    .get(url, {
                        params: {
                            nameNumPhone: query,
                            companyId: 1
                        }
                    })
                    .then(res => {
                        const content = res.result;
                        this.queryEmpList = content;
                        this.loading = false;
                    });
            },
            // querySearch(queryString, cb) {
            //     const url = '';
            //     // const url = 'https://www.easy-mock.com/mock/5d15cbc238f5145ef5374a93/example';
            //     this.$http.get(`${url}/emplist/getEmpVague`,{params:{
            //             nameNumPhone:queryString,
            //             companyId:1
            //         }}).then(res=>{
            //         const content = res.result;
            //         // 调用 callback 返回建议列表的数据
            //         var results = queryString ? content.filter(this.createFilter(queryString)) : content;
            //         console.log(results);
            //         cb(results);
            //     })
            // },
            // createFilter(queryString) {
            //     return (data) => {
            //         return (data.empName.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            //     };
            // },
            // // item 选项所在对象。
            handleSelect(item) {
                console.log(item);
                this.$emit("getValue", item);
                // paramsItem.leaderId = item.empId;
            }
        }
    }
</script>
<style lang="less" scoped>
    .emp-vague{

    }
</style>