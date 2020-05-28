import React from 'react'
import { shallow } from 'enzyme'
import Layout from './'

describe('Layout', () => {
  test('testing test', () => {
    const wrapper = shallow(<Layout><div>CHILDREN</div></Layout>)
    console.log(wrapper.debug())
  })
})
