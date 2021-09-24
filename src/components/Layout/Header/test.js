import React from 'react'
import { mount } from 'enzyme'
import Header from './'
import { Link } from 'gatsby'

let wrapper
let props

describe('Header', () => {
  beforeEach(() => {
    props = {
      siteTitle: 'site title here',
    }
    wrapper = mount(<Header {...props} />)
  })

  test('should render a link to the home page', () => {
    const link = wrapper.find(Link)
    expect(link.exists()).toBe(true)
    expect(link.text()).toEqual('site title here')
  })
})
