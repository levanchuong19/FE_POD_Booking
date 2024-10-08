import { Card, Checkbox, CheckboxProps, InputNumber, InputNumberProps } from "antd";
import { Service } from "../modal/service";
import "./index.scss";
import formatVND from "../../utils/currency";
import { useState } from "react";

interface ServiceCardProps {
  service: Service;
  onSelect: (service: Service) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onSelect }) => {
  const [showInputNumber, setShowInputNumber] = useState(false);

  const onCheckboxChange: CheckboxProps['onChange'] = (e) => {
    setShowInputNumber(e.target.checked);
    if (e.target.checked) {
      onSelect(service); // Call onSelect prop when the checkbox is checked
    }
  };

  const onChange: InputNumberProps['onChange'] = (value) => {
    console.log('changed', value);
  };

  return (
    <div className="service-card">
      <Card
        className="service-card-inner"
        hoverable
        style={{ width: 350 }}
        cover={<img alt={service?.name} src={service?.imageUrl} />}
      >
        <div className="service-card-content">
          <div className="desc">
            <strong>{service?.name}</strong>
            <p>{service?.description}</p>
            <p>{formatVND(service.unitPrice)}</p>
            <p>{service.id}</p>
          </div>

          <Checkbox style={{ marginTop: "15px", marginRight: "80px" }} onChange={onCheckboxChange}>
            Thêm
          </Checkbox>

          {showInputNumber && (
            <InputNumber min={1} max={10} defaultValue={1} placeholder="Số lượng" onChange={onChange} />
          )}
        </div>
      </Card>
    </div>
  );
};

export default ServiceCard;
