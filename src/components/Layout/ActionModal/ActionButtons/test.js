import React from 'react'
import { shallow } from 'enzyme'
import ActionButtons from './'

let wrapper

describe('ActionButtons', () => {
  beforeEach(() => {
    wrapper = shallow(<ActionButtons><div>test</div></ActionButtons>)
  })

  test('should render children', () => {
    expect(wrapper.children().html()).toEqual('<div>test</div>')
  })
})
