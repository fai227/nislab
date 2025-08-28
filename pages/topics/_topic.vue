<template>
  <Section>
    <div class="topic">
      <div class="topic__header">
        <h2 class="topic__title">{{ post.fields.title['en-US'] }}</h2>
        <p class="topic__date">{{ post.fields.date['en-US'] }}</p>
      </div>
      <!-- eslint-disable vue/no-v-html -->
      <article
        class="topic__content content"
        v-html="$md.render(post.fields.body['en-US'])"
      />
      <article class="topic__around">
        <article v-if="nextPost" class="-left">
          <h3 class="topic__aroundTitle">← 次の記事</h3>
          <Card
            :id="nextPost.sys.id"
            :title="nextPost.fields.title['en-US']"
            :date="nextPost.fields.date['en-US']"
            :img="nextPost.fields.headerImage['en-US']"
          />
        </article>
        <article v-if="previousPost" class="-right">
          <h3 class="topic__aroundTitle -r">前の記事 →</h3>
          <Card
            :id="previousPost.sys.id"
            :title="previousPost.fields.title['en-US']"
            :date="previousPost.fields.date['en-US']"
            :img="previousPost.fields.headerImage['en-US']"
          />
        </article>
      </article>
      <ReturnPage text="記事一覧へ" slug="/topics" />
    </div>
  </Section>
</template>

<script>
import { Section, ReturnPage } from '~/components/utility/index'
import { Card } from '~/components/common/index'
import { loadAllPosts } from '~/plugins/content_loader'

export default {
  components: {
    Section,
    Card,
    ReturnPage,
  },
  async asyncData({ $content, params }) {
    const allPosts = await loadAllPosts({ $content })

    const index = allPosts.findIndex(post => post.sys.id === params.topic)
    const post = allPosts[index]
    const previousPost = allPosts[index - 1]
    const nextPost = allPosts[index + 1]

    return { post, previousPost, nextPost }
  },
  head({ $config }) {
    return {
      title: this.post.fields.title['en-US'] + ' | NISLAB',
      meta: [
        { hid: 'og:type', property: 'og:type', content: 'website' },
        {
          hid: 'og:url',
          property: 'og:url',
          content: $config.baseURL + this.post.sys.id,
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.post.fields.title['en-US'] + ' | NISLAB',
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: 'https:' + this.post.fields.headerImage['en-US'].fields.file['en-US'].url,
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.topic {
  width: $content-width;
  max-width: 90%;
  margin: 0 auto;

  &__header {
    display: grid;
    grid-template-columns: 10fr 1fr;
    align-items: center;

    @include mq(tab) {
      grid-template-columns: 1fr;
    }
  }

  &__title {
    font-size: 2rem;
    word-break: keep-all;
  }

  &__content {
    padding-bottom: 4rem;
    margin: 2rem 0 4rem 0;
    border-bottom: 1px solid #000;
  }

  &__around {
    position: relative;
    height: 300px;

    .-right {
      position: absolute;
      top: 0;
      right: 0;

      @include mq(tab) {
        position: relative;
        margin-top: 2rem;
      }
    }

    @include mq(tab) {
      display: flex;
      flex-direction: column;
      align-items: center;
      height: auto;
    }
  }

  &__aroundTitle {
    margin-bottom: 1rem;

    &.-r {
      text-align: right;
    }
  }
}
</style>
