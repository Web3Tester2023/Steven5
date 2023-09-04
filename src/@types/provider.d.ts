interface ReducerObject {
  type: string
  payload: any
}

interface InitStateObject {
  loading: Boolean
  account: string | null
  walletStatus: number
}