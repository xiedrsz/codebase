---
* ### 标题栏与页面颜色不一致时，上下滑动页面会出现颜色断层

> 解决原理: 将小程序页面底色设置成跟标题栏或页面的背景颜色一致，然后在页面底部或头部放置一个与页面或标题栏背景色一致的颜色块（绝对定位）作为页面的延伸，这样页面上下滑动时便可看到这个颜色块，因此不会产生断层。

> 实现:
>
> ```json
> {
>   "navigationBarTitleText": "TITLE",
>   "navigationBarBackgroundColor": "#F78E07",
>   "navigationBarTextStyle": "white"
> }
> ```
> ```html
> <!-- 页面 -->
> <view class="top"></view>
> <view class="page"></view>
> ```
> ```css
> .top {
>   position: absolute;
>   width: 100%;
>   height: 400rpx;
>   background: #F78E07;
>   top: -400rpx;
> }
> ```