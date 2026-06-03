const CUSDIS_HOST = "https://cusdis.com"

function renderCusdis() {
  const thread = document.querySelector("#cusdis_thread") as HTMLElement | null
  if (!thread) return

  // ダークモード連動: <html> の data-theme / saved-theme を見る
  const theme = document.documentElement.getAttribute("saved-theme")
  thread.setAttribute("data-theme", theme === "dark" ? "dark" : "light")

  const w = window as any
  if (w.CUSDIS && typeof w.CUSDIS.initial === "function") {
    // すでにロード済み → 再描画（SPA遷移時）
    w.CUSDIS.initial()
  } else {
    // 初回 → Cusdis スクリプトを読み込む（読み込み後に自動描画）
    const existing = document.querySelector('script[data-cusdis-loader]')
    if (!existing) {
      const s = document.createElement("script")
      s.src = `${CUSDIS_HOST}/js/cusdis.es.js`
      s.async = true
      s.defer = true
      s.setAttribute("data-cusdis-loader", "true")
      document.body.appendChild(s)
    }
  }
}

document.addEventListener("nav", () => {
  renderCusdis()

  // テーマ切替に追従
  const themeChange = () => {
    const thread = document.querySelector("#cusdis_thread") as HTMLElement | null
    if (!thread) return
    const theme = document.documentElement.getAttribute("saved-theme")
    thread.setAttribute("data-theme", theme === "dark" ? "dark" : "light")
    const w = window as any
    if (w.CUSDIS && typeof w.CUSDIS.setTheme === "function") {
      w.CUSDIS.setTheme(theme === "dark" ? "dark" : "light")
    }
  }
  document.addEventListener("themechange", themeChange)
  window.addCleanup?.(() => document.removeEventListener("themechange", themeChange))
})
