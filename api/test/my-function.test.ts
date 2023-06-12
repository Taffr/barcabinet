import { myFunction } from '../src/my-function.js'
import { assert } from 'chai'

const subject = myFunction
describe('testing my function', () => {
  it('my function', () => {
    const result = subject(2,2)
    const expected = 'the result is 4'
    assert.equal(result, expected)
  })
})
