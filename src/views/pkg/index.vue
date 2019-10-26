<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.name" placeholder="Title" style="width: 200px;" class="filter-item" />
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        查询
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
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
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="包名称">
        <template slot-scope="scope">
          {{ scope.row.name }}
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

    <el-dialog title="新增分包" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="包名称" prop="name">
          <el-input v-model="temp.name" />
        </el-form-item>
        <el-form-item label="包序号" prop="indexNumber">
          <el-input v-model="temp.indexNumber" />
        </el-form-item>
        <el-form-item label="限价(万元)" prop="bidUpperLimit">
          <el-input v-model="temp.bidUpperLimit" />
        </el-form-item>
        <el-form-item label="所属项目" prop="projectId">
          <el-select v-model="temp.projectId" class="filter-item" placeholder="Please select">
            <el-option v-for="item in unstartedProjects" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="与会专家" prop="expertIds">
          <el-select v-model="temp.expertIds" multiple class="filter-item" placeholder="Please select">
            <el-option v-for="item in experts" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="应标单位" prop="bidderIds">
          <el-select v-model="temp.bidderIds" multiple class="filter-item" placeholder="Please select">
            <el-option v-for="item in bidders" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="评分表" prop="gradeTable">
          <el-input v-model="temp.gradeTable" type="file" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="createPkg()">
          确认
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getList, addPkg } from '@/api/pkg'
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
      },
      unstartedProjects: [],
      experts: [],
      bidders: [],
      temp: {
        name: '',
        indexNumber: undefined,
        bidUpperLimit: undefined,
        projectId: undefined,
        expertIds: [],
        bidderIds: [],
        gradeTable: undefined
      },
      dialogFormVisible: false,
      rules: {
        name: [{ required: true, message: 'name is required', trigger: 'change' }],
        indexNumber: [{ required: true, message: 'indexNumber is required', trigger: 'change' }],
        bidUpperLimit: [{ required: true, message: 'name is required', trigger: 'change' }],
        projectId: [{ required: true, message: 'project is required', trigger: 'change' }],
        expertIds: [{ required: true, message: 'expert is required', trigger: 'change' }],
        bidderIds: [{ required: true, message: 'bidder is required', trigger: 'change' }],
        gradeTable: [{ required: true, message: 'name is required', trigger: 'change' }]
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
    handleCreate() {
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createPkg() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          addPkg(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
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
