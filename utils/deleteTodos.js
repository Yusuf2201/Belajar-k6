import http from 'k6/http';
import { getcheck } from "./check.js"

export function deleteTodos(token, todoId) {
    const url = `https://dummyjson.com/auth/todos/${todoId}`;
    const headers = {
        'Authorization': `Bearer ${token}`,
    };
    const res = http.del(url, null, { headers });
    getcheck(res);
}
