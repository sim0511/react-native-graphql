import { useState,useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_CONTACTS,ADD_CAR, GET_CARS } from '../../graphql/queries';
import { Button, Form, Input, Select} from 'antd';
import { useMutation } from '@apollo/client';
import { v4 as uuidv4 } from "uuid";
const AddCar = () => {
  const [id] = useState(uuidv4());
    const {loading, error, data} = useQuery(GET_CONTACTS);
    const [form] = Form.useForm();
    const [, forceUpdate] = useState();

    useEffect(() => {
      forceUpdate({});
    }, []);
    const [addCar] = useMutation(ADD_CAR);

    const onFinish = (values) => {
      console.log('Success:', values);

      const { year, make, model, price, personId } = values;
      addCar({
        variables: {
          id,
          year,
          make,
          model,
          price,
          personId
        },
        update: (cache, { data: { addCar } }) => {
          // let data;
          const data = cache.readQuery({ query: GET_CARS, variables: { personId: personId }}              );
          console.log('data',data)
          
            cache.writeQuery({
              query: GET_CARS,
              variables: { personId: personId },
              data: {
                ...data.getCarsByPersonId,
                getCarsByPersonId: [...data.getCarsByPersonId, addCar],
              },
            });
          
          console.log('cars',data)
          forceUpdate({});
          // try{
          // }catch(e){
          //   data={  cars: []}
          // }
        },
      });
    }
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    return (
        <Form
            name='add-car-form'
            layout='inline'
            size='large'
            style={{ marginBottom: '40px' }}
            onFinish={onFinish}
        >
        <Form.Item
            name='year'
            rules={[{ required: true, message: 'Please enter an year' }]}
            style={{ marginBottom: '20px' }}
            label='Year'
        >
            <Input placeholder='i.e. 2020' />
        </Form.Item>
        <Form.Item
            name='make'
            rules={[{ required: true, message: 'Please enter a make' }]}
            label='Make'
        >
            <Input placeholder='i.e. Toyota' />
        </Form.Item>
        
        <Form.Item
            name='model'
            rules={[{ required: true, message: 'Please enter a model' }]}
            label='Model'
        >
            <Input placeholder='i.e. Camry' />
        </Form.Item>
        <Form.Item
            name='price'
            rules={[{ required: true, message: 'Please enter a price' }]}
            label='Price'
            >
            <Input placeholder='i.e. 25000' />
        </Form.Item>
        <Form.Item
        name="personId"
        rules={[{ required: true, message: 'Please select a person ID' }]}
        label="Person ID"
      >
        <Select placeholder="Select a person ID">
        {data.people.map(({ id, firstName, lastName}) => (<Select.Option value={id}>{firstName+ ' '+ lastName}</Select.Option>))}
          
        </Select>
      </Form.Item>
        <Form.Item shouldUpdate={true}>
        {() => (
          <Button
            type='primary'
            htmlType='submit'
            disabled={
              !form.isFieldsTouched(true) ||
              form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Add Car
          </Button>
        )}
        </Form.Item>
        </Form>
    )
}

export default AddCar;
