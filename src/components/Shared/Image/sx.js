module.exports = {
  picture: (frame) => (
    frame ? {
      boxSizing: 'content-box',
      display: 'inline-block',
      border: '12px solid black',
    } : {
      display: 'inline-block',
    }
  ),
  image: (frame, width, height) => ({
    backgroundColor: 'gray.2',
    border: 'none',
    boxSizing: 'content-box',
    display: 'block',
    fontFamily: 'heading',
    fontSize: '1.5rem',
    height: 'auto',
    margin: '0 auto',
    lineHeight: '2rem',
    textAlign: 'center',
    maxWidth: width || 'auto',
    maxHeight: height || 'auto',
  }),
}
