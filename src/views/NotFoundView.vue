<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
import { onMounted } from 'vue'

onMounted(() => {
  router.push('/')
})
</script>
<template>
  <div>
    <h1>找不到此頁面</h1>
  </div>
</template>
