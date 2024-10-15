import React from 'react';
import { Card, Row, Col, Typography, Divider, Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

const { Title, Text, Link } = Typography;

const PolicyComponent = ({ replacedText }) => {
  return (
    <div style={{ padding: '20px', overflow: '' }}>
      <Card>
        <Row justify="space-between" align="middle">
          <Col>
            <Title level={4}>
             {replacedText}
              <Tooltip title="Information about implemented instruments on plastics">
                <InfoCircleOutlined style={{ marginLeft: 8 }} />
              </Tooltip>
            </Title>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>
            <Card bordered={false}>
              <Title level={1}>3</Title>
              <Text>cash for return schemes</Text>
            </Card>
          </Col>
          <Col span={8}>
            <Card bordered={false}>
              <Title level={1}>12</Title>
              <Text>regulations mandating subsidies to avoid the use of plastics</Text>
            </Card>
          </Col>
          <Col span={8}>
            <Card bordered={false}>
              <Title level={1}>12</Title>
              <Text>regulations offering tax breaks for responsible plastics stewardship and avoided use of plastics</Text>
            </Card>
          </Col>
        </Row>
      </Card>

      <Card style={{ marginTop: '20px' }}>
        <Row justify="space-between" align="middle">
          <Col>
            <Title level={4}>
              Senegal has adopted the following policies and regulations pertaining to use and disposal of plastics:
              <Tooltip title="Information on policies and regulations">
                <InfoCircleOutlined style={{ marginLeft: 8 }} />
              </Tooltip>
            </Title>
          </Col>
        </Row>

        <Divider />

        <Row gutter={16}>
          <Col span={4}>
            <Title level={1} style={{ color: '#5B8FF9' }}>8</Title>
          </Col>
          <Col span={20}>
            <Text>Policies that include initiatives on education regarding plastics</Text>
            <br />
            <Link href="#">See policies</Link>
          </Col>
        </Row>

        <Divider />
      </Card>
    </div>
  );
};

export default PolicyComponent;
