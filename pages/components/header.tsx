import Head from 'next/head';

function HeaderContainer({title}: {title: String}) {
  return (
    <div>
      <Head>
        <title>{`Portal RH - ${title}`}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
    </div>
  )
}

export default HeaderContainer