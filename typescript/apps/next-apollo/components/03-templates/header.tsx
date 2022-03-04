import styles from '~/styles/modules/components/03-templates/header.module.scss'

const Header = () => {
  return (
    <header className={styles.header}>
      <noscript>
        <style>{'.nojs-show { opacity: 1; top: 0; }'}</style>
      </noscript>
    </header>
  )
}

export default Header
