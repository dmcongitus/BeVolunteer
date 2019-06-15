import React from "react";
import {
  Col,
  Table,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText
} from "reactstrap";

export default class EventSetting extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Form>
        <FormGroup row>
          <Table borderless>
            <tbody>
              <tr>
                <td>Trạng thái</td>
                <td>
                    {this.props.status==="UPCOMING"?"Xắp diễn ra":null}
                    {this.props.status==="ONGOING"?"Đang diễn ra":null}
                    
                </td>
                <td>
                {this.props.status==="UPCOMING"?<Button color="success" onClick={()=>this.props.startEvent(this.props._id)}>Bắt đầu</Button>:null}
                {this.props.status==="ONGOING"?<Button color="danger" onClick={()=>this.props.startEvent(this.props._id)}>Dừng </Button>:null}
                  
                </td>
              </tr>
            
            </tbody>
          </Table>
        </FormGroup>
      </Form>
    );
  }
}
