/** @jsx jsx */
import { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Button,
  Label,
  Input,
  // Select,
  jsx,
} from 'theme-ui'
import ActionModal from 'components/Layout/ActionModal'
import Loading from 'components/Layout/Loading'
import ErrorMessage from 'components/Layout/ErrorMessage'
import { fetchStatus } from '../../index'

const rightAlign = {
  display: 'block',
  textAlign: 'right',
}

const errorStyle = {
  color: '#ff0000',
  marginTop: 2,
  wordBreak: 'break-all',
}

const successStyle = {
  color: '#006a00',
  marginTop: 2,
  wordBreak: 'break-all',
}

const defaultSource = 'ArchivesSpace'

const ImportCollection = ({ onSubmit, status }) => {
  const [open, setOpen] = useState(false)
  const [sourceSystem, setSourceSystem] = useState(defaultSource)
  const [itemUrl, setItemUrl] = useState()
  const [validationMessage, setValidationMessage] = useState(null)
  const urlInputRef = useRef()

  useEffect(() => {
    if (status === fetchStatus.SUCCESS) {
      setValidationMessage((
        <Box sx={successStyle}>
          <div>Successfully added item to ingest queue.</div>
          <div>Collection should be available within 24 hours.</div>
        </Box>
      ))
      setItemUrl(null)
      if (urlInputRef.current) {
        urlInputRef.current.value = ''
        urlInputRef.current.focus()
      }
    }
  }, [status])

  // const handleSourceChange = (event) => {
  //   setValidationMessage(null)
  //   setSourceSystem(event.target.value)
  // }

  const handleUrlChange = (event) => {
    setValidationMessage(null)
    setItemUrl(event.target.value)
  }

  const onFormSubmit = (event) => {
    event.preventDefault()

    const isValid = validate()
    if (isValid) {
      onSubmit({
        itemUrl,
        sourceSystem,
      })
    }
  }

  const onClose = () => {
    setValidationMessage(null)
    setSourceSystem(defaultSource)
    setItemUrl(null)
    setOpen(false)
  }

  const validate = () => {
    const validations = {
      ArchivesSpace: {
        regex: /https?:\/\/.+?\/repositories\/\d+?\/resources\/\d+$/,
        example: 'https://archivesspace.example.edu/repositories/1/resources/1234',
      },
    }

    let errorComponent
    if (!Object.keys(validations).includes(sourceSystem)) {
      errorComponent = <Box sx={errorStyle}>Invalid source system.</Box>
    } else if (!itemUrl.match(validations[sourceSystem].regex)) {
      errorComponent = (
        <Box sx={errorStyle}>
          <div>Item ID does not match expected pattern for source system.</div>
          <div>Example: {validations[sourceSystem].example}</div>
        </Box>
      )
    }

    setValidationMessage(errorComponent)
    return !errorComponent
  }

  const statusMessage = validationMessage ||
    (status === fetchStatus.ERROR ? <ErrorMessage error='An error occurred while attempting to import item.' /> : null)
  return (
    <span>
      <Button variant='primary' onClick={() => setOpen(true)}>
        Import a New Collection
      </Button>
      <ActionModal
        isOpen={open}
        contentLabel='Import a New Collection'
        closeFunc={onClose}
      >
        <form onSubmit={onFormSubmit}>
          <Label htmlFor='itemUrl' mt={1}>Enter Item ID/URL</Label>
          <Input name='itemUrl' id='itemUrl' mt={3} autoComplete='off' onChange={handleUrlChange} ref={urlInputRef} />
          {
          /*
          <Label htmlFor='sourceSystem' mt={4}>Source System</Label>
          <Select
            name='sourceSystem'
            onChange={handleSourceChange}
            autoComplete='off'
            mt={3}
            disabled
            defaultValue={defaultSource}
          >
            <option value=''>Choose an option...</option>
            <option>Aleph</option>
            <option>ArchivesSpace</option>
            <option>Curate</option>
            <option>EmbARK</option>
          </Select>
          */
          }
          {statusMessage}
          <div sx={rightAlign}>
            {status === fetchStatus.FETCHING ? (
              <Loading />
            ) : (
              <Button mt={3} onClick={onFormSubmit} disabled={!itemUrl || !sourceSystem}>
              Save
              </Button>
            )}
          </div>
        </form>
      </ActionModal>
    </span>
  )
}

ImportCollection.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
}

export default ImportCollection
