
const Category = require('../models/Category');
const { multipleMongooseToObject } = require('../ulti/mongoose')
const { mongooseToObject } = require('../ulti/mongoose')
class CategoryController {
    
    //[GET] /category/create 
    create(req,res,next) {
        res.render('category/create');
    }

    //[POST] /category/:id/edit
    edit(req,res,next) {
        Category.findById(req.params.id)
            .then(category => res.render('category/edit', {
                category: mongooseToObject(category)
            }))
            .catch(next);
    }

    //[PUT] /category/:id
    update(req,res,next) {
        Category.updateOne({_id: req.params.id}, req.body)
            .then(category => res.redirect('/category'))
            .catch(next);
    }

    

    //[DELETE] /category/:id
    delete(req,res,next) {
        Category.deleteOne({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next);
    }

    //[POST] /store category
    store(req,res,next) {
        const cat = new Category(req.body);
        cat.save()
            .then(() => res.redirect('/'))
            .catch(error => {
                
            })
        res.json(req.body);
    }


    // [GET] /:slug
    // Find object in MongoDB by slug
    show(req,res,next){
        Category.findOne({ slug: req.params.slug})
        .then (category => {
            // res.json(category);

            res.render('category/show', { 
                category: mongooseToObject(category) 
            });
        })
        .catch(next)
        // res.send('New detail !!! - '+ req.params.slug );
    }

    // [GET] /category
    index(req, res, next){
        Category.find({})
        .then(category => {
            // category = category.map(cat => cat.toObject())
            res.render('category', {
                category: multipleMongooseToObject(category)
            })
        })
        .catch(err=>next(err));
    }

}

module.exports = new CategoryController;

const res = require('express/lib/response');
const categoryController = require('./CategoryController');