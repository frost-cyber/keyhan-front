<template>
  <vs-card>
    <vs-table ref="table" :data="categories">
      <template slot="thead">
        <vs-th>نام</vs-th>
        <vs-th>نامک</vs-th>
        <vs-th>ویرایش</vs-th>
      </template>
      <template slot-scope="{data}">
        <tbody>
        <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
          <vs-td>
            <p :style="{'margin-right' : `${tr.level*20}px`}" @click="toggleChild(tr.id)">
              <feather-icon size="10" :icon="tr.countChildren? tr.showChild ? 'ChevronDownIcon' : 'ChevronLeftIcon' : 'MoreVerticalIcon'"/>
              {{ tr.name }}
            </p>
          </vs-td>
          <vs-td>
            <p class="">{{ tr.slug }}</p>
          </vs-td>
          <vs-td class="whitespace-no-wrap">
            <NuxtLink :to="{name:'admin-store-categories-id' , params:{id:tr.id}}">
              <feather-icon icon="EditIcon" svgClasses="w-5 h-5 hover:text-primary stroke-current"/>
            </NuxtLink>
            <feather-icon icon="TrashIcon" svgClasses="w-5 h-5 hover:text-danger stroke-current" class="ml-2" @click.stop="deleteCategory(tr)"/>
          </vs-td>
        </vs-tr>
        </tbody>
      </template>
    </vs-table>
  </vs-card>
</template>

<script>
function createTree(data, id = null, level = 0) {
  let filteredData = data.filter(v => v.parent_id === id)
  let sortedData = []
  filteredData.forEach((v, i) => {
    let children = createTree(data, v.id, level + 1)
    v.countChildren = children.length
    v.level = level
    sortedData.push(v)
    if (v.showChild) {
      sortedData.push(...children)
    }
  })
  return sortedData
}

export default {
  name: "index",
  async asyncData({store}) {
    let cats = []
    await store.dispatch('storeCategory/getCategories').then(res => cats = res.data)
    cats.forEach(category => category.showChild = false)

    return {
      cats: cats,
    }
  },
  computed: {
    categories() {
      return createTree(this.cats)
    }
  },
  methods: {
    toggleChild(id) {
      let cat = this.cats.find(item => item.id === id)
      cat.showChild = !cat.showChild
    },
    deleteCategory(category) {
      this.$store.dispatch('storeCategory/deleteCategory', category).then((res) => {
        if (res.status === 200) {
          this.$store.commit('storeCategory/DELETE_CATEGORY', category)
          this.$vs.notify({
            title: "با موفقیت حذف شد.",
            time: 2000,
            color: "success",
            position: "bottom-right",
            icon: 'check_box',
          })
        }
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
