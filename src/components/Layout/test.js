import React from 'react'
import { shallow } from 'enzyme'
import * as Gatsby from 'gatsby'
import AuthWrapper from './AuthWrapper'
import Header from './Header'
import Layout from './'

let wrapper

describe('Layout', () => {
  beforeEach(() => {
    const useStaticQuery = jest.spyOn(Gatsby, 'useStaticQuery')
    useStaticQuery.mockImplementationOnce(() => ({
      site: {
        siteMetadata: {
          title: 'test title',
        },
      },
    }))
    wrapper = shallow(<Layout><div>body</div></Layout>)
  })

  test('should render an AuthWrapper', () => {
    expect(wrapper.type()).toEqual(AuthWrapper)
  })

  test('should render Header with title', () => {
    const head = wrapper.find(Header)
    expect(head.exists()).toBe(true)
    expect(head.props().siteTitle).toEqual('test title')
  })
})
