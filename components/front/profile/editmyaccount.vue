<template>

</template>

<script>
    export default {
        name: "editmyaccount",
      props:{
        users: {
          required: true,
        },
      },
      methods:{
        updateProfile() {
              this.$store.commit('profile/SET_USER', this.users)
            this.$emit('update-profile')


        },
      },
    }
</script>

<style scoped>

</style>
