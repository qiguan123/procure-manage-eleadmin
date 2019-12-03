<template>
  <div class="app-container">
    <h4>
      <p style="text-align: center">价格评分</p>
    </h4>
    <el-table :data="[pkg]" border fit>
      <el-table-column prop="id" label="ID" width="40" />
      <el-table-column prop="projectName" label="项目名" width="120" />
      <el-table-column prop="indexNumber" label="分包号" width="60" />
      <el-table-column prop="name" label="包名" width="120" />
      <el-table-column prop="priceItem.maxValue" label="分值" width="60" />
      <el-table-column prop="bidUpperLimit" label="最高限价(万元)" width="80" />
      <el-table-column class-name="status-col" label="评分方式" width="160">
        <template slot-scope="scope">
          {{ scope.row.priceStandardType | priceStandardTypeFilter }}
          <div v-if="scope.row.priceStandardType === 1">
            高于平均价1%扣{{ scope.row.higherDeduction }}分;低于平均价1%扣{{ scope.row.lowerDeduction }}分
          </div>
        </template>
      </el-table-column>
      <el-table-column v-for="(bidder) in pkg.bidders" :key="bidder.id" :label="bidder.name">
        <el-table-column label="价格">
          <template slot-scope="scope">
            <el-input v-model="bidderPriceMap.get(bidder.id).price" @blur="checkPrice(bidderPriceMap.get(bidder.id))" />
          </template>
        </el-table-column>
        <el-table-column label="分数">
          <template slot-scope="scope">
            {{ bidderScoreMap.get(bidder.id) }}
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="操作" width="80">
        <template slot-scope="scope">
          <el-button size="mini" @click="confirmPrice(scope.row.id)">确认</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { getById, setPkgPrices } from '@/api/pkg'
export default {
  filters: {
    priceStandardTypeFilter(type) {
      const typeMap = {
        1: '平均价法',
        2: '最低价法'
      }
      return typeMap[type]
    }
  },
  data() {
    return {
      pkgId: undefined,
      pkg: {},
      bidderPriceMap: {},
      bidderScoreMap: {}
    }
  },
  created() {
    this.pkgId = this.$route.params.id
    this.fetchData()
  },
  methods: {
    fetchData() {
      getById(this.pkgId).then((resp) => {
        this.pkg = resp.data
        this.bidderPriceMap = new Map()
        this.bidderScoreMap = new Map()
        for (var price of this.pkg.bidPrices) {
          this.bidderPriceMap.set(price.bidderId, price)
        }
        for (var score of this.pkg.priceItem.scores) {
          this.bidderScoreMap.set(score.bidderId, score.score)
        }
      })
    },
    checkPrice(price) {
      if (price.price == null || isNaN(price.price)) {
        this.$message('仅接受数字输入！')
        price.price = null
      }
    },
    confirmPrice(pkgId) {
      for (var price of this.bidderPriceMap.values()) {
        if (price.price == null || isNaN(price.price) || price.price === '') {
          this.$message({
            message: '该包还有投标价未输入！',
            type: 'warning'
          })
          return
        }
      }
      setPkgPrices(pkgId, {
        prices: Array.from(this.bidderPriceMap.values())
      }).then((resp) => {
        this.fetchData()
        this.$message({
          message: '价格和价格分数保存成功',
          type: 'success'
        })
      })
    }
  }
}
</script>
