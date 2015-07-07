javascript原型
==============
数据类型
--------------
### 基本类型
`Number`、`String`、`Boolean`、`Undefined`、`Null`
### 引用类型
`Object`、`Function`、`Array`、`Date`、`RegExp`、`Error`
对象
--------------
对象就是一系列属性的集合。`javascript`中属性可以包含任何值，当属性是一个函数是，则称该属性是这个对象的方法。在`javascript`中，一切都是对象（基本类型值除外）。函数也是对象
创建对象
-------------
`javascript`中对象是如何创建的？
```javascript
var obj = new Object();
/* or
   var obj = {}
*/
```
所以对象都是 通过函数创建的，第二种是一种语法糖，内部其实还是用函数创建。
`javascript`中一切都是对象，所以`function`也是对象，所以`function`也是由函数创建的
```javascript
var func = new Function("alert('hello world!')");
/* or
   var func = function(){
      alert('hello world!');
   }
*/
```
其他类型数据也是由相应的函数方法创建。这里就不写了。
函数的`prototype`属性
---------------
当函数被`Function`创建之后，该函数会有一个`prototype`属性，这个属性是一个对象，这个对象中有一个`constructor`属性，这个属性值指向该函数自身。
这里说一句 通过 new 自定义构造函数是没有 `prototype`属性的
```javascript
function Fun(){}
console.log(Fun.prototype.constructor); //function Fun()
var func = new Fun();
console.log(func.prototype); //undefined
```
对象的`__proto__`属性
---------------
js中的对象都有一个影藏属性`__proto__`，该属性是js内部运行时要用到的，并不是给开发者用的。该属性可以在一部分浏览器中被访问到，不能访问到浏览器 其实内部也是有这个属性的。
这个属性我们称为_原型_。这个属性指向创建该对象的 函数的`prototype`属性。
```javascript
function fun(){}
console.log(fun.__proto__ == Function.prototype); //true
```
原型链
---------------
看一个例子
```javascript
function Fun(){}
console.log(Fun.prototype.constructor); //function Fun()
var func = new Fun();
console.log(func.constructor); //function Fun()
```
之前说过new 自定义构造函数是没有 `prototype`属性的，而`constructor`是`prototype`的属性，`console.log(func.constructor); //function Fun()`为什么会有值呢？

是因为func是一个函数，函数也是对象，对象的 `__proto__`属性指向构造该对象的 函数的`prototype`属性。
当访问一个对象的属性时，先查找自身的属性，如果有该属性输出，如果自身没有该属性则查找`__proto__`中的属性是否有匹配值，如果有则输出，如果还没有呢，看下面

函数的`prototype`属性也是一个对象，这个对象也有`__proto__`属性。

然后访问对象的属性 就会一直沿着`__proto__`这条链查找，这条链就叫做原型链。
这条链的顶端是 `Object.prototype`，它的 `__proto__`指向的是 `null`
继承
--------------
了解原型链之后，继承就好理解了。

js中普通对象之间是是无法直接继承的。因为只用`__proto__`来完成继承，然而除了函数之外是没有`prototype`，所以只用通过函数来完成继承。
```javascript
function Super(){};
Super.prototype.skin = '黑色';
function Sub(){}
Sub.prototype = Super.prototype;
var bar = new Super();
console.log(bar.skin); // '黑色'
var foo = new Sub();
console.log(foo.skin); // '黑色'
```
这样 Sub 就继承了 Super 的 skin 属性。但是这个方法有一个问题 Sub.prototype 和 Super.prototype指向的是同一个对象 所以 Sub.prototype上修改 skin属性 对应的Super.prototype.skin也会修改，Super下的实例会受到影响。
```javascript
//接着上面的例子
Sub.prototype.skin = '紫色';
console.log(foo.skin); // '紫色'
console.log(bar.skin); // '紫色'
```
我们来改进一下
```javascript
function Super(){};
Super.prototype.skin = '黑色';
function Sub(){}
Sub.prototype = new Super;
var bar = new Super();
console.log(bar.skin); // '黑色'
var foo = new Sub();
console.log(foo.skin); // '黑色'
```
把 Sub.prototype 指向 Super的一个实例 就不存在上面的问题了