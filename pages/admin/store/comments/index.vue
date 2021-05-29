<template>
  <vs-card>
    <vs-table ref="table" pagination :data="comments">
      <template slot="thead">
        <vs-th>نظرات</vs-th>
        <vs-th>محصول مرتبط</vs-th>
        <vs-th>وضعیت</vs-th>
        <vs-th>تاریخ</vs-th>
        <vs-th>تنظیمات</vs-th>
      </template>
      <template slot-scope="{data}">
        <tbody>
        <vs-tr :data="tr" :key="index" v-for="(tr, index) in data">
          <vs-td>{{tr.body.substr(0,20) + (tr.body.substr(0,20).length < tr.body.length ? '...':'')}}</vs-td>
          <vs-td>
            {{tr.commentable.name}}
          </vs-td>
          <vs-switch @input="changeConfirmed(tr.id)" color="success" v-model="tr.confirmed">
            <span slot="on">تایید شده</span>
            <span slot="off">تایید نشده</span>
          </vs-switch>
          <vs-td>
            <p class="">{{ $jalaali(tr.created_at).format('jYYYY/jMM/jDD') }}</p>
          </vs-td>
          <vs-td class="whitespace-no-wrap">
            <NuxtLink :to="{name:'admin-store-comments-id' , params:{id:tr.id}}" >
              <feather-icon icon="EditIcon" svgClasses="w-5 h-5 hover:text-primary stroke-current"/>
            </NuxtLink>
            <feather-icon icon="TrashIcon" svgClasses="w-5 h-5 hover:text-danger stroke-current" class="ml-2" @click.stop="deleteComment(tr)"/>
          </vs-td>
        </vs-tr>
        </tbody>
      </template>
    </vs-table>
  </vs-card>
</template>

<script>
  export default {
    name: "index",
    computed: {
      comments() {
        return this.$store.getters['productComment/getComments']
      }
    },
    async fetch() {
      await this.$store.dispatch('productComment/getComments')
    },
    methods: {
      changeConfirmed(id){
        this.$store.dispatch('productComment/toggleConfirm',id)
      },
      deleteComment(comment) {
        this.$store.dispatch('productComment/deleteComment', comment).then((res) =>{
          if (res.status === 200){
            this.$store.commit('productComment/DELETE_COMMENT', comment)
            this.$vs.notify({
              title: "با موفقیت حذف شد.",
              time: 2000,
              color: "success",
              position: "bottom-right",
              icon: 'check_box',
            })
          }
        }).catch((err) =>{
          this.$vs.notify({
            title: "حذف ناموفق!",
            text: "خطایی رخ داده است.",
            time: 2000,
            color: "danger",
            position: "bottom-right",
            icon: 'check_box',
          })
        })
      }
    }
  }
</script>

<style scoped>

</style>
