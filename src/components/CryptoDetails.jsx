import React from 'react'
import HTMLReactParser from 'html-react-parser'
import { useParams } from 'react-router-dom'
import millify from 'millify'
import { Col, Row, Typography, Select } from 'antd';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';

import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from '../services/cryptoApi';
import LineChart from './LineChart';

const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
  const { coinId } = useParams()
  const [timePeriod, setTimePeriod] = React.useState('7d')
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId)
  const { data: coinHistory } = useGetCryptoHistoryQuery({coinId, timePeriod})
  const cryptoDetails = data?.data?.coin

  if (isFetching) return 'Loading...'

  const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

  const stats = [
    { title: 'Price to USD', value: `$ ${millify(cryptoDetails.price) && millify(cryptoDetails.price)}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: cryptoDetails.rank, icon: <NumberOutlined /> },
    { title: '24h Volume', value: `$ ${millify(cryptoDetails['24hVolume']) && millify(cryptoDetails['24hVolume'])}`, icon: <ThunderboltOutlined /> },
    { title: 'Market Cap', value: `$ ${millify(cryptoDetails.marketCap) && millify(cryptoDetails.marketCap)}`, icon: <DollarCircleOutlined /> },
    { title: 'All-time-high(daily avg.)', value: `$ ${millify(cryptoDetails.allTimeHigh.price)}`, icon: <TrophyOutlined /> },
  ];

  const genericStats = [
    { title: 'Number Of Markets', value: cryptoDetails.numberOfMarkets, icon: <FundOutlined /> },
    { title: 'Number Of Exchanges', value: cryptoDetails.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Aprroved Supply', value: cryptoDetails.supply.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: 'Total Supply', value: `$ ${cryptoDetails.supply.total}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: `$ ${cryptoDetails.supply.circulating}`, icon: <ExclamationCircleOutlined /> },
  ];

  return (
    <Col className='coin-detail-container'>
      <Col className='coin-heading-container'>
        <Title level={2} className="coin-name">
          {cryptoDetails.name} Price
        </Title>
        <p>
          {cryptoDetails.name} live price in US dollars.
          view value statistic, market cap and supply'.
        </p>
      </Col>
      <Select
        defaultValue="7d"
        className="select-timeperiod"
        placeholder="Select Time Period"
        onChange={(value) => setTimePeriod(value)}
      >
        {time.map((data) => <Option key={data}>{data}</Option>)}
      </Select>
      <LineChart coinHistory={coinHistory} currentPrice={millify(cryptoDetails.price)} coinName={cryptoDetails.name}/>
      <Col className="stats-container">
        <Col className="coin-value-statistic">
          <Col className="coin-value-statistic-heading">
            <Title level={3} className="coin-details-heading">
              {cryptoDetails.name} value Statistics
            </Title>
            <p>
              An overview showing the stats of {cryptoDetails.name}
            </p>
          </Col>
          {stats.map((data, index) => (
            <Col key={index} className="coin-stats">
              <Col className="coin-stats-name">
                <Text>{data.icon}</Text>
                <Text>{data.title}</Text>
              </Col>
              <Text className='stats'>{data.value}</Text>
            </Col>
          ))}
        </Col>
        <Col className="others-stats-info">
          <Col className="coin-value-statistic-heading">
            <Title level={3} className="coin-details-heading">
              Other Statistics
            </Title>
            <p>
              An overview showing the stats of all Cryptocurrencies
            </p>
          </Col>
          {genericStats.map((data, index) => (
            <Col key={index} className="coin-stats">
              <Col className="coin-stats-name">
                <Text>{data.icon}</Text>
                <Text>{data.title}</Text>
              </Col>
              <Text className='stats'>{data.value}</Text>
            </Col>
          ))}
        </Col>
      </Col>
      <Col className='coin-desc-link'>
        <Row className='coin-desc'>
          <Title level={3} className="coin-details-heading">
            What is {cryptoDetails.name}
          </Title>
          {HTMLReactParser(cryptoDetails.description)}
        </Row>
        <Col className='coin-links'>
          <Title level={3} className="coin-details-heading">
            {cryptoDetails.name} Links
            {cryptoDetails.links.map((link, index) => (
              <Row className='coin-link' key={index}>
                <Title level={5} className="link-name">
                  {link.type} {': '}
                  <a href={link.url} target="_blank" rel="noreferrer">
                    {link.name}
                  </a>
                </Title>
              </Row>
            ))}
          </Title>
        </Col>
      </Col>
    </Col>
  )
}

export default CryptoDetails