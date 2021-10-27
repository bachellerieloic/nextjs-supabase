import { useRouter } from 'next/router'
import { useState } from "react";
import ReactMarkdown from 'react-markdown'
import { supabase } from '../../api'

export default function Post({ post }) {
    const [isEdit, setIsEdit] = useState(false)
    const router = useRouter()
    if (router.isFallback) {
        return <div>Loading...</div>
    }

    const onTitleChange = (e) => {
        console.log('e', e)
        setIsEdit({ ...post, title: e })
    }

    return (
        <div className="rbg-white p-6 rounded-lg shadow-xl border border-gray-100">

            <button className="p-2 pl-5 pr-5 bg-transparent border-2 border-blue-500 text-blue-500 text-lg rounded-lg hover:bg-blue-500 hover:text-gray-100 focus:border-4 focus:border-blue-300"
                    onClick={() => setIsEdit(true)}>
                Edit
            </button>
            <h1 className="text-5xl mt-4 font-semibold tracking-wide">{post.title}</h1>
            {
                isEdit && <input
                        onChange={onTitleChange}
                        name="title"
                        placeholder="Title"
                        value={post.title}
                        className="border-b pb-2 text-lg my-4 focus:outline-none w-full font-light text-gray-500 placeholder-gray-500 y-2"
                        />
            }
            <p className="text-sm font-light my-4">by {post.user_email}</p>
            <div className="mt-8">
                <ReactMarkdown className='prose' >
                    {post.content}
                </ReactMarkdown>
            </div>
        </div>
    )
}

export async function getStaticPaths() {
    const { data, error } = await supabase
        .from('posts')
        .select('id')
    const paths = data.map(post => ({ params: { id: JSON.stringify(post.id) }}))
    return {
        paths,
        fallback: true
    }
}

export async function getStaticProps ({ params }) {
    const { id } = params
    const { data } = await supabase
        .from('posts')
        .select()
        .filter('id', 'eq', id)
        .single()
    return {
        props: {
            post: data
        }
    }
}
