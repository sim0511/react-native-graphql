import { useState,useEffect } from 'react';
// import { useQuery } from '@apollo/client';
// import { GET_CONTACTS } from '../../graphql/queries';
import { Button, Form, Input} from 'antd';
import { useMutation } from '@apollo/client';
import { UPDATE_CAR} from '../../graphql/queries';
const UpdateCar = (props) => {
    const {id, year,make, model, price} = props
    // const {loading, error, data} = useQuery(GET_CONTACTS);
    const [form] = Form.useForm();
    const [, forceUpdate] = useState();
    const [updateCar] = useMutation(UPDATE_CAR);
    console.log('id',id);
    const onFinish = (values) => {
        console.log('Success:', values);
        const {year, make, model, price} = values;
        console.log(values);
        updateCar({
          variables: {
            id:id,
            year:year,
            make:make,
            model:model,
            price:price
          }
        });
        props.onButtonClick();
      }

    useEffect(() => {
      forceUpdate({});
    }, []);

    // if (loading) return 'Loading...';
    // if (error) return `Error! ${error.message}`;
    return (
        <Form
            name='add-car-form'
            layout='inline'
            size='large'
            style={{ marginBottom: '40px' }}
            initialValues={{
                year,
                make,
                model,
                price
            }}
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
        {/* <Form.Item
        name="personId"
        rules={[{ required: true, message: 'Please select a person ID' }]}
        label="Person ID"
      >
        <Select placeholder="Select a person ID">
        <Select.Option value={id}></Select.Option>
          
          
        </Select>
      </Form.Item> */}
        <Form.Item shouldUpdate={true}>
        {() => (
          <Button
          form={form}
            type='primary'
            htmlType='submit'
            disabled={
              !form.isFieldsTouched(true) ||
              form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Update Car
          </Button>
          
        )}
        </Form.Item>
        <Form.Item
             style={{ marginTop: '20px' }}
        >
            <Button onClick={props.onButtonClick}>Cancel</Button>
        </Form.Item>
        </Form>
    )
}

export default UpdateCar;
