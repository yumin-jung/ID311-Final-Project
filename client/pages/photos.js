import HeadInfo from '../components/HeadInfo'
import Image from 'next/image'
// import photosStyles from '../styles/Photos.moudle.css'

const photos = ({ photos }) => {
    return (
        <div>
            <HeadInfo title="Photos" />
            <h1>My photos</h1>
            <ul >
                {photos.map(photo => (
                    <li key={photo.id}>
                        <Image
                            src={photo.thumbnailUrl}
                            width={100}
                            height={100}
                            alt={photo.title}
                        />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default photos

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