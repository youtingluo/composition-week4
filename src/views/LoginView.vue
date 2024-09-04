<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
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
        <form class="formControls">
          <div class="router-wrap">
            <RouterLink to="/" class="router-link">登入頁</RouterLink>
            <RouterLink to="/signup" class="router-link">註冊頁</RouterLink>
          </div>
          <h2 class="formControls_txt">最實用的線上代辦事項服務</h2>
          <label class="formControls_label" for="login-email">Email</label>
          <input
            class="formControls_input"
            type="email"
            id="login-email"
            name="email"
            placeholder="請輸入 email"
            required
          />
          <span>此欄位不可留空</span>
          <label class="formControls_label" for="login-pwd">密碼</label>
          <input
            class="formControls_input"
            type="password"
            name="pwd"
            id="login-pwd"
            placeholder="請輸入密碼"
            required
          />
          <button type="button" class="btnLink">登入</button>
        </form>
      </div>
    </div>
  </div>
</template>
