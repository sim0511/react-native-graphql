import { DeleteOutlined } from '@ant-design/icons'
import { useMutation } from '@apollo/client'
import { GET_CONTACTS, REMOVE_CONTACT } from '../../graphql/queries'
import filter from 'lodash.filter'

const RemoveContact = ({ id }) => {

  const [removePerson] = useMutation(REMOVE_CONTACT);
  // const [removePerson] = useMutation(REMOVE_CONTACT, {
  //   update(cache, { data: { removePerson } }) {
  //     const { people } = cache.readQuery({ query: GET_CONTACTS })

  //     cache.writeQuery({
  //       query: GET_CONTACTS,
  //       data: {
  //         people: filter(people, c => {
  //           return c.id !== removePerson.id
  //         })
  //       }
  //     })
  //   }
  // })

  const handleButtonClick = () => {
    let result = window.confirm('Are you sure you want to delete this person?')

    if (result) {
      removePerson({
        variables: {
          id
        },
        update: (cache, { data: { removePerson } }) => {
          const data = cache.readQuery({ query: GET_CONTACTS });
          console.log('data',data)
          cache.writeQuery({
            query: GET_CONTACTS,
            data: {
              ...data,
              people: filter(data.people, c => {
                return c.id !== removePerson.id
              })
            },
          });
        },
      }
      )
    }
  }

  return <DeleteOutlined key='delete' style={{ color: 'red' }} onClick={handleButtonClick} />
}

export default RemoveContact
