import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { IonReactRouter } from '@ionic/react-router'
import { IonRouterOutlet } from '@ionic/react'
import { UnkownErrorBoundary } from '../../boundary/unkown-error'
import { InternalServerErrorProvider } from '../../providers/internal-server-error-provider'
import { InternalServerErrorPage } from '../../pages/internal-server-error'
import { HelloWorldPage } from '../../pages/helloworld'
import { HelloWorldDetailPage } from '../../pages/helloworld/detail'
import { NotFoundErrorPage } from '../../pages/not-found-error'

export const Router: React.SFC = () => (
  <IonReactRouter>
    <IonRouterOutlet>
      <UnkownErrorBoundary>
        <InternalServerErrorProvider render={() => <InternalServerErrorPage />}>
          <Switch>
            <Route exact path="/" component={HelloWorldPage} />
            <Route exact path="/helloworld" component={HelloWorldPage} />
            <Route exact path="/helloworld/:id" component={HelloWorldDetailPage} />
            <Route exact component={NotFoundErrorPage} />
          </Switch>
        </InternalServerErrorProvider>
      </UnkownErrorBoundary>
    </IonRouterOutlet>
  </IonReactRouter>
)
