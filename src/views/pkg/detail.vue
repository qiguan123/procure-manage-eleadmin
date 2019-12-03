<template>
  <div class="app-container">
    <div>
      <strong>基本信息</strong>
      <el-table :data="baseInfoList" border fit highlight-current-row>
        <el-table-column align="center" label="ID" width="40">
          <template slot-scope="scope">
            {{ scope.row.id }}
          </template>
        </el-table-column>
        <el-table-column label="包名称" width="200">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column label="包序号" align="center" width="70">
          <template slot-scope="scope">
            <span>{{ scope.row.indexNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column label="限价(万元)" align="center" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.bidUpperLimit }}</span>
          </template>
        </el-table-column>
        <el-table-column label="所属项目" align="center" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.projectName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="应标单位" align="center">
          <el-tag v-for="b in bidders" :key="b.id" type="info">{{ b.name }}</el-tag>
        </el-table-column>
        <el-table-column label="专家" align="center">
          <el-tag v-for="e in experts" :key="e.id" type="info">{{ e.name }}</el-tag>
        </el-table-column>
      </el-table>
    </div>
    <div>
      <strong>结果排名</strong>
      <el-table :data="finalResultList" border fit highlight-current-row>
        <el-table-column align="center" label="排名" width="95">
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="应标单位">
          <template slot-scope="scope">{{ scope.row.bidderName }}</template>
        </el-table-column>
        <el-table-column label="投标价(万元)" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.bidPrice }}</span>
          </template>
        </el-table-column>
        <el-table-column label="综合评分" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.finalScore }}</span>
          </template>
        </el-table-column>
        <el-table-column v-for="(expert, index) in experts" :key="expert.id" :label="expert.name" align="center">
          <template slot="header" slot-scope="scope">
            <el-link type="primary" @click="go2ExpertScoreDetail(expert.id)">{{ scope.column.label }}</el-link>
          </template>
          <template slot-scope="scope">
            <span>{{ scope.row.expertScores[index] }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getDetailById } from '@/api/pkg'

export default {
  data() {
    return {
      baseInfoList: [],
      finalResultList: [],
      experts: [],
      bidders: [],
      pkgId: undefined
    }
  },
  created() {
    this.pkgId = this.$route.params.id
    this.fetchData()
  },
  methods: {
    fetchData() {
      getDetailById(this.pkgId).then(response => {
        this.baseInfoList = [response.data]
        this.finalResultList = response.data.finalResult
        this.experts = response.data.experts
        this.bidders = response.data.bidders
      })
    },
    go2ExpertScoreDetail(expertId) {
      this.$router.push('/pkg/' + this.pkgId + '/detail/expert/' + expertId)
    }
  }
}
</script>
