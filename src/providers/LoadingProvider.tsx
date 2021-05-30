import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from 'react'

interface LoadingConstruct {
  loadingCount: number
  setLoadingCount: Dispatch<SetStateAction<number>>
}

const LoadingContext = createContext<LoadingConstruct>(
  null as unknown as LoadingConstruct
)

export function LoadingProvider({ children }: PropsWithChildren<{}>) {
  const [loadingCount, setLoadingCount] = useState(0)
  return (
    <LoadingContext.Provider value={{ loadingCount, setLoadingCount }}>
      {children}
    </LoadingContext.Provider>
  )
}

export function useLoadingContext() {
  return useContext(LoadingContext)
}
