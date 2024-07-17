'use client'

import { SWRConfig } from 'swr'
import { RecoilRoot } from 'recoil'

export const Providers = ({ children }: React.PropsWithChildren) => {
  return (
    <RecoilRoot>
      <SWRConfig
        value={{
          fetcher: (url, init) => fetch(url, init).then((res) => res.json())
        }}
      >
        {children}
      </SWRConfig>
    </RecoilRoot>
  )
}
