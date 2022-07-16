import http from 'k6/http';
import { check, sleep, fail} from 'k6';

export default  function () {

    const options = {
        vus: 1, // 1 user looping for 1 minute
        duration: '1m',

        thresholds: {
            http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
        },
    };

const URL = "http://localhost:5500/jobs_offers";
const get_jobs_offers = http.get(`${URL}`)

const body = {
       
    "title": "new job for applicant",
    "date_start" : "2022-03-20",
    "street_number": 94190,
    "street": "rue albert camus",
    "postal_code": "1000",
    "city": "Créteil",
    "country": "France",
    "sector": "Informatique",
    "salary": "11 € par heure",
    "job_description": "Nam quis nulla reactgggggg",
    "applicant_description": "maitrise de node recat js ddggg",
    "company_description": "Nam quis nulla. Integer malesuada. In in enim a arcu imperdiet malesuada. Sed vel lectus. Donec odio urna, tempus molestie, porttitor ut, iaculis quis, sem. Phasellus rhoncus. Aenean id metus id velit ullamcorper pulvinar. Vestibulum fermentum tortor id mi. Pellentesque ipsum. Nulla non arcu lacinia neque faucibus fringilla. Nulla non lectus sed nisl molestie malesuada. Proin in tellus sit amet nibh dignissim sagittis. Vivamus luctus egestas leo. Maecenas sollicitudin. Nullam rhoncus aliquam",
    "contract_type": "CDI"

}

 let post_job_offer = http.post(URL, JSON.stringify(body), {
        headers: { 'Content-Type': 'application/json' },
 });

let update_job_offer = http.patch(`${URL}/6233eb156afd03179536841a`,
    JSON.stringify({"date_end" : "2022-03-25"}),
    {headers: { 'Content-Type': 'application/json' }})

    if(!check(get_jobs_offers, { 'status code MUST be 200': (r) => r.status === 200},
        { 'should return a list of objets': (obj) => obj.length > 0})){
        fail('status code was *not* 200');
    }
   if(!check(post_job_offer, { 'status is 201': (r) => r.status === 201})){
        fail('status code was *not* 201 trying to create');
    }
    if(!check(update_job_offer, { 'status code MUST be 200 after updating': (r) => r.status === 200})){
        fail('status code was *not* 200 trying to modify');
    }

    sleep(1);
}
