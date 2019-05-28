<template>
    <div>
        <h3>Rs-Input</h3>
        
        <!-- 
            -- type 可选
            -- 实现v-model：1.:value; 2.!!!必须@input
         -->
        <!-- <rs-input :value="msgModel.userName" @input="msgModel.userName = $event"></rs-input> -->
        <br>
        <rs-form :model="msgModel" :rules="rules" ref="RsForm">
            <rs-form-item label="用户名" prop="userName">
                <rs-input v-model="msgModel.userName" @on-change="valChange" @on-blur="inputBlur"></rs-input>
                <!-- 
                    具名插槽 
                    slot="foo" 废弃 V3.0+ 消失
                -->
                <!-- <template v-solt:foo>fon text</template> -->
                <!-- <template #foo></template> -->
            </rs-form-item>
            <rs-form-item label="密码" prop="pass">
                <rs-input type="password" v-model="msgModel.pass"></rs-input>
            </rs-form-item>
            <rs-form-item>
                <el-button type="primary" @click="submitForm('RsForm')">提交</el-button>
            </rs-form-item>
        </rs-form>

        <br><br><hr><br><br>
        <h3>Element 表单</h3>
        <el-form 
            :model="msgModel" 
            :rules="rules" 
            ref="loginForm" 
            label-width="100px"
            class="login-from">
            <el-form-item label="用户名" prop="userName">
                <el-input type="text" v-model="msgModel.userName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model="msgModel.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
                <el-input type="password" v-model="msgModel.checkPass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="年龄" prop="age">
                <el-input v-model.number="msgModel.age"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('loginForm')">提交</el-button>
                <el-button @click="resetForm('loginForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import RsForm from './RsForm'
    import RsFormItem from './RsFormItem'
    import RsInput from './Rsinput'
    export default {
        components: {
            RsInput,
            RsFormItem,
            RsForm
        },
        data() {
            var checkAge = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('年龄不能为空'));
                }
                setTimeout(() => {
                    if (!Number.isInteger(value)) {
                        callback(new Error('请输入数字值'));
                    } else {
                        if (value < 18) {
                            callback(new Error('必须年满18岁'));
                        } else {
                            callback();
                        }
                    }
                }, 1000);
            };
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.ruleForm.checkPass !== '') {
                        this.$refs.ruleForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                // 数据模型
                msgModel: {
                    userName:'',
                    pass: '',
                    checkPass: '',
                    age: ''
                },
                // 校验规则
                // rules: {
                //     userName: [
                //         {required: true, message: '请输入活动名称', trigger: 'blur'},
                //         { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                //     ],
                //     pass: [
                //         { validator: validatePass, trigger: 'blur' }
                //     ],
                //     checkPass: [
                //         { validator: validatePass2, trigger: 'blur' }
                //     ],
                //     age: [
                //         { validator: checkAge, trigger: 'blur' }
                //     ]
                // }
                rules: {
                    userName: [
                        {required: true, message: '请输入活动名称'},
                        {validator: (rule, value, callback) => {
                            if (value === '') {
                                callback(new Error('请再次输入密码'));
                            } else if (value !== this.ruleForm.pass) {
                                callback(new Error('两次输入密码不一致!'));
                            } else {
                                callback();
                            }
                        }},
                    ],
                    pass: [
                        { required: true, message: '请输入密码'}
                    ],
                }
            }
        },
        methods: {
            submitForm(formName) {
                // 表单全局校验
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('登陆成功！');
                    } else {
                        alert('校验失败！');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            valChange(val){
                console.log(val)
            },
            inputBlur(e){
                console.log(e)
            }
        },
    }
</script>

<style lang="stylus"  scoped>
.login-from 
    width:400px;
    margin:auto
</style>