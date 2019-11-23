var express = require('express')
var express_graphql = require('express-graphql')
var { buildSchema } = require('graphql')

// GraphQL Schema
var schema = buildSchema(`
  type Query {
    blog(id: Int!): Blog
    blogs(topic: String): [Blog]
  }
  type Mutation {
    updateBlogTopic(id: Int!, topic: String!): Blog
  }
  type Blog {
    id: Int
    title: String
    author: String
    topic: String
    url: String
  }
`)

var blogData = [
  {
    id: 1,
    title: 'Preferred Color Scheme in React',
    author: 'Eric Bishard',
    topic: 'React',
    url: 'https://www.reactstateofmind.com/preferred-color-scheme-in-react'
  },
  {
    id: 2,
    title: 'A Guide to Learning React Hooks',
    author: 'Eric Bishard',
    topic: 'Hooks',
    url: 'https://www.reactstateofmind.com/a-guide-to-learning-react-hooks'
  },
  {
    id: 3,
    title: 'React Accessibility Resources',
    author: 'Eric Bishard',
    topic: 'React',
    url: 'https://www.reactstateofmind.com/react-accessibility-resources'
  },
]

var getBlog = (args) => {
  let id = args.id
  return blogData.find(b => b.id === id)
}

var getBlogs = (args) => {
  if(args.topic) {
    let topic = args.topic
    return blogData.filter(b => b.topic === topic)
  }else {
    return blogData
  }
  return blogData.find(b => b.id === id)
}

var updateBlogTopic = ({id, topic}) => {
  blogData.map(b => {
    if(b.id === id) {
      b.topic = topic
      return b
    }
  })
  return blogData.find(b => b.id === id)
}

// Root Resolver
var root = {
  blog: getBlog,
  blogs: getBlogs,
  updateBlogTopic: updateBlogTopic
}

// Create an Express Server and GraphQL endpoint
var serverPort = 4000
var gqlEndpoint = '/graphql'

var app = express()
app.use(gqlEndpoint, express_graphql({
  schema: schema,
  rootValue: root,
  graphiql: true
}))

app.listen(serverPort, () => {
  let message = `express graphql now running on http://localhost:${serverPort}${gqlEndpoint}`
  console.log(message)
})

/* Sample GraphiQL Query (Get Blog):

  query getSingleBlog($blogID: Int!) {
    blog(id: $blogID) {
      title
      author
      topic
      url
    }
  }

*/

/* Sample GraphiQL Variables

  {"blogID": 1}

*/

/* Sample GraphiQL Query (Get Blog by Topic):

  query getBlogsByTopic($blogTopic: String!) {
    blogs(topic: $blogTopic) {
      title
      author
      topic
      url
    }
  }

*/

/* Sample GraphiQL Variables

  {"blogTopic": "React"}

*/

/* Sample GraphiQL Query (Get Two Blogs by ID using fragment)

  query getBlogsWithFragment($blogID1: Int!, $blogID2: Int!) {
    blog1: blog(id: $blogID1) {
			...blogFields
    }
    blog2: blog(id: $blogID2) {
			...blogFields
    }
  }

  fragment blogFields on Blog {
    title
    author
    topic
    url
  }

*/

/* Sample GraphiQL Variables

  {
    "blogID1": 1,
    "blogID2": 2
  }

*/

/* Sample GraphiQL Query (Update/Mutate Blog Topic by BlogID)

  mutation updateBlogTopic($id: Int!, $topic: String!) {
    updateBlogTopic(id: $id, topic: $topic) {
      ...blogFields
    }
  }

  fragment blogFields on Blog {
    title
    author
    topic
    url
  }

*/

/* Sample GraphiQL Variables

  {
    "id": 2,
    "topic": "React"
  }

*/