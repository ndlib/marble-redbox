/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import noImage from 'assets/images/noImage.svg'
import { jsx } from 'theme-ui'
import { requireAtLeastOne } from 'utils/general'
import sx from './sx'

// See https://iiif.io/api/image/2.1/#image-request-parameters for image server request parameters.
// eslint-disable-next-line complexity
const Image = ({
  src, // image source url
  service, // iiif Image service (if no src provided)
  region, // 'full', 'square', or format: `x,y,w,h`, `pct:x,y,w,h`
  width, // maximum width to display image at
  height, // maximum height to display image at
  alt, // alt text for the image
  title, // title attribute on image
  frame, // Put a frame around the image
}) => {
  // derive image from image src OR service OR use the default noImage
  const iifSize = (width || height) ? `${width || ''},${height || ''}` : 'max'
  const imageSrc = src || serviceURL(service, region, iifSize) || noImage
  return (
    <picture sx={sx.picture(frame)}>
      <img
        src={imageSrc}
        alt={alt || title}
        title={title || alt}
        sx={sx.image(frame, width, height)}
      />
    </picture>
  )
}

const requireOne = requireAtLeastOne({
  src: PropTypes.string,
  service: PropTypes.string,
})

Image.propTypes = {
  src: requireOne,
  service: requireOne,
  region: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  alt: PropTypes.string,
  title: PropTypes.string,
  frame: PropTypes.bool,
}

Image.defaultProps = {
  region: 'full',
  alt: 'a static image',
  frame: false,
}
export default Image

export const serviceURL = (service, region, size) => {
  let url
  if (service && service !== '') {
    url = `https://image-iiif.library.nd.edu/iiif/2/${service}/${region}/${size}/0/default.jpg`
  }
  return url
}
