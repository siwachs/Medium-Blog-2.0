import Head from 'next/head'
import Banner from '../Components/Banner'
import Header from '../Components/Header'
import Posts from '../Components/Posts'
import { sanityClient } from '../Utils/sanity'
import { Post } from '../Utils/typings'

//Interface inherit types from other
interface Props {
  posts: [Post]
}

export default function Home({ posts }: Props) {
  return (
    <div>
      <Head>
        <title>Medium Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header></Header>
      <Banner></Banner>
      <Posts posts={posts}></Posts>
    </div>
  )
}

//Server Side Rendering (SSR) run on Backend
export const getServerSideProps = async () => {
  const query = `*[_type=="post"]{
    _id,
    title,
    slug,
    author->{
    name,
    image
  },
  description,
  mainImage,
  slug
  }`

  //Fetch
  const posts = await sanityClient.fetch(query)
  return {
    props: {
      posts,
    },
  }
}
