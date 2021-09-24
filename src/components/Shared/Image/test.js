import React from 'react'
import { mount } from 'enzyme'
import ImageComponent from './'

let wrapper
let props

describe('Image', () => {
  beforeEach(() => {
    props = {
      src: 'image.url',
      region: 'full',
      title: 'test title',
      frame: true,
    }
    wrapper = mount(<ImageComponent {...props} />)
  })

  test('should render an image with alt text and a title', () => {
    const img = wrapper.find('img')
    expect(img.exists()).toBe(true)
    expect(img.props().src).toEqual('image.url')
    expect(img.props().title).toEqual('test title')
    expect(img.props().alt).toBeTruthy()
  })
})
