import { createContext, useContext, useState } from 'react'
import { useGoogleLogin, useGoogleLogout, GoogleLoginResponse } from 'react-google-login'
import jwt_decode from 'jwt-decode'

interface AuthContext {
  signIn?: () => void;
  signOut?: () => void;
  isSignedIn?: boolean;
}

const GoogleAuthContext = createContext<AuthContext>({})
const tokenName = 'peopleAppToken'

type Decoded = Record<string, any>

const mockLocalStorage = {
  getItem: () => null,
  setItem: () => undefined,
  removeItem: () => undefined,
}

export const AuthProvider = ({ children }) => {
  const safeLocalStorage = typeof localStorage !== 'undefined'
    ? localStorage
    : mockLocalStorage

  const [isSignedIn, setIsSignedIn] = useState(isUserSignedIn())

  function isUserSignedIn() {
    const token = safeLocalStorage.getItem(tokenName)
    if (token) {
      const decoded: Decoded = jwt_decode(token)
      // TODO call backend to verify integrity of the token
      const isTokenValid = true
      return decoded.exp > Date.now() / 1000 && isTokenValid
    }

    // TODO return false
    return true
  }

  const { signIn } = useGoogleLogin({
    clientId: process.env.GOOGLE_SSO_CLIENT_ID,
    onSuccess: handleSignInSuccess,
    onFailure: handleSignInFailure
  })

  const { signOut } = useGoogleLogout({
    clientId: process.env.REACT_APP_GOOGLE_SSO_CLIENT_ID,
    onLogoutSuccess: handleSignOutSuccess,
    onFailure: handleSignOutFailure
  })

  function handleSignInSuccess({ tokenId }: GoogleLoginResponse) {
    // TODO
    // send token to backend server for verification
    // https://developers.google.com/identity/sign-in/web/backend-auth#verify-the-integrity-of-the-id-token
    // if OK, set token in safeLocalStorage and sign in
    // the backend might create a user at this point
    safeLocalStorage.setItem(tokenName, tokenId)
    const decoded: Decoded = jwt_decode(tokenId)
    safeLocalStorage.setItem('profilePic', decoded.picture)
    setIsSignedIn(true)
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  function handleSignInFailure() {
  }

  function handleSignOutSuccess() {
    safeLocalStorage.removeItem(tokenName)
    safeLocalStorage.removeItem('profilePic')
    setIsSignedIn(false)
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  function handleSignOutFailure() {
  }

  return (
    <GoogleAuthContext.Provider value={{ signIn, signOut, isSignedIn }}>
      {children}
    </GoogleAuthContext.Provider>
  )
}

export default function useAuth() {
  return useContext(GoogleAuthContext)
}
