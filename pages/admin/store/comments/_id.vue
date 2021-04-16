<template>
  <div class="vx-row">
    <div class="vx-col sm:w-1/3">
      <vs-card hover="true">
        <div slot="header">
          <h3> نظر</h3>
        </div>
        <div class="vx-row mb-6">
          <div class="vx-col sm:w-1/3 w-full">
            <span>نام:</span>
          </div>
          <div class="vx-col sm:w-2/3 w-full">
            {{comment.name || comment.user.name}}
          </div>
        </div>
        <div class="vx-row mb-6">
          <div class="vx-col sm:w-1/3 w-full">
            <span>ایمیل:</span>
          </div>
          <div class="vx-col sm:w-2/3 w-full">
            {{comment.email || comment.user.email}}
          </div>
        </div>
        <div class="vx-row mb-6">
          <div class="vx-col sm:w-1/3 w-full">
            <span>تعیین وضعیت:</span>
          </div>
          <div class="vx-col sm:w-2/3 w-full">
            <span>{{comment.confirmed ? 'تایید شده':'تایید نشده'}}</span>
          </div>

        </div>

      </vs-card>
    </div>
    <div class="vx-col sm:w-2/3">
      <vs-card hover="true">
        <div class="vx-row mb-6">
          <div class="vx-col sm:w-2/3 w-full">
            <span>نظر</span>
          </div>
          <div class="vx-col sm:w-3/3 w-full">
            <vs-textarea v-model="comment.body"/>
            <vs-button @click.native="updateComment"  color="success">update</vs-button>
          </div>
        </div>
      </vs-card>
    </div>
  </div>

</template>

<script>
  export default {
    name: "update",

    async asyncData({params, store}) {
      await store.dispatch('productComment/getComment', params.id)
      return {
        comment: store.getters['productComment/getComment'],
      }
    },
    methods: {

      updateComment() {
        // this.disabled = true
        this.$store.dispatch('productComment/updateComment', this.comment).then((response) => {
          if (response.status === 200) {
            this.$vs.notify({
              title: "با موفقیت نظر آپدیت شد",
              text: "چند لحظه دیگر به صفحه نظرات  هدایت خواهید شد.",
              time: 2000,
              color: "success",
              position: "bottom-center",
              icon: 'check_box',
            })
            setTimeout(() => {
              this.$router.push('.')
            }, 2100)
          }
        }).catch(error => {
          // this.disabled = false
          if (error.response && error.response.status === 422) {
            this.$store.commit('productComment/SET_ERRORS', error.response.data.errors)
          }
        })
      },
      destroyed() {
        this.$store.commit('productComment/SET_ARTICLECOMMENT')
      }
    }
  }
</script>

<style scoped>

</style>
