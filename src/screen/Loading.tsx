import { Layout, Spinner } from '@ui-kitten/components'
import React from 'react'

const Loading = () => {
  return (
    <Layout
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      }}
    >
      <Spinner status="info" size="large" />
    </Layout>
  )
}

export default Loading
