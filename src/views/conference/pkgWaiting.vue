<template>
  <div class="app-container">
    <h4>{{ pkg.name }}</h4>
    <h4>已提交评分专家：
      <span v-for="e in submitedExperts" :key="e">{{ e }} &nbsp;&nbsp;</span>
    </h4>
    <h4>未提交评分专家：
      <span v-for="ee in unSubmitedExperts" :key="ee">{{ ee }} &nbsp;&nbsp;</span>
    </h4>
  </div>
</template>

<script>
import { getById } from '@/api/pkg'
export default {
  data() {
    return {
      pkgId: undefined,
      pkg: [],
      timer: '',
      submitedExperts: [],
      unSubmitedExperts: []
    }
  },
  created() {
    this.pkgId = this.$route.params.id
    getById(this.pkgId).then((resp) => {
      this.pkg = resp.data
      var allExpertSubmit = true
      var idWithExpertNameMap = new Map()
      for (var e of this.pkg.experts) {
        idWithExpertNameMap.set(e.id, e.name)
      }
      for (var rel of this.pkg.expertRels) {
        if (rel.modifiable === 1) {
          allExpertSubmit = false
          this.unSubmitedExperts.unshift(idWithExpertNameMap.get(rel.expertId))
        } else {
          this.submitedExperts.unshift(idWithExpertNameMap.get(rel.expertId))
        }
      }
      if (!allExpertSubmit) {
        this.timer = setInterval(this.fetchData, 3000)
      }
    })
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  methods: {
    fetchData: function() {
      getById(this.pkgId).then((resp) => {
        this.pkg = resp.data
      })
    }
  }
}
</script>
