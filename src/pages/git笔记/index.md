---
title: git笔记
date: "2014-10-27T11:20:03.000Z"
spoiler: 这个blog是用git管理的，当然少不了git的学习。下面也算是做点笔记吧。
---

这个blog是用git管理的，当然少不了git的学习。下面也算是做点笔记吧。

### 初始化账号
你在自己电脑上的操作需要一个账号，用来区分这些工作是谁做的。当然也可以配置多个账号。
`git config --global user.name 'Your Name'`
`git config --global user.email 'you@domain.com'`


### 新建一个repository
新建一个仓库，并初始化，有两种方式

1. `git init`  可以在任何时候、任何目录中这么做，完全本地化 

2. `git clone [url]`  与他人协同工作或者fork一个项目
例如`git clone git://github.com/ilovelll/test.git`

上述操作会在项目目录中生成`.git`子目录，所不有关项目快照信息都存放在此处。

### 基本快照
- `git add`  添加需要追踪的新文件和待提交的更改
  
- `git status`  和`git diff` 查看改动和变更信息

- `git commit` 将快照记录下

以上三步为绝大部分时候工作流程

`git add .`  可以将所有文件添加上
任何修改过的文件或者新文件都需要在commit之前add一下
 
`git status` 查看文件在工作目录与缓存的状态
可添加`-s` 参数值获取简要结果输出

`git diff` 显示已写入与已修改但尚未写入缓存的改动的区别
`git diff #` 尚未缓存的改动，即未add过的
`git diff --cached` 查看add过的
`git diff HEAD` 查看add和未add的全部改动(无视缓存)
`git diff --stat` 显示摘要而非整个diff，但会比`git status` 详细

`git commit` 记录缓存内容的快照，即将add过的实际存储
`-m` 参数会在命令行中提供注释
如果漏掉`-m` git会尝试打开编辑器以提交信息

补充一点，第一次commit时候没有加-m，git帮我打开了vim，vim命令早就忘得一干二净，只记得`esc`退出命令，`i`是insert模式，连退出保存都不会，自己又百度了一下，`:wq` 保存并退出。

`git commit -a` 自动将在提交前已记录、修改文件放入缓存区
如果你嫌`git add` 提交缓存流程太过繁琐，git允许你用`-a`跳过这一步，前提是所有文件都在记录中，如果是新文件还是要add的。

### 完整流程

```flow
st=>start: 改动流程
add=>operation: git add(提交缓存)
status=>operation: git status/git diff(查看变动)
commit=>operation: git commit(永久保存快照)
e=>end: 流程结束

st->add->status->commit->e
```

### 分支与合并
- `git branch (branchname)` 创建分支
  `git checkout (branchname)` 切换到该分支

  `git branch` 没有参数时，会列出你在本地的分支，你所在的分支的行首会有星号做标记。
  
  `git checkout -b (branchname)` 创建分支，并立即切换到它
  `git branch -d (branchname)` 删除分支


- `git merge` 讲分支合并到你的当前分支
`git merge` 可以帮我们合并许多修改，当遇到有冲突的时候就要手动解决，手动解决后，用`git add` 写入缓存区，然后再`git commit`

- `git log` 显示一个分支提交的更改记录
`--oneline` 选项来查看历史记录的紧凑简洁的版本
`--graph` 选项查看历史什么时候出现了分支、合并(用拓扑图显示)。

- `git tag` 用来打标签。比如你的版本进入到一个特殊的阶段，或者一个里程碑，你可以给你的commit版本打个标签。

 切换到你要打标签的分支上，用`git tag tagname` 即可。默认为HEAD，也可以指定特定的commit id。例如，
 `git tag v0.9` 它会在你当前branch下最后一次commit打个标签。
或者用`git log` 查看最近的commit 版本，记住id(前7位数字就好)，然后`git tag v1.0 1234567` 就可以commit为1234567打上标签。

 还可以创建带有说明的标签，用`-a`指定标签名，`-m`指定说明文字，例如：`git tag -a v1.0 -m "version 1.0 released" 1234567` 
 
 使用`git tag` 可以查看已有标签。

### 取消缓存和移除
`git reset HEAD`  取消缓存已缓存的内容，就是取消之前的`git add`
`git reset HEAD --file`  取消之前 某个文件的`git add` 添加

`git rm` 将文件从缓存区移除
`git reset HEAD` 是将缓存区恢复为我们做出修改之前的样子
`git rm` 则将该文件彻底从缓存区踢出，不再下一个提交之内，删除之。
默认情况下，`git rm file` 会将文件从缓存区和硬盘中同时删除，如果想在工作目录中保留，可以使用`git rm --cached`

`git mv` 即先 `git rm --cached` ，然后重命名磁盘上文件，再`git add`
本质属于文件重命名

如果你不想要哪个文件了，想删除，通常这样来做：**直接从硬盘删除文件，然后执行`git commit -a` 它会自动将删除的文件从索引中移除。**

### 分享与更新
目前你所以的操作都是在本地的，如果你想要在服务器放一份留存或者与其他开发者分享协同创作，那就需要一些其他的命令。

前期工作：
1. 如果你是用GitHub作托管服务器的话要先生成SSH KEY，本地仓库和GitHub仓库用SSH加密传输。先到用户主目录下，看看有没有.ssh目录，如果有，再看看这个目录下有没有id_rsa和id_rsa.pub这两个文件，如果已经有了，可直接跳到下一步。如果没有，打开Git Bash，创建SSH Key：
`$ ssh-keygen -t rsa -C "youremail@example.com"`
然后一路回车，如果顺利的话就可以在用户目录下看见生成的上述文件,SSH Key的秘钥对。
2. 登陆GitHub，打开设置，在“SSH Keys”页面：点“Add SSH Key”，填上任意Title，在Key文本框里粘贴id_rsa.pub文件的内容。最后点Add Key就好了。上个图：![sshkey](http://ww2.sinaimg.cn/large/5e06b5b0tw1elowz7gcucj20wk0k9gnr.jpg)

上面是GitHub的免费仓库，如果你不想别人看见你的代码，可以付费，又或者公司搭建个Git服务器。
准备工作做完了，就可以进行正式存档和分享喽。

- 第一种情况，本地的仓库推送到GitHub上
 1. 首先，在GitHub上先新建一个空仓库。
 2. 然后本地做好修改(一系列的add commit)
 3. 执行`git remote add [alias] [url]` 此命令将 [url] 以 [alias] 的别名添加为本地的远端仓库。例如：
`git remote add origin git@github.com/ilovelll/demo.git` 
“origin”经常被用作远端仓库别名，就像init经常用的“master”分支一样。当然你也可以用其他别名。
 4. 执行`git remote -v` 可以列出远端别名和实际地址。
 5. 执行 `git push [alias] [branch] ` 就会将你的 [branch] 分支推送成为 [alias] 远端上的 [branch] 分支。例如：
 `git push origin master`  这样就完成了本地仓库推送到服务器上。
 第一次push还可以加上`-u`命令，将本地的master分支和远程的master分支关联起来，在以后的推送或者拉取时就可以简化命令。

完成上面步骤去GitHub上看看吧，是不是已经成功了？以后的更新只需要第5步push命令就好了。

- 第二种情况，GitHub上已经有一个仓库，我们要克隆到自己的电脑上，只需要简单的clone就好了，例如：
`git clone git@github.com:ilovelll/demo.git`
然后你就得到你想要的一切了，开始修改代码吧。

更新项目用`git fetch [alias]` ，它会使你与[alias]仓库同步，提取你本地所没有的数据。
另外一个命令是`git pull` 它从远端仓库提取数据并尝试合并到当前分支，其实就是先`git fetch` 然后`git merge`。

移除一个项目链接用`git remote rm [alias]` 项目废除的时候把它删掉吧。


----------

#### 关于git的用法还有很多，随着学习的深入再了解吧。日常的话(仅用来管理Blog)，这些是足够了。