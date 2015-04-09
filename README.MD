# 流程进度图uiProcess



## 完成度100%

**uiProcess**，功能比较简单，整体看起来有些*丑*，请见谅

1. *进度图上的圆与文字* 已完成
2. *进度图上的顺序箭头线* 已完成
3. *进度图允许分支* 已完成，但有些不太好看
4. *退回的展现* 已完成，采用__红色__线原路返回
5. *鼠标移上去显示消息* 已实现

### __使用方法__

#### 组件调用

打开index.html文件，**行__18__** 为调用组件

1. **ui-process** 必有，表示这是uiProcess组件
2. **data-process-model** 传入组件数据

#### 数据格式

在**assets/js**目录下，打开app.js文件，查看第__5__行至第__74__行

#### 组件文件
在**assets/js/UI**目录下**UIDirective.js**，此文件是coffeescript生成，原文件可查看同目录下**UIDirective.coffee**

#### 预览图
![image](https://github.com/porrychen/ui-process/blob/master/assets/screenshots/ui-process-screenshots.png?raw=true)