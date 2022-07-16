import http from 'k6/http';
import { check, sleep, fail } from 'k6';
export let options = {

    stages: [
        { duration: '2m', target: 400 }, // ramp up to 400 users
        { duration: '1h00m', target: 400 }, // stay at 400 for ~4 hours
        { duration: '2m', target: 0 }, // scale down. (optional)
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
