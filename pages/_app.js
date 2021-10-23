import Link from 'next/link'
import { useState, useEffect } from 'react'
import { supabase } from '../api'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
        async () => checkUser()
    )
    checkUser()
    return () => {
      authListener?.unsubscribe()
    };
  }, [])
  async function checkUser() {
    const user = supabase.auth.user()
    setUser(user)
  }

  return (
      <div>
        <nav className="p-6 border-b border-gray-300 space-x-6">
          <Link href="/">
            Home
          </Link>
          {
            user && (
                <Link href="/create-post">
                  Create a post
                </Link>
            )
          }
          <Link href="/profile">
            Profile
          </Link>
        </nav>
        <div className="py-8 px-16">
          <Component {...pageProps} />
        </div>
      </div>
  )
}

export default MyApp
