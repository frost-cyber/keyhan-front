<template>
  <vs-card>
    <vs-table ref="table" pagination :data="articles">
      <template slot="thead">
        <vs-th>عکس</vs-th>
        <vs-th>عنوان</vs-th>
        <vs-th>وضعیت</vs-th>
        <vs-th>تاریخ</vs-th>
        <vs-th>تنظیمات</vs-th>
      </template>
      <template slot-scope="{data}">
        <tbody>
        <vs-tr :data="tr" :key="index" v-for="(tr, index) in data">
          <vs-td >
            <img v-if="image" :src="tr.file || require('@/assets/images/portrait/small/avatar-s-20.jpg')" style="width: 20%">
          </vs-td>
          <vs-td>
            <p class="">{{ tr.title }}</p>
          </vs-td>
          <vs-td>{{tr.status}}</vs-td>
          <vs-td>
            <p class="">{{ tr.publish_at }}</p>
          </vs-td>
          <vs-td class="whitespace-no-wrap">
            <NuxtLink :to="{name:'admin-article-blogs-id' , params:{id:tr.id}}">
              <feather-icon icon="EditIcon" svgClasses="w-5 h-5 hover:text-primary stroke-current"/>
            </NuxtLink>
            <feather-icon icon="TrashIcon" svgClasses="w-5 h-5 hover:text-danger stroke-current" class="ml-2" @click.stop="deleteArticle(tr)"/>
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
      articles() {
        return this.$store.getters['article/getArticles']
      }
    },
    data(){
      return{
        image:true,
        file:''
      }
    },
    methods: {
      deleteArticle(article) {
        this.$store.dispatch('article/deleteArticle', article).then((res) =>{
          if (res.status === 200){
            this.$store.commit('article/DELETE_ARTICLE', article)
            this.$vs.notify({
              title: "با موفقیت حذف شد.",
              time: 2000,
              color: "success",
              position: "bottom-center",
              icon: 'check_box',
            })
          }
        }).catch((err) =>{
          this.$vs.notify({
            title: "حذف ناموفق!",
            text: "خطایی رخ داده است.",
            time: 2000,
            color: "danger",
            position: "bottom-center",
            icon: 'check_box',
          })
        })
      }
    },
    mounted() {
      this.$store.dispatch('article/getArticle')
    }
  }
</script>

<style scoped>

</style>
