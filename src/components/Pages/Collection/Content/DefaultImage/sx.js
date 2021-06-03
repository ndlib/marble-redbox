module.exports = {
  imageInfo: {
    display: 'inline-block',
    verticalAlign: 'top',
    marginLeft: 3,
  },
  imageInfoFlex: {
    maxWidth: '500px',
    flexFlow: 'column nowrap',
    '> button:not(:first-of-type)': {
      marginTop: '1rem',
    },
  },
  imageContainer: {
    display: 'block',
    position: 'relative',
  },
  removeIcon: {
    fontSize: '30px',
    position: 'absolute',
    right: '4px',
    top: '4px',
  },
}
