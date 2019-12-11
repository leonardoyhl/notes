### 常用命令：
```
ls              列出当前文件夹下所有文件和文件夹的名称
ls -l 或者 ll   列表当前文件夹下所有文件和文件夹的详情
pwd             查看当前所在路径
sudo            获取高级权限，一般用于命令开始
```

### 切换用户：
> su 即 switch user
> su [-l] [username]      -l: login的简写
* su [username] 与 su - [username]的区别：
> su [username] 切换后，不改变原用户的工作目录，及其他环境变量目录
> su - [username] 切换后，同时切换到新用户的工作环境中

### 查看文件内容：
* vi [file]
> :w    写
> :q    退出
> /str  从前查找字符串
> ?str  从后查找字符串
> n/N   切换下/上一个
> u     撤销
> ctrl+r    恢复撤销

### 复制文件/夹
> cp src dist
> -r/R  递归    适合复制文件夹

### 权限
##### 查看
> ll 或 ls -l [file/folder(支持模糊)]
> 输出：`drwxr-xr-x 2 ubuntu root   53 Nov 26 14:36 vss-em-iui`

解读：
> 第一位：d 文件夹 - 文件
> r 读read      4
> w 写write     2
> x 执行execute 1
示例：
> - rwx rwx rwx = 777   表示文件的操作权限
> - rw- r-- r-- = 644   表示文件的操作权限

##### 授权
> chmod 

##### 修改权限
> chown -r/R [user] file/folder     chown=change owner, r 递归
