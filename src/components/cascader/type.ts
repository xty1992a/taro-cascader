export namespace Cascader {
  export interface Option extends Item {
    is_leaf: boolean;
    parent_id: string;
  }

  export interface Tree extends Item{
    children?: Tree[]
  }

  export interface Item {
    label: string;
    value: string;
  }
}
