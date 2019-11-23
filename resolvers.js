let blogData = require('./blogs')

module.exports = {
  getBlog: (args) => {
    let id = args.id
    return blogData.find(blog => blog.id === id)
  },
  getBlogs: (args) => {
      return args.topic 
        ? blogData.filter(blog => blog.topic === args.topic)
        : blogData
  },
  updateBlogTopic: ({id, topic}) => {
    blogData.map(blog => {
      return blog.id === id 
        ? blog.topic = topic
        : blog
    })
    return blogData.find(blog => blog.id === id)
  }
}