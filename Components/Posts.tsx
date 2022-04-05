import Link from 'next/link'
import { Post } from '../Utils/typings'
import { urlFor } from '../Utils/sanity'

//Interface inherit types from other
interface Props {
  posts: [Post]
}

function Posts({ posts }: Props) {
  return (
    <div className="grid grid-cols-1 gap-3 p-2 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:p-6">
      {posts.map((post) => (
        <Link key={post._id} href={`/post/${post.slug.current}`}>
          <div className="group cursor-pointer overflow-hidden rounded-lg border">
            <img
              className="w-full object-cover transition-transform duration-200 ease-in-out group-hover:scale-105"
              alt=""
              src={urlFor(post.mainImage).url()!}
            ></img>

            {/* Title and Description */}
            <div className="flex items-center justify-between bg-white p-5 md:p-6">
              <div>
                <p className="text-lg font-semibold md:text-xl">{post.title}</p>
                <p className="text-xs text-gray-700 md:text-sm">
                  {post.description} by {post.author.name}
                </p>
              </div>

              {/* Author Image */}
              <img
                className="h-12 w-12 rounded-full"
                alt=""
                src={urlFor(post.author.image).url()!}
              ></img>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default Posts
