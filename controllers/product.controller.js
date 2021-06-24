const { response, request } = require('express');
const { Product } = require('../models');

const getProducts = async (req, res = response) => {

    const { limit = 10, from = 0 } = req.query;
    let query = { active: true }
    const [products, total] = await Promise.all([
        Product.find(query)
            .populate('user', 'name')
            .populate('category', 'name')
            .skip(Number(from))
            .limit(Number(limit)),
        Product.countDocuments(query)]
    )

    return res.status(200).json({ products, total })

}

const getProductById = async (req, res = response) => {

    let { id } = req.params;

    const productDb = await Product.findById(id)
        .populate('category', 'name')
        .populate('user', 'name');
    return res.status(200).json(productDb)
}

const createProduct = async (req = request, res = response) => {

    const { name, price, description, avaliable, category } = req.body

    const data = {
        name,
        price,
        description,
        avaliable,
        user: req.user._id,
        category
    };

    const product = new Product(data);
    await product.save();

    res.status(200).json(product);
}

const updateProduct = async (req = request, res = response) => {
    let { id } = req.params;

    let { name, price, description, avaliable = true, category } = req.body;
    let user = req.user._id;
    let data = {
        name,
        price,
        description,
        avaliable,
        category,
        user
    }

    const productUpdated = await Product.findByIdAndUpdate(id, data).populate('user', 'name').populate('category', 'name');

    res.status(200).json(productUpdated);
}

const deleteProduct = async (req, res = response) => {
    let { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, { active: false });

    res.status(200).json({ product });
}

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}