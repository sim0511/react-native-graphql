import './App.css'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import Title from './components/layout/Title'
import AddContact from './components/forms/AddContact'
import Contacts from './components/lists/Contacts'
import AddCar from './components/forms/addCar'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import ShowPage from './components/showpage'
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
})

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className='App'>
          <Title content="People and Their Cars"/>
          <Routes>
            <Route path="/" element={
            <>
            <Title content="Add Person"/>
          <AddContact />
          <Title content="Add Car"/>
          <AddCar />
          <Title content="Records"/>
          <Contacts />
          </>
          }/>
          <Route path="/show-page/:id/:firstName/:lastName" element={<ShowPage />} />
          </Routes>
          
        </div>
      </Router>
    </ApolloProvider>
  )
}

export default App
