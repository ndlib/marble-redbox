import React from 'react'
import { shallow } from 'enzyme'
import ErrorMessage from './'

let props
let wrapper

describe('ErrorMessage', () => {
  beforeEach(() => {
    console.log = jest.fn()
    console.warn = jest.fn()
    console.error = jest.fn()

    props = {
      error: {
        foo: 'bar',
        complex: 'error',
      },
    }
    wrapper = shallow(<ErrorMessage {...props} />)
  })

  test('should stringify error objects', () => {
    expect(wrapper.text()).toEqual(JSON.stringify(props.error))
  })
})
