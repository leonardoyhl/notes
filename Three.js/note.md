#### 坐标系原则：
* 右手坐标系，x右，y↑，z由里向外

requestAnimationFrame兼容：
1. Paul Irish's shim：http://paulirish.com/2011/requestanimationframe-for-smart-animating/
2. 
    ```javascript
    window.requestAnimFrame = (function(){  
        return  window.requestAnimationFrame       ||  
                window.webkitRequestAnimationFrame ||  
                window.mozRequestAnimationFrame    ||  
                window.oRequestAnimationFrame      ||  
                window.msRequestAnimationFrame     ||  
                function(/* function */ callback, /* DOMElement */ element){  
                    window.setTimeout(callback, 1000 / 60);  
                };  
        })();
    ```

position，up和lookAt的关系：
* https://blog.csdn.net/u010588262/article/details/79570436
* 视频：http://www.hewebgl.com/video/2

### Object3D：
* 任何继承自Object3D的对象都可以添加、移除Object3D对象 `parent.add/remove(child)`
* 通过`name` `id`获取3D对象 `getObjectByName`, `getObjectById`
* `visible` 隐藏显示3D对象
* `traverse(fn)` 迭代遍历自身以及子孙3D对象
* `traverseVisible` 迭代遍历可见的自身以及子孙3D对象

顶点法向量：
* 以这个点为顶点的所有三角形的法向量之和

clone(recursive?)与copy(source, recursive?)方法的异同：
* 都拷贝对象内的所有属性
* clone复制自身并返回拷贝后的对象
* copy复制传入的参数source并返回当前对象，相当于基于source重设当前对象
* `recursive`是否迭代遍历-深拷贝，遍历子对象，默认`true`

三角面`Face3(a, b, c, normal, color, materialIndex)`：
* 前三个参数为构成几何体Geometry的所有顶点的索引，当调整顺序时效果不同

欧拉角Euler：
* https://en.wikipedia.org/wiki/Euler_angles

坐标轴AxesHelper：
* new AxesHelper(size)，也是一个Object3D对象，所以可以将其添加到Scene中;

正交投影（投影不改变物体比例）和透视投影（近大远小）：
* 正交投影照相机，`THREE.OrthographicCamera(left, right, top, bottom, near, far)`，相机到视锥体各面的距离，为了保持照相机的横竖比例，保证(right - left)与(top - bottom)的比例与Canvas宽度与高度的比例一致
* 透视投影照相机，`THREE.PerspectiveCamera(fov/垂直张角, aspect/横纵比, near, far/相机到视景体最近、最远的距离)`

世界坐标与本地坐标：
* 世界坐标即整个3D场景坐标，针对Scene；
* 本地坐标即某个整体的坐标，针对某个Object3D对象；
* 本地坐标体现了多个几何形状（相同动作、相对静止）看作整体的思想，可用Object3D实例包装，然后将该Object3D对象加入到scene中实现渲染，带来的好处：该整体一起运动，只需改变外层对象的位置或动作即可实现该整体一起运动，而不需要逐个修改几何形状的位置或动作；

### stats.js：
* 性能测试、监控帧率/内存JS库；
* https://github.com/mrdoob/stats.js
* e.g.
    ```javascript
    var stats = new Stats();
    stats.showPanel(0); // 设置展示样式，0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild(stats.dom);   // 将其dom元素添加到页面
    // 帧循环中调用
    function animate() {
        stats.begin();
        // monitored code goes here
        stats.end();
        requstAnimationFrame(animate);
    }
    // 程序自动计算并展示性能；
    ```

### tween.js:
* 按照一定规律/频率改变一些属性的值
* 了解tween.js—可实现，new TWEEN.Tween(targetObj)实例化，to(expected, time)方法设置在time毫秒内变化到expected，类似jQuery的animate方法，repeat(times)方法实现重复times次周期性变化，start开始执行，帧循环中调用对象的update或者TWEEN.update(更新所有)方法触发更新，支持链式调用tweenA.chain(tweenB)；
* 教程：https://www.jianshu.com/p/164538a89939
    ```javascript
    var tween = new TWEEN.Tween(position)    //实例化，obj-待改变的对象
        .to(targetObj, time)    // time毫秒内变化到targetObj
        .repeat(times)  // 重复上诉变化次数，实际执行次数times+1
        .onUpdate(fn)   // 调用update时触发的回调
        .start();   // 激活(???开始动画)
    // tweenA.chain(tweenB);    // 链式调用，实现有序
    // 循环函数/动画中调用update方法触发更新
    function animate(){
        TWEEN.update(); // 更新所有激活的tweens
        // tween.update();  // 更新所属tween，(???告诉tween开始执行)
        // 类似的还有start、stop方法
        // 对应事件onStart、onStop、onComplete-tween全部结束的回调
        requestAnimationFrame(animate);
    }

### WebGL思想：
* 无曲线，一切曲线均靠多段细小的直线近似模拟
* 无曲面，一切曲面均由多个三角形分段构成，当段足够多的时候就可以看做一个比较平滑的曲面

几何体类型Geometry和BufferGeometry的异同与互转：
* 都是用于存储模型的顶点位置、面的索引、法向量、颜色、uv纹理以及一些自定义的属性
* `BufferGeometry`存储一些元素数据，性能更高，适合一些放入场景内不需要额外操作的模型
* `Geometry`更友好，使用了`Vector3`、`Face3`和`Color`等对象存储数据（顶点位置，面，颜色等），易于阅读和编辑，但效率低于`BufferGeometry`使用的类型化数组
* 小项目推荐使用`Geometry`，中大型推荐`BufferGeometry`
* 转化：
    ```javascript
    geometry.fromBufferGeometry(bufGeo);    // Geometry 转 BufferGeometry
    bufGeo.fromGeometry(geometry);    // BufferGeometry 转 Geometry
    ```

### 几何体Geometry：
* 立方体BoxGeometry：`BoxGeometry(width, height, depth, widthSegments, heightSegments, depthSegments)`
* 圆CircleGeometry：`CircleGeometry(radius, segments, thetaStart, thetaLength)`
* 圆锥ConeGeometry：`ConeGeometry(radius, height, radiusSegments, heightSegments, openEnded, thetaStart, thetaLength)`
    * openEnded — 指示锥底是打开还是覆盖的布尔值，默认false，覆盖
* 圆柱CylinderGeometry：`CylinderGeometry(radiusTop, radiusBottom, height, radiusSegments, heightSegments, openEnded, thetaStart, thetaLength)`
* 球SphereGeometry：`SphereGeometry(radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength)`
* 平面PlaneGeometry：`PlaneGeometry(width, height, widthSegments, heightSegments)`
* 二维圆环状RingGeometry：`RingGeometry(innerRadius, outerRadius, thetaSegments, phiSegments, thetaStart, thetaLength)`
* 三维圆环面TorusGeometry：`TorusGeometry(radius, tube, radialSegments, tubularSegments, arc)`
    * tube — 管道直径. 默认值为40.
* 四面体TetrahedronGeometry：`TetrahedronGeometry(radius, detail)`
    * radius — 四面体半径. 默认值为1.
    * detail — 默认值为0. 设置为大于0的值将添加顶点使之不再是一个四面体.

### 颜色Color：
* RGB三颜色分量：`var color = new THREE.Color(r, g, b); // r/g/b - 0~1之间，默认1，故默认白色
    * 三参数时调用`.setRGB(r, g, b)`
    * 一参数时调用`.set(value)`
* 实例化不传值：`var color = new THREE.Color(); // 默认白色`
* 十六进制颜色数值：`var color = new THREE.Color( 0xff0000 );`
* Color对象：`var color = new THREE.Color( oldColor );`
* CSS样式-字符串：`var color = new THREE.Color( "string" );`
    * #ff0000
    * #f00
    * rgb(255, 0, 0)
    * rgb(100%,0%,0%)
    * red
    * hsl(0, 100%, 50%)
* 设置：`color.set(value)`
    * THREE.Color - 内部调用.copy
    * hexadecimal - 内部调用.setHex
    * string - 内部调用.setStyle

threejs三角形Geometry的顶点时针顺序会导致三角形看不见：
* https://www.cnblogs.com/JD85/p/10114822.html
* 可能与`Face3`参数设定的顶点索引顺序有关，造成法向量的方向相反，改成顺时针或逆时针
* 原则：想办法让法向量指向你的摄像机

不出平面：
* 可能是因为没有用requestAnimationFrame循环调用渲染，而只是渲染了一次；

用平面PlaneGeometry模拟的阴影——经过旋转放到地面ground（另外一个平面Plane）上时，看不到：
* 没有给二者设置间距，导致重合而看不到；
* 可以考虑设置间距（如.position.y = 0.01）

### 光Light：
* 基类 Light - Light(color, intensity)
    * intensity - 光的强度，0-1，默认1
* 环境光 AmbientLight
* 平行光 DirectionalLight
    * position - Vector3，有时需要用它设置位置
    * target - 用于阴影相机定位的目标
    * shadow - 存储渲染光照阴影的所有相关信息
    * castShadow - boolean，是否根据光照产生动态阴影，代价高

### 材料Material：
#### 基础属性
* transparent - boolean，是否透明
#### 网孔材料Mesh-Material
公有属性：
* wireframe - boolean，是否绘制为线框

MeshBasicMaterial 与 MeshLambertMaterial：
* MeshBasicMaterial - 一个以简单着色（平面或线框）方式来绘制几何形状的材料
* MeshLambertMaterial - 一种非发光材料（兰伯特）的表面，计算每个顶点
    * 可因不同角度/面接受到的光照不同，产生明暗，从而更具立体感

### 纹理Texture：
* needsUpdate - 如果在创建后修改纹理，将此标志设置为真，以便正确设置纹理。这对于设置包装模式（Wrap Mode）特别重要。
