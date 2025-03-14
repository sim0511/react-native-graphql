import React from "react";
import { Card} from "antd";
import { EditOutlined } from '@ant-design/icons'
import RemoveContact from '../buttons/RemoveContact'
import RemoveCar from '../buttons/RemoveCar'
// import AddCar from "../forms/addCar";
import UpdateCar from "../forms/updateCar";

export const CarCard = (props) => {
  const styles = getStyles();
    const { id,year,make,model,price } = props;
    console.log(id);
    const [editMode, setEditMode] = React.useState(false);
 
  const handleButtonClick = () => {
    setEditMode(!editMode);

  }


  return (
    editMode ? (
      <UpdateCar
        id={id}
        year={year}
        make={make}
        model={model}
        price={price}
        onButtonClick={handleButtonClick}
      />
    ) :
    (<Card 
        title={`${year} ${make} ${model} -> $${price}`}
        bordered={false} 
        type="inner"
        actions={[
            <EditOutlined key='edit' onClick={handleButtonClick} />,
            <RemoveCar id={id} />
          ]}
        />
      )
  );
};

const getStyles = () => ({
  card: {
    // width: "500px",
  },
});
