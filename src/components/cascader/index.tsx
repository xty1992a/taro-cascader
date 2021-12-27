import Taro, {FC, useEffect, useMemo, useState} from '@tarojs/taro';
import {View} from '@tarojs/components';
import {Cascader} from "./type";
import * as helper from './helper';
import './index.scss';
import classnames from 'classnames';

interface Props {
  tree: Cascader.Tree[]
  radio: boolean
  value: Cascader.Item[]
}

interface Item extends Cascader.Item {
  picked: boolean
}

const Cascader: FC<Props> = (props) => {
  const {tree, value} = props;
  const options = useMemo(() => {
    if (!tree) return [];
    return tree.reduce((acc, it) => [...acc, ...helper.treeToOption(it, 'region')], []);
  }, [tree]);
  const [track, setTrack] = useState<string[]>([]);
  const displayList = useMemo<Item[][]>(() => {
    if (!tree) return [];
    const result: Item[][] = [];
    const list = [...track];
    let optionList: Cascader.Tree[] | undefined = tree;
    while (optionList) {
      const key = list.shift();
      const tmp = optionList
      optionList = undefined
      const level = tmp.map(i => {
        const it: Item = {
          ...helper.pickItem(i),
          picked: i.value === key
        };
        if (it.picked && i.children) {
          optionList = i.children
        }
        return it
      })
      result.push(level)
    }

    return result;
  }, [track, tree]);

  // region methods
  const onPick = (it: Item, depth: number) => {
    if (it.picked) {
      if (depth!==track.length-1) return
      setTrack(track.slice(0, track.length-1))
    }else {
      const newTrack = track.slice(0, depth)
      setTrack([...newTrack, it.value])
    }
  }
  // endregion

  // region effect
  useEffect(() => {
    console.log(track);

    const last = track[track.length-1]

    const item = options.find(it => it.value === last)
    if (item && item.is_leaf) {
      console.log('已选出结果', item)
    }

  }, [track]);

  useEffect(() => {
    const [first] = value;
    if (!first) return;
    const item = options.find(it => it.value === first.value);
    if (!item) return;
    const t = helper.trackLeaf(item, options);
    console.log(t);
    setTrack(t);
  }, [value]);
  // endregion


  return <View className="cascader">
    {
      displayList.map((list, index) => (
        <View key={index} className="row"
              style={{
                width: (1 / displayList.length )* 100 + 'vw'
              }}
        >
          {
            list.map(it => (
              <View key={it.value}
                    className={classnames('col', {
                      picked: it.picked
                    })}
                    onClick={onPick.bind(null, it, index)}

              >{it.label}</View>
            ))
          }
        </View>
      ))
    }
  </View>;
};

export default Cascader;
