import React from 'react'
import { shallow } from 'enzyme'
import Content from './'
import AddNew from './AddNew'
import CollectionsList from './CollectionsList'
import SearchFilter from 'components/Shared/SearchFilter'

let wrapper
let props

describe('AllCollections/Content', () => {
  beforeEach(() => {
    props = {
      collections: [
        {
          id: 'abcd',
          url: 'here.url',
          title: 'my title',
        },
      ],
    }
    wrapper = shallow(<Content {...props} />)
  })

  test('should include AddNew button', () => {
    expect(wrapper.find(AddNew).exists()).toBe(true)
  })

  test('should include CollectionsList button', () => {
    const list = wrapper.find(CollectionsList)
    expect(list.exists()).toBe(true)
    expect(list.props().collections).toEqual(props.collections)
  })

  test('should include SearchFilter', () => {
    const search = wrapper.find(SearchFilter)
    expect(search.exists()).toBe(true)
    expect(search.props().data).toEqual(props.collections)
  })
})
