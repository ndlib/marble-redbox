/** @jsx jsx */
import { useState } from 'react'
import {
  Button,
  Label,
  Input,
  jsx,
} from 'theme-ui'
import ActionModal from 'components/Layout/ActionModal'

const rightAlign = {
  display: 'block',
  textAlign: 'right',
}

const AddNew = () => {
  const [open, setOpen] = useState(false)
  return (
    <span sx={rightAlign}>
      <Button
        variant='primary'
        onClick={() => setOpen(true)}
      >Import a New Collection
      </Button>
      <ActionModal
        isOpen={open}
        contentLabel='Import a New Collection'
        closeFunc={() => setOpen(false)}
      >
        <Label
          htmlFor='add'
          mt={1}
        >Enter ArchiveSpace URL
        </Label>
        <Input
          name='add'
          id='add'
          mt={3}
        />
        <span sx={rightAlign}>
          <Button
            mt={3}
            onClick={() => {
              // do stuff then close
              setOpen(false)
            }}
          >Save
          </Button>
        </span>
      </ActionModal>
    </span>
  )
}

export default AddNew
