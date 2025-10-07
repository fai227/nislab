import { createClient } from '~/plugins/contentful.js'
const client = createClient()

export const state = () => ({
  posts: [],
  publications: [],
  years: ['全て'],
  categories: ['全て'],
  filterQuery: {},
  isOpen: false,
})

export const mutations = {
  setPosts(state, res) {
    state.posts = res
  },
  setYears(state, res) {
    res.forEach((index) => state.years.push(index.fields.year))
  },
  setCategories(state, res) {
    res.forEach((index) => state.categories.push(index.fields.name))
  },
  setPublications(state, res) {
    state.publications = res
  },
  setFilterQuery(state, filterQuery) {
    state.filterQuery = { ...filterQuery }
  },
  toggle(state) {
    state.isOpen = !state.isOpen
  },
  close(state) {
    state.isOpen = false
  },
}

export const getters = {
  indexPosts: (state) => (index) => {
    return state.posts.slice(0, index)
  },
  filteredPosts(state) {
    let data = state.posts

    if (state.filterQuery.title !== '') {
      data = data.filter(function (row) {
        return row.fields.title.includes(state.filterQuery.title)
      })
    }

    if (
      state.filterQuery.categories !== '' &&
      state.filterQuery.categories !== '全て'
    ) {
      data = data.filter(function (row) {
        return row.fields.category.fields.name === state.filterQuery.categories
      })
    }

    if (state.filterQuery.years !== '' && state.filterQuery.years !== '全て') {
      data = data.filter(function (row) {
        return row.fields.year.fields.year === state.filterQuery.years
      })
    }

    return data
  },
  isOpen: (state) => state.isOpen,
}

export const actions = {
  async nuxtServerInit({ commit }) {
    const posts = await client.getEntries({
      content_type: 'posts',
      order: '-fields.date',
      limit: 1000,
    })
    const years = await client.getEntries({
      content_type: 'year',
      order: '-fields.year',
    })
    const categories = await client.getEntries({
      content_type: 'category',
      order: 'fields.order',
    })
    const publications = await client.getEntries({
      content_type: 'publications',
      order: '-fields.date',
    })

    commit('setPosts', posts.items)
    commit('setYears', years.items)
    commit('setCategories', categories.items)
    commit('setPublications', publications.items)
  },
}
