import { body } from "express-validator";

export const moviesValidation = [
    body('name').exists().withMessage('Name is mandatory'),
    body('surname').exists().withMessage('Surname is mandatory'),
    body('age').exists().withMessage('Age is mandatory').isInt().withMessage('Age should be an integer!')

]


// {
//     "Title": "The Lord of the Rings: The Fellowship of the Ring",
//     "Year": "2001",
//     "imdbID": "tt0120737",  //UNIQUE
//     "Type": "movie",
//     "Poster": "https://m.media-amazon.com/images/M/MV5BMTM5MzcwOTg4MF5BMl5BanBnXkFtZTgwOTQwMzQxMDE@._V1_SX300.jpg"
// }