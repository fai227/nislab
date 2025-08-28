<template>
  <ul class="publicationsList__links">
    <li v-for="(publication, index) in publications" :key="index">
      <nuxt-link
        :to="`/publications/${publication.fields.slug}`"
        class="publicationsList__link"
        >{{ publication.fields.title }}</nuxt-link
      >
    </li>
  </ul>
</template>

<script>
export default {
  computed: {
    publications() {
      return this.$store.state.publications
    },
  },
}
</script>

<style lang="scss" scoped>
.publicationsList {
  &__links {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-row-gap: 1.5rem;
    justify-items: center;
    width: $content-width;
    max-width: 90%;
    margin: 0 auto;

    @include mq(tab) {
      grid-template-columns: 1fr 1fr;
      font-size: 0.875rem;
    }
  }

  &__link {
    transition: 0.3s;
    &:hover {
      color: #666;
      transition: 0.3s;
    }
  }
}
</style>
