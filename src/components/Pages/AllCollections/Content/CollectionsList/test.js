import React from 'react'
import { shallow } from 'enzyme'
import { Link } from 'gatsby'
import CollectionsList from './'

let wrapper
let props

describe('CollectionsList', () => {
  beforeEach(() => {
    props = {
      collections: [
        {
          id: 'abcd',
          url: 'here.url',
          title: 'my title',
        },
        {
          id: 'xyzcollection',
          url: 'you.collect/something',
          title: 'we in here',
        },
      ],
    }
    wrapper = shallow(<CollectionsList {...props} />)
  })

  test('should add a Link for each collection', () => {
    expect(props.collections.length).toBeGreaterThan(0)

    const links = wrapper.find(Link)
    props.collections.forEach(collection => {
      expect(links.findWhere(el => el.props().to && el.props().to.toString().includes(collection.id)).exists()).toBe(true)
    })
  })
})
