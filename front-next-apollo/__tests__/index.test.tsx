import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import { graphql } from 'msw'
import { setupServer } from 'msw/node'
import { ApolloProvider } from '@apollo/client'
import client from '~/plugins/apollo-client'
import Home from '../pages/index'
import { HomePageDocument } from '~/__generated__/graphql'

const data = {
  viewer: {
    repositories: {
      nodes: [
        {
          id: 1,
          nameWithOwner: 'test',
          createdAt: ''
        },
        {
          id: 2,
          nameWithOwner: 'test2',
          createdAt: ''
        },
        {
          id: 3,
          nameWithOwner: 'test3',
          createdAt: ''
        },
      ]
    }
  }
}

export const handlers = [
  graphql.query(HomePageDocument, (req, res, ctx) =>
    res(
      ctx.data(data)
    )
  ),
]
const server = setupServer(...handlers)

beforeAll(() => {
  server.listen()
})
afterEach(() => {
  server.resetHandlers()
  cleanup()
})
afterAll(() => {
  server.close()
})

describe('Auth Component Test Cases', () => {
  it('1 :タイトルが描画されている', async () => {
    render(
      <ApolloProvider client={client}>
        <Home />
      </ApolloProvider>
    )
    screen.debug()
    expect(screen.getByText('Next Framework & Apollo Client')).toBeTruthy()
  })
})
