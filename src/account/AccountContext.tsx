import { Vec } from '@polkadot/types'
import { AccountId32 } from '@polkadot/types/interfaces'
import { PalletSocietyBid } from '@polkadot/types/lookup'
import React, { useContext, useEffect, useState } from 'react'
import { useKusama } from '../kusama'

const storedActiveAccount = JSON.parse(localStorage.getItem('activeAccount')!) || []
// eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
const storedAccounts = JSON.parse(localStorage.getItem('accounts')!) || []

const INIT_STATE = {
  activeAccount: storedActiveAccount,
  setActiveAccount: () => ({}),
  accounts: storedAccounts,
  setAccounts: () => ({}),
  level: 'human'
}

type StateType = {
  level: string,
  setActiveAccount: (account: { name: string | undefined; address: string }[]) => void
  activeAccount: { name: string | undefined; address: string }[]
  accounts: { name: string | undefined; address: string }[]
  setAccounts: (accounts: { name: string | undefined; address: string }[]) => void
}

const AccountContext = React.createContext<StateType>(INIT_STATE)

const AccountContextProvider = ({ children } : any) => {
  const { api } = useKusama()
  const [activeAccount, setActiveAccount] = useState<{ name: string | undefined; address: string }[]>(storedActiveAccount)
  const [accounts, setAccounts] = useState<{ name: string | undefined; address: string }[]>(storedAccounts)
  const [level, setLevel] = useState('human')

  useEffect(() => {
    const setLevelCheckingAccounts = (accounts: AccountId32[], level: string) => {
      accounts.forEach((account: AccountId32) => {
        if (account.toString() === activeAccount[0].address) {
          setLevel(level)
        }
      })
    }

    if (api) {
      api.query.society.bids().then((response: Vec<PalletSocietyBid>) => {
        setLevelCheckingAccounts(response.map(account => account.who), 'bidder')
      })

      api.query.society.candidates().then((response: Vec<PalletSocietyBid>) => {
        setLevelCheckingAccounts(response.map(account => account.who), 'candidate')
      })

      api.query.society.members().then((response: Vec<AccountId32>) => {
        setLevelCheckingAccounts(response, 'cyborg')
      })
    }
  }, [activeAccount])

  return (
    <AccountContext.Provider value={{ level, activeAccount, setActiveAccount, accounts, setAccounts }}>
      {children}
    </AccountContext.Provider>
  )
}

const useAccount = () => ({ ...useContext(AccountContext) })

export { AccountContextProvider, useAccount }
