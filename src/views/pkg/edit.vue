<template>
  <div class="app-container">
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
      <el-form-item>
        <el-button type="primary" @click="createPkg">立即创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getById } from '@/api/pkg'

export default {

  data() {
    return {
      temp: {
        name: '',
        indexNumber: undefined,
        bidUpperLimit: undefined,
        projectId: undefined,
        expertIds: [],
        bidderIds: [],
        gradeTable: undefined
      },
      unstartedProjects: [],
      experts: [],
      bidders: [],
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
      console.log(this.$route.params.id)
      getById(1).then(response => {
        this.pkg = response.data
        console.log(this.pkg)
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
