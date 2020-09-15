import React from 'react'
import { mount } from 'enzyme'
import SearchFilter from './'
import { Input } from 'theme-ui'

let wrapper
let props

describe('SearchFilter', () => {
  beforeEach(() => {
    props = {
      data: [
        {
          fruits: 'pear apple peach',
        },
        {
          fruits: 'orange',
          nonsense: 'apple',
        },
        {
          fruits: 'banana',
          otherFruits: 'pineapple',
          nonsense: 'potato',
        },
      ],
      fields: [
        'fruits',
        'otherFruits',
      ],
      onChange: jest.fn(),
    }
    wrapper = mount(<SearchFilter {...props} />)
  })

  test('should return all objects with empty filter', () => {
    const input = wrapper.find(Input)
    expect(input.props().onChange).toEqual(expect.any(Function))

    // Call the change event with filter value
    input.simulate('change')
    expect(props.onChange).toHaveBeenCalledWith(props.data)
  })

  test('should filter objects using single term', () => {
    const input = wrapper.find(Input)
    expect(input.props().onChange).toEqual(expect.any(Function))

    // Call the change event with filter value
    input.simulate('change', {
      target: {
        value: 'apple',
      },
    })
    expect(props.onChange).toHaveBeenCalledWith([
      props.data[0],
      props.data[2],
    ])
  })

  test('should use AND filter for multi-term search', () => {
    const input = wrapper.find(Input)
    expect(input.props().onChange).toEqual(expect.any(Function))

    // Call the change event with filter value
    input.simulate('change', {
      target: {
        value: 'apple banana',
      },
    })
    expect(props.onChange).toHaveBeenCalledWith([
      props.data[2],
    ])
  })
})
