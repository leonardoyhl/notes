

### ECharts
* 文档：
    1. 官方
    2. [W3Cschool](https://www.w3cschool.cn/echarts_tutorial/ "https://www.w3cschool.cn/echarts_tutorial/")
* x、y轴的type字段的可取值——`value`、`category`、`time`、`log`
* series：
    * type字段的可取值——`line/pie/bar`等
    * smooth: true——曲线更平滑
* `init(dom)`——初始化
* `setOption(option)`——配置，默认将于之前的配置合并
* `clear()`——清空当前实例，getOption将返回为`{}`，可用于重新绘制、产生初始绘制时的动画

#### 柱状图 设置固定柱宽和最大宽度
```javascript
series: [
    {
        name: 'name',
        type: 'bar',
        barWidth: 30,
        barMinWidth: 20,
        barMaxWidth: 30,
    }
]
```

#### 实现内部横向滚动条
在配置项中设置dataZoom：
```javascript
dataZoom: [
    {
        show: true,
        realtime: true,
        start: 0,
        end: 50
    },
    {
        type: 'inside',
        realtime: true,
        start: 0,
        end: 50
    }
]
```

#### 设置四周空白宽度
```javascript
grid: { // 设置四周
    top: 10,
    bottom: 30,
    right: 10,
    left: 50
},
```

#### 坐标轴加单位
```javascript
yAxis: {
    axisLabel:{
        formatter: "{value} %"
    }
}
```

#### 数据格式化
```
formatter
```
1. 字符串格式化
    * series中： `{a}{b}{c}{d}`
        * 折线（区域）图、柱状（条形）图: a（系列名称），b（类目值），c（数值）, d（无）
        * 散点图（气泡）图 : a（系列名称），b（数据名称），c（数值数组）, d（无）
        * 饼图、雷达图 : a（系列名称），b（数据项名称），c（数值）, d（百分比）
    * tooltip中：`{a1}, {b1}, {c1}, {d1}, {a2}, {b2}, {c2}, {d2}, ...`，各含义同series
    * 其他：`{value}`
2. 函数格式化

#### Angular 2+ 引入echarts
参考：https://blog.csdn.net/qq_35321405/article/details/80340969
* Angular提供的方法：
    1. 下载安装
    ```
    npm install echarts --save
    npm install ngx-echarts --save
    ```
    2. angular.json - scripts属性配置echarts路径
    3. module中引入`NgxEchartsModule`
    4. 页面中使用，目标元素添加`echarts`指令，绑定`option`属性
    ```html
    <div echarts [option]="option"></div>
    ```
* 引入原文件，声明`echarts`全局变量：
    1. angular.json - scripts属性配置echarts路径
    2. typings.d.ts 文件中申明`echarts`变量
    3. 使用同普通页面

#### 地图区域文字

series-map
```json
{
    "type": "map",
    "map": "mapName",   // 等同于 mapType
    // 共用geo
    "geoIndex": 0,  // 默认情况下，map series 会自己生成内部专用的 geo 组件。但是也可以用这个 geoIndex 指定一个 geo 组件。这样的话，map 和 其他 series（例如散点图）就可以共享一个 geo 组件了。并且，geo 组件的颜色也可以被这个 map series 控制，从而用 visualMap 来更改。
    "label": {
        "normal": {
            "show": true,   // 设置为`true`才会展示文字
            // position: "insideLeft",  // 不生效，不知为何
            "formatter": "{b}",
        },
        "emphasis": {
        }
    }
}
```

#### 实现立体地图

* https://gallery.echartsjs.com/editor.html?c=xPRYVyWjUJ
option.geo 结合 series.map
```json
"geo": {
    "layoutCenter": ["50%", "51.5%"], // 地图位置 设定偏差，产生立体效果
}
```
