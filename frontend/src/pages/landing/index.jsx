import Image from 'next/image'
import Link from 'next/link'
import styles from './index.module.scss'
import Button from '../../components/button'
import { Trans, t } from '@lingui/macro'
import { loadCatalog } from '../../translations/utils'
import { useRouter } from 'next/router'
import api from '../../utils/api'
import { SearchBar } from '../search'
import { useEffect, useState } from 'react'
import { useIsMobile } from '../../utils/useIsMobile'

const Landing = (props) => {
  const isMobile = useIsMobile()
  return (
    <div id="landing" className={styles.landing}>
      <div className="nutrient-hero">
        <div className="container">
          <h5>Welcome to</h5>
          <h1>The Global NUTRIENTS Hub</h1>
          <p>
            A global open-access platform for sharing data, knowledge, and
            fostering collaboration to tackle nutrient pollution and safeguard
            the health of both people and the planet.
          </p>
          {!isMobile && (
            <Image
              src="/nutrient-vis-1.jpg"
              width={1697}
              height={768}
              className="bg"
            />
          )}
          {isMobile && (
            <Image
              src="/nutrient-vis-1.jpg"
              width={937}
              height={424}
              className="bg"
            />
          )}
        </div>
      </div>

      <div className="nutrient-info">
        <div className="container">
          <p>
            Nutrients are essential for food production and global food
            security. Yet only 20% of reactive nitrogen is used effectively,
            while 80% escapes into the environment. Phosphorus, a finite and
            irreplaceable resource, faces similar losses, with up to 80%
            wasted.These inefficiencies drive pollution, degrade ecosystems, and
            accelerate climate change.Smarter nutrient management is not just an
            option—it’s a necessity. 
          </p>

          {!isMobile && (
            <Image
              src="/nutrient-vis-2.jpg"
              width={1387}
              height={633}
              className="vis"
            />
          )}
          {isMobile && (
            <Image
              src="/nutrient-vis-2.jpg"
              width={490}
              height={224}
              className="vis"
            />
          )}

          <p>
            The Global Nutrients Hub is a collaborative platform offering
            technical insights, best practices, and cross-sector resources on
            nutrient flows to support the sustainable management of these vital
            resources. By promoting food security, resilient ecosystems, and
            climate stability, the Hub empowers governments, scientists,
            practitioners, and communities to come together—sharing evidence,
            identifying gaps, and driving informed action on nitrogen,
            phosphorus, and other essential nutrients.
          </p>
        </div>
      </div>

      <FeatureCards />
      <div className="workflow">
        <div className="container">
          <div className="text">
            <strong className="caps-heading-1">
              <Trans>Country Dedicated</Trans>
            </strong>
            <h2>
              <strong>
                <Trans>Workflow</Trans>
              </strong>
              <br />
            </h2>
            <p className="p-m">
              <Trans>
                The Country Dedicated Workflow is a digital tool to help
                countries in developing national plastic source inventories and
                plastic strategies, supported by step-by-step guidance and
                inspiring case studies. Create your account and explore.
              </Trans>
            </p>
            {/* <JoinBtn {...props} /> */}
          </div>
          <div className="screenshot">
            <Image src="/workflow-screenshot.jpg" width={710} height={423} />
          </div>
        </div>
      </div>
    </div>
  )
}

const FeatureCards = () => {
  return (
    <div className="feature-cards">
      <h3>Explore The Hub</h3>
      <div className="container">
        <Link href="/knowledge-hub" className="feature-card">
          <div className="img">
            <Image
              src="/iconxl-knowledge-hub.svg"
              width={265}
              height={136}
              alt="knowledge hub"
            />
          </div>
          <div className="cnt">
            <h4>Knowledge Hub</h4>
            <p>Knowledge resources shared in the Knowledge Library</p>
            <span>Explore The Resources</span>
          </div>
        </Link>
        <Link href="/data/maps" className="feature-card">
          <div className="img">
            <Image
              src="/iconxl-learning-centre.svg"
              width={320}
              height={160}
              alt="data hub"
            />
          </div>
          <div className="cnt">
            {/* <h5>
              <Trans>Data Hub</Trans>
            </h5> */}
            <h4>Learning Centre</h4>
            <p>Case studies and useful resource materials</p>
            <span>Explore The Materials</span>
          </div>
        </Link>
      </div>
    </div>
  )
}

export const getStaticProps = async (ctx) => {
  return {
    props: {
      i18n: await loadCatalog(ctx.locale),
    },
  }
}

export default Landing
