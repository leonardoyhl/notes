1. 对比 `control.markAsDirty()` 与 `control.updateValueAndValidity()`
    * 前者一般用于触发自身控件校验，后者用于触发另外一个控件开始校验
2. 为什么在`control.setErrors(errors)`后使用`control.updateValueAndValidity()`会清除errors  ——疑似`updateValueAndValidity`是触发Validators，手动`setErrors`会被覆盖
3. ngTemplateOutlet指令
    * https://www.jb51.net/article/145298.htm
4. ng-template与template标签
    * https://www.jb51.net/article/127894.htm
5. 指令
    * https://www.jianshu.com/p/ac5366abfa74
