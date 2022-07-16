import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export const options = {
    stages: [
        { duration: '5m', target: 100 }, // simulate ramp-up of traffic from 1 to 100 users over 5 minutes.
        { duration: '10m', target: 200 }, // stay at 200 users for 10 minutes
        { duration: '5m', target: 0 }, // ramp-down to 0 users
    ],
    thresholds: {
        'http_req_duration': ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};

export default function load_testing_get_jobs_offers() {
    const URL = "http://localhost:5500/jobs_offers";
    const get_jobs_offers = http.get(`${URL}`)

    if(!check(get_jobs_offers, { 'status code MUST be 200': (r) => r.status === 200},
        { 'should return a list of objets': (obj) => obj.length > 0})){
        fail('status code was *not* 200 or shouldn\'t return a list of object');
    }

    sleep(1)
}
