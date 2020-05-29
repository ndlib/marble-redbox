/** @jsx jsx */
import { useState } from 'react'
import { Button, jsx } from 'theme-ui'
import ActionModal from 'components/Layout/ActionModal'

const AddNew = () => {
  const [open, setOpen] = useState(false)
  return (
    <span sx={{
      display: 'block',
      textAlign: 'right',
    }}
    >
      <Button
        variant='primary'
        onClick={() => setOpen(true)}
      >Import a New Collection
      </Button>
      <ActionModal
        isOpen={open}
        contentLabel='Import a New Collection'
        closeFunc={() => setOpen(false)}
        // fullscreen
      >
        Add new
      </ActionModal>
    </span>
  )
}

export default AddNew
