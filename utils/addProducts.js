import http from 'k6/http';
import { getcheck } from "../utils/check.js"

export function addProduct(token, productData) {
    const url = 'https://dummyjson.com/auth/products/add'; 

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    };

    const res = http.post(url, JSON.stringify(productData), { headers });
    getcheck(res);
}
