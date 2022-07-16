import http from 'k6/http';
import { check, sleep, fail } from 'k6';
export let options = {

    stages: [

        { duration: '2m', target: 100 }, // below normal load
        { duration: '5m', target: 100 },
        { duration: '2m', target: 200 }, // normal load
        { duration: '5m', target: 200 },
        { duration: '2m', target: 300 }, // around the breaking point
        { duration: '5m', target: 300 },
        { duration: '2m', target: 400 }, // beyond the breaking point
        { duration: '5m', target: 400 },
        { duration: '10m', target: 0 }, // scale down. Recovery stage.
    ],
};

export default function() {
    const URL = "http://localhost:5500/jobs_offers";
    const get_jobs_offers = http.get(`${URL}`)

    if(!check(get_jobs_offers, { 'status code MUST be 200': (r) => r.status === 200},
        { 'should return a list of objets': (obj) => obj.length > 0})){
        fail('status code was *not* 200 or shouldn\'t return a list of object');
    }
    sleep(1)
}
