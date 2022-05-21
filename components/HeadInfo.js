import Head from 'next/head'

const HeadInfo = ({ title, keyword, contents }) => {
    return (
        <Head>
            <title>{title}</title>
            <meta keyword={keyword}></meta>
            <meta contents={contents}></meta>
        </Head>
    )
}

HeadInfo.defaultProps = {
    title: 'ID311',
    keyword: 'Web powered by Nextjs',
    contents: 'ID311 final project'
}

export default HeadInfo