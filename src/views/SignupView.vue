<script setup>
import { ref } from 'vue'
import axios from 'axios'
import router from '@/router'
const url = 'https://todolist-api.hexschool.io'
const user = ref({
  email: '',
  password: '',
  nickname: ''
})
const uid = ref('')
const signup = () => {
  axios
    .post(`${url}/users/sign_up`, user.value)
    .then((res) => {
      console.log(res)
      uid.value = res.data.uid
      alert(`註冊成功，Uid 為 ${uid.value}`)
      router.push('/')
    })
    .catch((err) => {
      alert(err.response.data.message)
    })
}
</script>

<template>
  <div id="signUpPage" class="bg-yellow">
    <div class="conatiner signUpPage vhContainer">
      <div class="side">
        <a href="#"
          ><img
            class="logoImg"
            src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/logo.png"
            alt=""
        /></a>
        <img
          class="d-m-n"
          src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/img.png"
          alt="workImg"
        />
      </div>
      <div>
        <form class="formControls" action="index.html">
          <div class="router-wrap">
            <RouterLink to="/" class="router-link">登入頁</RouterLink>
            <RouterLink to="/signup" class="router-link">註冊頁</RouterLink>
          </div>
          <h2 class="formControls_txt">註冊帳號</h2>
          <label class="formControls_label" for="email">Email</label>
          <input
            v-model="user.email"
            class="formControls_input"
            type="email"
            id="email"
            name="email"
            placeholder="請輸入 email"
            required
          />
          <label class="formControls_label" for="name">您的暱稱</label>
          <input
            v-model="user.nickname"
            class="formControls_input"
            type="text"
            name="name"
            id="name"
            placeholder="請輸入您的暱稱"
          />
          <label class="formControls_label" for="pwd">密碼</label>
          <input
            v-model="user.password"
            class="formControls_input"
            type="password"
            name="pwd"
            id="pwd"
            placeholder="請輸入密碼"
            required
          />
          <label class="formControls_label" for="pwd2">再次輸入密碼</label>
          <input
            class="formControls_input"
            type="password"
            name="pwd"
            id="pwd2"
            placeholder="請再次輸入密碼"
            required
          />
          {{ user }}
          <button type="button" class="btnLink" @click="signup">註冊</button>
        </form>
      </div>
    </div>
  </div>
</template>
