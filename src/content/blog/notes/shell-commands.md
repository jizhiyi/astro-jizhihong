---
title: "Linux 常用命令速查"
pubDate: 2024-06-01
description: "日常开发中常用的 Linux 命令速查"
category: "笔记"
---

# Linux 常用命令速查

## 文件操作

### ls - 列出目录内容

```bash
ls -la          # 详细信息
ls -lh          # 人性化大小
ls -lt          # 按时间排序
ls -lS          # 按大小排序
ls -a           # 显示隐藏文件
ls -R           # 递归显示
```

### cd - 切换目录

```bash
cd ~            # 进入 home 目录
cd -            # 返回上一目录
cd ..           # 上级目录
cd /            # 根目录
```

### pwd - 显示当前目录

```bash
pwd             # 当前目录
pwd -P          # 解析符号链接
```

### mkdir - 创建目录

```bash
mkdir dir               # 创建目录
mkdir -p dir1/dir2     # 递归创建
mkdir -m 755 dir       # 指定权限
```

### rm - 删除

```bash
rm file                # 删除文件
rm -r dir             # 递归删除
rm -f                 # 强制删除
rm -rf                # 强制递归删除（危险！）
```

### cp - 复制

```bash
cp file1 file2         # 复制
cp -r dir1 dir2       # 递归复制
cp -i                 # 覆盖前询问
cp -p                 # 保留属性
```

### mv - 移动/重命名

```bash
mv file1 file2         # 重命名
mv file dir/           # 移动
mv -i                 # 覆盖前询问
```

### touch - 创建文件

```bash
touch file             # 创建空文件
touch -t 202401011200 file  # 指定时间
```

### cat - 查看文件

```bash
cat file              # 查看文件
cat -n file          # 显示行号
cat -A file          # 显示特殊字符
```

### less/more - 分页查看

```bash
less file             # 分页查看
more file             # 逐页查看
# 快捷键：空格下一页，q 退出
```

### head/tail - 查看头部/尾部

```bash
head file             # 默认 10 行
head -n 20 file      # 前 20 行
tail -n 20 file      # 后 20 行
tail -f file         # 实时监控日志
tail -f -n 100 file  # 最后 100 行实时监控
```

### wc - 统计

```bash
wc -l file           # 行数
wc -w file           # 单词数
wc -c file           # 字符数
wc file              # 全部统计
```

## 搜索

### find - 查找文件

```bash
find . -name "*.js"          # 按名字
find . -type f               # 文件
find . -type d               # 目录
find . -mtime -7            # 7天内修改
find . -size +100M          # 大于 100M
find . -perm 755            # 指定权限
find . -user username       # 指定用户
find . -exec rm {} \;       # 删除找到的文件
```

### grep - 搜索内容

```bash
grep "text" file            # 搜索内容
grep -r "text" dir/        # 递归搜索
grep -i "text" file        # 忽略大小写
grep -n "text" file        # 显示行号
grep -v "text" file        # 反向匹配
grep -w "text" file        # 单词匹配
grep -l "text" file1 file2 # 只显示文件名
```

### locate - 快速查找

```bash
updatedb                   # 更新数据库
locate file                # 查找文件
```

## 权限

### chmod - 修改权限

```bash
chmod 755 file             # 数字形式
chmod +x file              # 添加执行权限
chmod -x file              # 移除执行权限
chmod u+x file             # 所有者添加
chmod g+x file             # 组添加
chmod o+x file             # 其他用户添加
```

### chown - 修改所有者

```bash
chown user file            # 修改用户
chown user:group file      # 修改用户和组
chown -R user dir/        # 递归
```

## 压缩

### tar - 打包

```bash
tar -cvf archive.tar dir/     # 打包
tar -xvf archive.tar         # 解包
tar -czvf archive.tar.gz dir/ # gzip 压缩
tar -xzvf archive.tar.gz     # gzip 解压
tar -cjvf archive.tar.bz2 dir/ # bzip2 压缩
```

### zip/unzip

```bash
zip -r archive.zip dir/       # 压缩
unzip archive.zip             # 解压
unzip -l archive.zip         # 查看内容
```

## 网络

### curl - 请求

```bash
curl http://example.com       # GET 请求
curl -X POST http://example.com  # POST 请求
curl -d 'data' http://example.com # POST 数据
curl -H 'Header: value' http://example.com # 请求头
curl -o file http://example.com  # 下载
curl -I http://example.com   # 查看响应头
```

### wget - 下载

```bash
wget http://example.com/file  # 下载
wget -c http://example.com/file  # 断点续传
wget -r http://example.com/  # 递归下载
wget -q http://example.com   # 静默模式
```

### ssh - 远程连接

```bash
ssh user@host               # 连接
ssh -p 2222 user@host       # 指定端口
ssh -i key.pem user@host    # 指定密钥
```

### scp - 远程复制

```bash
scp file user@host:/path    # 上传
scp user@host:/path/file .  # 下载
scp -r dir user@host:/path/ # 递归
```

## 进程

### ps - 查看进程

```bash
ps                          # 当前进程
ps -a                      # 所有用户进程
ps -aux                    # 详细信息
ps -ef                     # 完整格式
ps -ef | grep node         # 查找 node 进程
```

### top - 进程监控

```bash
top                        # 实时监控
top -u user                # 指定用户
top -p pid                 # 指定进程
# 快捷键：q 退出，k 结束进程
```

### kill - 结束进程

```bash
kill pid                   # 正常终止
kill -9 pid               # 强制终止
kill -15 pid              # 优雅终止（默认）
killall process           # 按名称结束
pkill process             # 按名称结束
```

## 系统

### df - 磁盘使用

```bash
df                         # 磁盘使用
df -h                      # 人性化显示
df -h /path                # 指定目录
```

### du - 目录大小

```bash
du                         # 当前目录
du -sh                     # 总计
du -sh *                   # 各文件/目录大小
du -h --max-depth=1        # 深度 1
```

### free - 内存使用

```bash
free                       # 内存使用
free -h                    # 人性化
free -m                    # MB 为单位
```

### uptime - 运行时间

```bash
uptime                     # 运行时间、负载
```

### whoami - 当前用户

```bash
whoami                     # 当前用户
```

## 文本处理

### sed - 文本替换

```bash
sed 's/old/new/' file           # 替换第一处
sed 's/old/new/g' file          # 替换所有
sed -i 's/old/new/g' file      # 直接修改文件
sed '/pattern/d' file          # 删除匹配行
```

### awk - 文本处理

```bash
awk '{print $1}' file           # 打印第一列
awk -F',' '{print $1}' file    # 指定分隔符
awk 'NR==1' file               # 第一行
awk '$1 > 10' file             # 条件过滤
```

### sort - 排序

```bash
sort file                      # 排序
sort -n file                   # 数字排序
sort -r file                   # 倒序
sort -u file                   # 去重
```

### uniq - 去重

```bash
uniq file                      # 去重
uniq -c file                  # 统计次数
uniq -d file                  # 只显示重复行
```

## 其他

### echo - 输出

```bash
echo "hello"           # 输出
echo -n "hello"       # 不换行
echo $VAR             # 输出变量
```

### history - 命令历史

```bash
history                     # 历史记录
!n                         # 执行第 n 条
!!                         # 执行上一条
!$                         # 上一个命令的参数
```

### alias - 别名

```bash
alias ll='ls -la'      # 创建别名
unalias ll             # 删除别名
```

### source - 执行脚本

```bash
source file            # 执行脚本
. file                # 同上
```

### xargs - 参数转换

```bash
find . -name "*.js" | xargs rm     # 删除找到的 JS 文件
ls | xargs -I {} mv {} {}.bak      # 批量重命名
```
