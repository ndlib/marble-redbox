import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  fetchAndParseCollection,
  updateItemFunctionBase,
} from 'context/CollectionContext'

import Loading from 'components/Layout/Loading'
import { useAPIContext } from 'context/APIContext'
import { useAuthContext } from 'context/AuthContext'
import Content from './Content'

export const fetchStatus = {
  FETCHING: 'FETCHING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
}

const Item = ({ item, depth }) => {
  const [itemStatus, setItemStatus] = useState(fetchStatus.FETCHING)
  const [itemNeedsReloaded, setItemNeedsReloaded] = useState(1)
  const { graphqlApiUrl } = useAPIContext()
  const { token } = useAuthContext()
  const [editableData, setEditableData] = useState(false)

  const id = item.id
  useEffect(() => {
    if (!token) {
      return
    }

    const abortController = new AbortController()
    fetchAndParseCollection(id, graphqlApiUrl, token, abortController)
      .then((result) => {
        setEditableData(result)
        setItemStatus(fetchStatus.SUCCESS)
      })
      .catch((error) => {
        console.error(error)
        // setErrorMsg(error)
        // setCollectionStatus(fetchStatus.ERROR)
      })
  }, [token, graphqlApiUrl, id, itemNeedsReloaded])

  const updateItemFunction = ({ itemId, generalDefaultFilePath, generalImageGroupId, generalMediaGroupId, generalPartiallyDigitized }) => {
    const abortController = new AbortController()

    updateItemFunctionBase({
      itemId: itemId,
      generalDefaultFilePath: generalDefaultFilePath,
      generalImageGroupId: generalImageGroupId,
      generalMediaGroupId: generalMediaGroupId,
      generalPartiallyDigitized: generalPartiallyDigitized,
      token: token,
      graphqlApiUrl: graphqlApiUrl,
      abortController: abortController,
    })
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
  }).isRequired,
  depth: PropTypes.number,
}

Item.defaultProps = {
  depth: 0,
  index: 0,
}

export default Item
