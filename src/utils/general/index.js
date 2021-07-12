/* eslint complexity: ["warn", 20] */
import PropTypes from 'prop-types'
import typy from 'typy'

export const orderedListStyle = (depth = 0) => {
  switch (depth) {
    case 0:
      return 'upper-roman'
    case 1:
      return 'lower-roman'
    case 2:
      return 'upper-alpha'
    case 3:
      return 'lower-alpha'
    default:
      return 'decimal'
  }
}

// From StackOverflow, with modifications: https://stackoverflow.com/a/41358305/1599426
export const convertToRoman = (num) => {
  const roman = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1,
  }
  let str = ''

  for (const key of Object.keys(roman)) {
    const quantity = Math.floor(num / roman[key])
    num -= quantity * roman[key]
    str += key.repeat(quantity)
  }

  return str
}

// https://stackoverflow.com/a/57117536/1599426
export const requireAtLeastOne = (propsToCheck) => {
  return (props, propName, componentName) => {
    if (!props.service && !props.src) {
      return new Error(`One of ${Object.keys(propsToCheck).join(', ')} is required by '${componentName}' component.`)
    }
    PropTypes.checkPropTypes(propsToCheck, props, propName, componentName)
  }
}

export const pluralize = (listOrCount, singularForm, pluralForm) => {
  singularForm = singularForm || '' // If omitted, will return empty string in singular form
  pluralForm = pluralForm || (singularForm + 's') // If omitted, will append s to singular form
  return (typy(listOrCount).isNumber ? listOrCount : listOrCount.length) === 1 ? singularForm : pluralForm
}

export const compareStrings = (a, b) => {
  // Null, undefined, and empty string get sorted to the end of the list.
  // Otherwise, sort alphabetically ignoring case
  if (!a && !b) {
    return 0
  } else if (a && !b) {
    return -1
  } else if (b && !a) {
    return 1
  }

  return a.toString().localeCompare(b, undefined, { sensitivity: 'accent', ignorePunctuation: true })
}

export const copyrightStatements = [
  {
    uri: 'http://rightsstatements.org/vocab/InC/1.0/',
    name: 'IN COPYRIGHT',
    inCopyright: true,
  },
  {
    uri: 'http://rightsstatements.org/vocab/InC-OW-EU/1.0/',
    name: 'IN COPYRIGHT - EU ORPHAN WORK',
    inCopyright: true,
  },
  {
    uri: 'http://rightsstatements.org/vocab/InC-EDU/1.0/',
    name: 'IN COPYRIGHT - EDUCATIONAL USE PERMITTED',
    inCopyright: true,
  },
  {
    uri: 'http://rightsstatements.org/vocab/InC-NC/1.0/',
    name: 'IN COPYRIGHT - NON-COMMERCIAL USE PERMITTED',
    inCopyright: true,
  },
  {
    uri: 'http://rightsstatements.org/vocab/InC-RUU/1.0/',
    name: 'IN COPYRIGHT - RIGHTS-HOLDER(S) UNLOCATABLE OR UNIDENTIFIABLE',
    inCopyright: true,
  },
  {
    uri: 'http://rightsstatements.org/vocab/NoC-CR/1.0/',
    name: 'NO COPYRIGHT - CONTRACTUAL RESTRICTIONS',
    inCopyright: false,
  },
  {
    uri: 'http://rightsstatements.org/vocab/NoC-NC/1.0/',
    name: 'NO COPYRIGHT - NON-COMMERCIAL USE ONLY',
    inCopyright: false,
  },
  {
    uri: 'http://rightsstatements.org/vocab/NoC-OKLR/1.0/',
    name: 'NO COPYRIGHT - OTHER KNOWN LEGAL RESTRICTIONS',
    inCopyright: false,
  },
  {
    uri: 'http://rightsstatements.org/vocab/NoC-US/1.0/',
    name: 'NO COPYRIGHT - UNITED STATES',
    inCopyright: false,
  },
  {
    uri: 'http://rightsstatements.org/vocab/CNE/1.0/',
    name: 'COPYRIGHT NOT EVALUATED',
  },
  {
    uri: 'http://rightsstatements.org/vocab/UND/1.0/',
    name: 'COPYRIGHT UNDETERMINED',
  },
  {
    uri: 'http://rightsstatements.org/vocab/NKC/1.0/',
    name: 'NO KNOWN COPYRIGHT',
  },
]
