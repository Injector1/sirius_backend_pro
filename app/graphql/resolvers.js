const User = require('../models/user')
const Post = require('../models/post')
const Comment = require('../models/comment')

module.exports = {
    Query: {
        users: () => allUsers,
        getUserById: async (parent, {id}, context, info) => {
            console.log(id)
            const user = await User.findOne({_id: id})
            console.log(user)
            if (user) return user
            else return {
                "error": "No user found"
            }
        },
        posts: async () => {
            const posts = await Post.all()
            if (posts) return posts
            else return {
                "error": "No posts yet"
            }
        },
        getPostById: async (parent, {id}, context, info) => {
            const post = await Post.findOne({_id: id})
            if (post) return post
            else return {
                "error": "No post found"
            }
        },
        comments: async () => {
            const comments = await Comment.all()
            if (comments) return comments
        },
        getCommentById: async (parent, {id}, context, info) => {
            const comment = await Comment.findOne({_id: id})
            if (comment) return comment
        },
        getCommentsToPost: async (parent, {postId}, context, info) => {
            const comments = await Comment.find({postId: postId})
            if (comments) return comments
        },
        getRepliesToComment: async (parent, {id}, context, info) => {
            const replies = await Comment.find({replyTo: id})
            if (replies) return replies
        }
    },
    Mutation: {
        addUser: async (parent, {name, surname, email}, context, info) => {
            const newUser = User({
                _id: (Math.random() * 100).toFixed(0),
                name: name,
                surname: surname,
                email: email,
            })
            await newUser.save((err) => {
                if (err) {
                    return console.log(err)
                }
            })
            return newUser
        },
        updateUser: async (parent, {id, name, surname, email, image}, context, info) => {
            const user = await User.findOne({_id: id})
            await User.updateOne({_id: id}, {
                name: name ? name : user.name,
                surname: surname ? surname : user.surname,
                email: email ? email : user.email,
                image: image ? image : user.image
            })
            let updatedUser = await User.findOne({_id: id})
            return updatedUser

        },
        deleteUser: async (parent, {id}, context, info) => {
            const userToDelete = await User.findOne({_id: id})
            const userCopy = userToDelete
            if (userToDelete) {
                await userToDelete.delete((err) => {
                    if (err) return console.log(err)
                })
                return userToDelete
            }
        },
        addPost: async (parent, {authorId, title, content}, context, info) => {
            const post = Post({
                _id: (Math.random() * 100).toFixed(0),
                authorId: authorId,
                title: title,
                content: content
            })

            await post.save((err) => {
                if (err) return console.log(err)
            })
            return post
        },
        deletePost: async (parent, {id, authorId}, context, info) => {
            const post = await Post.findOne({_id: id, authorId: authorId})
            const postCopy = post
            if (post) {
                await post.delete((err) => {
                    console.log(err)
                })
                return postCopy
            }
        },
        updatePost: async (parent, {id, authorId, title, content}, context, info) => {
            const post = await Post.findOne({_id: id, authorId: authorId})
            console.log(post)
            await Post.updateOne({_id: id}, {
                title: title ? title: post.title,
                content: content ? content: post.content
            })
            let updatedPost = await Post.findOne({_id: id, authorId: authorId})
            return updatedPost
        },
        addComment: async (parent, {authorId, postId, content, replyTo}) => {
            const comment = new Comment({
                authorId: authorId,
                postId: postId,
                content: content,
                replyTo: replyTo ? replyTo : 0
            })

            await comment.save((err) => {
                if (err) return console.log(err)
            })
            return comment
        },
        deleteComment: async (parent, {id, authorId}) => {
            const comment = await Comment.findOne({_id: id, authorId: authorId})
            let commentCopy = comment
            if (comment) {
                await comment.delete((err) => {
                    console.log(err)
                })
                return commentCopy
            }
        },
        updateComment: async (parent, {id, authorId, content}) => {
            await Comment.updateOne({_id: id, authorId: authorId}, {
                content: content
            })
            const updatedComment = await Comment.findOne({_id: id, authorId:authorId})
            return updatedComment
        }
    }
}
