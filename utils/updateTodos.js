import http from 'k6/http';
import { getcheck } from "./check.js"

export function updateTodos(token, todoId, updatedProductData) {
    const url = `https://dummyjson.com/auth/products/${todoId}`; 

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    };

    const res = http.put(url, JSON.stringify(updatedProductData), { headers }); 
    getcheck(res);
}
