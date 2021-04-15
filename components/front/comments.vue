<template>
  <div>
    <div class="comment-item relative grid md:grid-cols-5 gap-4 rounded-lg bg-cool-100 p-4"
         v-for="comment in comments" :class="[`level-${comment.level}` , ...(comment.level>1 ?['mr-10' , 'mt-3']:[])]">
      <template v-if="comment.level<3">
        <div class="img-comment md:col-span-1">
          <img class="inline-block rounded-lg" src="@/assets/img/product/avatar.jpg" alt="">
        </div>
        <div class="info-comment md:col-span-4">
          <h5 class="inline-block text-base font-bold">{{comment.name || comment.user.name}}</h5>
          <p class="commment-text text-sm font-thin mt-3">{{comment.body}}</p>
          <a class="reply absolute top-3 left-3 text-cool-500 hover:text-orange-500" href=""><i class="fal fa-reply"></i></a>
        </div>
      </template>
      <template v-else>
        <div class="opacity-comment opacity-50 border-cool-400 border-b pb-4 border-dashed col-span-5 grid grid-cols-5 gap-15">
          <div class="img-comment col-span-1">
            <img class="inline-block rounded-lg image-comment" src="@/assets/img/product/avatar.jpg" alt="">
          </div>
          <div class="info-comment col-span-4">
            <h5 class="inline-block text-base font-bold">{{ comment.parent.name || comment.parent.user.name}}</h5>
            <p class="commment-text text-sm font-thin mt-3">{{ comment.parent.body.slice(0,20)+ (comment.parent.body.slice(0,20).length < comment.parent.body.length?'...':'')  }}</p>
          </div>
        </div>
        <div class="comment-item relative col-span-5 grid md:grid-cols-5 gap-4 rounded-lg bg-cool-100">
          <div class="img-comment md:col-span-1">
            <img class="inline-block rounded-lg" src="@/assets/img/product/avatar.jpg" alt="">
          </div>
          <div class="info-comment md:col-span-4">
            <h5 class="inline-block text-base font-bold">{{comment.name || comment.user.name}}</h5>
            <p class="commment-text text-sm font-thin mt-3">{{comment.body}}</p>
            <a class="reply absolute top-3 left-3 text-cool-500 hover:text-orange-500" href=""><i class="fal fa-reply"></i></a>
          </div>
        </div>
      </template>
    </div>
    <div class="paganition mt-5 mx-auto">
      <vs-pagination :total="12" icon-pack="fal" prev-icon="fa-arrow-right" next-icon="fa-arrow-left" :color="colorx" v-model="currentx"></vs-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "comments",
  props: {
    componentsData: {
      require: true
    }
  },
  computed: {
    comments() {
      let commentsTemp = []
      let comments = []
      this.componentsData.forEach(comment => {
        if (comment.parent_id) return;
        comment = this.$cloneObject(comment)
        comment.level = 1
        comment.children = []
        commentsTemp.push(comment)
      })
      this.componentsData.forEach(comment =>{
        commentsTemp.forEach(c => {
          if (!comment.parent_id) return;
          if (comment.parent_id === c.id){
            comment = this.$cloneObject(comment)
            comment.level = 2
            c.children.push(comment)
            return
          }
          let parent = c.children.find(ca => ca.id === comment.parent_id)
          if (parent){
            comment = this.$cloneObject(comment)
            comment.level = 3
            comment.parent = this.$cloneObject(parent)
            c.children.push(comment)
          }
        })
      })
      commentsTemp.forEach(comment => {
        comments.push(comment)
        comment.children.forEach(c => {
          comments.push(c)
        })
      })
      return comments
    }
  }

}
</script>

<style scoped>

</style>
