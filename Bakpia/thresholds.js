import http from 'k6/http'

export const options = {
	thresholds: {
		http_req_duration: ['avg<1000', 'p(90)<700'],
		http_req_failed: ['rate<0.01'],
		iterations: ['count>10']
	}
}

export default function () {
	http.get('https://bakpiaku.com/product/bakpiaku-kumbu-hitam/')
}