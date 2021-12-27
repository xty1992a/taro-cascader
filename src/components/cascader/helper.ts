import {Cascader} from './type';

export const list: Cascader.Option[] = [
  {
    label: '地区',
    value: '0',
    is_leaf: false,
    parent_id: 'region'
  },
  {
    label: '地区1',
    value: '0-1',
    is_leaf: true,
    parent_id: '0'
  },
  {
    label: '地区2',
    value: '0-2',
    is_leaf: true,
    parent_id: '0'
  },
  {
    label: '地区3',
    value: '0-3',
    is_leaf: true,
    parent_id: '0'
  },
  {
    label: '地区4',
    value: '0-4',
    is_leaf: true,
    parent_id: '0'
  },
  {
    label: '地区5',
    value: '0-5',
    is_leaf: true,
    parent_id: '0'
  },
  {
    label: '城市',
    value: '1',
    is_leaf: false,
    parent_id: 'region'
  },
  {
    label: '城市1',
    value: '1-1',
    is_leaf: true,
    parent_id: '1'
  },
  {
    label: '城市2',
    value: '1-2',
    is_leaf: true,
    parent_id: '1'
  },
  {
    label: '城市3',
    value: '1-3',
    is_leaf: true,
    parent_id: '1'
  },
  {
    label: '城市4',
    value: '1-4',
    is_leaf: true,
    parent_id: '1'
  },
  {
    label: '城市5',
    value: '1-5',
    is_leaf: false,
    parent_id: '1'
  },
  {
    label: '城市5-1',
    value: '1-5-1',
    is_leaf: true,
    parent_id: '1-5'
  },
  {
    label: '城市5-2',
    value: '1-5-2',
    is_leaf: true,
    parent_id: '1-5'
  },
];


export function optionToTree(list: Cascader.Option[], parent: string) {
  return list.reduce((acc, it) => {
    if (it.parent_id !== parent) return acc;
    const item: Cascader.Tree = {label: it.label, value: it.value};

    if (!it.is_leaf) {
      item.children = optionToTree(list, it.value);
    }

    return [...acc, item];
  }, []);
}

export function treeToOption(tree: Cascader.Tree, parent: string) {
  const result: Cascader.Option[] = [];

  function walk({label, value, children}: Cascader.Tree, parent: string) {
    result.push({label, value, is_leaf: children === undefined, parent_id: parent});
    if (children) {
      children.forEach(it => {
        walk(it, value);
      });
    }
  }

  walk(tree, parent);
  return result;
}

export function trackLeaf(leaf: Cascader.Option, options: Cascader.Option[]) {
  if (!leaf.is_leaf) throw new Error('Leaf必须是叶子节点');
  const result: string[] = [];
  let now: Cascader.Option | undefined = leaf;
  while (now) {
    const {value, parent_id} = now;
    result.unshift(value);
    now = options.find(it => it.value === parent_id);
  }
  return result;
}

export const region = optionToTree(list, 'region');

export function pickItem({label, value}: Cascader.Tree | Cascader.Option) {
  return {label, value};
}

const revertList = region.reduce((acc, it) => [...acc, ...treeToOption(it, 'region')], []);

// console.log(JSON.stringify(region, null, 4))
// console.log(list)
// console.log(revertList)
// console.log(trackLeaf({ label: '城市5-2', value: '1-5-2', is_leaf: true, parent_id: '1-5' }, list))
