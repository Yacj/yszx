import { describe, expect, it } from 'vitest'
import {isBasicType} from "../src/utils/is";
import { deepClone } from '../src/utils/object'

describe('deepClone', () => {
  it('copy object', () => {
    const obj = { a: 1, b: 2 }
    const copy = deepClone(obj)
    expect(copy).toEqual(obj)
    expect(copy).not.toBe(obj)
  })
})

describe('isBasicType', () => {
  it('isBasicType', () => {
    const test = null
    const test2 = 'test'
    const test3 = 1
    const un = undefined
    const obj = { a: 1, b: 2 }
    expect(isBasicType(test)).toBe(true)
    expect(isBasicType(test2)).toBe(true)
    expect(isBasicType(test3)).toBe(true)
    expect(isBasicType(un)).toBe(false)
    expect(isBasicType(obj)).toBe(false)
  })
})
