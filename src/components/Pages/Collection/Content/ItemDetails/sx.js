module.exports = {
  itemsList: {
    counterReset: 'collectionItems',
  },
  listItemHeader: (depth, listStyle) => ({
    '& > *': {
      display: 'inline-block',
    },
    '&:before': {
      content: `counter(collectionItems, ${listStyle})'.'`,
      counterIncrement: 'collectionItems',
      fontSize: 4 - Math.min(depth, 4), // This allows the counter to mirror the appropriate heading font size
      ml: '0.5em',
      mr: '1em',
    },
  }),
  expandHandle: (depth) => ({
    cursor: 'pointer',
    display: 'flex',
    flexFlow: 'row nowrap',
    fontSize: 4 - Math.min(depth, 4),
    ml: `${depth}rem`,
    '& > *': {
      display: 'inline-flex',
      flexFlow: 'row nowrap',
    },
  }),
  search: {
    mb: 3,
  },

}
