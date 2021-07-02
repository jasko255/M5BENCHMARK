
import fs from 'fs-extra'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'


const { readJSON, writeJSON } = fs


export const moviesJSONPath = join(dirname(fileURLToPath(import.meta.url)), '../data/movies.json')
export const reviewsJSONPath = join(dirname(fileURLToPath(import.meta.url)), '../data/reviews.json')

export const getmovies = () => readJSON(moviesJSONPath)
export const getreviews = () => readJSON(reviewsJSONPath)

export const writemovies = content => writeJSON(moviesJSONPath, content)
export const writereviews = content => writeJSON(reviewsJSONPath, content)

export const getCurrentFolderPath = currentFile => dirname(fileURLToPath(currentFile))