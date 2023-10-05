import { group } from "k6"
import http from "k6/http"
import generateHeaders from "../utils/generateHeaders.js"
import { getcheck } from "../utils/check.js"
import { addProduct } from "../utils/addProducts.js"
import { updateProduct } from "../utils/updateProducts.js"
import { deleteProduct } from "../utils/deleteProducts.js"

export default function Products(token) {
    group('all Product', function () {
        const res = http.get('https://dummyjson.com/auth/products', generateHeaders(token));
        getcheck(res);
    })
    group('single products', function () {
        const res = http.get('https://dummyjson.com/auth/products/1', generateHeaders(token));
        getcheck(res);
    })
    group('search product', function () {
        const res = http.get('https://dummyjson.com/auth/products/search?q=phone', generateHeaders(token));
        getcheck(res);
    })
    group('alProductCategory', function () {
        const res = http.get('https://dummyjson.com/auth/products/categories', generateHeaders(token));
        getcheck(res);
    })
    group('products of a category', function () {
        const res = http.get('https://dummyjson.com/auth/products/category/smartphones', generateHeaders(token));
        getcheck(res);
    })
    group('limit and skip products', function () {
        const res = http.get('https://dummyjson.com/auth/products?limit=10&skip=10&select=title,price', generateHeaders(token));
        getcheck(res);
    })
	group('add product', function () {
        const productData = {
            name: 'BMW Pencil',
            description: 'Amazing pencil',
        }
        addProduct(token, productData);
    })
	group('update product', function () {
        const productId = 1; 
        const updatedProductData = {
            name: 'smileee',
            description: 'smile',
        }
        updateProduct(token, productId, updatedProductData)
    })
	
	group('delete product', function () {
        const productIdToDelete = 1; 
        deleteProduct(token, productIdToDelete)
    })
}
