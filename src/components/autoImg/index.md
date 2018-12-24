## 图片等比加载组件 ##


## 使用方法 ##
* 通过 import { AutoImg } from "@nestsoft/backtop"; 引入模块


## 组件配置 ##

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| width | 容器宽度，必填 | number | - |
| height | 容器高度，必填 | number | - |
| lazyload | 懒加载，可选 | boolean | false |
| source | 图片url，可选 | string | - |
| defaultImage | 默认图片，可选 | string | "" |
| className | class名，可选 | string | - |
| onClick | 图片onclick，可选 | (e: MouseEvent) => void | - |
