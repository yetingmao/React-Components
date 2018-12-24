## 图片加载组件 ##


## 使用方法 ##
* 通过 import { Img } from "@nestsoft/backtop"; 引入模块


## 组件配置 ##

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| width | 容器宽度，可选 | number | auto |
| height | 容器高度，可选 | number | auto |
| lazyload | 懒加载，可选 | boolean | false |
| source | 图片url，可选 | string | - |
| defaultImage | 默认图片，可选 | string | "" |
| onClick | 图片onclick，可选 | (e: MouseEvent) => void | - |
