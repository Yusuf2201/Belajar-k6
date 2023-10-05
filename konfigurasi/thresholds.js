const thresholds = {
	http_req_duration: ['avg<600', 'p(90)<1000'],
	http_req_failed: ['rate<0.6'],
	iterations: ['count<400']
}

export default thresholds

