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
  password: ''
})
const login = () => {
  isLoading.value = true
  axios
    .post(`${url}/users/sign_in`, user.value)
    .then((res) => {
      isLoading.value = false
      const { exp, token } = res.data
      document.cookie = `myToken=${token}; expires=${new Date(exp * 1000).toUTCString()};`
      router.push('/todo')
      Swal.fire({
        position: 'top',
        title: '登入成功',
        icon: 'success',
        timer: 2000,
        toast: true,
        showConfirmButton: false,
        timerProgressBar: true
      })
    })
    .catch((err) => {
      isLoading.value = false
      user.value = {}
      Swal.fire({
        icon: 'error',
        title: '請重試一次',
        text: err.response.data.message
      })
      user.value = {}
    })
}
const isLoading = ref(false)
</script>

<template>
  <loading :active="isLoading" />
  <div id="loginPage" class="bg-yellow">
    <div class="conatiner loginPage vhContainer">
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
        <VForm class="formControls" @submit="login">
          <div class="router-wrap">
            <RouterLink to="/" class="router-link">登入頁</RouterLink>
            <RouterLink to="/signup" class="router-link">註冊頁</RouterLink>
          </div>
          <h2 class="formControls_txt">最實用的線上代辦事項服務</h2>
          <label class="formControls_label" for="login-email">Email</label>
          <VField
            v-model="user.email"
            class="formControls_input"
            type="email"
            id="login-email"
            name="Email"
            placeholder="請輸入 email"
            rules="required|email"
          />
          <ErrorMessage name="Email" />
          <label class="formControls_label" for="login-pwd">密碼</label>
          <VField
            v-model="user.password"
            class="formControls_input"
            type="password"
            name="密碼"
            id="login-pwd"
            placeholder="請輸入密碼"
            rules="required|min:6"
          />
          <ErrorMessage name="密碼" />
          <button type="submit" class="btnLink">登入</button>
        </VForm>
      </div>
    </div>
  </div>
</template>
