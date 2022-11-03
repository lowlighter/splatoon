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

|                  |                                                    |
| ---------------- | -------------------------------------------------- |
| Build command    | `deno run -A build/mod.ts                          |
| Output directory | `.`                                                |
| Install command  | `curl -fsSL https://deno.land/x/install/install.sh |

# 📜 License

App developped by [@lowlighter](https://github.com/lowlighter) and licensed
under [MIT License](/LICENSE)

Based on the datamine of [@Leanny](https://github.com/Leanny)

Splatoon and all related copyrights/assets used in this app are the property of
Nintendo.
