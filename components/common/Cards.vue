<template>
  <div>
    <article class="cards">
      <Card
        v-for="post in posts"
        :id="post.sys.id"
        :key="post.sys.id"
        :title="post.fields.title"
        :date="post.fields.date"
        :img="post.fields.headerImage"
      />
    </article>
  </div>
</template>

<script>
import { Card } from '~/components/common/index'

export default {
  components: {
    Card,
  },
  props: {
    number: {
      type: Number,
      required: false,
      default: 0,
    },
    filter: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    posts() {
      return this.filter
        ? this.$store.getters.indexPosts(this.number)
        : this.$store.state.posts
    },
  },
}
</script>

<style lang="scss" scoped>
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 64px 32px;
  justify-items: center;
  max-width: 1024px;
  margin: auto;
}
</style>
