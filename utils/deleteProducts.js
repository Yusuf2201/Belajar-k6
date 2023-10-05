import http from 'k6/http';
import { getcheck } from "../utils/check.js"

export function deleteProduct(token, productId) {
    const url = `https://dummyjson.com/auth/products/${productId}`;
    const headers = {
        'Authorization': `Bearer ${token}`,
    };
    const res = http.del(url, null, { headers });
    getcheck(res);
}
