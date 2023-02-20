import React from 'react';
import {SearchBar, Icon} from 'react-native-elements';

class SearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
    };
  }

  updateSearch = search => {
    this.setState({search});
  };

  gotoquery = data => {
    // alert(data)
    this.props.navigation.navigate('Query', {
      screen: 'Query',
      params: {data: data},
    });
  };

  render() {
    const {color, goToSearch} = this.props;
    return (
      <SearchBar
        returnKeyType="search"
        onSubmitEditing={() => this.gotoquery(this.state.search)}
        placeholder="Search..."
        onChangeText={this.updateSearch}
        value={this.state.search}
        inputContainerStyle={{
          borderRadius: 50,
          backgroundColor: '#FFFFFF',
          height: '90%',
        }}
        containerStyle={{
          backgroundColor: color,
          borderBottomWidth: 0,
          borderTopWidth: 0,
          height: '100%',
          width: '100%',
          padding: 0,
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
        }}
        inputStyle={{
          fontSize: 14,
        }}
        searchIcon={() => {
          return (
            <Icon
              type="font-awesome"
              name="search"
              size={18}
              iconStyle={{paddingLeft: 5}}
              onPress={() => {
                goToSearch(this.state.search);
              }}
            />
          );
        }}
        onChangeText={value => {
          this.setState({
            search: value,
          });
        }}
        value={this.state.search}
      />
    );
  }
}

export default SearchInput;
