import http from 'k6/http';
import { check, sleep, fail } from 'k6';
export let options = {

    stages: [
        { duration: '10s', target: 100 }, // below normal load
        { duration: '1m', target: 100 },
        { duration: '10s', target: 1400 }, // spike to 1400 users
        { duration: '3m', target: 1400 }, // stay at 1400 for 3 minutes
        { duration: '10s', target: 100 }, // scale down. Recovery stage.
        { duration: '3m', target: 100 },
        { duration: '10s', target: 0 },
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
