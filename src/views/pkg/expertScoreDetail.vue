<template>
  <div class="app-container">
    <h1 style="text-align: center">{{ pkgName }} 评分表----{{ expertName }}</h1>
    <el-table :data="gradeItemList" border fit highlight-current-row>
      <el-table-column type="index" width="40" />
      <el-table-column prop="category" label="分类" width="50" />
      <el-table-column prop="name" label="二级项" width="100" />
      <el-table-column prop="content" label="内容" width="250" />
      <el-table-column prop="standard" label="标准" />
      <el-table-column prop="relateFilesName" label="评审依据" width="120" />
      <el-table-column prop="maxValue" label="分值" width="50" />
      <el-table-column v-for="(bidder, index) in bidders" :key="bidder.id" :label="bidder.name" width="120">
        <template slot-scope="scope">
          {{ scope.row.bidderScores[index] }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { getPkgExpertScoreDetail } from '@/api/pkg'

export default {
  data() {
    return {
      pkgId: this.$route.params.id,
      expertId: this.$route.params.expertId,
      pkgName: '',
      expertName: '',
      gradeItemList: [],
      bidders: []
    }
  },
  created() {
    getPkgExpertScoreDetail(this.pkgId, this.expertId).then((resp) => {
      const pkg = resp.data
      this.pkgName = pkg.pkgName
      this.bidders = pkg.bidders
      this.expertName = pkg.expertName
      this.gradeItemList = pkg.allItems
    })
  },
  methods: {
  }
}
</script>
