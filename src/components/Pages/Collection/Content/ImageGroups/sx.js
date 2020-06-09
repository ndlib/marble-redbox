module.exports = {
  container: {
    maxWidth: ['100vw', '100vw', '20em'],
    ml: [0, 0, 2],
    mt: 3,
    textAlign: 'right',
  },
  typeSelect: {
    justifyContent: 'space-evenly',
    mb: 2,
  },
  typeButton: {
    fontSize: 3,
  },
  typeButtonSelected: {
    fontSize: 3,
    fontWeight: '700',
    color: 'black',
  },
  itemGroup: {
    cursor: 'pointer',
  },
  selected: {
    fontWeight: '500',
    ':after': {
      content: '" *"',
    },
  },
  itemText: {
    mb: 4,
  },
}
