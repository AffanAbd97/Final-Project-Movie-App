import React, { useEffect, useState } from 'react'

import { API_ACCESS_TOKEN } from '@env'
import axios from 'axios'

import CategoryView from './CategoryView'
import { Genre, ScreenState } from '../../types/app'
import Loading from '../../screen/Loading'
import { Layout, Text } from '@ui-kitten/components'

const CategorySearch = () => {
  const [genres, setGenres] = useState<Genre[]>([])
  const [screen, setScreen] = useState<ScreenState>(ScreenState.Loading)
  const getGenres = async (): Promise<void> => {
    setScreen(ScreenState.Loading)
    const url = `https://api.themoviedb.org/3/genre/movie/list`

    try {
      const response = await axios.get(url, {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${API_ACCESS_TOKEN}`,
        },
      })

      const data = response.data
      setGenres(data.genres)

      setScreen(ScreenState.Success)
    } catch (error) {
      console.log(error)
      setScreen(ScreenState.Error)
    }
  }
  useEffect(() => {
    getGenres()
  }, [])
  const RenderComponent = (): JSX.Element => {
    switch (screen) {
      case ScreenState.Success:
        return <CategoryView genres={genres} />
      case ScreenState.Loading:
        return (
          <Layout style={{ height: '80%' }}>
            <Loading />
          </Layout>
        )
      case ScreenState.Error:
        return (
          <Layout>
            <Text>No Categories</Text>
          </Layout>
        )
      default:
        return <Layout />
    }
  }
  return <RenderComponent />
}

export default CategorySearch
