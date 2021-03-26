import Head from 'next/head'
import { NEXT_PUBLIC_URL } from '../../utils/config'

export default function Pokemon({ pokemon }) {
    return (
        <div>
            <Head>
                {pokemon.name &&
                    <title>{pokemon.name.english}</title>
                }
                {pokemon.description &&
                    <meta description={pokemon.description}></meta>
                }
                <meta property="og:url" content={`${NEXT_PUBLIC_URL}/pokemon/${pokemon.id}`} />
                <meta property="og:type" content="article" />
                <meta property="og:title" content={pokemon.name.english} />
                <meta property="og:description" content={pokemon.description} />
                <meta property="og:image" content={pokemon.hires} />
            </Head>
            <div>
                <img src={pokemon.hires} alt={`${pokemon.name.english} image`}/>
                <h1>{pokemon.name.english}</h1>
                <p>{pokemon.description}</p>
            </div>
        </div>

    )
}

export async function getStaticPaths() {
    const res = await fetch('https://app.pokemon-api.xyz/pokemon/all')
    const pokemons = await res.json()

    const paths = pokemons.slice(0,10).map((pokemon) => ({
        params: { id: String(pokemon.id) }
    }))

    return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
    const res = await fetch(`https://app.pokemon-api.xyz/pokemon/${params.id}`)
    const pokemon = await res.json()

    return { props: { pokemon } }
}