const express = require('express')
const graphqlHTTP = require('express-graphql')
const { buildSchema } = require('graphql')

let { getBlog, getBlogs, updateBlogTopic } = require("./resolvers")

const schema = buildSchema(`
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

const root = {
  blog: getBlog,
  blogs: getBlogs,
  updateBlogTopic: updateBlogTopic
}

const serverPort = 4000
const serverUrl = '/graphql'

const app = express()
app.use(serverUrl, graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}))

app.listen(serverPort, () => {
  let message = `GraphQL server now running on http://localhost:${serverPort}${serverUrl}`
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

/* Sample GraphiQL Query (Get Blogs by Topic):

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

/* Sample GraphiQL Query (Get All Blogs):

  query {
    blogs {
      title
      author
      topic
      url
    }
  }

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