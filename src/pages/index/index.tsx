import Taro, { Component, Config, FC, useState } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import Cascader from '../../components/cascader'
import {Cascader as types} from '../../components/cascader/type'
import {region} from '../../components/cascader/helper'

import './index.scss'

const Index: FC = () => {
  const [value, setvalue] = useState<types.Item[]>([{label: '城市5-2', value: '1-5-2'}])
  return <View>
    <Cascader tree={region} radio value={value}/>
    <View>hello</View>
  </View>
}

export default Index
