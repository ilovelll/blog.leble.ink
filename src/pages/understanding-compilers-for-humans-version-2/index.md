---
title: 理解编译器 - 人类视角
date: "2019-06-26T09:53:47.382Z"
spoiler: "Understanding Compilers  for humans"
keywords: ['compilers', 'Rust']
---

本文为翻译作品 [点击原文](https://towardsdatascience.com/understanding-compilers-for-humans-version-2-157f0edb02dd)

理解编译器的内部运作原理可以让你更高效地使用它。在接下来的一系列文章中，我将使用包含大量引用链接、示例代码和图示的组合来帮助你理解编程语言和编译器是如何工作的。

- - -

作者笔记  
[理解编译器 - 人类视角(Version 2)](https://blog.leble.ink/understanding-compilers-for-humans-version-2/) 是我在Medium发布的第二篇文章的后续更新，这篇文章有超过2万多浏览量，我非常高兴能够在传授知识上做出一点微小积极的贡献，我也非常兴奋能够基于那篇文章的评论带来完全重构的新文章。


我选择 Rust 作为这个系列文章的主要语言。它是一门详细、高效、现代的，并且在设计上似乎对制作编写器非常简单。我喜欢用它。[https://www.rust-lang.org/](https://www.rust-lang.org/)


这篇文章的目的是引起读者关于编译器的兴趣，而不是超过20页的长篇累牍。这篇文章中有许多链接可以指导您更深入地了解引起您兴趣的主题。大多数链接都指向维基百科。

请随时在底部的评论部分留下任何问题或建议。感谢您的关注，我希望您喜欢。

- - -

## 介绍
### 什么是编译器

**一般来说，你可以称之为编程语言的只是软件，称为编译器，它读取文本文件，对其进行大量处理并生成二进制文件。**由于计算机只能读取1和0，并且人类编写的Rust比二进制文件更好，因此编译器会将人类可读的文本转换为计算机可读的机器代码。
```rust
// An example compiler that turns 0s into 1s, and 1s into 0s.
 
fn main() {
    let input = "1 0 1 A 1 0 1 3";
    
    // iterate over every character `c` in input
    let output: String = input.chars().map(|c|
        if c == '1' { '0' }
        else if c == '0' { '1' }
        else { c } // if not 0 or 1, leave it alone
    ).collect();
    
    println!("{}", output); // 0 1 0 A 0 1 0 3
}
```
虽然上面这个编译器不读取文件，不生成AST，也不生成二进制文件，但它仍然被认为是编译器，原因很简单，它转换了一个输入输出。

### 编译器的工作流程

简单来说，编译器读取源代码并生成二进制文件。人类可读的代码直接转换为0和1是非常复杂的，从主要的来讲，编译器在程序可运行之前有几个处理步骤：
1. 读取您提供的源代码的各个字符。
2. 将字符排序为单词，数字，符号和运算符。
3. 获取已排序的字符并通过将它们与模式匹配并创建操作树来确定它们尝试执行的操作。
4. 迭代在最后一步中生成的树中的每个操作，并生成等效的二进制文件。

*虽然我说编译器立即从一个操作树转到二进制，但它实际上是生成汇编代码，然后汇编/编译成二进制代码。汇编就像一个更高级别，人类可读的二进制文件。详细了解[点击这里](https://en.wikipedia.org/wiki/Assembly_language)。*

![step](./step.jpeg)


****未完待续***