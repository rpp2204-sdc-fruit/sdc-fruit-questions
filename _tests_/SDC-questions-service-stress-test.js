import http from 'k6/http';
import { check, sleep } from 'k6';
export const options = {
  scenarios: {
    constant_request_rate: {
      executor: 'constant-arrival-rate',
      rate: 2300,
      timeUnit: '1s',
      duration: '30s',
      preAllocatedVUs: 2000, // how large the initial pool of VUs would be
      maxVUs: 3000, // if the preAllocatedVUs are not enough, we can initialize more
    },
  },
};

const TOTAL_PRODUCTS = 899855;
const TOTAL_QUESTIONS = 3518964;
let total;

const endpoint = 'Q';

if (endpoint === 'Q') {
  total = TOTAL_PRODUCTS;
}
if (endpoint === 'A') {
  total = TOTAL_QUESTIONS;
}

export default function () {
  const min = Math.floor(0.9 * total);
  const max = total;
  const id = Math.floor(Math.random() * (max - min)) + min;
  let res;
  if (endpoint === 'Q') {
    res = http.get(`http://127.0.0.1:3002/questions/?product_id=${id}`);
  }
  if (endpoint === 'A') {
    res = http.get(`http://127.0.0.1:3002/questions/${id}/answers`);
  }

  check(res, { 'status was 200': (r) => r.status == 200 });
  check(res, { 'status was 404': (r) => r.status == 404 });
  check(res, { 'status was 500': (r) => r.status == 500 });
  // sleep(1);
}
