<template>
  <div class="vx-row" >
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
           {{comment.user.name || comment.name}}
          </div>
        </div>
        <div class="vx-row mb-6">
          <div class="vx-col sm:w-1/3 w-full">
            <span>ایمیل:</span>
          </div>
          <div class="vx-col sm:w-2/3 w-full">
            {{comment.user.email || comment.email}}
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
          </div>
        </div>
      </vs-card>
    </div>
  </div>

</template>

<script>
  export default {
    name: "_id",

    async asyncData({params , store}) {
      await store.dispatch('articleComment/getComment', params.id)
      let comment = store.getters["articleComment/getComment"]
      console.log(comment)

      return {
        comment: comment,

      }
    },
  }
</script>

<style scoped>

</style>
