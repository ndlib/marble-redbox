import React, { useState } from 'react'
import { Button } from 'theme-ui'
import ActionModal from 'components/Layout/ActionModal'

const AddNew = () => {
  const [open, setOpen] = useState(false)
  return (
    <>
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
        <>Add new</>
      </ActionModal>
    </>
  )
}

export default AddNew
