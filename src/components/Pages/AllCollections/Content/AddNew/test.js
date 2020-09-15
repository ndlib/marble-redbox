import React from 'react'
import { shallow } from 'enzyme'
import { Button } from 'theme-ui'
import ActionModal from 'components/Layout/ActionModal'
import AddNew from './'

let wrapper

describe('AddNew', () => {
  beforeEach(() => {
    wrapper = shallow(<AddNew />)
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
