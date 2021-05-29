<template>
  <SavePage :page="page" @save-page="savePage"/>
</template>

<script>
import SavePage from '@/components/admin/SavePage'

export default {
  name: "create",
  components: {
    SavePage
  },
  data() {
    return {
      page: {},
    }
  },
  methods: {
    savePage() {
      this.$store.dispatch('page/savePage', this.page).then(res => {
        if (res.status == 200) {
          this.$vs.notify({
            title:'با موفقیت ذخیره شد',
            color:'success',
            position:'bottom-right'
          })
          setTimeout(()=>{
            this.$router.push('.')
          },2100)

        }
      })
    }
  }
}
</script>

<style scoped>

</style>
