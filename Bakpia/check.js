import http from 'k6/http'
import { check } from 'k6'

export default function () {
	const res = http.get('https://bakpiaku.com/product/bakpiaku-kumbu-hitam/')

	check(res, {
		'responsenya harus 200': (r) => r.status === 200,

		'responnya Content-Type adalah text/html; charset=UTF-8': (r) => r.headers['Content-Type'] === 'text/html; charset=UTF-8',
	  	'responnya Server adalah cloudflare': (r) => r.headers['Server'] === 'cloudflare' ,

		// 'responnya blocked adalah 535.4165': (r) => r.timings.blocked === 535.4165 ,
		//gabisa dicek karenak selalu berubah
		// 'responnya blocked adalah 535.4165': (r) => r.timings['blocked'] === 535.4165 ,
	})
}