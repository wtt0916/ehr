<template>
    <div class="subMember">
        <el-dialog title="减员" center :visible="subVisible" @update:visible="v=>$emit('update:subVisible',v)">
            <div class="sub_con">
                <span> 是否确定为员工“<em>张三</em>”，“<em>李四</em>”<em>2</em>人减员？</span>
                <p>减员后，员工社保公积金为已减员状态，并从本月开始将不再为员工核算社保公积金。</p>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="subFailed">取 消</el-button>
                <el-button type="primary" @click="subSuccess">确 定</el-button>
            </span>
        </el-dialog>
    </div>

</template>

<script>
    export default {
        props: ['subVisible'],
        data() {
            return {

            };
        },
        methods: {
            subSuccess() {
                this.$emit('update:subVisible', false);
                this.$message({
                    message: '减员成功',
                    type: 'success'
                });
            },
            subFailed() {
                this.$emit('update:subVisible', false);
                this.$message('取消减员');
            }

        },

    };
</script>


<style scoped lang="less">
    .subMember {
        /deep/.el-dialog {
            border-radius: 12px;
        }

        /deep/.el-dialog__header {
            height: 30px;
            background: rgba(255, 255, 255, 1);
            box-shadow: 2px 0px 16px 0px rgba(3, 33, 136, 0.2);
            border-radius: 12px 12px 0px 0px;

            /deep/.el-dialog__title {
                font-size: 16px;
                font-family: PingFangSC-Medium;
                font-weight: 500;
                color: rgba(102, 102, 102, 1);
            }
        }

        .sub_con {
            text-align: center;
            padding: 20px;

            em {
                font-style: normal;
            }

            p {
                margin-top:10px;
                color: #FF9D6B;
                font-size: 13px;
            }
        }
    }
</style>