import http from 'k6/http';
import { getcheck } from "../utils/check.js"

export function updateProduct(token, productId, updatedProductData) {
    const url = `https://dummyjson.com/auth/products/${productId}`; 

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    };

    const res = http.put(url, JSON.stringify(updatedProductData), { headers }); 
    getcheck(res);
}
