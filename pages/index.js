export default function Home({ posts }) {
  console.log(posts)
  return (
    <div>
      <h1>ID311</h1>
      <ul>
        {posts.map(post => (
          <li>
            {post.title}
          </li>
        ))}
      </ul>
    </div>
  )
}

// SSR
export const getServerSideProps = async () => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_start=0&_end=10`)
  const posts = await res.json();

  return {
    props: {
      posts
    }
  }
}

// // SSG
// export const getStaticProps = async () => {
//   const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_start=0&_end=10`)
//   const posts = await res.json();

//   return {
//     props: {
//       posts
//     }
//   }
// }