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
