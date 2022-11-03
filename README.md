# 🐙 Splatoon 3 checklist

A web app to help Splatoon completionists in their progress tracking.

![](/images/screenshot.png)

## 🦑 Features

- Track your overall progress by marking gears as owned
  - No account required, everything is stored under your browser
    [local storage](https://developer.mozilla.org/docs/Web/API/Window/localStorage)
  - Export/Import your progression
- Filter and sort gears by name, type, brand, and skills
- Support all languages officially supported by Splatoon

## 🚀 Deploy your own instance

Add the following to vercel project:

<table>
  <tr><th>Build command</th><td><code>deno task build || /vercel/.deno/bin/deno task build</code></td></tr>
  <tr><th>Output directory</th><td><code>.</code></td></tr>
  <tr><th>Install command</th><td><code>curl -fsSL https://deno.land/x/install/install.sh | sh</code></td></tr>
</table>

### 💻 Run locally

Install [deno runtime](https://deno.land) and run the following commands:

```shell
deno task build
deno task serve
```

# 📜 License

App developped by [@lowlighter](https://github.com/lowlighter) and licensed
under [MIT License](/LICENSE)

Based on the datamine of [@Leanny](https://github.com/Leanny)

Splatoon and all related copyrights/assets used in this app are the property of
Nintendo.
