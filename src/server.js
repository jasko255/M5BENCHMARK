import express from 'express'
import listEndpoints from 'express-list-endpoints'
// import bookRouter from './services/books/index.js'
import movieRouter from './services/movies/index.js'
import cors from 'cors'
import { join } from 'path'
import { catchErrorMiddleware, badRequestMiddlawere, notFoundMiddlawere } from './services/errorMiddlewares.js'
import { getCurrentFolderPath } from './lib/fs-tools.js'

const PORT = process.env.PORT || 3001

const server = express()
const publicFolderPath = join(getCurrentFolderPath(import.meta.url), '../public')
//********************MIDDLEWARES */



server.use(express.static(publicFolderPath))
server.use(cors())
server.use(express.json())
////endpoints

server.use("/movies", movieRouter)
// server.use("/books", bookRouter)

//******************************ERROR MIDDLEWARES */

server.use(notFoundMiddlawere)
server.use(badRequestMiddlawere)
server.use(catchErrorMiddleware)



console.table(listEndpoints(server))

server.listen(PORT, ()=>{
    console.log('Server is running on port: ' + PORT);
})

