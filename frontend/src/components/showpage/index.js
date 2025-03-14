import React from 'react'
import Title from '../layout/Title'
import { Button,Card } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_CARS } from '../../graphql/queries';
const ShowPage = () => {
    const navigate = useNavigate(); 
    const {id,firstName,lastName} = useParams();

    const { loading, error, data } = useQuery(GET_CARS,{
        variables: { personId: id }
      });
    console.log(id);

    // const {loading:personLoading, error:personError, data:personData} = useQuery(GET_PERSON,{
    //     variables: { id: id }
    // })
    
    if (loading) return 'Loading...'
    if (error) return `Error! ${error.message}`
    // if (personLoading) return 'Loading...';
    // if (personError) return `Error! ${personError.message}`;
    
    // console.log('carsData', personData)
        console.log('data', data)
    return(
        <>
        <div style={{ position: 'absolute', top: 10, left: 10 }}>
                <Button type="primary" onClick={() => navigate('/')}>
                    Go Back Home
                </Button>
        </div>
        <Title content={`${firstName} ${lastName}`}/>
        {data.getCarsByPersonId.map(({ id, year, make, model, price }) => (
        <Card
          key={id}
          title={`Car ID: ${id}`}
          style={{width:500,marginTop: 16 }}
        >
          <p><strong>Year:</strong> {year}</p>
          <p><strong>Make:</strong> {make}</p>
          <p><strong>Model:</strong> {model}</p>
          <p><strong>Price:</strong> ${price}</p>
        </Card>
      ))}
        </>
    )
}

export default ShowPage