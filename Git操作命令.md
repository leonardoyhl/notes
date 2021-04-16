Github代码常用指令：https://blog.csdn.net/qq_43634001/article/details/98473100

Git上传：https://www.cnblogs.com/specter45/p/github.html#s1

push异常，先pull：https://www.cnblogs.com/jeremylee/p/5715289.html

各命令详解：https://blog.csdn.net/asoar/article/details/84111841

实际项目中如何使用Git做分支管理：https://blog.csdn.net/shusheng0007/article/details/80791849

廖雪峰git讲解：https://www.liaoxuefeng.com/wiki/896043488029600

```
　　git init //把这个目录变成Git可以管理的仓库
　　git add README.md //文件添加到仓库
　　git add . //不但可以跟单一文件，还可以跟通配符，更可以跟目录。一个点就把当前目录下所有未追踪的文件全部add了 
　　git commit -m "first commit" //把文件提交到仓库
　　git remote add origin git@github.com:wangjiax9/practice.git //关联远程仓库
　　git remote rm origin //移除已关联远程仓库
    git pull --rebase origin master //拉取
　　git push -u origin master //把本地库的所有内容推送到远程库上
```

走CI审核提交命令：
* `git push origin HEAD:refs/for/master`

git本地删除修改文件后从远程拉取：
* 单文件--`git checkout origin/master relativefilepath`
* 文件夹--`git checkout origin/{branch} .`

放弃本地修改，重置为服务端版本：
```
git fetch --all
git reset --hard origin/[branch]
```

删除：
* git rm -h 获取intro
* git rm --cached   删除已提交的索引

分支：
* git checkout -b [branchName]  等同于：
    * git branch [branchName]   // 创建
    * git checkout [branchName] // 切换
* 远程有分支，本地无
    * git checkout --track origin/branchName 本地新建branchName分支，自动跟踪远程同名分支
    * git checkout -b branchName remoteBranch
* 将某分支的某次提交合并到另一分支
    * `git log`查看commitID
    * git cherry-pick [commitID]
    * push到远程
* 重命名
    * `git branch -m [oldbranch] [newbranch]`
* 合并
    * `git merge [branch]`
* 合并分支上指定的commit
    * https://www.cnblogs.com/senlinyang/p/8436049.html
    * 分支结构
    ```
    dd2e86 - 946992 - 9143a9 - a6fd86 - 5a6057 [master]
                  \
                76cada-62ecb3-b886a0 [feature]
    ```
    * 单个：`git cherry-pick [commitId-62ecb3]`
    * 多个，使用rebase：
    ```
    git checkout -b newbranch 62ecb3    // 基于 feature 创建一个新的分支，并指明新分支的最后一个 commit
    git rebase —onto master 76cada^     // rebase 这个新分支的 commit 到 master（–ontomaster）
    ```
    76cada^ 表示从 76cada 的 commit 开始合并（作为新的commit）。这样就完成了 76cada 到 62ecb3 合并到 master

同步远程新增分支到本地：
* git pull -p

日志
* 查看简要commit信息+顺序结构：`git log --graph --pretty=oneline --abbrev-commit`

Stash
* `git stash show stash@{1}`    查看stash记录变更文件名
* `git stash show -p stash@{1}` 查看stash记录详细内容

编码：
* git config --global i18n.commitencoding utf-8  --注释：该命令表示提交命令的时候使用utf-8编码集提交
* git config --global i18n.logoutputencoding utf-8 --注释：该命令表示日志输出时使用utf-8编码集显示
* export LESSCHARSET=utf-8  --注释：设置LESS字符集为utf-8

修改commit注释：
* 最近一次未push的commit：`git commit --amend`
* 修改多次(含已push)commit：
    1. `git rebase -i HEAD~2` 2表示最近2次commit
    2. 想改那条commit就将那条的`pick`改为`edit`，修改保存退出`:wq` (若需修改多条，改多个的`pick`)
    3. Terminal提示`git commit --amend`修改commit的注释，保存退出`:wq`
    4. `git rebase --continue`保存并继续修改

撤销操作：
> git commit -m --amend        撤销上一次提交  并将暂存区文件重新提交 相当于追加
> git commit --amend --no-edit       撤销上一次提交  并将暂存区文件重新提交 相当于追加
> git checkout -- `<file>`     拉取暂存区文件 并将其替换成工作区文件
> git reset HEAD  -- `<file>`  拉取最近一次提交到版本库的文件到暂存区  该操作不影响工作区

Cherry-pick:
* `git cherry-pick A..B`   从A到B，不含A
* `git cherry-pick A^..B`  从A到B，含A
* `git cherry-pick -m 1 <mergeCommitHash>`  cherry-pick merge commit，参数`parent-number`是一个从1开始的整数，代表原始提交的父分支编号
    * `1` - 1号父分支是接受变动的分支（the branch being merged into）
    * `2` - 2号父分支是作为变动来源的分支（the branch being merged from）

设置钩子Hook：
`gitdir=$(git rev-parse --git-dir); scp -p -P 29418 10251417@gerrit.zte.com.cn:hooks/commit-msg ${gitdir}/hooks/`

误删：
* git fsck
