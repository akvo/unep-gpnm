import React, { useState } from 'react'
import { Row, Col, Button, Tooltip } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'
import useCategories from '../../hooks/useCategories'
import useReplacedText from '../../hooks/useReplacePlaceholders'
import PlasticImportExportChart from './PlasticImportExportChart'
import PlasticImportExportTonnesChart from './PlasticImportExportTonnesChart'
import PlasticImportExportPieCharts from './PlasticImportExportPieChart' 
import MSWGenerationChart from './MSWGeneration'
import PlasticOceanBeachChart from './PlasticOceanBeachCHart'
import SmallCards from './OverviewCards'
import PolicyComponent from './PolicyCOmponent'
import RequestDataUpdateModal from './RequestDataUpdateModal'

const splitTextInHalf = (text) => {
  const words = text.split(' ')
  const halfIndex = Math.ceil(words.length / 2)
  const firstHalf = words.slice(0, halfIndex).join(' ')
  const secondHalf = words.slice(halfIndex).join(' ')
  return [firstHalf, secondHalf]
}

const CountryOverview = () => {
  const router = useRouter()

  const categories = useCategories()

  const [isModalVisible, setModalVisible] = useState(false)

  const showModal = () => {
    setModalVisible(true)
  }

  const handleClose = () => {
    setModalVisible(false)
  }

  const text = categories.categories.find(
    (cat) => cat.attributes.categoryId === router.query.categoryId
  )?.attributes?.categoryCountryDashboardText

  const categoryText = useReplacedText(
    router.query.country,
    router.query.categoryId
  )

  const [firstHalfText, secondHalfText] = splitTextInHalf(
    categoryText.replacedText || ''
  )

  return (
    <div style={{ padding: '20px', overflow: 'auto' }}>
      <Row className="header-row" style={{ marginBottom: '20px' }}>
        <Col span={18}>
          <div style={{ marginBottom: '10px' }}>
            <span
              style={{ color: '#6236FF', fontSize: '18px', fontWeight: 'bold' }}
            >
              {decodeURIComponent(router.query.country)?.toUpperCase()}
            </span>
            <h3
              style={{
                fontSize: '28px',
                fontWeight: 'bold',
                marginTop: '10px',
              }}
            >
              {
                categories.categories.find(
                  (cat) => cat.attributes.categoryId === router.query.categoryId
                )?.attributes?.name
              }
            </h3>
          </div>
        </Col>
        <Col span={6} style={{ textAlign: 'right' }}>
          <span style={{ color: '#7C7C7C', fontSize: '14px' }}>
            <span
              style={{
                backgroundColor: '#8E44AD',
                borderRadius: '50%',
                width: '8px',
                height: '8px',
                display: 'inline-block',
                marginRight: '5px',
              }}
            ></span>
            Data last updated: 02-20-22
          </span>
          <Tooltip title="Update country data by sending a request to the GPML Data Hub team.">
            <Button
              type="primary"
              onClick={showModal}
              style={{
                marginTop: '10px',
                backgroundColor: '#00C49A',
                borderRadius: '30px',
                height: '40px',
                fontSize: '14px',
                fontWeight: 'bold',
                border: 'none',
              }}
            >
              Request Data Update
            </Button>
            <RequestDataUpdateModal visible={isModalVisible} onClose={handleClose} />
          </Tooltip>
        </Col>
      </Row>

      {router.query.categoryId !== 'overview' ? (
        <Row gutter={[32, 16]} style={{ marginBottom: '40px' }}>
          <Col span={12}>
            <p style={{ fontSize: '16px', color: '#1B2738' }}>
              {firstHalfText}
            </p>
          </Col>
          <Col span={12}>
            <p style={{ fontSize: '16px', color: '#1B2738' }}>
              {secondHalfText}
            </p>
          </Col>
        </Row>
      ) : (
        <Row style={{ marginBottom: '40px', width: '1600px' }}>
          <p style={{ fontSize: '16px', color: '#1B2738' }}>
            {'Explore highlighted data to find plastic data.'}
          </p>

          <SmallCards></SmallCards>
        </Row>
      )}

      {router.query.categoryId === 'industry-and-trade' && (
        <>
          <Row style={{ marginBottom: '40px' }}>
            <Col span={24}>
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '12px',
                  padding: '20px',
                  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                }}
              >
                <PlasticImportExportChart />
              </div>
            </Col>
          </Row>
          <Row style={{ marginBottom: '40px' }}>
            <Col span={24}>
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '12px',
                  padding: '20px',
                  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                }}
              >
                <PlasticImportExportTonnesChart />
              </div>
            </Col>
          </Row>

          <Row gutter={[32, 16]}>
            <Col span={12}>
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '12px',
                  padding: '20px',
                  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                }}
              >
                <PlasticImportExportPieCharts chartType="import" />
              </div>
            </Col>
            <Col span={12}>
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '12px',
                  padding: '20px',
                  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                }}
              >
                <PlasticImportExportPieCharts chartType="export" />
              </div>
            </Col>
          </Row>
        </>
      )}

      {router.query.categoryId === 'waste-management' && (
        <Row gutter={[32, 16]}>
          <Col span={12}>
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '12px',
                padding: '20px',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
              }}
            >
              <MSWGenerationChart />
            </div>
          </Col>
        </Row>
      )}

      {router.query.categoryId === 'governance-and-regulations' && (
        <Row gutter={[32, 16]}>
          <Col span={12}>
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '12px',
                padding: '20px',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
              }}
            >
              <PolicyComponent replacedText={categoryText.replacedText} />
            </div>
          </Col>
        </Row>
      )}

      {router.query.categoryId === 'environmental-impact' && (
        <Row gutter={[32, 16]}>
          <Col span={12}>
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '12px',
                padding: '20px',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
              }}
            >
              <PlasticOceanBeachChart />
            </div>
          </Col>
        </Row>
      )}
    </div>
  )
}

export default CountryOverview
