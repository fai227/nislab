async function loadAllContent({ $content }) {
    const allContent = await $content('content').fetch()
    return allContent
}

async function loadAllAssets({ $content }) {
    const allAssets = await $content('asset').fetch()
    return allAssets
}

async function loadAllCategory({ $content }) {
    const allCategory = (await loadAllContent({ $content })).filter(e => e.sys.contentType.sys.id === 'category')
    allCategory.sort((a, b) => a.fields.order['en-US'] - b.fields.order['en-US'])
    return allCategory
}

async function loadAllYear({ $content }) {
    const allYear = (await loadAllContent({ $content })).filter(e => e.sys.contentType.sys.id === 'year')
    allYear.sort((a, b) => parseInt(b.fields.year['en-US']) - parseInt(a.fields.year['en-US']))
    return allYear
}

async function loadAllMembers({ $content }) {
    const allMembers = (await loadAllContent({ $content })).filter(e => e.sys.contentType.sys.id === 'members')

    for(const member of allMembers) {
        const allYear = await loadAllYear({ $content })
        const year = allYear.find(y => y.sys.id === member.fields.year['en-US'].sys.id)
        member.fields.year['en-US'] = year
    }

    return allMembers
}

async function loadAllPages({ $content }) {
    const allPages = (await loadAllContent({ $content })).filter(e => e.sys.contentType.sys.id === 'pages')
    return allPages
}

async function loadAllPosts({ $content }) {
    const allPosts = (await loadAllContent({ $content })).filter(e => e.sys.contentType.sys.id === 'posts')

    const allAssets = await loadAllAssets({ $content })
    for (const post of allPosts) {
        const asset = allAssets.find(a => a.sys.id === post.fields.headerImage['en-US'].sys.id)
        post.fields.headerImage['en-US'] = asset
    }

    const allCategory = await loadAllCategory({ $content })
    for (const post of allPosts) {
        const category = allCategory.find(c => c.sys.id === post.fields.category['en-US'].sys.id)
        post.fields.category['en-US'] = category
    }

    const allYear = await loadAllYear({ $content })
    for (const post of allPosts) {
        const year = allYear.find(y => y.sys.id === post.fields.year['en-US'].sys.id)
        post.fields.year['en-US'] = year
    }

    return allPosts
}

async function loadAllPublications({ $content }) {
    const allPublications = (await loadAllContent({ $content })).filter(e => e.sys.contentType.sys.id === 'publications')
    allPublications.sort((a, b) => new Date(b.fields.date['en-US']) - new Date(a.fields.date['en-US']))
    return allPublications
}

module.exports = {
    loadAllCategory,
    loadAllMembers,
    loadAllPages,
    loadAllPosts,
    loadAllPublications,
    loadAllYear,
}