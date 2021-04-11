<template>
  <div>
    <h3 class="font-bold text-cool-700 text-lg">جهت ورود یا ثبت نام کلیک کنید</h3>
    <nuxt-link :to="{name:'Auth-checkUsername'}">
      <vs-button class="mt-5 mx-auto block" color="#F97316" type="filled">کلیلک کنید</vs-button>
    </nuxt-link>
  </div>
</template>

<script>
export default {
name: "index"
}
</script>

<style scoped>

</style>
