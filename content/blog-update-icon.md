---
title: "記事アイコンを追加しました"
date: "2022-04-09"
topics: ["blog"]
icon: "fa-solid fa-cat"
---

アイコン入ると質素な感じがなくなってかっこいい〜

# fontawesome で追加しました

Markdown 記事の YAML に icon を追加しました。
icon には fontawesome の class を記載すると記事一覧にアイコンとして表示します。

```yaml
---
title: "記事アイコンを追加しました"
date: "2022-04-09"
topics: ["blog"]
icon: "fa-solid fa-paw"
---
```

https://fontawesome.com/icons/paw?s=solid

# デフォルトアイコン設定

記事ごとにアイコンセットするのが面倒なときは、空欄（ `icon: ""` ）にするとデフォルトアイコンにセットしたアイコンを表示します。

```json:site.config.json
{
  ...
  "defaultPostIcon": "fa-solid fa-folder-open"
}
```

# ランダムカラーモード

記事名からアイコンカラーを計算する機能も追加しました。
`true` にするとランダム、`false` にするとサイトのプライマリカラーです。

```json:site.config.json
{
  ...
  "randomColorPostIcon": true
}
```

## 実装

タイトル文字列から各文字のコードを取得して足していき、hsl を使って色調整をしています。

```typescript:slugCard.tsx
const stringToNumber = (str: string): number =>
  Array.from(str)
    .map((ch) => ch.charCodeAt(0))
    .reduce((a, b) => a + b);
const iconColorNum = stringToNumber(title) % 360;
const iconColorHsl = config.randomColorPostIcon
  ? `hsl(${iconColorNum}, 40%, 60%)`
  : "";
```

`<Icon>` コンポーネントは `sx={{ color: "" }}` だと `color="primary"` が優先されます。

```typescript:slugCard.tsx
<Icon
  className={icon || config.defaultPostIcon}
  color="primary"
  sx={{
    fontSize: "40px",
    m: 2,
    color: iconColorHsl,
  }}
/>
```

# 困ったこと

## Google Material Icons のフォントサイズが変更できない

記事の Markdown にアイコン名をセットしたかったので、SVG Icon を利用することができず、
Web Font のアイコンセットを利用することにしました。

最初は、Material UI 5 の `<Icon></Icon>` コンポーネントのデフォルトである Google Material Icons を利用することを考えていました。

ただ、この場合は Google Material Icons の CSS をオーバライドすることができずフォントサイズが変更できません。

```jsx
// 以下の書き方だとフォントサイズが変更されない
<Icon sx={{ fontSize: "50px" }}>
```

https://mui.com/material-ui/icons/

公式サイトに書いてあるとおり、フォントサイズは変更されません。
MUI の Issue として挙げられており、解決策も書いてありますがあとから見たときにわからなくなると思ったので素直に fontawesome を利用することにしました。

https://github.com/mui/material-ui/issues/19746

## Google Material Icons vs Fontawesome

Lighthouse でパフォーマンスを測定すると若干ですが Google Material Icons のほうが軽かったです。

- Google Material Icons = -3 パフォーマンス
- Fontawesome = -5 パフォーマンス

# Github

コードはここです。

https://github.com/potof/nextjs-blog-ts-mui-starter
