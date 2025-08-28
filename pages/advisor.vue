<template>
  <Section class="advisor">
    <Title :title="`Advisor`" :sub-title="`教員`" />
    <!-- eslint-disable vue/no-v-html -->
    <article class="advisor__content content">
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
  async asyncData({ $content }) {
    const allPages = await loadAllPages({ $content })
    const advisor = allPages.find(post => post.fields.slug["en-US"] === 'advisor')
    return { body: advisor.fields.body["en-US"] }
  },
  head() {
    return {
      title: '教員 | NISLAB',
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: '教員 | NISLAB',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.advisor {
  &__content {
    width: $content-width;
    max-width: 90%;
    margin: 4rem auto 8rem;
  }
}
</style>
