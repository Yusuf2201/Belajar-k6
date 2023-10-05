import { group } from "k6"
import http from "k6/http"
import generateHeaders from "../utils/generateHeaders.js"
import { getcheck } from "../utils/check.js"
import { addTodos } from "../utils/addTodos.js"
import { updateTodos } from "../utils/updateTodos.js"
import { deleteTodos } from "../utils/deleteTodos.js"

export default function Todos(token) {
    group('all Todos', function () {
        const res = http.get('https://dummyjson.com/auth/todos', generateHeaders(token))
        getcheck(res);
    })
    group('single todos', function () {
        const res = http.get('https://dummyjson.com/auth/todos/1', generateHeaders(token));
        getcheck(res);
    })
    group('random todos', function () {
        const res = http.get('https://dummyjson.com/auth/todos/random', generateHeaders(token));
        getcheck(res);
    })
    group('get todos by id 5 ', function () {
        const res = http.get('https://dummyjson.com/auth/todos/user/5', generateHeaders(token));
        getcheck(res);
    })
    group('limit and skip todos', function () {
        const res = http.get('https://dummyjson.com/auth/todos?limit=3&skip=10', generateHeaders(token));
        getcheck(res);
    })
	group('add todo', function () {
        const todoData = {
            title: 'New Todo',
            description: 'Description of the new todo',
        };
        addTodos(token, todoData);
    })

    group('update todo', function () {
        const todoIdToUpdate = 1; 
        const updatedTodoData = {
            title: 'Updated Todo Title',
            description: 'Updated todo description',
        }
        updateTodos(token, todoIdToUpdate, updatedTodoData)
    })
    group('delete todo', function () {
        const todoIdToDelete = 1; 
        deleteTodos(token, todoIdToDelete)
    })
}
