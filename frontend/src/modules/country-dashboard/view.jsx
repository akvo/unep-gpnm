import React, { Fragment } from 'react'

import ResourceView from './resource-view'
import styles from './style.module.scss'

import { useQuery, topicNames } from '../../utils/misc'

import { useRouter } from 'next/router'
import CountryOverview from '../../pages/countryOverview'

export const useResourceTypes = () => {
  const { i18n } = useLingui()

  const resourceTypes = [
    {
      key: 'technical-resource',
      label: i18n._(t`Technical Resources`),
      title: 'technical_resource',
    },
    { key: 'event', label: i18n._(t`Events`), title: 'event' },
    { key: 'technology', label: i18n._(t`Technologies`), title: 'technology' },
    {
      key: 'capacity-building',
      label: i18n._(t`Capacity Development`),
      title: 'capacity building',
    },
    { key: 'initiative', label: i18n._(t`Initiatives`), title: 'initiative' },
    {
      key: 'action-plan',
      label: i18n._(t`Action Plans`),
      title: 'action_plan',
    },
    { key: 'policy', label: i18n._(t`Policies`), title: 'policy' },
    {
      key: 'financing-resource',
      label: i18n._(t`Financing Resources`),
      title: 'financing_resource',
    },
  ]

  return resourceTypes
}

const resourceTopic = [
  'action_plan',
  'initiative',
  'policy',
  'technical_resource',
  'technology',
  'event',
  'financing_resource',
]

function CountryLibrary({}) {
  const query = useQuery()
  const { isReady } = useRouter()

  const router = useRouter()

  return (
    <div className={styles.knowledgeLib}>
      <Fragment display="flex"  flex-direction="row">
        <ResourceView history={router} />
       {/* <CountryOverview></CountryOverview> */}
      </Fragment>
    </div>
  )
}

export default CountryLibrary
