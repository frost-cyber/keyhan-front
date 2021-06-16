<template>
  <div>
    <h3 class="font-bold text-cool-700 text-lg text-center">به وبسایت ما خوش آمدید</h3>
    <p class="text-sm text-cool-500 font-thin mt-3 text-center"> حساب کاربری شما در سایت ساخته شد ،از خرید از میان محصولات ما لذت ببرید</p>
    <nuxt-link :to="{name:'index'}">
      <vs-button class="mt-5 mx-auto block" color="#F97316" type="filled">ادامــــــــه</vs-button>
    </nuxt-link>
    <nuxt-link class="text-orange-400 text-center p-1 block mt-2" :to="{name:'profile-myAccount'}"> تکمیل حساب کاربری</nuxt-link>
  </div>
</template>

<script>
export default {
  name: "wellcome",
  middleware:'auth',
}
</script>

<style scoped>

</style>
