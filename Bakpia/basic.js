// const http = require('k6/http')
import http from 'k6/http'

// module.exports = function () {}
export default function () {
	const res = http.get('https://bakpiaku.com/product/')
	console.log(res.status)
	// console.log(res.body)
	// console.log(res.json())
	// console.log(res.headers)
	// console.log(res.timings)
}

