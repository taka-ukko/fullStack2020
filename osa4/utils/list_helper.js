const dummy = () => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }
    return blogs.length === 0
        ? 0
        : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    const reducer = (prev, cur) => {
        return prev.likes > cur.likes
            ? prev
            : cur
    }
    if (blogs.length === 0) {
        return null
    }
    const favorite = blogs.reduce(reducer)

    delete favorite._id
    delete favorite.__v
    delete favorite.url

    return favorite
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return null
    }
    const sorted = blogs.sort((a, b) => (a.author > b.author) ? 1 : -1)
    // console.log(sorted)
    let maxN = ''
    let maxB = 0
    let curN = ''
    let curB
    let i
    for (i = 0; i < sorted.length; i++) {
        if (sorted[i].author === curN) {
            curB++
            if (curB > maxB) {
                maxB = curB
                maxN = curN
            }
        } else {
            curB = 1
            curN = sorted[i].author
            if (i === 0) {
                maxB = curB
                maxN = curN
            }
        }
    }
    // console.log(maxN, maxB)
    return {
        author: maxN,
        blogs: maxB
    }
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return null
    }
    const sorted = blogs.sort((a, b) => (a.author > b.author) ? 1 : -1)
    // console.log(sorted)
    let maxN = ''
    let maxL = 0
    let curN = ''
    let curL = 0
    let i
    for (i = 0; i < sorted.length; i++) {
        if (sorted[i].author === curN) {
            curL += sorted[i].likes
            if (curL > maxL) {
                maxL = curL
                maxN = curN
            }
        } else {
            curL = sorted[i].likes
            curN = sorted[i].author
            if (i === 0) {
                maxL = curL
                maxN = curN
            }
        }
    }
    // console.log(maxN, maxB)
    return {
        author: maxN,
        likes: maxL
    }
}

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}