import http from 'k6/http';
import { addcheck } from "../utils/check.js"

export function addTodos(token, productData) {
    const url = 'https://dummyjson.com/auth/todos/add'; 

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    };

    const res = http.post(url, JSON.stringify(productData), { headers });
    addcheck(res);
}
