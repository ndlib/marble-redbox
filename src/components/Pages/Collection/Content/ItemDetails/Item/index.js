import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  fetchAndParseCollection,
  updateItemFunctionBase,
} from 'context/CollectionContext'

import Loading from 'components/Layout/Loading'
import { useAPIContext } from 'context/APIContext'
import Content from './Content'

export const fetchStatus = {
  FETCHING: 'FETCHING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
}

const Item = ({ item, depth }) => {
  const [itemStatus, setItemStatus] = useState(fetchStatus.FETCHING)
  const [itemNeedsReloaded, setItemNeedsReloaded] = useState(1)
  const { graphqlApiKey, graphqlApiUrl } = useAPIContext()
  const [editableData, setEditableData] = useState(false)

  const id = item.id
  useEffect(() => {
    const abortController = new AbortController()
    fetchAndParseCollection(id, graphqlApiUrl, graphqlApiKey, abortController)
      .then((result) => {
        setEditableData(result)
        setItemStatus(fetchStatus.SUCCESS)
      })
      .catch((error) => {
        console.error(error)
        // setErrorMsg(error)
        // setCollectionStatus(fetchStatus.ERROR)
      })
  }, [graphqlApiKey, graphqlApiUrl, id, itemNeedsReloaded])

  const updateItemFunction = ({ itemId, generalDefaultFilePath, generalObjectFileGroupId, generalPartiallyDigitized }) => {
    const abortController = new AbortController()
    console.log(itemId, generalDefaultFilePath, generalObjectFileGroupId, generalPartiallyDigitized, graphqlApiKey, graphqlApiUrl, abortController)

    updateItemFunctionBase({
      itemId: itemId,
      generalDefaultFilePath: generalDefaultFilePath,
      generalObjectFileGroupId: generalObjectFileGroupId,
      generalPartiallyDigitized: generalPartiallyDigitized,
      graphqlApiKey: graphqlApiKey,
      graphqlApiUrl: graphqlApiUrl,
      abortController: abortController })
      .then(() => {
        setItemNeedsReloaded(itemNeedsReloaded + 1)
      }).catch((error) => {
        console.error(error)
        // setErrorMsg(error)
        // setCollectionStatus(fetchStatus.ERROR)
      })
  }

  if (itemStatus === fetchStatus.FETCHING) {
    return (<Loading />)
  } else {
    return (<Content item={editableData} updateItemFunction={updateItemFunction} depth={depth} />)
  }
}

Item.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    level: PropTypes.string.isRequired,
    objectFileGroupId: PropTypes.string,
    collectionId: PropTypes.string.isRequired,
    defaultFilePath: PropTypes.string,
    partiallyDigitized: PropTypes.bool,
    items: PropTypes.array,
  }).isRequired,
  depth: PropTypes.number,
  updateItemFunction: PropTypes.func.isRequired,
}

Item.defaultProps = {
  depth: 0,
  index: 0,
}

export default Item
