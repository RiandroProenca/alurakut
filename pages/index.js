import React from 'react';
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/box'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/alurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/profileRelations';

function ProfileSideBar(propriedade) {
  return (
    <Box as = "aside">
      <img img src={`https://github.com/${propriedade.githubUser}.png`} style={{ borderRadius: '8px' }} />
      <hr />
      <p>
        <a className="boxlink" href={`https://github.com/${propriedade.githubUser}`} >
          @{propriedade.githubUser}
        </a>
      </p>

      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}
function ProfileRelationsBox (propriedade){
  return(
    <ProfileRelationsBoxWrapper>
    <h2 className="smallTitle">
    {propriedade.title} ({propriedade.itens.length})
  </h2>

  <ul>
    {/* {seguidores.map((itemAtual) => {
      return (
        <li key={itemAtual}>
          <a href={`/users/${itemAtual}`} >
            <img src={`https://github.com/${itemAtual}.png`} />
            <span>{itemAtual}</span>
          </a>
        </li>
      )
    })} */}
  </ul>
  </ProfileRelationsBoxWrapper>
  )

}


export default function Home() {
  const [comunidades,setComunidades] = React.useState([]);

  const githubUser = 'RiandroProenca';

  const amigos = [
    'vanisantos',
    'YoshiharuVia',
    'peas',
  ]

  const [seguidores,setSeguidores] = React.useState([]);
    React.useEffect(function(){
    fetch('https://api.github.com/users/RiandroProenca/followers')
    .then(function(respostaServidor) {
      return respostaServidor.json();
    })
    .then(function(respostaCompleta){
      setComunidades(respostaCompleta);
      })

      //Api GraphQL
      fetch('https://graphql.datocms.com/', {
        method:'POST',
        headers:{
          'Authorization': '2c7338044ecacab05d0db662a89e92',
          'Content-Type': 'application/json',
          'Accept': 'application/json',        
        },
        body: JSON.stringify({"query":`query {
          allCommunities {
            id
            title
            imageUrl
            creatorSlog
          }
        }`})
      })
      .then((response) => response.json())
      .then((respostaCompleta) => {
        const comunidadesFromDato = respostaCompleta.data.allCommunities;
        console.log(comunidadesFromDato)
        setComunidades(comunidadesFromDato)
      })
    }, [])

  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }} >
          <ProfileSideBar githubUser={githubUser} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">
              Bem vindo(a)
            </h1>

            <OrkutNostalgicIconSet />
          </Box>
          <Box>
            <h2> O que voce deseja fazer ? </h2>
            <form onSubmit={function handleCreateCommunity(e) {
              e.preventDefault();
              const dadosDoForm = new FormData(e.target);

              const comunidade = {
                title: dadosDoForm.get('title'),
                imageUrl: dadosDoForm.get('image'),
                creatorSlog: githubUser,
              }

              fetch('/api/comunidades', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
                },
                body: JSON.stringify(comunidade)
              })
              .then(async (response) => {
                const dados = await response.json();
                console.log(dados.registroCriado);
                const comunidade = dados.registroCriado;
                const comunidadesAtualizadas = [...comunidades, comunidade];
                setComunidades(comunidadesAtualizadas)
              })
          }}>
              <div>
                <input
                  placeholder="Qual e o nome da sua comunidade?"
                  name="title"
                  aria-label="Qual e o nome da sua comunidade?"
                  type="text"
                />
              </div>
              <div>
                <input
                  placeholder="Coloque uma Url Para usarmos de capa"
                  name="image"
                  aria-label="Coloque uma Url Para usarmos de capa?" />
                <button>
                  Criar Comunidades
                </button>
              </div>
            </form>
          </Box>
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
        <ProfileRelationsBox title="seguidores" itens={[seguidores]}/>
          <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">
             Comunidade ({comunidades.length})
            </h2>
          <ul>
            {comunidades.map((itemAtual) => {
                return (
                  <li key={itemAtual.id}>
                    <a href={`/communities/${itemAtual.id}`}>
                      <img src={itemAtual.imageUrl} />
                      <span>{itemAtual.title}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidade ({amigos.length})
            </h2>

            <ul>
              {amigos.map((itemAtual) => {
                return (
                  <li key={itemAtual}>
                    <a href={`/users/${itemAtual}`} >
                      <img src={`https://github.com/${itemAtual}.png`} />
                      <span>{itemAtual}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  )
}