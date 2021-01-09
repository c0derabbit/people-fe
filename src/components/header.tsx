import useAuth from '../hooks/use-auth'

export default function Header() {
  const { isSignedIn, signOut } = useAuth()

  return (
    <header>
      <div>
        <h1>
          Peoplegraph
        </h1>
        {isSignedIn && (
          <button onClick={signOut}>
            Log out
          </button>
        )}
      </div>
    </header>
  )
}
