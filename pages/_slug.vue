<template>
  <div v-html="page.body">

  </div>
</template>

<script>
export default {
  name: "page",
  layout: 'Main',
  async asyncData({params, store}) {
    return {
      page: await store.dispatch('page/getPage', params.slug).then(res => res.data),
    }
  }
}

</script>

<style scoped>

</style>
