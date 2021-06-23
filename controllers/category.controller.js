const { response, request } = require('express');
const { Category } = require('../models');

const getCategories = async (req, res = response) => {

    const { limit = 10, from = 0 } = req.query;
    let query = { active: true }
    const [categories, total] = await Promise.all([
        Category.find(query)
            .skip(Number(from))
            .limit(Number(limit)),
        Category.countDocuments(query)]
    )

    return res.status(200).json({ categories, Total: total })

}

const getCategoryById = async (req, res = response) => {

    let { id } = req.params;
    console.log(id);

    const categoryDb = await Category.findById(id);
    return res.status(200).json(categoryDb)
}

const createCategory = async (req = request, res = response) => {
    const name = req.body.name.toUpperCase();

    const categoryInDb = await Category.findOne({ name });

    if (categoryInDb) {
        return res.status(400).json({
            msg: `La categoria ${name} ya existe`
        })
    }

    const data = {
        name,
        user: req.user._id
    };

    const category = new Category(data);
    await category.save();

    res.status(200).json(category);
}

module.exports = {
    getCategories,
    getCategoryById,
    createCategory
}