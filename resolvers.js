let blogData = require('./blogs')

module.exports = {
  getBlog: (args) => {
    let id = args.id
    return blogData.find(blog => blog.id === id)
  },
  getBlogs: (args) => {
    if(args.topic) {
      let topic = args.topic
      return blogData.filter(blog => blog.topic === topic)
    }else {
      return blogData
    }
    return blogData.find(blog => blog.id === id)
  },
  updateBlogTopic: ({id, topic}) => {
    blogData.map(blog => {
      if(blog.id === id) {
        blog.topic = topic
        return blog
      }
    })
    return blogData.find(blog => blog.id === id)
  }
}