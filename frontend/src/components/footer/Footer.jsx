import { useEffect, useState } from 'react'
import { Input, Form, notification } from 'antd'
import styles from './footer.module.scss'
import { Trans, t } from '@lingui/macro'
import Link from 'next/link'
import { ArrowRight, LinkedinIcon, YoutubeIcon } from '../../components/icons'
import moment from 'moment'
import Button from '../../components/button'
import api from '../../utils/api'
import Image from 'next/image'
import { useLingui } from '@lingui/react'

const Footer = ({ showTools }) => {
  const { i18n } = useLingui()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [showCookieConsent, setShowCookieConsent] = useState(true)

  const { _locale } = i18n

  useEffect(() => {
    const cookieConsent = localStorage.getItem('cookieConsent')
    if (cookieConsent) {
      setShowCookieConsent(false)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted')
    setShowCookieConsent(false)
  }

  const onFinish = (values) => {
    setLoading(true)
    api
      .post('/subscribe', { email: values.email })
      .then(async (res) => {
        form.resetFields()
        setLoading(false)
        notification.success({
          message: `You have been successfully subscribed!`,
        })
      })
      .catch((err) => {
        setLoading(false)
        notification.error({
          message: err?.response?.data['errorDetails']
            ? err?.response?.data['errorDetails']?.email[0]
            : 'Oops, something went wrong',
        })
      })
  }
  return (
    <footer className={styles.footerSection}>
      <div className="container">
        <div className="footer-items">
          <div className="footer-item powered-by">
            <h6 className="title">
              <Trans>Powered by</Trans>
            </h6>
            <div style={{ display: 'flex' }}>
              <Image
                className="gpnm-logo"
                src="/GPNM-circle-white.svg"
                width={87}
                height={79}
              />
              <Image
                src={`/powered-by-footer${
                  _locale === 'en' ? '' : `-${_locale}`
                }.png`}
                // width={425}
                // height={143}
                width={0} // Set width to 0
                height={0} // Set height to 0
                sizes="100vw" // Optional: Specify responsive sizes
                style={{ height: '143px', width: 'auto' }}
                className="powered-by-logos"
              />
            </div>
          </div>
        </div>
        <hr />
        <div className="footer-bar">
          <div>
            <p className="h-xxs">
              <Trans>
                Copyright © {moment().format('YYYY')} All rights reserved
              </Trans>
            </p>
          </div>
          {showCookieConsent && (
            <div className="footer-confirm-cookies">
              <div>
                <Trans>
                  <p className="h-xxs">
                    <Trans>We use cookies for better service.</Trans>
                  </p>
                  <Button type="link">
                    <Link href="/privacy-policy-and-terms-of-use.pdf">
                      <Trans>Learn More</Trans>
                    </Link>
                  </Button>
                  <Button type="link" onClick={handleAccept}>
                    <Trans>Accept</Trans>
                  </Button>
                </Trans>
              </div>
            </div>
          )}
        </div>
      </div>
    </footer>
  )
}

export default Footer
