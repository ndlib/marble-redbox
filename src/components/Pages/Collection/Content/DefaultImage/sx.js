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
}
