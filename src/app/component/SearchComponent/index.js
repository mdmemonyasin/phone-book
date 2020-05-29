import React from 'react';
import { Select, Spin } from 'antd';
import debounce from 'lodash/debounce';
import styles from './index.module.scss';

const { Option } = Select;

class SearchComponent extends React.Component {
  constructor(props) {
    super(props);
    this.lastFetchId = 0;
    this.fetchUser = debounce(this.fetchUser, 800);
  }

  state = {
    data: [],
    value: [],
    fetching: false,
    key: 'name',
  };

  fetchUser = (value) => {
    console.log('fetching user', value);
    this.lastFetchId += 1;
    const fetchId = this.lastFetchId;
    this.setState({ data: [], fetching: true });
    fetch('http://localhost:8000/getFilter/?'+this.state.key+"="+value)
      .then((response) => response.json())
      .then((body) => {
        if (fetchId !== this.lastFetchId) {
          // for fetch callback order
          return;
        }
        console.log(body);
        const data = body.result.map((user) => ({
          text: `${user.name} ${user.number}`,
          value: user._id,
        }));
        this.setState({ data, fetching: false });
      });
  };

  handleChange = (value) => {
    this.setState({
      value,
      data: [],
      fetching: false,
    });
  };

  render() {
    const { fetching, data, value } = this.state;
    return (
      <div className={styles.searchBarWrapper}>
        <Select
          defaultValue={this.state.key}
          onChange={(value) => {
            this.setState((prevState) => ({
              ...prevState,
              key: value,
            }));
          }}
        >
          <Option value='name'>Name</Option>
          <Option value='number'>Phone</Option>
          <Option value='email'>Email</Option>
        </Select>

        <Select
          mode='multiple'
          labelInValue
          value={value}
          placeholder='Select users'
          notFoundContent={fetching ? <Spin size='small' /> : null}
          filterOption={false}
          onSearch={this.fetchUser}
          onChange={this.handleChange}
          style={{ width: '40%' }}
        >
          {data.map((d) => (
            <Option key={d.value}>{d.text}</Option>
          ))}
        </Select>
      </div>
    );
  }
}

export default SearchComponent;
