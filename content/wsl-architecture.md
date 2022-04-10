---
title: "What is WSL"
date: "2022-04-10"
topics: ["Windows", "WSL"]
icon: "fa-brands fa-windows"
---

# What is WSL

- Windows Subsystem for Linux
- 少ないオーバヘッドで GNU/Linux の CLI Program を実行できる環境を提供する機能のこと
- 簡単に言うと Windows 上で bash が動く

# 本来は Windows 上で Linux プログラムは動かない

- Windows
  - Portable Executable
- Linux
  - Executable and Linkable Format

# （補足）ファイルフォーマット

一言でいうとバイナリファイルの中身の作り方

## Portable Executable（PE）

- Windows のローダが認識する実行可能ファイルのフォーマット
- EXE, DLL, SYS, FON など
- MS-DOS HEADER > MS-DOS REAL-MODE STUB PROGRUM > NT ヘッダ > セクションテーブル > セクションデータ

## Executable and Linkable Format（ELF）

- Linux や 組み込み系で使われている
- C をコンパイルしたプログラム など
- ELF ヘッダ > プログラムヘッダ > セクションヘッダ

# ELF を動かすために必要なこと

- Linux カーネルレベルの機能
  - システムコール API（プロセス管理、メモリ管理など）
- Shell
- Package Manager
  - プログラムの入手方法の提供

WSL では Linux システムコールを Windows の機能として用意し、Microsoft Store からダウンロードした Linux を動かす

# WSL には Vesrion 1 と Vesrion 2 がある

v1 と v2 でアーキテクチャが全く違うので単純な後継バージョンではない。

- v1（since 2016/4/6）
  - メモリ消費が少ない
- v2（since 2020/5/19 正式版）
  - I/O の高速化
  - 完全な Linux 互換性

# Architecture の違い

- v1
  - NT Kernel Driver（Pico Provider）が、Linux システムコール命令 → Windows システムコール命令 へ変換する
  - ファイルシステム = VolFS
  - Pico Provider（Linux） >（Linux SysCall）> Pico Provide（NT Kernel）r > （WinNT SysCall） > Windows NT Kernel
- v2
  - Hyper-V 仮想マシン上で動く Linux カーネルでシステムコールを実行する
  - ファイルシステム = 仮想ディスクに Linux ファイルシステム（ext4 とか）
  - Linux 仮想マシン > （Linux SysCall） > Linux Kernel > （CPU 命令） > Hyper-V Hypervisior

# WSL 1 の仕組み

v2 と共存可能ではあるけど、利点がないので省略

※Linux ディストリビューション単位で v1 と v2 の切り替え可能

# WSL 2 の仕組み

- Hyper-V で軽量な Linux を動かす（Linux が動くのは仮想化技術の範囲）
- ホストマシン（Windows）とのやり取りは「9P」を介してやり取りする
  - Win : p9rdr.sys（in Windows NT Kernel）
  - Lin : /init
  - /sys とか /proc とかの特殊ディレクトリも 9P でやり取り可能に！

Ubuntu だと 400 MB ぐらい・・！

# ファイルシステムの違い

- ファイルシステム
  - v1 : NTFS 上にマッピングした VolFS
  - v2 : 仮想 HDD（root.vhdx）上の ext4
- アクセス方法
  - v1 : DrvFS
  - v2 : 9P

# WSL を使ってみる

とても簡単（だけど苦労した）

- Windows 10 Version 2004 Build 19041 or later
- Windows 10 Home Edition でも OK

# Install WSL

```powershell
# コンパネからもできるけどコマンドで
# Microsoft-Windows-Subsystem-Linux : 有効化
# VirtualMachinePlatform : 有効化
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart

# デフォルトを WSL 2 へ
wsl --set-default-version 2

# Windowws Store から Linux ディストリビューションをダウンロード
# Ubuntu or SUSE
# DL 終わったら「Launch（起動）」
bash
echo "Hello WSL 2"
```

# WSL 起動方法

とても簡単

- Command Prompt から bash
- Poershell から bash
- Ubuntu Application を Launch

# explorer から ファイルシステムへアクセスする

```
\\wsl$\Ubuntu
```

# Linux 側から Windows 側へアクセスする

```bash
xxxxx@DESKTOP-O5ES243:/$ cd /mnt
xxxxx@DESKTOP-O5ES243:/mnt$ ll
total 8
drwxr-xr-x  6 root  root  4096 Oct 18 21:07 ./
drwxr-xr-x 19 root  root  4096 Oct 18 21:12 ../
drwxrwxrwx  1 xxxxx xxxxx  512 Oct 18 20:55 c/
drwxrwxrwx  1 xxxxx xxxxx  512 Oct 18 20:55 d/
drwxrwxrwx  1 xxxxx xxxxx  512 Jan  1  1980 e/
drwxrwxrwt  2 root  root    40 Oct 18 21:10 wsl/
```

# シンボリックリンクをつけておくと楽

```bash
xxxxx@DESKTOP-O5ES243:/mnt/d/work$ sudo ln -s /mnt/d/work/linux-work/ /work
[sudo] password for xxxxx:
xxxxx@DESKTOP-O5ES243:/mnt/d/work$
xxxxx@DESKTOP-O5ES243:/mnt/d/work$ ll -ad /work
lrwxrwxrwx 1 root root 23 Oct 18 21:22 /work -> /mnt/d/work/linux-work/
```

# Windows Terminal

get from Microsft Store

# 参考

https://roy-n-roy.github.io/Windows/WSL%EF%BC%86%E3%82%B3%E3%83%B3%E3%83%86%E3%83%8A/Architecture/
