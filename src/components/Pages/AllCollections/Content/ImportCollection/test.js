import React from 'react'
import { shallow } from 'enzyme'
import { Button } from 'theme-ui'
import ActionModal from 'components/Layout/ActionModal'
import ImportCollection from './'
import { fetchStatus } from '../../index'

let wrapper
let props

describe('ImportCollection', () => {
  beforeEach(() => {
    props = {
      onSubmit: jest.fn(),
      status: fetchStatus.SUCCESS,
    }
    wrapper = shallow(<ImportCollection {...props} />)
  })

  test('should open modal when clicking button', () => {
    // Make sure modal is not open initially
    const modal = wrapper.find(ActionModal)
    expect(modal.exists()).toBe(true)
    expect(modal.props().isOpen).toBe(false)

    const btn = wrapper.findWhere(el => el.type() === Button && el.text().includes('New Collection'))
    expect(btn.exists()).toBe(true)

    btn.simulate('click')

    expect(wrapper.find(ActionModal).props().isOpen).toBe(true)
  })
})
