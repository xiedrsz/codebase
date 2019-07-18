---
MVC 模式代表 Model-View-Controller（模型-视图-控制器） 模式。这种模式用于应用程序的分层开发。
* Model（模型）- 模型代表一个存取数据的对象或 JAVA POJO。它也可以带有逻辑，在数据变化时更新控制器。
* View（视图）- 视图代表模型包含的数据的可视化。
* Controller（控制器）- 控制器作用于模型和视图上。它控制数据流向模型对象，并在数据变化时更新视图。它使视图与模型分离开。

```js
// MVC模式
// es6实现
class StudentModel {
  constructor (no, name) {
    this.no = no
    this.name = name
  }
  setNo (no) {
    this.no = no
  }
  setName (name) {
    this.name = name
  }
}

class StudentView {
  display (no, name) {
    console.log(`学号： ${no}`)
    console.log(`姓名： ${name}`)
  }
}

class StudentControl {
  constructor (model, view) {
    this.model = model
    this.view = view
    this.updateView()
  }
  setStudentNo (no) {
    this.model.setNo(no)
    this.updateView()
  }
  setStudentName (name) {
    this.model.setName(name)
    this.updateView()
  }
  updateView () {
    let {no, name} = this.model
    this.view.display(no, name)
  }
}

let student = new StudentModel('001', '小明')
let v = new StudentView()
let control = new StudentControl(student, v)
// ==> 学号： 001
// ==> 姓名： 小明
control.setStudentNo('002')
// ==> 学号： 002
// ==> 姓名： 小明
control.setStudentName('小红')
// ==> 学号： 002
// ==> 姓名： 小红
```
