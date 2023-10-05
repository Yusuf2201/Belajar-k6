import { sleep } from 'k6'

import thresholds from './konfigurasi/thresholds.js'
import smoke_test from './konfigurasi/smoke_test.js'
import average_load_test from './konfigurasi/average_load_test.js'
import breakpoint_test from './konfigurasi/breakpoint_test.js'
import soak_test from './konfigurasi/soak_test.js'
import spike_test from './konfigurasi/spike_test.js'
import stress_test from './konfigurasi/stress_test.js'

import getAuthToken from './utils/getAuthToken.js'

import Products from './groups/product.js'



const scenarioList = {
	smoke: smoke_test,
	average: average_load_test,
    breakpoint : breakpoint_test,
    soak : soak_test,
    spike : spike_test,
    stress : stress_test
}

export const options = {
	thresholds,
	scenarios: {
		current_scenario: scenarioList[__ENV.SCENARIO] || smoke_test
	}
}

export function setup() {
	return getAuthToken()
}

export default function (token) {
	Products(token)
    
	sleep(1)
}
