import { DeleteOutlined } from '@ant-design/icons'
import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { GET_ALL_CARS, REMOVE_CAR } from '../../graphql/queries'
import { useQuery } from '@apollo/client'
import filter from 'lodash.filter'

const RemoveCar = ({ id }) => {
  const { loading, error, data} = useQuery(GET_ALL_CARS);
  console.log(data);
  const [, forceUpdate] = useState();
  useEffect(() => {
    forceUpdate({});
  }, []);
  const [removeCar] = useMutation(REMOVE_CAR)

  const handleButtonClick = () => {
    let result = window.confirm('Are you sure you want to delete this car ?')

    if (result) {
      removeCar({
        variables: {
          id
        },
        update(cache, { data: { removeCar } }) {
            const data  = cache.readQuery({ query: GET_ALL_CARS})
            console.log('cars',data); 
            console.log('removeCar',removeCar);
            cache.writeQuery({
              query: GET_ALL_CARS,
              data: { 
                ...data,
                cars: filter(data.cars, c => {
                  return c.id !== removeCar.id
                })
              }
            })
          }
      })
    }

  }

  return <DeleteOutlined key='delete' style={{ color: 'red' }} onClick={handleButtonClick} />
}

export default RemoveCar
