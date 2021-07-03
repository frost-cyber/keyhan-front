<template>
  <vs-card>
    <vs-table ref="table" :data="posts">
      <template slot="thead">
        <vs-th>نام</vs-th>
        <vs-th>استان ها</vs-th>
        <vs-th>تنظیمات</vs-th>
      </template>
      <template slot-scope="{data}">
        <tbody>
        <vs-tr :data="tr" :key="index" v-for="(tr, index) in data">
          <vs-td>
            <p class="">{{ tr.name }}</p>
          </vs-td>
          <vs-td>
            <p>
              <strong  v-for="(s , i) in tr.states" :key="i">{{ ostans.find(o=>o.id == s).name  + (i != tr.states.length-1 ? " , " : "")  }}</strong>
              <strong v-if="!tr.states.length">----</strong>
            </p>
          </vs-td>
          <vs-td class="whitespace-no-wrap">
            <NuxtLink :to="{name:'admin-posts-id' , params:{id:tr.id}}">
              <feather-icon icon="EditIcon" svgClasses="w-5 h-5 hover:text-primary stroke-current"/>
            </NuxtLink>
            <feather-icon icon="TrashIcon" svgClasses="w-5 h-5 hover:text-danger stroke-current" class="ml-2" @click.stop="deletePost(tr)"/>
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
  data() {
    return {
      posts: [],
    }
  },
  computed: {
    ostans() {
      return this.$store.getters['address/getOstans']
    }
  },
  fetch() {
    this.getPosts()
  },
  methods: {
    getStatesName(ids) {
      let c=[];
      ids.forEach(s=>{
        c.push(this.ostans.find(p=>p.id ===s).name)
      })
      return c.join(',')
    },
    getPosts() {
      this.$store.dispatch('post/getPosts').then(res => {
        this.posts = res.data
      })
    },
    deletePost(post) {
      this.$store.dispatch('post/deletePost', post).then((res) => {
        if (res.status === 200) {
          this.$store.commit('post/DELETE_POST', post)
          this.$vs.notify({
            title: "با موفقیت حذف شد.",
            time: 2000,
            color: "success",
            position: "bottom-right",
            icon: 'check_box',
          })
        }
        this.getPosts()
      }).catch((err) => {
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
  },

}
</script>

<style scoped>

</style>
