import React from 'react'
import { shallow } from 'enzyme'
import AllCollections from './'
import * as APIContext from 'context/APIContext'

describe('AllCollections', () => {
  test('should render something', () => {
    jest.spyOn(APIContext, 'useAPIContext').mockImplementationOnce(() => {
      return {
        collectionsURL: 'www.collection.url/path',
      }
    })
    const props = {
      location: {
        path: 'here',
      },
    }
    const wrapper = shallow(<AllCollections {...props} />)

    expect(wrapper.isEmptyRender()).toBe(false)
  })
})
