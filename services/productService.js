const { Buffer, Blob } = require("buffer");
const Models = require('../models');
const { Product, ProductBannerImage, ProductImage } = Models;
const createError = require("http-errors");



module.exports = class ProductService {

    static base64(buffer) {
        const buff = Buffer.from(buffer, "base64"); // .toString("utf8"); // actual web url returned
        buffer.toString("utf8");
        const blob = new Blob([buff], { type: "image/webp" }); //  Promise { Blob { size: 170, type: '' } },  Promise { Blob { size: 167, type: 'image/webp' } },

        // const file = new File([blob], "img.webp");

        const based64 = btoa(String.fromCharCode.apply(null, blob)); // Promise { '' },
        // return based64;
        return buff;
    }

    async findAllProducts() {
        try {
        const allProducts = await Product.findAll({attributes: {exclude: ["created_at", "updated_at"]}});
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
            const product = await Product.findByPk(id, { attributes: {exclude: ["created_at", "updated_at"]} });
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
                attributes: {exclude: ["created_at", "updated_at"]},
                include: {
                    model: ProductImage,
                    attributes: {exclude: ["created_at", "updated_at"]}
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

    // //////////////////////////////////////////////// ProductBannerImage //////////////////////////////////////////////// //
    async allBannerImg() {
        try {
            const bannerImg = await ProductBannerImage.findAll();
            if (bannerImg) {
                return bannerImg
            }
            // return null
            throw createError(404, 'Invalid path');
        } catch (error) {
            throw error;
        }
    }

    async singleBannerImg(id) {
        try {
            const bannerImg = await ProductBannerImage.findByPk(id);
            if (!bannerImg) {
                throw createError(404, "Image not found");
            }
            return bannerImg;
        } catch (error) {
            throw error;
        }
    }

    async updateBannerImage(id, body) {
        try {
            const bannerImg = await this.singleBannerImg(id);
            const updateBannerImg = await bannerImg.update(body);
            return updateBannerImg;
        } catch (error) {
            throw error;
        }
    }

    async removeBannerImage(id) {
        try {
            const image = await ProductBannerImage.destroy({ where: { id: id }, individualHooks: true });
            if (!image) {
                throw createError(404, 'Invalid ID no image found');
            }
            return { message: 'Successfully removed the image' }
        } catch (error) {
            throw error;
        }
    }

    async allProductsAndBannerImg() {
        try {
            const products = await Product.findAll({
                include: {
                    model: ProductBannerImage
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

    async findProductAndBannerImg(id) {
        try {
            const product = await Product.findOne({
                attributes: {exclude: ["created_at", "updated_at"]},
                where: { id: id },
                include: {
                    model: ProductBannerImage,
                    attributes: {exclude: ["created_at", "updated_at"]}
                }
            });

            if (!product) {
                throw createError(404, "Product and product image not found");
            }
            return product;
        } catch (error) {
            throw error;
        }
    }

    async newImgBanner(id, body) {
        try {
            const product = await this.findOneProduct(id);

            body.product_id = product.id;
            const bannerImg = await ProductBannerImage.create(body);

            if (!bannerImg) {
                throw createError(409, "Failed to save product image");
            }
            return await this.findProductAndBannerImg(bannerImg.product_id);

        } catch (error) {
            throw error;
        }
    }

    async updateProductBannerImg(id, body) {
        try {
            const product = await this.findProductAndBannerImg(id);

            const bannerImg = await this.singleBannerImg(product.ProductBannerImages[0].id);
            const updateBannerImg = await bannerImg.update(body);
            return updateBannerImg;
        } catch (error) {
            throw error;
        }
    }

    async deleteProductBannerImg(id) {
        try {
            const product = await this.findProductAndBannerImg(id);

            return await this.removeBannerImage(product.ProductBannerImages[0].id);
        } catch (error) {
            throw error;
        }
    }

    // //////////////////////////// PRODUCT, PRODUCT BANNER IMAGE AND PRODUCT IMAGES ALL TOGETHER! /////////////////////////////////////

    async singleProductWithAllImages(id) {
        try {
            const product = await Product.findOne({
                where: { id: id },
                attributes: {exclude: ["created_at", "updated_at"]},
                include: [{
                    model: ProductBannerImage,
                    attributes: {exclude: ["created_at", "updated_at"]}
                },{
                    model: ProductImage,
                    attributes: {exclude: ["created_at", "updated_at"]}
                }]
            });
            if (product) {
                return product
            }
            throw createError(404, "No product found");
        } catch (error) {
            throw error;
        }
    }

    async findAllProductsAllImages() {
        try {
            const products = await Product.findAll({
                attributes: {exclude: ["created_at", "updated_at"]},
                include: [{
                    model: ProductBannerImage,
                    attributes: {exclude: ["created_at", "updated_at"]}
                },{
                    model: ProductImage,
                    attributes: {exclude: ["created_at", "updated_at"]}
                }]
            });
            if (products) {
                // const pro = await Promise.resolve(products.map(async (product) => await ProductService.base64(product.ProductBannerImage.banner_image_data)));
                // console.log(pro);
                return products
            }
            throw createError(404, 'Invalid path');
        } catch (error) {
            throw error;
        }
    }


    async addProductAndAllImages(product, banner_image, all_images) {
        try {
            const theProduct = await this.addProduct(product);
            if (!theProduct) {
                throw createError(409, 'Failed to save product');
            }

            const imgBanner = await this.newImgBanner(theProduct.id, banner_image);
            for (const unit of all_images) {
                unit.product_id = theProduct.id;
            }

            const newImages = await Promise.all(all_images.map(async (image) => await ProductImage.create(image)));


            if (newImages && imgBanner) {
                return this.singleProductWithAllImages(theProduct.id);
            } else {
                await this.deleteProduct(theProduct.id);
                throw createError(409, 'Failed to save images to the product');
            }
        } catch (error) {
            throw error;
        }
    }

};