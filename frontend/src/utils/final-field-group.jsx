import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Row, Col, Space } from "antd";
import { FieldArray } from "react-final-form-arrays";
import FinalField from "./final-field";

const FinalFieldGroup = ({ name, mutators, ...schema }) => {
  return (
    <div className="array-item mb-4" key={`final-field-${name}`}>
      <Row>
        {Object.keys(schema.items).map((fieldName, ix) => (
          <Col
            span={schema.items[fieldName].col}
            key={`final-field-${fieldName}-${ix}`}
          >
            <div className={schema.items[fieldName]?.space || ""}>
              <FinalField name={`${fieldName}`} {...schema.items[fieldName]} />
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default FinalFieldGroup;
