<template>
  <div class="app-container">
    <h3>
      <p style="text-align: center">会议中的分包</p>
    </h3>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="60">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="包名称">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="包序号" align="center" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.indexNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column label="限价(万元)" align="center" width="90">
        <template slot-scope="scope">
          <span>{{ scope.row.bidUpperLimit }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属项目" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.projectName }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="300">
        <template slot-scope="{row}">
          <el-button type="success" size="mini" @click="go2PkgPricePage(row.id)">
            价格评分
          </el-button>
          <el-button type="warn" size="mini" @click="go2PkgFinalScorePage(row.id)">
            总分排名
          </el-button>
          <el-button type="info" size="mini" @click="go2PkgScoreWaitingPage(row.id)">
            评分过程
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getPkgsByCfrsId } from '@/api/pkg'

export default {
  data() {
    return {
      list: null,
      listLoading: true,
      cfrsId: undefined
    }
  },
  created() {
    this.cfrsId = this.$route.params.id
    this.fetchData(this.cfrsId)
  },
  methods: {
    fetchData(cfrsId) {
      this.listLoading = true
      getPkgsByCfrsId(cfrsId).then(response => {
        this.list = response.data
        this.listLoading = false
      })
    },
    go2PkgPricePage(pkgId) {
      this.$router.push('/operate/pkg/' + pkgId + '/price')
    },
    go2PkgFinalScorePage(pkgId) {
      this.$router.push('/operate/pkg/' + pkgId + '/final')
    },
    go2PkgScoreWaitingPage(pkgId) {
      this.$router.push('/operate/pkg/' + pkgId + '/waiting')
    }
  }
}
</script>
