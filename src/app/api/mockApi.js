import {sampleData} from './data'
import {delay} from 'app/common/utils/util'

export function fetchSampleData() {
  return delay(1000).then(function () {
    return Promise.resolve(sampleData)
  })
}