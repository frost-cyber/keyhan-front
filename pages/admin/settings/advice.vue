<template>
  <vs-card>
    <vs-table ref="table" pagination>
      <template slot="thead">
        <vs-th>عنوان</vs-th>
        <vs-th>وضعیت</vs-th>
        <vs-th>تاریخ</vs-th>
        <vs-th>تنظیمات</vs-th>
      </template>
      <template>
        <tbody>
        <vs-tr>
          <vs-td >

          </vs-td>
          <vs-td>
          </vs-td>
          <vs-td></vs-td>
          <vs-td>
          </vs-td>
          <vs-td class="whitespace-no-wrap">
<!--            <NuxtLink :to="{name:'admin-article-blogs-id' , params:{id:tr.id}}" >-->
<!--              <feather-icon icon="EditIcon" svgClasses="w-5 h-5 hover:text-primary stroke-current"/>-->
<!--            </NuxtLink>-->
<!--            <feather-icon icon="TrashIcon" svgClasses="w-5 h-5 hover:text-danger stroke-current" class="ml-2" @click.stop="deleteArticle(tr)"/>-->
          </vs-td>
        </vs-tr>
        </tbody>
      </template>
    </vs-table>
  </vs-card>

</template>

<script>
export default {
name: "advice"
}
</script>

<style scoped>

</style>
