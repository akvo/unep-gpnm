import React from 'react'
import styles from './index.module.scss'

import LayerText from './partials'
import { Row, Col, Button, Tooltip } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'


const CountryOverview = () => {
  return (
    <div className="trade-info-container">
      <Row className="header-row">
        <Col span={18}>
          <div className="heading-container">
            <span className="caps-heading">SENEGAL</span>
            <h3 className="trade-heading">Trade</h3>
          </div>
        </Col>
        <Col span={6} className="update-container">
          <span className="last-updated">
            <span className="dot"></span> Data last updated: 02-20-22
          </span>
          <Tooltip title="Update country data by sending a request to the GPML Data Hub team.">
            <Button className="update-button" type="primary">
              Request Data Update
            </Button>
          </Tooltip>
        </Col>
      </Row>
      <Row gutter={[32, 16]} className="trade-text-container">
        <Col span={12}>
          <p>
            Approximately <strong>25.000 tonnes</strong> of plastic goods were
            imported into Senegal in 2021, at an estimated worth of{' '}
            <strong>472.342.000 USD</strong> in 2021. Plastic packaging is one
            of the forms of plastic that has a particularly short product
            lifetime and often can result in low-value, non-recyclable plastic
            waste.
          </p>
        </Col>
        <Col span={12}>
          <p>
            In Senegal, the imports of plastic packaging in 2021 were{' '}
            <strong>36.000 tonnes</strong>, equivalent to{' '}
            <strong>78.642.000 USD</strong>. In the same year, the exports of
            plastic packaging were estimated at <strong>8000 tonnes</strong>,
            valued at <strong>16.718.000 USD</strong>.
          </p>
        </Col>
      </Row>
    </div>
  )
}

export default CountryOverview
