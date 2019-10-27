<template>
  <div class="app-container">
    <el-form ref="form" :model="pkg" label-width="80px">
      <el-form-item label="12"> aaaa </el-form-item>
      <el-form-item label="11"> aaaa </el-form-item>
      <el-form-item label="22"> aaaa </el-form-item>
      <el-form-item label="33333"> aaaa </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getById } from '@/api/pkg'

export default {

  data() {
    return {
      pkg: null
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      console.log(this.$route.params.id)
      getById(1).then(response => {
        this.pkg = response.data
        console.log(this.pkg)
      })
    }
  }
}
</script>
