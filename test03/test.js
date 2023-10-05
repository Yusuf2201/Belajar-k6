// // chai integration

// import http from 'k6/http';
// import { describe, expect } from 'https://jslib.k6.io/k6chaijs/4.3.4.3/index.js';

// export default function () {
// 	describe('test api detail todo', function () {
// 		const res = http.get('https://bakpiaku.com/product/bakpiaku-kumbu-hitam/')

// 		expect(res.status, 'statusnya').to.equal(200)
        
// 		expect(res.headers.Server, 'responnya Server').to.equal('cloudflare')
// 	})
// }

// 
// import { sleep } from 'k6'
// import http from 'k6/http'

// export const options = {
// 	stages: [
// 		{ duration: '5s', target: 40 },
// 		{ duration: '5s', target: 60 },
//         { duration: '10s', target: 60 },
// 		{ duration: '5s', target: 0 },
// 	]
// }

// export default function () {
// 	http.get('https://bakpiaku.com/product/bakpiaku-kumbu-hitam/')
// 	sleep(0.8)
// }

// //group
// import { check, group } from 'k6'
// import http from 'k6/http'

// export default function () {
// 	group('semua product', function () {
// 		const res = http.get('https://bakpiaku.com/product/')

// 		check(res, {
// 			'statusnya 200': r => r.status === 200
// 		})
// 	})

// 	group('detail product', function () {
// 		for (let i = 0; i < 5; i++) {
// 			const res = http.get('https://bakpiaku.com/product/'+i)

// 			check(res, {
// 				'request detail statusnya 200': r => r.status === 200
// 			})
// 		}

// 	})
// }
// //metric-rate
// import http from 'k6/http'
// import { Rate } from 'k6/metrics'

// const completedRate = new Rate('product_completed_rate')

// export default function () {
// 	for(let i = 1; i < 10; i++) {
// 		const res = http.get('https://bakpiaku.com/product/' + i)
// 		completedRate.add(res.json().completed)
// 	}
// }

// //metric-trend
// import http from 'k6/http'
// import { Trend } from 'k6/metrics'

// export const options = {
// 	iterations: 3
// }

// const todosAllDuration = new Trend('product_all_duration')
// const todosDetailDuration = new Trend('product_detail_duration')

// export default function () {
// 	const resAll = http.get('https://bakpiaku.com/product/')
// 	const resDetail = http.get('https://bakpiaku.com/product/bakpiaku-kumbu-hitam/')

// 	todosAllDuration.add(resAll.timings.duration)
// 	todosDetailDuration.add(resDetail.timings.duration)
// }

// //output
// import http from 'k6/http'

// export const options = {
// 	iterations: 2,
// }

// export default function () {
// 	http.get('https://bakpiaku.com/product/bakpiaku-kumbu-hitam/')
// }


// //tags
// import http from 'k6/http'

// export default function () {
// 	http.get('https://bakpiaku.com/product/', {
// 		tags: { judul: 'semua-product' }
// 	})

// 	http.get('https://bakpiaku.com/product/bakpiaku-kumbu-hitam/', {
// 		tags: { judul: 'detail-product' }
// 	})
// }


import http from 'k6/http';
import { describe, expect } from 'https://jslib.k6.io/k6chaijs/4.3.4.3/index.js';
import { sleep } from 'k6';
import { check, group } from 'k6';
import { Rate } from 'k6/metrics';
import { Trend } from 'k6/metrics';

// console.log('cloud');
//cloud
export const options = {
  stages: [
    { duration: '5s', target: 40 },
    { duration: '5s', target: 60 },
    { duration: '10s', target: 60 },
    { duration: '5s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['avg<1000', 'p(90)<700'],
    http_req_failed: ['rate<0.01'],
    }
};

// export const options = {
//         iterations: 2,
//     }

// console.log('chai integration');
export default function () {
  // chai integration
  describe('test api detail product', function () {
    const res = http.get('https://bakpiaku.com/product/bakpiaku-kumbu-hitam');

    expect(res.status, 'statusnya').to.equal(200);
    expect(res.headers.Server, 'responnya Server').to.equal('cloudflare');
  });

  // cloud
  http.get('https://bakpiaku.com/product/bakpiaku-kumbu-hitam/');
  sleep(0.8);

//   console.log('group')
  // group
  group('semua product', function () {
    const res = http.get('https://bakpiaku.com/product/');

    check(res, {
      'statusnya 200': (r) => r.status === 200,
    });
  });

  group('detail product', function () {
    for (let i = 0; i < 5; i++) {
      const res = http.get('https://bakpiaku.com/product/' + i);

      check(res, {
        'request detail statusnya 200': (r) => r.status === 200,
      });
    }
  });

//   console.log('metric-rate')
  // metric-rate
  const completedRate = new Rate('product_completed_rate');

  for (let i = 1; i < 10; i++) {
    const res = http.get('https://bakpiaku.com/product/' + i);
    completedRate.add(res.json().completed);
  }

//   console.log('metric-trend')
  // metric-trend

  const productAllDuration = new Trend('product_all_duration');
  const productDetailDuration = new Trend('product_detail_duration');

  const resAll = http.get('https://bakpiaku.com/product/');
  const resDetail = http.get('https://bakpiaku.com/product/bakpiaku-kumbu-hitam/');

  productAllDuration.add(resAll.timings.duration);
  productDetailDuration.add(resDetail.timings.duration);

//   console.log('output')
  // output
        // export const options = {
        //     iterations: 2,
        // }
  http.get('https://bakpiaku.com/product/bakpiaku-kumbu-hitam/');

//   console.log('tags')
  // tags
  http.get('https://bakpiaku.com/product/', {
    tags: { judul: 'semua-product' },
  });

  http.get('https://bakpiaku.com/product/bakpiaku-kumbu-hitam/', {
    tags: { judul: 'detail-product' },
  });
}
