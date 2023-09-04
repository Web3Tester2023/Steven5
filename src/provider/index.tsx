import React from 'react';
import { useMetaMask } from "metamask-react";
import { useReducer, useMemo } from "react";
import { createContext, useContext, useEffect } from "react";
import detectEthereumProvider from '@metamask/detect-provider'

const metamaskStore = 'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn'


declare global {
  interface Window {
    ethereum: any;
  }
}

const INIT_STATE: InitStateObject = {
  loading: false,
  account: null,
  walletStatus: 0,
}

// create context
const GlobalContext = createContext<any>({});
const reducer = (state: InitStateObject, { type, payload }: ReducerObject) => (
  { ...state, [type]: payload }
)

// use contexts
export function useGlobalContext() {
  return useContext(GlobalContext);
}

export const GlobalProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  const { status, connect, account } = useMetaMask();

  // metamask detect check
  useEffect(() => {
    detect()
  }, [])

  const detect = async () => {
    let tempStatus = 0
    let provider = await detectEthereumProvider()

    if (provider) { tempStatus = 1 }
    dispatch({ type: "walletStatus", payload: tempStatus })
  }

  // metamask connect check
  useEffect(() => {
    if (status === 'initializing') return

    if (status === 'connected') {
      dispatch({ type: "walletStatus", payload: 2 })
      dispatch({ type: "account", payload: account })
    } else {
      dispatch({ type: "account", payload: null })
      dispatch({ type: "walletStatus", payload: 1 })
    }
  }, [status])

  // metamask Connect
  const metamaskConnect = () => {
    if (state.walletStatus === 2) {
      return
    }

    if (state.walletStatus === 0) {
      window.open(metamaskStore, "_blank");
      return;
    }

    connect()
  }

  return (
    <GlobalContext.Provider
      value={useMemo(() => [
        state, {
          dispatch,
          metamaskConnect
        }
      ], [state])}
    >
      {children}
    </GlobalContext.Provider>
  )
}
