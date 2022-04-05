import { GetStaticProps } from 'next'
import Header from '../../Components/Header'
import { sanityClient, urlFor } from '../../Utils/sanity'
import { Post } from '../../Utils/typings'
import PortableText from 'react-portable-text'
import Comments from '../../Components/Comments'
import { FETCH_ALL_ROUTES, FETCH_POST_CONTENT } from '../../Utils/query'

//Define Prop type
interface Props {
  post: Post
}

function Post({ post }: Props) {
  return (
    <main>
      <Header></Header>

      {/* Content */}
      <img
        className="w-full object-contain"
        src={urlFor(post.mainImage).url()}
        alt=""
      ></img>

      {/* Article */}
      <article className="mx-auto max-w-3xl p-5">
        <h1 className="mt-2 mb-3 text-3xl sm:text-4xl">{post.title}</h1>
        <h2 className="mb-2 text-xl font-light text-gray-500">
          {post.description}
        </h2>

        {/* Author */}
        <div className="flex items-center space-x-2">
          <img
            className="h-12 w-12 rounded-full"
            alt=""
            src={urlFor(post.author.image).url()}
          ></img>
          <p className="text-sm font-extralight">
            Blog post by{' '}
            <span className="text-green-600">{post.author.name}</span> -
            Published At {new Date(post._createdAt).toLocaleString()}
          </p>
        </div>

        {/* Rich text Block */}
        {/* React Portable Text */}
        <div className="mt-8">
          <PortableText
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
            content={post.body}
            serializers={{
              h1: (props: any) => {
                ;<h1 className="my-5 text-2xl font-bold" {...props} />
              },
              h2: (props: any) => {
                ;<h2 className="my-5 text-xl font-bold" {...props} />
              },
              li: ({ children }: any) => {
                ;<li className="ml-4 list-disc">{children}</li>
              },
              link: ({ href, children }: any) => (
                <a href={href} className="text-blue-500 hover:underline">
                  {children}
                </a>
              ),
            }}
          />
        </div>
      </article>

      {/* Divider */}
      <hr className="my-5 mx-auto max-w-lg border border-yellow-500"></hr>

      <Comments _id={post._id}></Comments>

      {/* Render Comments */}
      <div className="my-10 mx-auto flex max-w-2xl flex-col space-y-2 p-10 shadow shadow-yellow-500">
        <h3 className="text-4xl">Comments</h3>
        <hr className="pb-2"></hr>
        {post.comments.map((comment) => (
          <div>
            <p>
              <span className="text-yellow-500">{comment.name}</span>:{' '}
              {comment.comment}
            </p>
          </div>
        ))}
      </div>
    </main>
  )
}

export default Post

//find which pages we have to pre render
export const getStaticPaths = async () => {
  //Find all routes
  const query = FETCH_ALL_ROUTES

  const posts = await sanityClient.fetch(query)

  //array of paths
  const paths = posts.map((post: Post) => ({
    params: {
      slug: post.slug.current,
    },
  }))

  return {
    paths,
    fallback: 'blocking',
    //block page if not present
  }
}

//How to use this Info..
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = FETCH_POST_CONTENT

  const post = await sanityClient.fetch(query, {
    slug: params?.slug,
  })

  if (!post) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      post,
    },
    //Keep update cache in every x seconds using Incremental static regeneration (ISR)
    revalidate: 200,
  }
}
