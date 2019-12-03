<template>
  <div class="app-container">
    <h2>
      <p style="text-align: center">进行中的会议</p>
    </h2>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="会议名称">
        <template slot-scope="scope">
          <el-link type="primary" @click="go2CfrsPkgs(scope.row.id)">{{ scope.row.name }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="开始时间" align="center">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span v-if="scope.row.startTime">{{ scope.row.startTime | parseTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="会议地址">
        <template slot-scope="scope">
          {{ scope.row.address }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="状态" width="110" align="center">
        <el-tag type="danger">进行中</el-tag>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getOngoingCfrsList } from '@/api/conference'
import { parseTime } from '@/utils'

export default {
  filters: {
    parseTime
  },
  data() {
    return {
      list: null,
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getOngoingCfrsList().then(response => {
        this.list = response.data
        this.listLoading = false
      })
    },
    go2CfrsPkgs(cfrsId) {
      this.$router.push('/operate/' + cfrsId + '/pkg')
    }
  }
}
</script>
