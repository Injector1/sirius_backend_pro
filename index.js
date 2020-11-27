const express = require('express')
const mongoose = require('mongoose')
const resolvers = require('./app/graphql/resolvers')

const {ApolloServer, gql} = require('apollo-server');

const typeDefs = require('./app/graphql/typeDefs')


async function run() {
    try {
        await mongoose.connect('mongodb+srv://injector:injector@cluster0.eo1pf.mongodb.net/sirius_backend_pro?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useFindAndModify: false
        })

        const server = new ApolloServer({typeDefs, resolvers});

        server.listen().then(({url}) => {
            console.log(`🚀  Server ready at ${url}`);
        });

    } catch (e) {
        console.log(e);
    }
}

run()
// const startApp = async () => {
//     try {
//         await mongoose.connect(
//             DB,
//             {
//                 useNewUrlParser: true,
//                 useUnifiedTopology: true
//             })
//
//         app.listen({port: PORT}, () => {
//             console.log(`Running server at port: ${PORT}`)
//         })
//     } catch (e) {
//
//
//     }
// }
