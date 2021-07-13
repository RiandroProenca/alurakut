import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/box'

export default function Home() {
  return (
    <MainGrid>
      <div className="profileArea" style={{ gridArea : 'profileArea'}} >
      <Box> 
        <img img src= "https://github.com/RiandroProenca.png" style={{ borderRadius: '8px' }} />
        </Box>
      </div>
     <div className="welcomeArea" style={{ gridArea:' welcomeArea'}}>
     <Box> 
        Bem Vindo
        </Box>
     </div>
     <div className="profileRelationsArea" style={{ gridArea : 'profileRelationsArea'}}>
     <Box> 
        Comunidade 
        </Box>
     </div>

    </MainGrid>
  )
}
