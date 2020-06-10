module.exports = {
  headingRow: {
    display: 'flex',
    flexFlow: 'row nowarp',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  heading: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  viewerButton: {
    flex: '0 0 auto',
  },
  topControls: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'space-between',
  },
  collectionInfo: {
    display: 'flex',
    flexFlow: 'column nowrap',
    flex: '1 1 auto',
    '& > *': {
      marginBottom: 2,
    },
  },
  label: {
    display: 'inline-block',
    verticalAlign: 'top',
    width: 'auto',
  },
  values: {
    display: 'inline-block',
    marginLeft: 2,
    width: 'auto',
    '& button': {
      verticalAlign: 'bottom',
    },
  },
  buttons: {
    display: 'flex',
    flexFlow: 'column nowrap',
    margin: 2,
    '& > *:not(:last-child)': {
      marginBottom: 2,
    },
  },
  itemSection: {
    flexDirection: 'row',
    flexWrap: ['wrap', 'wrap', 'nowrap'],
    justifyContent: 'space-between',
  },
}
