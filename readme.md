### 这是一个使用原生 js 实现的拖拽和缩放库

#### 使用方法

1. 引入 css
2. 引入 js

#### 使用说明示例

```javascript
new srnd({
  el: document.getElementById("inner"), //目标元素
  boundary: document.getElementById("box"), //边界，拖拽缩放范围，默认为 html根标签
  // onlyDrag:true, //是否仅拖拽，开启后只有拖拽
  onDragStart({ el, x, y }) {
    //拖拽开始时执行，可以获取当前元素及坐标
    console.log("on drag start");
  },
  onDrag({ el, x, y }) {
    //拖拽时执行，可以获取当前元素及坐标
    console.log("on drag");
  },
  onDragStop({ el, x, y }) {
    //拖拽结束时执行，可以获取当前元素及坐标
    console.log("on drag stop");
  },
  onResizeStart({ el, x, y, width, height }) {
    //缩放开始时执行,可以获取当前元素的坐标及宽高
    console.log("on resize start");
  },
  onResize({ el, x, y, width, height }) {
    //缩放时执行,可以获取当前元素的坐标及宽高
    console.log("on resize");
  },
  onResizeStop({ el, x, y, width, height }) {
    //缩放结束时执行,可以获取当前元素的坐标及宽高
    console.log("on resize stop");
  },
});
```
