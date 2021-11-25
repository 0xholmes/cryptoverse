import React from "react"
import { Row, Col, Collapse, Typography, Avatar } from "antd"
import HTMLReactParser from "html-react-parser"
import millify from "millify"

import { useGetExchangesQuery } from "../services/cryptoApi"
import Loader from "./Loader"

const { Panel } = Collapse
const { Text } = Typography

const Exchanges = () => {
  const { data, isFetching } = useGetExchangesQuery()
  const exchangeList = data?.data?.exchanges

  console.log(exchangeList)

  if (isFetching) return <Loader />

  return (
    <>
      <Row>
        <Col span={6}>Exchanges</Col>
        <Col span={6}>24h Trading Volume</Col>
        <Col span={6}>Trading Pairs</Col>
        <Col span={6}>Website</Col>
      </Row>
      <Row>
        {exchangeList.map(exchange => {
          const {
            uuid,
            rank,
            iconUrl,
            name,
            volume,
            numberOfMarkets,
            websiteUrl,
            description,
          } = exchange
          return (
            <Col span={24}>
              <Collapse>
                <Panel
                  key={uuid}
                  showArrow={false}
                  header={
                    <Row key={uuid}>
                      <Col span={6}>
                        <Text>
                          <strong>{rank}</strong>
                        </Text>
                        <Avatar className="exchange-image" src={iconUrl} />
                        <Text>
                          <strong>{name}</strong>
                        </Text>
                      </Col>
                      <Col span={6}>${millify(volume)}</Col>
                      <Col span={6}>{millify(numberOfMarkets)}</Col>
                      <Col span={6}>
                        <a href={websiteUrl} target="_blank">
                          {name}
                        </a>
                      </Col>
                    </Row>
                  }
                >
                  {HTMLReactParser(description || "No Result Found")}
                </Panel>
              </Collapse>
            </Col>
          )
        })}
      </Row>
    </>
  )
}

export default Exchanges
