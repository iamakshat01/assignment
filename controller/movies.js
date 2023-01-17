const db = require('../models');
const axios = require('axios');

const searchHandler = async (req, res, next) => {
    try {
        const title=req.query.title;
        const imdbID=req.query.imdbID;
        if(!title && !imdbID)
        {
            return next({
                status: 400,
                message: 'Please provide title or imdbId in query',
            });  
        }
        let query="";
        if(title)
            query+=`t=${title}&`
        if(imdbID)
            query+=`i=${imdbID}`
        const response = await axios.get(`${process.env.API_URL}&${query}`)
        const movies = await db.Movies.insertMany(response.data);
        res.status(200).json(movies);
    } catch (err) {
        if (err.code === 11000) {
            return next({
                status: 409,
                message: 'Sorry, that movie is already present',
            });
        }
        return next({
            status: 400,
            message: err.message,
        });
    }
}

const updateHandler = async (req,res, next) => {
    try {
        const movie = await db.Movies.findById(req.params.id);
        if (!movie) 
            return res.status(404).send('The movie with the given ID was not found.');
        let queryBuilder = {$set: {}};
        for (let key in req.body) {
            if (movie[key] && movie[key] !== req.body[key])
                queryBuilder.$set[key] = req.body[key];
        }
        const curMovie = await db.Movies.updateOne({_id: req.params.id}, queryBuilder);
        return res.status(200).json({
            curMovie
        });
    } catch (err) {
        return next({
            status: 400,
            message: err.message,
        });
    }
}

const findTopHandler = async (req,res,next) => {
    try {
        const movies = await db.Movies.aggregate([
            { "$match": { "Ratings.Source": req.query.source }},
            { "$addFields": {
                "ratingOrder": {
                    "$filter": {
                      "input": "$Ratings",
                      "as": "r",
                      "cond": { "$eq": [ "$$r.Source", req.query.source ] }
                    }
                }
            }},
            { "$sort": { "ratingOrder": -1 } }
        ])
        res.status(200).json(movies);
    } catch (err) {
        return next({
            status: 400,
            message: err.message,
        });
    }

}

module.exports = { searchHandler, updateHandler, findTopHandler};