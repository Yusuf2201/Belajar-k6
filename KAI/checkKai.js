import http from 'k6/http'
import { check } from 'k6'

export default function () {
	const res = http.get('https://bakpiaku.com/product/')

	check(res, {
		'responsenya harus 200': (r) => r.status === 200,
		'responnya Content-Type adalah text/html; charset=UTF-8': (r) => r.headers['Content-Type'] === 'text/html; charset=UTF-8',
	  	'responnya "Strict-Transport-Security" adalah max-age=16070400; includeSubDomains': (r) => r.headers['Strict-Transport-Security'] === 'max-age=16070400; includeSubDomains' ,
		// 'di dalamnya harus ada bakpia': (r) => 'todo' in r.json()
	})
}