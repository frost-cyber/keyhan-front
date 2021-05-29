<template>
  <SavePage :page="page" @save-page="savePage"/>
</template>

<script>
import SavePage from '@/components/admin/SavePage'

export default {
  name: "update",
  components: {
    SavePage
  },
  async asyncData({store,route}) {
    let page =null
    await store.dispatch('page/getPage', route.params.id).then(res => {
     page = res.data
    })
    return {
      page
    }
  },
  methods: {
    savePage() {
      this.$store.dispatch('page/updatePage', this.page).then(res => {
        this.$vs.notify({
          title: 'با موفقیت ویرایش شد',
          color: 'success',
          position: 'bottom-right'
        })
        setTimeout(()=>{
          this.$router.push('.')
        },2100)
      })
    }
  }
}
</script>

<style scoped>

</style>
