import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase } from '../api'

export default function Home() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
   useEffect(() => {
     fetchPosts()
  }, [])

  async function fetchPosts() {
    const { data, error } = await supabase
        .from('posts')
        .select()
    setPosts(data)
    setLoading(false)
  }

  if (loading) return <p className="text-2xl">Loading ...</p>
  if (!posts.length) return <p className="text-2xl">No posts.</p>
  return (
      <div>
        <h1 className="text-3xl font-semibold mt-6 mb-2">Posts</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {
            posts.map(post => (
                    <div className="cursor-pointer" key={post.id} >
                      <Link href={`/posts/${post.id}`}>
                        <div className="rbg-white p-6 rounded-lg shadow-xl border border-gray-100">
                          <h2 className="text-2xl font-bold mb-2 text-gray-800">{post.title}</h2>
                          <p className="text-gray-700">Author: {post.user_email}</p>
                        </div>
                      </Link>
                    </div>
                )
            )
          }
        </div>
      </div>
  )
}
