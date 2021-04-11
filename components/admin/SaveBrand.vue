<template>
  <vs-card>
    <div class="grid grid-cols"></div>
  </vs-card>
</template>

<script>
export default {
  name: "SaveBrand",
  props: {
    brand: {
      required: true,
    },
    disabled:{
     required: true,
    }
  },

}
</script>

<style scoped>

</style>
