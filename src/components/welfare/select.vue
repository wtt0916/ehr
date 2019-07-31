<template>
    <div class="select">
        <el-dialog title="请选择社保公积金核算起始月份" center :visible="selectVisible"
            @update:visible="v=>$emit('update:selectVisible',v)">
            <span class="hint">首次在系统进行社保公积金核算需选择起始月份，将以此月为始进行核算~</span>
            <el-form :model="form">
                <el-form-item label="请选择月份：">
                    <el-date-picker v-model="form.date" type="month" placeholder="选择月">
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="selectSuccess">确 定</el-button>
            </div>
        </el-dialog>
    </div>

</template>

<script>
    export default {
        props: ['selectVisible'],
        data() {
            return {
                form: {
                    date: '2000-10'
                }
            };
        },
        methods: {
            selectSuccess() {
                this.$emit('update:selectVisible', false);
                console.log("成功");
            }
        },
        mounted() {
            let nowDate = new Date();
            let year = nowDate.getFullYear();
            let month = nowDate.getMonth() + 1;
            let day = nowDate.getDate();
            let endTime = `${year}-${month}-${day}`;
            this.nowTime = endTime; // 当前的时间点
            let befDate = new Date(nowDate.getTime() - 7 * 24 * 3600 * 1000);
            let byear = befDate.getFullYear();
            let bmonth = befDate.getMonth() + 1;
            let bday = befDate.getDate();
            let startTime = `${byear}-${bmonth}-${bday}`;
            this.weekBeforeTime = startTime; // 向前推迟一周的时间点

            // 默认日期赋值
            this.date = [new Date(byear + ', ' + bmonth + ', ' + bday), new Date(year + ', ' + month + ', ' + day)];
            console.log('填充默认日期');
            console.log(byear + ', ' + bmonth + ', ' + bday);
            console.log(year + ', ' + month + ', ' + day);
            console.log(this.form.date);
            console.log('填充默认日期尾部');
        }
    };
</script>


<style scoped lang="less">
    .select {
        /deep/.el-dialog {
            width: 550px;
            border-radius: 12px;
        }

        /deep/.el-dialog__header {
            padding: 14px 0 14px 45px;
            height: 22px;
            background: rgba(255, 255, 255, 1);
            box-shadow: 2px 0px 16px 0px rgba(3, 33, 136, 0.2);
            border-radius: 12px 12px 0px 0px;

            .el-dialog__title {
                font-size: 16px;
                font-family: PingFangSC-Medium;
                font-weight: 500;
                color: rgba(102, 102, 102, 1);
            }
        }

        /deep/.el-dialog__body {
            padding: 0 20px;

            .hint {
                display: block;
                line-height: 30px;
                background: rgba(255, 241, 240, 1);
                border-radius: 2px;
                opacity: 0.5;
                padding-left: 21px;
                font-size: 13px;
                font-family: PingFangSC-Regular;
                font-weight: 400;
                color: rgba(255, 163, 158, 1);
                border: 1px solid rgba(255, 163, 158, 1);
            }

            .el-form {
                float: none;
                padding: 70px 97px;
            }
        }

        /deep/.el-button {
            width: 200px;
            height: 41px;
        }
    }
</style>