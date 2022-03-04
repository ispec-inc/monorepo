import React, { ReactNode } from 'react'
import Meta from './meta'
import styles from '~/styles/modules/components/03-templates/layout.module.scss'
import Header from './header'
import Footer from './footer'

type Props = {
  children?: ReactNode
}

const Layout = ({ children }: Props) => (
  <>
    <Meta
      title="Next Framework | Apollo Client App."
      description="Next Framework | Apollo Client"
      url="https://ここにURL"
    />
    <div className={styles.layoutContainer}>
      <Header />
      {children}
      <Footer />
    </div>
  </>
)

export default Layout
