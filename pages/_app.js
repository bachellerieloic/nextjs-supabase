import Link from 'next/link'
import { NavBar } from '../components/NavBar'
import { Header } from '../components/Header'
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
        <NavBar user={user}/>
        <div className="py-8 px-16">
          <Component {...pageProps} />
        </div>
      </div>
  )
}

export default MyApp
