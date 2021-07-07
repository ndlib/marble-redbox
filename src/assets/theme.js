module.exports = {
  breakpoints: ['40em', '52em', '64em'],
  buttons: {
    primary: {
      cursor: 'pointer',
      '&:disabled': {
        cursor: 'not-allowed',
        backgroundColor: 'muted',
        color: 'mutedText',
      },
    },
    icon: {
      borderRadius: '4px',
      color: 'primary',
      cursor: 'pointer',
      fontSize: '1rem',
      minHeight: '24px',
      minWidth: '24px',
      height: 'auto',
      width: 'auto',
    },
    link: {
      background: 'none',
      border: 'none',
      color: 'secondary',
      cursor: 'pointer',
      textDecoration: 'none',
      margin: '0 0.5em',
      padding: '0 2px',
      '&:hover': {
        color: 'primary',
      },
    },
  },
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  fonts: {
    body:
      'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    heading: 'inherit',
    monospace: 'Menlo, monospace',
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 96],
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125,
  },
  colors: {
    text: '#111',
    background: '#fff',
    primary: '#0C2340',
    secondary: '#006BD6',
    muted: '#f6f6f6',
    mutedText: '#999999',
  },
  text: {
    heading: {
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      marginBottom: '0.5em',
    },
  },
  forms: {
    input: {
      '&:disabled': {
        cursor: 'not-allowed',
      },
    },
  },
  styles: {
    root: {
      backgroundColor: 'background',
      fontFamily: 'body',
      lineHeight: 'body',
      fontWeight: 'body',
      '& .ReactModal__Body--open': {
        overflowY: 'hidden', // Prevents page body from scrolling while modal is open
      },
      '& .ReactModal__Overlay': {
        opacity: '0',
        transition: 'opacity 200ms ease-in-out',
      },
      '& .ReactModal__Content': {
        transform: 'translate(-50%, -100px)',
        transition: '200ms ease-in-out',
      },
      '& .ReactModal__Overlay--after-open': {
        opacity: '1',
      },
      '& .ReactModal__Content--after-open': {
        transform: 'translate(-50%, 0)',
      },
      '& .ReactModal__Overlay--before-close': {
        opacity: '0',
      },
      '& .ReactModal__Content--before-close': {
        transform: 'translate(-50%, -100px)',
      },
      '& ul': {
        listStyle: 'none',
        paddingInlineStart: '0',
      },
      '& li': {
        padding: '0.5rem',
      },
      '& li:nth-of-type(odd)': {
        backgroundColor: 'muted',
      },
    },
    a: {
      color: 'secondary',
      textDecoration: 'none',
      '&:hover': {
        color: 'primary',
      },
    },
    h1: {
      variant: 'text.heading',
      fontSize: 5,
    },
    h2: {
      variant: 'text.heading',
      fontSize: 4,
    },
    h3: {
      variant: 'text.heading',
      fontSize: 3,
    },
    h4: {
      variant: 'text.heading',
      fontSize: 2,
    },
    h5: {
      variant: 'text.heading',
      fontSize: 1,
    },
    h6: {
      variant: 'text.heading',
      fontSize: 0,
    },
    hr: {
      color: 'primary',
      borderBottom: '2px solid',
    },
    pre: {
      fontFamily: 'monospace',
      overflowX: 'auto',
      code: {
        color: 'inherit',
      },
    },
    code: {
      fontFamily: 'monospace',
      fontSize: 'inherit',
    },
    table: {
      width: '100%',
      borderCollapse: 'separate',
      borderSpacing: 0,
    },
    th: {
      textAlign: 'left',
      borderBottomStyle: 'solid',
    },
    td: {
      textAlign: 'left',
      borderBottomStyle: 'solid',
    },
  },
}
