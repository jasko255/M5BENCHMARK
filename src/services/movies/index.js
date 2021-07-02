import express from 'express'
import { Router } from 'express'
import fs from 'fs-extra'

import uniqid from 'uniqid'
// import { loggerMiddleware } from './middlewares.js'
import createError from 'http-errors'
// import { moviesValidation } from './validation.js'
// import { validationResult } from 'express-validator'
import {getmovies,  writemovies} from '../../lib/fs-tools.js'


const movieRouter = express.Router()





movieRouter.get('/',   async (req,res,next)=> {

    try {
        const movies = await getmovies()  
        res.send(movies)  
        
    } catch (error) {
        next(error)
    }

})
movieRouter.get('/:movId', async (req,res,next)=> {

    try {
        const movies = await getmovies()
        const movie = movies.find(u => u.id === req.params.id)
        if(movie){
        res.send(movie)
        }else {
           next(createError(404 , `movie with id ${req.params.id} not found!`))
        }
    } catch (error) {
        next(error)
    }

})
movieRouter.post('/',  async (req,res,next)=> {
    try {
        // const errors = validationResult(req)
        // if(errors.isEmpty()){
        const newmovie = {id: uniqid(), ...req.body, createdAt: new Date()}
        const movies = await getmovies()
        movies.push(newmovie)
        await writemovies(movies)
        res.send()
        // } else {
        //     next(createError(400, {errorsList: errors}))
        //     console.log(errors);
        // }
        
    } catch (error) {
        next(error)
    }
})
movieRouter.put('/:id', async (req,res,next)=> {
    try {
        const movies = await getmovies()
        const movieIdnex = movies.findIndex(u => u.id === req.params.id)
        if(! movieIdnex == -1){
            res.status(404).send({message: 'not found'})
        }
        const prevmovie = movies[movieIdnex]
        const changedmovie = {...prevmovie, ...req.body, updatedAt: new Date(), id: req.params.id}
        movies[movieIdnex] = changedmovie
        await writemovies(movies)
        res.send(changedmovie)
        
    } catch (error) {
        next(error)
    }


   
})
movieRouter.delete('/:id', async (req,res,next)=> {

    try {
        let movies = await getmovies()
        const movie = movies.find(u=> u.id === req.params.id)
        if(!movie){
            res.status(404).send({message: 'not found!'})
        }
        movies = movies.filter(u=> u.id !== req.params.id)
        await writemovies(movies)
        res.send()
        
    } catch (error) {
        next(error)
    }
})



export default movieRouter