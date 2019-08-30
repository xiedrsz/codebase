---
* ### 文本溢出显示省略号

> 单行(未验证):
> ```css
> overflow: hidden;
> text-overflow: ellipsis;
> white-space: nowrap;
> ```
> 多行(未验证):
> ```css
> overflow: hidden;
> text-overflow: ellipsis;
> display: -webkit-box;
> -webkit-line-clamp: 2;
> -webkit-box-orient: vertical;
>```

* ### 让标点符号不出现在行首

语法：
``` css
word-break: normal | break-all | keep-all
```

参数：
* normal : 依照亚洲语言和非亚洲语言的文本规则，允许在字内换行
* break-all : 该行为与亚洲语言的normal相同。也允许非亚洲语言文本行的任意字内断开。该值适合包含一些非亚洲文本的亚洲文本
* keep-all : 与所有非亚洲语言的normal相同。对于中文，韩文，日文，不允许字断开。适合包含少量亚洲文本的非亚洲文本

对于中文，要想标点符号不出现在行首，又能实现自动换行，只需要将样式写成如下：
``` css
word-break: normal;
```
