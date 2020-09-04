<template>
  <div class="login_form border">
    <div class="border">
      <v-app>
        <v-container style="padding:0">
          <v-col style="display:inline-block;padding-right:30px;" cols="7">
            <img
              class="img"
              src="@/assets/image/Lark20200901-184404.jpeg"
              alt=""
            />
          </v-col>
          <v-col
            style="text-algin:center;display:inline-block;position:absolute;top:23%"
            class="loginForm border"
            cols="5"
          >
            <div class="box border">
              <v-card
                style="width:500px;position: absolute;left: 50%;transform: translate(-50%);"
                class="elevation-12"
              >
                <v-form
                  v-model="valid"
                  style="height:360px;padding:50px 100px 0px 100px"
                  ref="loginFormRef"
                >
                  <v-img
                    class="xiangji"
                    src="@/assets/image/xiangji_2.png"
                  ></v-img>
                  <v-text-field
                    single-line
                    label="请输入账号"
                    type="text"
                    :rules="nameRules"
                    v-model="loginForm.userName"
                    prepend-inner-icon="mdi-account"
                  ></v-text-field>
                  <v-text-field
                    single-line
                    label="请输入密码"
                    v-model="loginForm.password"
                    type="password"
                    :rules="pwdRules"
                    prepend-inner-icon="mdi-lock"
                  ></v-text-field>
                  <v-checkbox
                    style="float:left;margin-top:5px;"
                    value="1"
                    label="记住此账号"
                    type="checkbox"
                  ></v-checkbox>
                  <a class="fPwd" href="#">忘记密码?</a>
                  <v-btn block dark @click="login" color="#5cbbf6">登录</v-btn>
                  <v-snackbar
                    v-model="snackbar"
                    :bottom="y === 'bottom'"
                    :color="color"
                    :left="x === 'left'"
                    :multi-line="mode === 'multi-line'"
                    :right="x === 'right'"
                    :timeout="timeout"
                    :top="y === 'top'"
                    :vertical="mode === 'vertical'"
                  >
                    {{ text }}
                  </v-snackbar>
                  <p
                    style="font-size:14px;transform:translate(36%);margin-top:50px"
                  >
                    没有账号?
                    <a style="color: rgba(112, 171, 237, 1);" href="#"
                      >立即注册</a
                    >
                  </p>
                </v-form>
              </v-card>
            </div>
          </v-col>
        </v-container>
      </v-app>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      color: '',
      mode: '',
      snackbar: false,
      text: '密码或账号输入有误',
      timeout: 1000,
      x: null,
      y: 'top',
      valid: true,
      loginForm: { userName: '', password: '' },
      nameRules: [v => !!v || '请输入账号'],
      pwdRules: [v => !!v || '请输入密码']
    }
  },
  methods: {
    async login() {
      // this.$refs.loginFormRef.validate(async valid=>{
      // if(!valid) return;
      const user = { action: 'login', user: this.loginForm }
      const res = await this.$http.post('user', user)
      console.log(res)
      if (res.data.error_code != 200) {
        this.snackbar = true
      }
      window.sessionStorage.setItem('token', res.data.token)
      this.$router.push('/home')
      // })
    }
  }
}
</script>
<style scoped>
.login_form {
  width: 100%;
  height: 100%;
  /* position: absolute;
        left: 50%;
        transform: translate(-50%); */
}
.border {
  border: 1px solid rgba(112, 171, 237, 0.3);
  box-shadow: 1px 1px 1px #70abed4d;
  border-radius: 10px;
}
.img {
  position: absolute;
  left: 0;
  width: 1200px;
  height: 1130px;
}
.xiangji {
  position: absolute;
  left: 50%;
  transform: translate(-50%, -100%);
  width: 110px;
  height: 100px;
  background-color: #fff;
}
.loginForm {
  height: auto;
  line-height: 5px;
  border: 1px solid rgba(112, 171, 237, 0.3);
  box-shadow: 1px 1px 1px rgba(112, 171, 237, 0.3);
  border-radius: 10px;
  /* border-collapse:separate; */
}
.loginForm .box {
  padding: 60px;
  position: relative;
  height: 460px;
}
.fPwd {
  float: right;
  margin-right: 40px;
  margin-top: 20px;
  color: rgba(166, 166, 166, 1);
  font-size: 12px;
}
a {
  text-decoration: none;
}
</style>
