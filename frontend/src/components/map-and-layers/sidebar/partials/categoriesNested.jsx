import React, { useState } from 'react'
import { Layout, Typography, Menu, Tag, Select } from 'antd'
import { CloseCircleFilled } from '@ant-design/icons'
import useQueryParameters from '../../../../hooks/useQueryParameters'
import useIndicators from '../../../../hooks/useIndicators'
import Subcategories from './../partials/subcategories'
import useSubcategories from '../../../../hooks/useSubcategories'
import { useRouter } from 'next/router'
import { UIStore } from '../../../../store'
import { isEmpty } from 'lodash'

const { Sider } = Layout

const CategoriesNested = ({ categories, countryDashboard }) => {
  const { queryParameters, setQueryParameters } = useQueryParameters()
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedCountry, setSelectedCountry] = useState(null)
  const router = useRouter()

  const { countries, transnationalOptions, landing } = UIStore.useState(
    (s) => ({
      countries: s.countries,
      transnationalOptions: s.transnationalOptions,
      landing: s.landing,
    })
  )

  const isLoaded = () => !isEmpty(countries) && !isEmpty(transnationalOptions)

  const countryOpts = isLoaded()
    ? countries
        .filter(
          (country) => country.description.toLowerCase() === 'member state'
        )
        .map((it) => ({ value: it.id, label: it.name }))
        .sort((a, b) => a.label.localeCompare(b.label))
    : []

  const handleChangeCountry = (val) => {
    const selected = countries?.find((x) => x.id === val)

    const newParams = {
      country: selected?.name,
    }

    setQueryParameters(newParams)

    setSelectedCountry(selectedCountry?.name)
  }

  const categoryId = router.isReady ? router.query.categoryId : undefined

  const handleCategoryClick = (category) => {
    const newParams = {
      categoryId: category.attributes.categoryId,
    }

    setQueryParameters(newParams)
    setSelectedCategory(category.attributes.categoryId)
  }
  const subcategories = useSubcategories(categoryId)

  const subcategoriesByCategory = subcategories?.subcategories?.data?.filter(
    (subcategory) =>
      subcategory.attributes.categoryId === queryParameters.categoryId
  )
  const { layers, loading } = useIndicators()
  const handleCloseLayer = (layerId) => {
    console.log('buggg',queryParameters.layers)
    const updatedLayers = queryParameters.layers?.filter(
      (layer) => layer.id !== layerId
    )
    setQueryParameters({ layers: updatedLayers })
  }
  const isCategorySelected = (category) => {
    return queryParameters.categoryId === category.attributes.categoryId
  }

  return (
    <Sider breakpoint="lg" collapsedWidth="0" overflow={'auto'} width={360}>
      <Select
        size="small"
        // className={styles.countryDropdown}
        showArrow
        allowClear
        // dropdownClassName="multiselection-dropdown"
        // dropdownMatchSelectWidth={false}
        // mode={countrySelectMode || ''}
        placeholder={`Countries`}
        options={countryOpts}
        optionFilterProp="children"
        filterOption={(input, option) =>
          option?.label?.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        //  value={query.country}
        onChange={handleChangeCountry}
        // suffixIcon={<SearchIcon />}

        virtual={false}
        style={{
          marginLeft:'15px',
          width: '95%',
          height:'52px',
          padding: '4px',
          fontSize: '16px',
          border: '1px solid #ccc',
          borderRadius: '4px',
        }}
      />
      <div className="caps-heading-s">Topics</div>
      <Menu defaultSelectedKeys={['1']} overflow={'auto'}>
        {categories.map((category) => (
          <div key={category.attributes.categoryId}>
            <Menu.Item
              key={category.attributes.categoryId}
              onClick={() => handleCategoryClick(category)}
              className={isCategorySelected(category) ? 'selected' : ''}
            >
              <img
                className="ant-menu-item-icon"
                src={
                  category.attributes.categoryIcon
                    ? `https://unep-gpml.akvotest.org${category.attributes.categoryIcon[0].url}`
                    : ''
                }
                style={{ marginRight: '10px' }}
              />
              <span style={{ font: 'inter', fontSize: '14px' }}>
                {category.attributes.name}
              </span>
            </Menu.Item>
            {isCategorySelected(category) && !countryDashboard && (
              <Subcategories
                subcategories={subcategoriesByCategory}
                layers={layers}
                loading={loading}
              />
            )}
            {queryParameters.layers &&
              !countryDashboard &&
              [queryParameters.layers]
                ?.filter(
                  (layer) => layer.categoryId === category.attributes.categoryId
                )
                .map((layer) => (
                  <Tag
                    style={{
                      borderRadius: '40px',
                      width: '65%',
                      height: '32px',
                      marginLeft: '25px',
                      backgroundColor: '#2D3648',
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: '20px',
                      overflow: 'hidden',
                      padding: '0 10px',
                    }}
                  >
                    <div
                      style={{
                        maxWidth: 'calc(100% - 40px)',
                        overflow: 'hidden',
                      }}
                      title={layer.name}
                    >
                      <Typography.Text
                        style={{
                          color: 'white',
                          fontSize: '12px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          paddingLeft: '20px',
                          variant: 'typography/body2',
                        }}
                      >
                        {layer.name}
                      </Typography.Text>
                    </div>
                    <CloseCircleFilled
                      onClick={() => handleCloseLayer(layer.id)}
                      style={{
                        color: 'gray',
                        width: '20px',
                        height: '20px',
                        paddingLeft: '10px',
                      }}
                    />
                  </Tag>
                ))}
          </div>
        ))}
      </Menu>
    </Sider>
  )
}

export default CategoriesNested
