<template>
  <section class="comment-row">
    <div class="container mx-auto">
      <div class="grid grid-cols-12 gap-30 p-4 rounded-lg rounded-r-none border border-cool-100 text-cool-600" :data="comments">
        <div v-if="article.comments.length >=1" class="col-span-12 md:col-span-6">
          <comments-view :components-data="article.comments" :repliedComment="comment.parent_id" @comment_reply="commentReply" color="#EF4444"/>
        </div>
        <div class="col-span-12 md:col-span-6">
          <div class="form-contact">
            <form data-vv-scope="comment" class="form-contact">
              <template>
                <vs-input class="contactform" placeholder="نام و نام خانوادگی" v-model="comment.name" size="small" v-validate="'required'" name="name" data-vv-as="نام"/>
                <span class="text-danger text-sm" v-show="errors.has('comment.name')">{{ errors.first('comment.name') }}</span>
                <vs-input class="contactform mt-3" placeholder="پست الکترونیک شما" v-model="comment.email" size="small" v-validate="'required'" name="email" data-vv-as="ایمیل"/>
                <span class="text-danger text-sm" v-show="errors.has('comment.email')">{{ errors.first('comment.email') }}</span>
              </template>
              <vs-textarea class="contactform mt-3" label="دیدگـــاه شما" height="200px" v-model="comment.body" v-validate="'required'" name="body" data-vv-as="نظر"/>
              <span class="text-danger text-sm" v-show="errors.has('comment.body')">{{ errors.first('comment.body') }}</span>
              <div class="mt-3 text-sm">
                <vs-button color="#F97316" type="filled" @click.native="saveComment">ثبت نظـــر شما</vs-button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import comments from '@/components/front/comments'

export default {
  name: "comments",
  components: {
    commentsView: comments,
  },
  props: {
    comment: {
      required: true,
    },
    article: {
      required: true,
    },
  },
  data() {
    return {
      colorx: '#F97316',
      currentx: 5,
      comments: []
    }
  },
  computed: {
    comments() {
      return this.$store.getters['articleComment/getComments']
    }
  },

  methods: {
    saveComment() {
      this.$validator.validateAll('comment').then(res => {
        if (!res) return 0;
        this.$store.commit('articleComment/SET_COMMENT', this.comment)
        this.$emit('comments')
      }).then(res => {
        if (res.status === 200) {
          this.$vs.notify({
            title: 'نظر شما با موفقیت ثبت گردید',
            time: 2000,
            color: "success",
            position: "bottom-right",
            icon: 'check_box',
          })
        }
      }).catch(error => {
        if (error.response.status === 422) {
          this.$vs.notify({
            title: 'نظر شما با خطا گردید',
            text: 'خطا های زیر را رفع کنید.',
            time: 3000,
            color: "danger",
            position: "bottom-right",
            icon: 'check_box',
          })
          Object.entries(error.response.data.errors).forEach((error, i) => {
            setTimeout(() => {
              this.$vs.notify({
                title: 'خطا!!!',
                text: error[1][0],
                time: 3500,
                color: "danger",
                position: "bottom-center",
                icon: 'check_box',
              })
            }, 500 * (i + 1))
          })
        }
      })
    },


    commentReply(id) {
      if (this.comment.parent_id != id) {
        this.$set(this.comment, 'parent_id', id)
      } else {
        this.comment.parent_id = ''
      }
    }
  }
}
</script>
