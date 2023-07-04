'use client';

import { Provider } from 'react-redux';
import { store } from './store';
import { ReactNode } from 'react'

type FooProps = {
  name: 'foo'
  // look here 👇
  children: ReactNode
}

export function Providers({ children }: FooProps) {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}