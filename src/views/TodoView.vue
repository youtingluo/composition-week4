<script setup>
import axios from 'axios'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import Loading from 'vue-loading-overlay'
const router = useRouter()
const url = 'https://todolist-api.hexschool.io'
const nickname = ref('')
const checkLogin = () => {
  isLoading.value = true
  const cookieValue = document.cookie
    .split('; ')
    .find((row) => row.startsWith('myToken'))
    ?.split('=')[1]
  if (!cookieValue) {
    router.push('/')
  }
  axios.defaults.headers.common.Authorization = cookieValue
  axios
    .get(`${url}/users/checkout`)
    .then((res) => {
      nickname.value = res.data.nickname
      getTodos()
      isLoading.value = false
    })
    .catch((err) => {
      isLoading.value = false
      alert(err.response.data.message)
      router.push('/')
    })
}

const todoData = ref([])
const getTodos = () => {
  isLoading.value = true
  axios
    .get(`${url}/todos/`)
    .then((res) => {
      todoData.value = res.data.data
      isLoading.value = false
    })
    .catch((err) => {
      isLoading.value = false
      alert(err.response.data.message)
    })
}
// 新增 todo
const todo = ref('')
const addTodo = () => {
  if (!todo.value.trim()) {
    alert('請輸入內容')
    todo.value = ''
    return
  }
  isLoading.value = true
  axios
    .post(`${url}/todos/`, { content: todo.value })
    .then(() => {
      todo.value = ''
      isLoading.value = false
      getTodos()
    })
    .catch((err) => {
      alert(err.response.data.message)
      isLoading.value = false
    })
}
// 刪除 todo
const removeTodo = (todo) => {
  isLoading.value = true
  axios
    .delete(`${url}/todos/${todo.id}`)
    .then((res) => {
      getTodos()
      isLoading.value = false
      alert(res.data.message)
    })
    .catch((err) => {
      isLoading.value = false
      alert(err.response.data.message)
    })
}
// 編輯 todo
const editCatch = ref({})
const editTodo = (todo) => {
  editCatch.value = { ...todo }
}
const confirmEdit = (todo) => {
  isLoading.value = true
  axios
    .put(`${url}/todos/${todo.id}`, { content: editCatch.value.content })
    .then((res) => {
      getTodos()
      isLoading.value = false
      alert(res.data.message)
      editCatch.value = {}
    })
    .catch((err) => {
      isLoading.value = false
      alert(err.response.data.message)
    })
}
// 修改狀態
const toggleTodo = (todo) => {
  isLoading.value = true
  axios
    .patch(`${url}/todos/${todo.id}/toggle`)
    .then((res) => {
      getTodos()
      isLoading.value = false
      alert(res.data.message)
    })
    .catch((err) => {
      alert(err.response.data.message)
      isLoading.value = false
    })
}
// 狀態顯示對應資料
const status = ref('all')
const data = computed(() => {
  if (status.value === 'all') {
    return todoData.value
  }
  if (status.value === 'unCompleted') {
    return todoData.value.filter((item) => !item.status)
  } else {
    return todoData.value.filter((item) => item.status)
  }
})
const doneLength = computed(() => {
  return todoData.value.filter((item) => !item.status).length
})
const isLoading = ref(false)
// 登出
const logout = () => {
  isLoading.value = true
  axios
    .post(`${url}/users/sign_out`)
    .then((res) => {
      isLoading.value = false
      alert(res.data.message)
      document.cookie = 'myToken=;'
      router.push('/')
    })
    .catch((err) => {
      isLoading.value = false
      alert(err.response.data.message)
    })
}
onMounted(() => {
  checkLogin()
})
</script>
<template>
  <loading :active="isLoading" />
  <div id="todoListPage" class="bg-half">
    <nav>
      <h1><a href="#">ONLINE TODO LIST</a></h1>
      <ul>
        <li class="todo_sm">
          <span>{{ nickname }}</span>
        </li>
        <li><a href="#" @click.prevent="logout">登出</a></li>
      </ul>
    </nav>
    <div class="conatiner todoListPage vhContainer">
      <div class="todoList_Content">
        <div class="inputBox">
          <input type="text" placeholder="請輸入待辦事項" v-model="todo" />
          <a href="#" @click.prevent="addTodo">
            <i class="fa fa-plus"></i>
          </a>
        </div>
        <div class="todoList_list">
          <ul class="todoList_tab">
            <li>
              <a href="#" :class="{ active: status === 'all' }" @click.prevent="status = 'all'"
                >全部</a
              >
            </li>
            <li>
              <a
                href="#"
                :class="{ active: status === 'unCompleted' }"
                @click.prevent="status = 'unCompleted'"
                >待完成</a
              >
            </li>
            <li>
              <a
                href="#"
                :class="{ active: status === 'completed' }"
                @click.prevent="status = 'completed'"
                >已完成</a
              >
            </li>
          </ul>
          <div class="todoList_items">
            <ul class="todoList_item">
              <li v-for="item in data" :key="item.id">
                <label class="todoList_label">
                  <div>
                    <input
                      class="todoList_input"
                      type="checkbox"
                      :checked="item.status"
                      @click="toggleTodo(item)"
                    />
                    <input
                      type="text"
                      v-if="editCatch.id === item.id"
                      v-model="editCatch.content"
                    />
                    <button
                      v-if="editCatch.id === item.id"
                      type="button"
                      @click="confirmEdit(item)"
                    >
                      確定
                    </button>
                    <span v-else>{{ item.content }}</span>
                  </div>
                </label>
                <div class="edit">
                  <button v-if="!editCatch.id" type="button" @click="editTodo(item)">編輯</button>
                  <button v-if="editCatch.id === item.id" type="button" @click="editCatch = {}">
                    取消
                  </button>
                  <a href="#" @click.prevent="removeTodo(item)">
                    <i class="fa fa-times"></i>
                  </a>
                </div>
              </li>
            </ul>
            <div class="todoList_statistics">
              <p v-if="!todoData.length">目前尚無待辦事項</p>
              <p v-else>{{ doneLength }} 個待完成項目</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.edit {
  button {
    width: 60px;
  }
  display: flex;
  align-items: center;
}
</style>
