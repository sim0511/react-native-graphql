import { useState } from 'react'
import { Card } from 'antd'
import RemoveContact from '../buttons/RemoveContact'
import UpdateContact from '../forms/UpdateContact'
import { EditOutlined } from '@ant-design/icons'
import { CarCard } from './CarCard'
import { useQuery } from '@apollo/client'
import { GET_CARS } from '../../graphql/queries'
import { Link } from 'react-router-dom'
const ContactCard = props => {
  const [editMode, setEditMode] = useState(false)
  const styles = getStyles()
  const { id, firstName, lastName } = props
  const handleButtonClick = () => {
    setEditMode(!editMode)
  }
  console.log('id', id)
  const { loading, error, data } = useQuery(GET_CARS,{
    variables: { personId: id }
  });

  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`
  console.log('data', data)
  return (
    <div style={styles.container}>
      {editMode ? (
        <UpdateContact
          id={id}
          firstName={firstName}
          lastName={lastName}
          onButtonClick={handleButtonClick}
        />
      ) : (
        <Card
          style={styles.card}
          key={id}
          actions={[
            <EditOutlined key='edit' onClick={handleButtonClick} />,
            <RemoveContact id={id} />
          ]}
        >
          {firstName} {lastName}
          {
        data.getCarsByPersonId.map(({ id, year, make, model, price }) => (
          <CarCard key={id} id={id} year={year} make={make} model={model} price={price} />
        ))
      }
      <Link to={`/show-page/${id}/${firstName}/${lastName}`}>Learn More</Link>
        </Card>
      )}
      
    </div>
  )
}

const getStyles = () => ({
  card: {
    width: '100%'
  },
  container:{
    display: 'flex',
    justifyContent: 'center',
    width: '800px'
  }
})

export default ContactCard
