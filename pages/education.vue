<template>
  <Section>
    <Title :title="`Education`" :sub-title="`NISLABについて`" />
    <!-- eslint-disable vue/no-v-html -->
    <article class="contact__content content">
      <div v-html="$md.render(body)" />
    </article>
    <ReturnPage />
  </Section>
</template>

<script>
import { Section, Title, ReturnPage } from '~/components/utility/index'
import { loadAllPages } from '~/plugins/content_loader'

export default {
  components: {
    Section,
    Title,
    ReturnPage,
  },
  async asyncData({ $content })  {
    const allPages = await loadAllPages({ $content })
    const education = allPages.find(post => post.fields.slug["en-US"] === 'education')
    return { body: education.fields.body["en-US"] }
  },
  head() {
    return {
      title: 'NISLABについて | NISLAB',
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'NISLABについて | NISLAB',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.contact {
  &__content {
    width: $content-width;
    max-width: 90%;
    margin: 4rem auto 8rem;
  }
}
</style>
