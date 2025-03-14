import { gql } from '@apollo/client'

export const GET_CONTACTS = gql`
  {
    people {
      id
      firstName
      lastName
    }
  } 
`

export const GET_PERSON = gql`
  query GetPersonById($personId: String!) {
    person(id: $personId) {
    id
    firstName
    lastName
  }
}

`
export const GET_CARS = gql`
    query GetCarsByPersonId($personId: String!) {
      getCarsByPersonId(personId:$personId){
      id
      year
      make
      model
      price
      personId
    }
    }
`
export const GET_ALL_CARS = gql`
   {
      cars{
      id
      year
      make
      model
      price
      personId
    }
  }
`
export const ADD_PERSON = gql`
  mutation AddPerson($id: String!, $firstName: String!, $lastName: String!) {
    addPerson(id: $id, firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
    }
  }
`

export const REMOVE_CONTACT = gql`
  mutation RemoveContact($id: String!) {
    removePerson(id: $id) {
      id
      firstName
      lastName
    }
  }
`

export const UPDATE_CONTACT = gql`
  mutation UpdateContact($id: String!, $firstName: String!, $lastName: String!) {
    updatePerson(id: $id, firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
    }
  }
`
export const ADD_CAR = gql` 
  mutation AddCar($id: String!, $year: String!, $make: String!, $model: String!, $price: String!, $personId: String!) {
    addCar(id: $id, year: $year, make: $make, model: $model, price: $price, personId: $personId) {
      id
      year
      make
      model
      price
      personId
    }
  }
`
export const UPDATE_CAR = gql`
  mutation UpdateCar($id: String!, $year: String!, $make: String!, $model: String!, $price: String!) {
    updateCar(id: $id, year: $year, make: $make, model: $model, price: $price) {
      id
      year
      make
      model
      price
    }
  }
`
export const REMOVE_CAR = gql`
  mutation RemoveCar($id: String!) {
    removeCar(id: $id) {
      id
      year
      make
      model
      price
      personId
    }
  }
`