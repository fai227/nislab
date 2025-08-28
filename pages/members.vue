<template>
  <Section class="members">
    <Title :title="`Members`" :sub-title="`研究室メンバー`" />
    <!-- eslint-disable vue/no-v-html -->
    <article class="members__content content" v-html="$md.render(body)" />
    <ReturnPage />
  </Section>
</template>

<script>
import { Section, Title, ReturnPage } from '~/components/utility/index'
import { createClient } from '~/plugins/contentful.js'
const client = createClient()

export default {
  components: {
    Section,
    Title,
    ReturnPage,
  },
  async asyncData() {
    return await client
      .getEntries({
        content_type: 'members',
        limit: 1,
      })
      .then((res) => {
        return {
          body: res.items[0].fields.body,
        }
      })
      .catch()
  },
  head() {
    return {
      title: '研究室メンバー | NISLAB',
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: '研究室メンバー | NISLAB',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.members {
  width: $content-width;

  &__content {
    margin-top: 4rem;

    @include mq(lap) {
      overflow-x: scroll;
    }
  }
}
</style>
