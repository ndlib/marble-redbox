import React from 'react'
import { shallow } from 'enzyme'
import Content from './'
import ImportCollection from './ImportCollection'
import CollectionsList from './CollectionsList'
import SearchFilter from 'components/Shared/SearchFilter'
import { fetchStatus } from '../index'

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
      importCollectionStatus: fetchStatus.NOT_FETCHED,
      importCollectionFunction: jest.fn(),
    }
    wrapper = shallow(<Content {...props} />)
  })

  test('should include ImportCollection button', () => {
    expect(wrapper.find(ImportCollection).exists()).toBe(true)
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
