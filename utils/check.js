import { check } from "k6";

export function getcheck(res) {
    check(res, {
		'responsenya harus 200': (r) => r.status === 200,
    });
}

export function addcheck(res) {
  check(res, {
  'responsenya harus 400': (r) => r.status === 400,
  });
}


