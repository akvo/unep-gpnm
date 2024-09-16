import React from 'react'
import { Trans } from '@lingui/macro'
import { Col, Row } from 'antd'


const LayerText = () => {
  return (
    <div>
      <Row gutter={[20, 16]}>
        <Col span={10}>
          <Trans>
            Approximately 25.000 tonnes of plastic goods were imported into
            Senegal in 2021, at an estimated worth of 472.342.000 USD in 2021.
            Plastic packaging is one of the forms of plastic that has a
            particularly short product lifetime and often can result in
            low-value, non-recyclable plastic waste.
          </Trans>
        </Col>
        <Col span={10}>
          <Trans>
            In Senegal, the imports of plastic packaging in 2021 were 36.000
            tonnes, equivalent to 78.642.000 USD. In the same year, the exports
            of plastic packaging were estimated at 8000 tonnes, valued at
            16.718.000 USD.
          </Trans>
        </Col>
      </Row>
    </div>
  )
}

export default LayerText
