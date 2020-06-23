module.exports = {
  wrapper: {
    backgroundColor: 'primary',
    display: 'block',
    overflow: 'hidden',
    width: '100%',
    zIndex: '1',
  },
  heading: {
    color: 'background',
    display: 'inline-block',
    fontFamily: 'heading',
    fontSize: '1.5rem',
    lineHeight: '1.5rem',
    margin: '0',
    maxWidth: 'calc(100% - 2.5rem)',
    overflow: 'hidden',
    padding: '1rem',
    position: 'fixed',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  button: {
    backgroundColor: 'transparent',
    border: 'none',
    color: 'background',
    cursor: 'pointer',
    float: 'right',
    fontSize: '1.5rem',
    lineHeight: '1.5rem',
    outline: 'none',
    padding: '1rem',
  },
  svg: {
    verticalAlign: 'middle',
  },
  content: {
    maxHeight: 'calc(100vh - 80px - 3rem)',
    padding: '1rem',
    overflowX: 'hidden',
    overflowY: 'auto',
    position: 'relative',
  },
}
