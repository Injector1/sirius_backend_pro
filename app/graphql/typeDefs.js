const {gql} = require('apollo-server');

module.exports = gql`
  type User {
    id: ID!
    name: String!
    surname: String!
    email: String!
    image: String
  }
  
  type Post {
    id: ID!
    authorId: ID!
    title: String!
    content: String!
    published: String
  }
  
  type Comment {
    id: ID!
    authorId: ID!
    postId: ID!
    content: String!
    published: String
    replies: [Comment]
  }
  type Query {
    users: [User]
    getUserById(id: Int): User!
    posts: [Post]
    getPostById(id: Int): Post!
    comments: [Comment]
  }
  
  type Mutation {
    addUser(name: String!, surname: String!, email: String!, image: String): User!
    deleteUser(id: ID!): User
    updateUser(id: ID!, name: String, surname: String, email: String, image: String): User
    addPost(authorId: ID!, title: String!, content: String!): Post!
    deletePost(id: ID!, authorId: ID!): Post
    updatePost(id: ID!, authorId: ID!, title: String, content: String): Post
  }
`;
