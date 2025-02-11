const { ApolloServer } = require('apollo-server')
const mongoose = require("mongoose")
const config = require('dotenv')

config.config() // imports env variables

const MONGO_URI =  process.env.MONGODB_URI


// Apollo server requires TypeDefs and Resolvers:
// TypeDef: GraphQL Type definitiom
// Resolvers: how do we resolve queries and/or mutations
const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')

const server = new ApolloServer({
    typeDefs,
    resolvers
})

mongoose.connect(MONGO_URI)
.then(() => {
    console.log("MongoDB Connection Successful!")
    return server.listen({port: 5000})
}).then(res => {
    console.log(`Server is running at ${res.url}`)
})

// 67ab950398d2d0b7cd9d66a5