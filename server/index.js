require('dotenv').config()

const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors)
const {SERVER_PORT} = process.env


const {login, register} = require('./controllers/auth')
const {getAllPosts, getCurrentUserPosts, addPost, editPost, deletePost} = require('./controllers/posts')
const {isAuthenticated} = require('./middleware/isAuthenticated')

const { sequelize } = require('./util/database')
const { User } = require('./models/user')
const { Post } = require('./models/post')

User.hasMany(Post)
Post.belongsTo(User)

app.post('/register', register)
app.post('/login', login)

app.get('/posts', getAllPosts)
app.get('/userposts/:userId', getCurrentUserPosts)

app.post('/posts', isAuthenticated, addPost)
app.put('/posts/:id', isAuthenticated, editPost)
app.delete('/posts/:id', isAuthenticated, deletePost)



sequelize.sync()
.then(() => {
    app.listen(SERVER_PORT, () => console.log(`server listening at ${SERVER_PORT}`))
})
.catch(e => console.log(e))