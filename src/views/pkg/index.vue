<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.name" placeholder="包名" style="width: 200px;" class="filter-item" />
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        查询
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="go2Create">
        新增分包
      </el-button>
    </div>
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
      <el-table-column label="包名称">
        <template slot-scope="scope">
          <el-link type="primary" @click="go2Detail(scope.row.id)">{{ scope.row.name }}</el-link>
        </template>
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

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="fetchData" />
  </div>
</template>

<script>
import { getList } from '@/api/pkg'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  components: { Pagination },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        name: undefined
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList(this.listQuery).then(response => {
        this.list = response.data.data
        this.total = response.data.total
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.fetchData()
    },
    go2Create() {
      this.$router.push('/pkg/edit')
    },
    go2Detail(pkgId) {
      this.$router.push('/pkg/detail/' + pkgId)
    }
  }
}
</script>
