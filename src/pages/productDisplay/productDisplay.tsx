import { ComponentClass } from 'react';
import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import './ProductDisplay.less';

type PageStateProps = {};

type PageDispatchProps = {};

type PageOwnProps = {};

type PageState = {
  name: string;
};

type IProps = PageStateProps & PageDispatchProps & PageOwnProps;

interface ProductDisplay {
  props: IProps;
  state: PageState;
}

class ProductDisplay extends Component {
  componentWillMount() {
    console.log(this.$router.params);
  }
  componentWillReceiveProps(nextProps) {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className="ProductDisplay">
        <Text>hello world</Text>
      </View>
    );
  }
}
export default ProductDisplay as ComponentClass<PageOwnProps, PageState>;
