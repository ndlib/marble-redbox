import React from 'react'
import { shallow } from 'enzyme'
import * as Gatsby from 'gatsby'
import AuthWrapper from './'
import { AuthContext } from 'context/AuthContext'

let wrapper

describe('AuthWrapper', () => {
  beforeEach(() => {
    const useStaticQuery = jest.spyOn(Gatsby, 'useStaticQuery')
    useStaticQuery.mockImplementationOnce(() => ({
      site: {
        siteMetadata: {
          auth: {
            url: 'https://okta.nd.edu',
            clientId: '1234',
            issuer: 'https://okta.com/issuer/url',
          },
        },
      },
    }))
    wrapper = shallow(<AuthWrapper><div>test</div></AuthWrapper>)
  })

  test('should wrap children in an AuthContext provider', () => {
    expect(wrapper.type()).toEqual(AuthContext.Provider)
    expect(wrapper.html()).toEqual('<div>test</div>')
  })
})
