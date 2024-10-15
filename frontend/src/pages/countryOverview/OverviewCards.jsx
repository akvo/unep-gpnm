import React from 'react';
import { Card, Row, Col, Typography } from 'antd';

const { Title, Text } = Typography;

const SmallCards = () => {
  return (
    <div style={{ padding: '20px' }}>
      <Row gutter={16}>
        <Col xs={24} sm={12} lg={6}>
          <Card hoverable>
            <Text type="secondary">WASTE MANAGEMENT</Text>
            <Title level={3}>95% of Senegal’s solid waste generation is recycled</Title>
            <Text>
              The estimated municipal solid waste generation per capita at the national level in Senegal is 0.5 kg per person daily, 95% is collected.
            </Text>
            <br />
            <a href="#national-data">View national data →</a>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card hoverable>
            <Text type="secondary">PLASTIC TRADE</Text>
            <Title level={3}>Senegal collects 20% of plastic waste</Title>
            <Text>
              An estimated 2.131.423 tonnes of municipal solid waste (MSW) were generated in Senegal in 2022, of which 20% is collected and 10% is recycled.
            </Text>
            <br />
            <a href="#national-data">View national data →</a>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card hoverable>
            <Text type="secondary">PLASTIC GOVERNANCE</Text>
            <Title level={3}>Senegal...</Title>
            <Text>Find text highlight...</Text>
            <br />
            <a href="#national-data">View national data →</a>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card hoverable>
            <Text type="secondary">PLASTIC IN THE ENVIRONMENT</Text>
            <Title level={3}>Senegal...</Title>
            <Text>Find text highlight...</Text>
            <br />
            <a href="#national-data">View national data →</a>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default SmallCards;
