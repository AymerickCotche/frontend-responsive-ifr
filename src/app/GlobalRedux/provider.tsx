'use client';

import { Provider } from 'react-redux';
import { store } from './store';
import { ReactNode } from 'react'

type FooProps = {
  children: ReactNode
}

export function Providers({ children }: FooProps) {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}