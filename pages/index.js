import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home({ pokemons }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Pokemon App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <ul>
          {pokemons.map((pokemon) => (
            <li key={pokemon.id}>
              <Link href={`/pokemon/${pokemon.id}`}><a >{pokemon.name.english}</a></Link>              
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const res = await fetch('https://app.pokemon-api.xyz/pokemon/all')
  const data = await res.json()
  const pokemons = data.slice(0,10)
  return {
    props: {
      pokemons,
    }
  }
}
