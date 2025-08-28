import { loadAllPosts, loadAllYear, loadAllCategory, loadAllPublications } from '~/plugins/content_loader'
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
    res.forEach((index) => state.years.push(index.fields.year['en-US']))
  },
  setCategories(state, res) {
    res.forEach((index) => state.categories.push(index.fields.name['en-US']))
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
        return row.fields.title['en-US'].includes(state.filterQuery.title)
      })
    }

    if (state.filterQuery.categories !== '') {
      return state.filterQuery.categories === '全て'
        ? data
        : (data = data.filter(function (row) {
            return (
              row.fields.category['en-US'].fields.name['en-US'] === state.filterQuery.categories
            )
          }))
    }

    if (state.filterQuery.years !== '') {
      for(const post of data) console.log(post.fields)
      return state.filterQuery.years === '全て'
        ? data
        : (data = data.filter(function (row) {
            return row.fields.year['en-US'].fields.year['en-US'] === state.filterQuery.years
          }))
    }

    return data
  },
  isOpen: (state) => state.isOpen,
}

export const actions = {
  async getPosts({ commit }) {
    const allPosts = await loadAllPosts({ $content: this.$content })
    commit('setPosts', allPosts)
  },
  async getYears({ commit }) {
    const allYears = await loadAllYear({ $content: this.$content })
    commit('setYears', allYears)
  },
  async getCategories({ commit }) {
    const allCategories = await loadAllCategory({ $content: this.$content })
    commit('setCategories', allCategories)
  },
  async getPublications({ commit }) {
    const allPublications = await loadAllPublications({ $content: this.$content })
    commit('setPublications', allPublications)
  },
}
