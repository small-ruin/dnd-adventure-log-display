# dnd-adventure-log-display
个人用，展示跑团着色器的log。

做这个的原因是用word一个个打开很麻烦，而且没法搜索。

## 关于 colour：
使用的 docx2html 库 mammoth 默认不转换颜色。为了保留样式需要做出以下修改：

mammoth/lib/documents.js in function Run()
```
color: properties.color ? '#' + properties.color : null,
highlight: properties.highlight ? properties.highlight : null
```
mammoth/lib/document-to-html.js in function convertRun()
```
if (run.color) {
    paths.push(htmlPaths.element('font', {color : run.color}, {fresh: false}));
}
if (run.highlight) {
// i think set attr by style might cause some issue.
    paths.push(htmlPaths.element('mark', {'style' : 'background-color:' + run.highlight}, {fresh: false}));
}
```
mammoth/lib/docx/body-reader.js in function readRunProperties()
```
color: element.firstOrEmpty("w:color").attributes["w:val"],
highlight: element.firstOrEmpty("w:highlight").attributes["w:val"],
```

详见：https://github.com/mwilliamson/mammoth.js/issues/109#issuecomment-612859211
