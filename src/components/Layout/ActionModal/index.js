/** @jsx jsx */
import PropTypes from 'prop-types'
import ReactModal from 'react-modal'
import { IconContext } from 'react-icons'
import { MdClose } from 'react-icons/md'
import typy from 'typy'
import { BaseStyles, useThemeUI, Styled, jsx } from 'theme-ui'
import sx from './sx'

const ActionModal = ({
  contentLabel,
  isOpen,
  closeFunc,
  fullscreen = false,
  children,
}) => {
  const context = useThemeUI()
  const iconColor = typy(context, 'theme.colors.background').safeString || '#fff'
  const appElement = typeof document !== 'undefined' ? document.getElementById('gatsby-focus-wrapper') : null
  return (
    <ReactModal
      style={modalStyle(fullscreen)}
      closeTimeoutMS={200}
      appElement={appElement}
      isOpen={isOpen}
      contentLabel={contentLabel}
      onRequestClose={closeFunc}
      shouldCloseOnOverlayClick
    >
      <div sx={sx.wrapper}>
        <Styled.h1 sx={sx.heading}>{contentLabel}</Styled.h1>
        <button
          onClick={closeFunc}
          sx={sx.button}
        >
          <IconContext.Provider value={{ color: iconColor }}>
            <MdClose />
          </IconContext.Provider>
        </button>
      </div>
      <BaseStyles>
        <div sx={sx.content}>{children}</div>
      </BaseStyles>
    </ReactModal>
  )
}

ActionModal.propTypes = {
  contentLabel: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  closeFunc: PropTypes.func.isRequired,
  fullscreen: PropTypes.bool,
  children: PropTypes.node,
}

export default ActionModal

export const modalStyle = (fullscreen) => {
  return {
    overlay: {
      zIndex: '10',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    content: {
      border: 'none',
      borderRadius: '.5rem',
      padding: '0',
      top: '40px',
      left: '50%',
      right: 'auto',
      bottom: fullscreen ? '40px' : 'auto',
      marginRight: '-50%',
      position: 'absolute',
      overflow: 'hidden',
      height: fullscreen ? 'calc(100vh - 80px)' : 'auto',
      width: fullscreen ? '95vw' : '650px',
      maxWidth: '95vw',
    },
  }
}
