<template>
  <div class="dashboard-container">
    <div class="dashboard-text">2019年招标</div>
    <el-row :gutter="40">
      <el-col :span="6">
        <el-card shadow="hover">
          会议{{ statistic.cfrsCount }}次
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          项目{{ statistic.projectCount }}个
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          分包{{ statistic.pkgCount }}个
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          招标金额{{ statistic.bidUpperLimit }}万元
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getStatistc } from '@/api/statistic'
export default {
  name: 'Dashboard',
  data() {
    return {
      statistic: {}
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getStatistc().then(response => {
        this.statistic = response.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
