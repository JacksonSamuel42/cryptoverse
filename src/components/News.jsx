import React from 'react'
import moment from 'moment'
import { Select, Typography, Row, Col, Avatar, Card } from 'antd'

import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi'
import { useGetCryptosQuery } from '../services/cryptoApi'

const { Title, Text } = Typography
const { option } = Select
const demoImage = 'https://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg'

const News = ({ simplified }) => {
  const count = simplified ? 6 : 12
  const [newsCategory, setNewsCategory] = React.useState('Cryptocurrency')
  const { data: cryptoNews } = useGetCryptoNewsQuery({ newsCategory, count })
  const { data } = useGetCryptosQuery(100)

  if (!cryptoNews?.value) return 'Loading...'

  return (
    <Row gutter={[24, 24]}>
      <Col xs={24}>
        {!simplified && (
          <Col span={14}>
            <Select
              showSearch
              className='select-news'
              placeholder="Select a crypto"
              optionFilterProp='children'
              onChange={(value) => setNewsCategory(value)}
              filterOption={(input, option) => option.children.toLocaleLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
              <Option value="Cryptocurrency">CryptoCurrency</Option>
              {data?.data?.coins.map((coin) => <Option key={coin.uuid} value={coin.name}>{coin.name}</Option>)}
            </Select>
          </Col>
        )}
      </Col>
      {cryptoNews.value.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className='news-card'>
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className='news-title' level={4}>
                  {news.name}
                </Title>
                <img style={{ maxWidth: '200px', maxHeight: '100px' }} src={news?.image?.thumbnail?.contentUrl || demoImage} alt="news" />
              </div>
              <p>
                {news.description > 100 ? `${news.description.substring(0, 100)}...` : news.description}
              </p>
              <div className="provider-container">
                <div>
                  <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt="news" />
                  <Text className='provider-name'>{news.provider[0]?.name}</Text>
                </div>
                <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  )
}

export default News