// @flow

import React from 'react';
import { Dropdown, Input } from 'semantic-ui-react';

type NumberInputType = {
  value: string,
  onChange: (e: Event) => void,
  title: string,
  changeRounding: (rounding: string) => void,
}

const options = [
  { key: '5', text: '5', value: '5' },
  { key: '10', text: '10', value: '10' },
  { key: '15', text: '15', value: '15' },
  { key: '30', text: '30', value: '30' },
  { key: '60', text: '60', value: '60' },
];



class  NumberInput  extends React.Component<NumberInputType>{
  constructor(props){
    super(props);
    this.state = {
      value: props.value
    };
    this.onDropdownChange = this.onDropdownChange.bind(this);
   }
  onDropdownChange(event, data)
  {
    this.setState({value: data.value});
    this.props.changeRounding(data.value);
    
  }
  render() {
    const { title, onChange, value }  = this.props; 
    return (
      <Input
        title={title}
        type="number"
        value={value}
        onChange={onChange}
        size="small"
        label={<Dropdown defaultValue={value} options={options} onChange={this.onDropdownChange}/>}
        labelPosition="left"
        placeholder="Duration rounding"
      />
    );
  }
} 


export default NumberInput;
