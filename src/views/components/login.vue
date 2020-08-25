<template>
  <div class="login-container d-flex flex-column align-center justify-center">
    <div class="l-card px-8 py-7" v-if="isLoginShow">
      <div class="headline">登陆</div>
      <v-row class="mx-0 mt-2">
        <v-text-field
          v-model="loginName"
          :counter="20"
          label="用户名"
          required
          width="90%"
        ></v-text-field>
      </v-row>
      <v-row class="mx-0 mt-2">
        <v-text-field
          v-model="password"
          :append-icon="showLoginPassword ? mdiEye : mdiEyeOff"
          :rules="[rules.required, rules.min]"
          :type="showLoginPassword ? 'text' : 'password'"
          name="input-10-1"
          label="密码"
          hint="至少输入8个字符"
          counter
          @click:append="showLoginPassword = !showLoginPassword"
        ></v-text-field>
      </v-row>
      <v-checkbox v-model="checkbox" label="记住我?"></v-checkbox>
      <v-btn color="primary" width="100%" @click="loginTo">登陆</v-btn>
      <v-divider class="my-4"></v-divider>
      <div class="text-center text--disabled body-2">
        <span @click="userRegist">没有账户？</span>
        <span>忘记密码？</span>
      </div>
    </div>
    <div class="l-card px-8 py-7" v-if="isRegistShow">
      <div class="headline">注册</div>
      <v-row class="mx-0 mt-0">
        <v-text-field
          v-model="firstname"
          :counter="10"
          label="用户名"
          required
          width="90%"
        ></v-text-field>
      </v-row>
      <v-row class="mx-0 mt-0">
        <v-text-field
          v-model="firstname"
          :counter="10"
          label="真实姓名"
          required
          width="90%"
        ></v-text-field>
      </v-row>
      <v-row class="mx-0 mt-0">
        <v-text-field
          v-model="firstname"
          :counter="10"
          label="手机号码"
          required
          width="90%"
        ></v-text-field>
      </v-row>
      <v-row class="mx-0 mt-0">
        <v-text-field
          v-model="password"
          :append-icon="show1 ? mdiEye : mdiEyeOff"
          :rules="[rules.required, rules.min]"
          :type="showLoginPassword ? 'text' : 'password'"
          name="input-10-1"
          label="密码"
          hint="至少输入8个字符"
          counter
          @click:append="showLoginPassword = !showLoginPassword"
        ></v-text-field>
      </v-row>
      <v-row class="mx-0 mt-0">
        <v-text-field
          v-model="password"
          :append-icon="show1 ? mdiEye : mdiEyeOff"
          :rules="[rules.required, rules.min]"
          :type="show1 ? 'text' : 'password'"
          name="input-10-1"
          label="密码"
          hint="至少输入8个字符"
          counter
          @click:append="show1 = !show1"
        ></v-text-field>
      </v-row>
      <v-btn color="primary" width="100%" class="mt-5">注册</v-btn>
      <v-divider class="my-4"></v-divider>
      <div class="text-center text--disabled body-2">
        <span @click="userLogin">已有账户？请直接登录</span>
      </div>
    </div>
    <div class="l-card px-8 py-7" v-if="isGuestLoginShow">
      <div class="headline">访客登陆</div>
      <v-row class="mx-0 mt-2">
        <v-text-field
          v-model="firstname"
          :counter="10"
          label="真实姓名"
          required
          width="90%"
        ></v-text-field>
      </v-row>
      <v-row class="mx-0 mt-2">
        <v-text-field
          v-model="firstname"
          :counter="10"
          label="手机号码"
          required
          width="90%"
        ></v-text-field>
      </v-row>
      <v-btn color="primary" width="100%" class="mt-5">登陆</v-btn>
      <v-divider class="my-4"></v-divider>
      <div class="text-center text--disabled body-2">
        <span @click="userLogin">已有账户？请直接登录</span>
      </div>
    </div>
    <div class="forget-password"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { icon } from '@/config/icon';

// import { mdiHome } from '@mdi/js';

@Component
export default class LoginView extends Vue {
  isLoginShow = true;
  isRegistShow = false;
  isGuestLoginShow = false;

  loginName = '';
  password = '';

  showLoginPassword = false;
  // password = 'Password';

  mdiEye = icon.mdiEye;
  mdiEyeOff = icon.mdiEyeOff;
  checkbox = true;

  rules = {
    required: (value: string) => !!value || 'Required.',
    min: (v: string) => v.length >= 8 || '至少输入8个字符',
    eemailMatch: () => "The eemail and password you entered don't match"
  };
  //   mdiHomeIcon = mdiHome;
  mounted() {}
  create() {}

  userRegist() {
    this.isLoginShow = false;
    this.isRegistShow = true;
    this.isGuestLoginShow = false;
  }

  userLogin() {
    this.isLoginShow = true;
    this.isRegistShow = false;
    this.isGuestLoginShow = false;
  }
  loginTo() {
    this.$router.push('/scan');
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.login-container {
  // height: 100vh;
  margin-top: 60px;
  // background-color: red;
  .l-card {
    width: 90%;
    max-width: 350px;
    min-width: 250px;
    border: #e0e0e0 1px solid;
    border-radius: 6px;
    background-color: white;
    border-radius: 8px;
  }
}
</style>
