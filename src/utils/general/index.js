import PropTypes from 'prop-types'

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
