import axios from 'axios'
import request from 'superagent'

export function getCandidateData() {

  return new Promise((resolve, reject) => {
    request
    .get('http://localhost:3000/api/products')
    .end((err, res) => {
      if (err) {
        reject(err)
        return
      }
      console.log(JSON.parse(res.text))
      resolve(JSON.parse(res.text))
    })
  })
}