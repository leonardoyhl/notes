## 教程：https://www.runoob.com/linux/linux-command-manual.html
## linuxer：https://www.teakki.com/space/57da34d5a7116bd256e234b3

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

### 文件管理
#### 查看文件内容：
* vi [file]
> :w    写
> :q    退出
> /str  从前查找字符串
> ?str  从后查找字符串
> n/N   切换下/上一个
> u     撤销
> ctrl+r    恢复撤销
> :set ff/fileformat=unix  格式转换

#### 复制文件/夹
> cp src dist
> -r/R  递归    适合复制文件夹

#### 删除文件
* rm
    * -f 强制删除
    * -r 递归删除

#### 文件查找
* find

#### 解压缩
* tar
    ```shell
    -c  建立新的归档文件
    -r  向归档文件末尾追加文件
    -x  从归档文件中解出文件
    -O  将文件解开到标准输出
    -v  处理过程中输出相关信息
    -f  对普通文件操作
    -z  调用gzip来压缩归档文件，与-x联用时调用gzip完成解压缩
    -Z  调用compress来压缩归档文件，与-x联用时调用compress完成解压缩
    ```
    * tar czvf this.tar.gz ./*.txt 将当前目录下所有.txt文件打包并压缩归档到文件this.tar.gz
    * tar xzvf this.tar.gz ./ 将当前目录下的this.tar.gz中的文件解压到当前目录

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
> chown -R [user] file/folder     chown=change owner, r 递归

>查看安装目录：which [cmd]

### shell脚本
#### 自启动
1. 移动脚本到`/etc/init.d/`目录
2. 添加自启动项`cd /etc/init.d/ && chkconfig --add shell.sh`
3. 开启自启动项`chkconfig shell.sh on`

#### 日期时间
* 获取时间`$(date)`
* 格式化时间`$(date "+%Y-%m-%d %H:%M:%S")`

### Run
#### 后台运行
* nohup command &
* 若未指定输出文件，默认输出至`nohup.out`

#### 输入输出
> \>[file] == 1\>[file] 重定向标准输出【to file & cover】
> \>\> append to file
> file as `/dev/null` 相当于输出到回收站
> 2>&1 标准错误重定向到标准输出，即输出到同一文件
> 0 => stdin
> 1 => stdout
> 2 => stderr

### 进程
* ps aux | grep command | grep -v grep | awk '{print $1}' | xargs kill -9 # 这个表示直接通过command获取进程id并直接kill掉

### 系统配置
#### CPU核数
* `greo -c processor /proc/cpuinfo`

### 存储与空间
#### 目录下各项大小
* du -sh                 列出当前所在文件夹及各子文件夹大小（含隐藏文件夹），带`s`则只列出第一级
* du -sh *               列出当前文件夹下的文件及各级子目录大小，带`s`则只列出第一级
* du --max-depth=1 -h 指定列出最大层级
#### 磁盘/分区占用情况
* df -h
* df -hv
#### 系统使用/空闲情况
* free -[b/k/m/g] 单位
* free -s [seconds] 持续观察

### 网络
#### 网络状态
* `netstat -lntup`
    > l:listening n:num p:program/process t:tcp u:udp
* https://www.cnblogs.com/ftl1012/p/netstat.html

### 远程连接
* `ssh -p 50022 my@127.0.0.1`

### scp 文件传输
* `scp localfile user@ip:path`

### 查看系统信息命令
* https://www.cnblogs.com/klb561/p/9157569.html

### chkconfig实现开机自启动
创建shell脚本，并授权
```shell
#!/bin/sh
#chkconfig: 2345 80 90
#description: start ttyd web share terminal
date=$(date "+%Y-%m-%d")
su - root -l -s /bin/bash -c "nohup /usr/local/bin/ttyd login >> /var/log/ttyd/${date}.log 2>&1 &"
```
移动到`/etc/init.d/`目录下
加入chkconfig管理列表：`chkconfig --add/del /etc/init.d/ttyd`
设置开机自动启动：`chkconfig ttyd on`

### ps命令
* http://c.biancheng.net/view/1062.html

### 查看占用内存
* `ps -aux / -ef`
* `top`
