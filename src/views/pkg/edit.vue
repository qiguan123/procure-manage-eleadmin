<template>
  <div class="app-container">
    <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px" style="width: 500px; margin-left:50px;">
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
        <el-select v-model="temp.projectId" placeholder="Please select" style="width: 400px;">
          <el-option v-for="item in unstartedProjects" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="与会专家" prop="expertIds">
        <el-select v-model="temp.expertIds" multiple filterable clearable :filter-method="expertSelectFilter" placeholder="Please select" style="width: 400px;">
          <el-option v-for="item in experts" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="应标单位" prop="bidderIds">
        <el-select v-model="temp.bidderIds" multiple filterable clearable :filter-method="bidderSelectFilter" placeholder="Please select" style="width: 400px;">
          <el-option v-for="item in bidders" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="评分表" prop="gradeTable">
        <input ref="gradeTableFile" type="file">
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="createPkg">立即创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addPkg } from '@/api/pkg'
import { getUnstartedProjects } from '@/api/project'
import { getAllExperts } from '@/api/expert'
import { getAllBidders } from '@/api/bidder'
import axios from 'axios'
export default {

  data() {
    var gradeTableFileCheck = (rule, value, callback) => {
      if (this.$refs['gradeTableFile'].files.length === 0) {
        callback(new Error('请选择评分表'))
      } else {
        callback()
      }
    }
    var bidUpperLimitCheck = (rule, value, callback) => {
      const n = Number(value)
      if (n instanceof Number && n >= 0) {
        callback()
      } else {
        callback(new Error('请输入不小于0的数值'))
      }
    }
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
      allExperts: [],
      allBidders: [],
      rules: {
        name: [{ required: true, message: 'name is required', trigger: 'blur' }],
        indexNumber: [{ required: true, message: 'indexNumber is required', trigger: 'blur' }],
        bidUpperLimit: [{ validator: bidUpperLimitCheck, required: true, trigger: 'blur' }],
        projectId: [{ required: true, message: 'project is required', trigger: 'blur' }],
        expertIds: [{ required: true, message: 'expert is required', trigger: 'blur' }],
        bidderIds: [{ required: true, message: 'bidder is required', trigger: 'blur' }],
        gradeTable: [{ validator: gradeTableFileCheck, required: true, trigger: 'blur' }]
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      axios.all([getUnstartedProjects(), getAllExperts(), getAllBidders()]).then(
        axios.spread((projectsResp, expertsResp, biddersResp) => {
          this.unstartedProjects = projectsResp.data
          this.allExperts = expertsResp.data
          this.allBidders = biddersResp.data
          this.experts = this.expertSelectFilter()
        })
      )
    },
    createPkg() {
      var formData = new FormData()
      var pString = JSON.stringify(this.temp)
      formData.append('package', pString)
      formData.append('table', this.$refs['gradeTableFile'].files[0])
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          addPkg(formData).then(() => {
            this.$router.push('/pkg/list')
            this.$notify({
              title: 'Success',
              message: 'Created Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    expertSelectFilter(query = '') {
      let arr = this.allExperts.filter((item) => {
        return item.name.includes(query)
      })
      if (arr.length > 10) {
        this.experts = arr.slice(0, 10)
      } else {
        this.experts = arr
      }
    },
    bidderSelectFilter(query = '') {
      let arr = this.allBidders.filter((item) => {
        return item.name.includes(query)
      })
      if (arr.length > 10) {
        this.bidders = arr.slice(0, 10)
      } else {
        this.bidders = arr
      }
    },
  }
}
</script>
