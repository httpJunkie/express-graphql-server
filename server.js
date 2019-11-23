var express = require('express')
var express_graphql = require('express-graphql')
var { buildSchema } = require('graphql')

// GraphQL Schema
var schema = buildSchema(`
  type Query {
    blog(id: Int!): Blog
    blogs(topic: String): [Blog]
  }
  type Blog {
    id: Int
    title: String
    author: String
    topic: String
    url: String
  }
`)

let blogData = [
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

let getBlog = (args) => {
  let id = args.id
  return blogData.filter(b => b.id === id)[0]
}

let getBlogs = (args) => {
  if(args.topic) {
    let topic = args.topic
    return blogData.filter(b => b.topic === topic)
  }else {
    return blogData
  }
  return blogData.filter(b => b.id === id)[0]
}

// Root Resolver
var root = {
  blog: getBlog,
  blogs: getBlogs
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

/* Sample GraphiQL Query:

  query getSingleBlog($blogID: Int!) {
    blog(id: $courseID) {
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

/* Sample GraphiQL Query:

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

/* Sample GraphiQL Query:

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

// left off at: https://youtu.be/Vs_CBxCfFHk?t=2286