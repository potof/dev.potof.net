---
title: "Git で別リポジトリの変更を取り込む"
date: "2022-04-03"
topics: ["blog", "Git"]
---

このブログは以下のリポジトリをベースに作ったので、元リポジトリの変更をこのブログに取り込む方法です。

https://github.com/potof/nextjs-blog-ts-mui-starter

## 環境

- fork 元リポジトリ名： fork-master/main
- fork 先リポジトリ名： origin
- マージ元ブランチ： main
- マージ先ブランチ： main

## リモートリポジトリを登録します

```bash
# リモートリポジトリの状態を確認する
git remote -v
# > origin

# fork 元リポジトリがいないので追加する
git remote add fork-master https://github.com/potof/nextjs-blog-ts-mui-starter.git

# 追加できたことを確認する
git remote -v
# > origin
# > fork-master
```

## 登録したリモートリポジトリを fetch します

```bash
git fetch fork-master
```

## fork-master を追従するようのブランチを作ります

```bash
git checkout -b fork-master-main fork-master/main

# ブランチが作成できたことを確認する
git branch -a
# > * fork-master-main
```

## マージします

```bash
# マージしたい先を checkout します。main をそのまま使っているのでここでは main です。
git checkout main

git branch -a
# > * main

git merge --no-ff fork-master-main
```

あとは push して終わりです。

# そのほか

## コンフリクト

以下のファイルはコンフリクトするので修正が必要です。

- site.config.json
- next-sitemap.js

.git/config でマージ対象外にしてもよいのですが、
`site.config.json` は機能追加で変更になる可能性が高いので対象外にいれないようにします。

## ビルド

マージしたあとは`npm install`と`yarn build`で環境構築とビルド確認しておきましょう。

```bash
npm i
yarn build
```
