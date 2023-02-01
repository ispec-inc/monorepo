import React from 'react'

const Content: React.SFC = ({ children }) => <div style={{ minHeight: 'calc(100vh - 8rem)', display: 'flex' }}>{children}</div>

export const BasicLayout: React.FC = (props) => (
  <div>
    <header>sample header</header>
    <main>
      <Content children={props.children} />
    </main>
  </div>
)
