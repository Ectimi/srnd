### 这是一个使用原生 js 编写的拖拽和缩放库，也就是可以拖拽和缩放元素

#### 使用方法

1. 引入 css
2. 引入 js

#### 示例

```javascipt
    new srnd({
        el: document.getElementById("inner"),
        boundary:document.getElementById('box'),
        onDragStart(){
            console.log('drag start')
        },
        onDragStart(){
            console.log('drag')
        },
        onDragStop(){
            console.log('drag end')
        },
        onResizeStart(){
            console.log('resize start')
        },
        onResize(){
            console.log('resize')
        },
        onResizeStop(){
            console.log('resize stop)
        }
      });
```
