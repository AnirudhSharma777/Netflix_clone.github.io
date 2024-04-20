import React from 'react'
import Main from '../components/Main'
import Row from '../components/Row'
import request from '../request'

const Home = () => {
  return (
    <div>
      <Main/>
      <Row rowid='1' title='UpComing' fetchURL={request.requestUpcoming}/>
      <Row rowid='2' title='Popular' fetchURL={request.requestPopular}/>
      <Row rowid='3' title='Trending' fetchURL={request.requestTrending}/>
      <Row rowid='4' title='TopRated' fetchURL={request.requestTopRated}/>
      <Row rowid='5' title='Horror' fetchURL={request.requestHorror}/>
    </div>
  )
}

export default Home
