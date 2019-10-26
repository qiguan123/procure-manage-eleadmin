<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.name" placeholder="会议名称" style="width: 200px;" class="filter-item" />
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        查询
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        新增会议
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
      <el-table-column label="会议名称">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="开始时间" align="center">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.startTime | parseTime }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="状态" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.state | statusFilter">{{ scope.row.state | statusNameFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="230">
        <template slot-scope="{row}">
          <el-button v-if="row.state!=2" type="primary" size="mini" @click="startCfrs(row)">
            开启会议
          </el-button>
          <el-button v-if="row.state==2" type="success" size="mini" @click="closeCfrs(row)">
            结束会议
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="fetchData" />

    <el-dialog title="新增会议" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="会议名称" prop="name">
          <el-input v-model="temp.name" />
        </el-form-item>
        <el-form-item label="开始时间" prop="startTime">
          <el-date-picker v-model="temp.startTime" type="datetime" value-format="timestamp" placeholder="Please pick a date" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="createCfrs()">
          确认
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getList as getListApi, addCfrs as addCfrsApi, startCfrs as startCfrsApi, closeCfrs as closeCfrsApi } from '@/api/conference'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { parseTime } from '@/utils'

export default {
  components: { Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        0: 'success',
        1: 'gray',
        2: 'danger'
      }
      return statusMap[status]
    },
    statusNameFilter(state) {
      const statusNameMap = {
        0: '新建会议',
        1: '会议完成',
        2: '会议启动'
      }
      return statusNameMap[state]
    },
    parseTime
  },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        name: undefined
      },
      temp: {
        name: '',
        startTime: undefined
      },
      dialogFormVisible: false,
      rules: {
        name: [{ required: true, message: 'name is required', trigger: 'change' }],
        startTime: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getListApi(this.listQuery).then(response => {
        this.list = response.data.data
        this.total = response.data.total
        this.listLoading = false
      })
    },
    startCfrs(cfrs) {
      startCfrsApi(cfrs.id)
      this.fetchData()
    },
    closeCfrs(cfrs) {
      closeCfrsApi(cfrs.id)
      this.fetchData()
    },
    handleFilter() {
      this.listQuery.page = 1
      this.fetchData()
    },
    handleCreate() {
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createCfrs() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          console.log(this.temp)
          addCfrsApi(this.temp).then(() => {
            this.dialogFormVisible = false
            this.fetchData()
            this.$notify({
              title: 'Success',
              message: 'Created Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    }
  }
}
</script>
