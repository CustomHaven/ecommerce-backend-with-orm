const Models = require('../models');
const { Product, ProductImage } = Models;
const createError = require("http-errors");

module.exports = class ProductService {

    async findAllProducts() {
        try {
        const allProducts = await Product.findAll();
        if (allProducts) {
            return allProducts
        }
        throw createError(404, 'Invalid path');
        } catch (err) {
            throw err
        }
    }

    async findOneProduct(id) {
        try {
            const product = await Product.findByPk(id);
            if (!product) {
                throw createError(404, "No product detail");
            }
            return product;
        } catch (error) {
            throw error;
        }
    }

    async addProduct(body) {
        try {
        // body.user_id = id;
        const product = await Product.create(body);
        if (!product) {
            throw createError(409, "Failed to save product");
        }
        return product;
        } catch (error) {
            throw error;
        }
    }

    async updateProduct(id, body) {
        try {
        const product = await Product.findByPk(id);
        if (!product) {
            throw createError(404, "No product found");
        }
        const updatedProduct = await product.update(body);
        return updatedProduct;
        } catch (error) {
            throw error;
        }
    }

    async deleteProduct(id) {
        try {
            const product = await Product.destroy({ where: { id: id }, individualHooks: true });
            if (!product) {
                // return null
                throw createError(404, 'Invalid ID no product found');
            }
        return { message: 'Successfully removed the product' }
        } catch (error) {
            throw error;
        }
    }

    async getAllProductsAndImages() {
        try {
            const products = await Product.findAll({
                include: {
                    model: ProductImage
                }
            });
            if (products) {
                return products
            }
            // return null
            throw createError(404, 'Invalid path');
        } catch (error) {
            throw error;
        }
    }

    async addProductImages(product, images) {
        try {
            const theProduct = await this.addProduct(product);
            if (!theProduct) {
                throw createError(409, 'Failed to save product');
            }
            for (const unit of images) {
                unit.product_id = theProduct.id;
            }

            const newImages = await Promise.all(images.map(async (image) => await ProductImage.create(image)));
            if (newImages) {
                return this.findProductAndImages(theProduct.id);
            } else {
                throw createError(409, 'Failed to save images to the product');
            }
        } catch (error) {
            throw error;
        }
    }


    /// product images call

    async addProductImage(body) {
        try {
        // body.user_id = id;
        const product = await ProductImage.create(body);
        if (!product) {
            throw createError(409, "Failed the image");
        }
        return product;
        } catch (error) {
            throw error;
        }
    }

    async findProductAndImages(id) {
        try {
            const product = await Product.findOne({
                where: { id: id },
                include: {
                    model: ProductImage
                }
            });
            
            if (!product) {
                throw createError(404, "Product and product images not found")
            }
            return product;
        } catch (error) {
            throw error;
        }
    }

    async addImage(body, fkey) {
        try {
            const product = await Product.findByPk(fkey);
            if (!product) {
                throw createError(404, "Product with the corresponding ID does not exist");
            }
            body.product_id = product.id;
            const image = await ProductImage.create(body);
            if (!image) {
                throw createError(409, "The image was not saved")
            }
            return await Product.findOne({
                where: { id: image.product_id },
                include: { model: ProductImage }
            })
        } catch (error) {
            throw error;
        }
    }

    async findAllImages() {
        try {
            const images = await ProductImage.findAll();
            if (!images) {
                throw createError(404, "No images");
            }
            return images;
        } catch (error) {
            throw error;
        }
    }

    async findSingleImage(id) {
        try {
            const image = await ProductImage.findByPk(id);
            if (!image) {
                throw createError(404, "Image not found");
            }
            return image;
        } catch (error) {
            throw error;
        }
    }

    async updateSingleImage(id, body) {
        try {
            const image = await ProductImage.findByPk(id);
            if (!image) {
                throw createError(404, "No image found");
            }
            const imageUpdate = await image.update(body);
            return imageUpdate;
        } catch (error) {
            
        }
    }

    async removeImage(id) {
        try {
            const image = await ProductImage.destroy({ where: { id: id }, individualHooks: true });
            if (!image) {
                throw createError(404, 'Invalid ID no image found');
            }
            return { message: 'Successfully removed the image' }
        } catch (error) {
            throw error;
        }
    }

};