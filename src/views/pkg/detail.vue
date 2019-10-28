<template>
  <div class="app-container">
    <div>
      <strong>基本信息</strong>
      <el-table :data="list" border fit highlight-current-row>
        <el-table-column align="center" label="ID" width="95">
          <template slot-scope="scope">
            {{ scope.row.id }}
          </template>
        </el-table-column>
        <el-table-column label="包名称">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column label="包序号" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.indexNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column label="限价(万元)" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.bidUpperLimit }}</span>
          </template>
        </el-table-column>
        <el-table-column label="所属项目" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.projectName }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div>
      <strong>结果排名</strong>
    </div>
    <div>评分详情</div>
  </div>
</template>

<script>
import { getById } from '@/api/pkg'

export default {

  data() {
    return {
      list: null,
      listLoading: true,
      pkg: null
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getById(this.$route.params.id).then(response => {
        this.pkg = response.data
        this.list = [this.pkg]
        console.log(this.pkg)
        this.listLoading = false
      })
    }
  }
}
</script>
