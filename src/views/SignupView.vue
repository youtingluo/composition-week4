<script setup>
import { ref } from 'vue'
import axios from 'axios'
import Loading from 'vue-loading-overlay'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2/dist/sweetalert2.js'
const router = useRouter()
const url = 'https://todolist-api.hexschool.io'
const user = ref({
  email: '',
  password: '',
  nickname: ''
})
const isLoading = ref(false)
const signup = () => {
  isLoading.value = true
  axios
    .post(`${url}/users/sign_up`, user.value)
    .then(() => {
      isLoading.value = false
      Swal.fire({
        position: 'top',
        title: '註冊成功',
        icon: 'success',
        timer: 2000,
        toast: true,
        showConfirmButton: false,
        timerProgressBar: true
      })
      router.push('/')
    })
    .catch((err) => {
      isLoading.value = false
      Swal.fire({
        icon: 'error',
        title: '請重試一次',
        text: err.response.data.message
      })
    })
}
</script>

<template>
  <loading :active="isLoading" />
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
        <VForm class="formControls" @submit="signup">
          <div class="router-wrap">
            <RouterLink to="/" class="router-link">登入頁</RouterLink>
            <RouterLink to="/signup" class="router-link">註冊頁</RouterLink>
          </div>
          <h2 class="formControls_txt">註冊帳號</h2>
          <label class="formControls_label" for="email">Email</label>
          <VField
            v-model="user.email"
            class="formControls_input"
            type="email"
            id="email"
            name="Email"
            placeholder="請輸入 email"
            rules="required|email"
          />
          <ErrorMessage name="Email" />
          <label class="formControls_label" for="name">您的暱稱</label>
          <VField
            v-model="user.nickname"
            class="formControls_input"
            type="text"
            name="暱稱"
            id="name"
            placeholder="請輸入您的暱稱"
            rules="required"
          />
          <ErrorMessage name="暱稱" />
          <label class="formControls_label" for="pwd">密碼</label>
          <VField
            v-model="user.password"
            class="formControls_input"
            type="password"
            name="密碼"
            id="pwd"
            placeholder="請輸入密碼"
            rules="required|min:6"
          />
          <ErrorMessage name="密碼" />
          <button type="submit" class="btnLink">註冊</button>
        </VForm>
      </div>
    </div>
  </div>
</template>
