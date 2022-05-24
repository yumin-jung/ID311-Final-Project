import HeadInfo from '../components/HeadInfo'
import Image from 'next/image'
import Link from 'next/link'
import photosStyles from '../styles/Photos.module.css'
import testImage from '../data/test.jpg'

const photos = ({ photos }) => {
    return (
        <div>
            <HeadInfo title="Photos" />
            <h1>My photos</h1>
            <ul className={photosStyles.photos}>
                {photos.map(photo => (
                    <li key={photo.id}>
                        <Link href={`/photos/${photo.id}`}>
                            <a>
                                <Image
                                    src={testImage}
                                    width={100}
                                    height={100}
                                    alt={photo.title}
                                />
                            </a>
                        </Link>
                        <span>{photo.title}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default photos

// SSR
// export const getServerSideProps = async () => {
//     const res = await fetch(`https://jsonplaceholder.typicode.com/photos?_start=0&_end=10`)
//     const photos = await res.json();

//     return {
//         props: {
//             photos
//         }
//     }
// }

// SSG
export const getStaticProps = async () => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/photos?_start=0&_end=10`)
    const photos = await res.json();

    return {
        props: {
            photos
        }
    }
}