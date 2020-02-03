import { ComponentClass } from 'react'
import Taro, { Component } from '@tarojs/taro'
import { View ,Text } from '@tarojs/components'
import './address.less'

type PageStateProps = {}

type PageDispatchProps = {}

type PageOwnProps = {}

type PageState = {
    name: string
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface AddressIndexes {
    props: IProps;
    state: PageState
}

class AddressIndexes extends Component {
   constructor(props){
       super(props)
       this.state = {
          name: '小红'
       }

    }
componentWillReceiveProps (nextProps) {}

componentWillUnmount () { }

componentDidShow () { }

componentDidHide () { }

render () {
    return (
        <View className='AddressIndexes'>
            <Text>hello world</Text>
        </View>
    )
}

}
export default AddressIndexes as ComponentClass<PageOwnProps, PageState>
