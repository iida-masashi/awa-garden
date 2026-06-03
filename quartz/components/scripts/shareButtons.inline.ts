type Network = "x" | "facebook" | "line" | "copy"

const LABELS: Record<Network, string> = {
  x: "𝕏",
  facebook: "Facebook",
  line: "LINE",
  copy: "URLをコピー",
}

function shareUrl(net: Network, url: string, title: string): string | null {
  const u = encodeURIComponent(url)
  const t = encodeURIComponent(title)
  switch (net) {
    case "x":
      return `https://twitter.com/intent/tweet?text=${t}&url=${u}`
    case "facebook":
      return `https://www.facebook.com/sharer/sharer.php?u=${u}`
    case "line":
      return `https://social-plugins.line.me/lineit/share?url=${u}`
    case "copy":
      return null
  }
}

function renderShareButtons() {
  const containers = document.querySelectorAll(".share-buttons")
  containers.forEach((container) => {
    const list = container.querySelector(".share-list") as HTMLElement | null
    if (!list) return
    list.innerHTML = ""

    const networks = (container.getAttribute("data-networks") ?? "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean) as Network[]

    const url = location.href
    const title = document.title

    networks.forEach((net) => {
      const href = shareUrl(net, url, title)
      if (href) {
        const a = document.createElement("a")
        a.className = `share-btn share-${net}`
        a.href = href
        a.target = "_blank"
        a.rel = "noopener noreferrer"
        a.textContent = LABELS[net]
        list.appendChild(a)
      } else {
        // URLコピー（クリップボード）
        const btn = document.createElement("button")
        btn.className = "share-btn share-copy"
        btn.type = "button"
        btn.textContent = LABELS.copy
        const onClick = async () => {
          try {
            await navigator.clipboard.writeText(location.href)
            const prev = btn.textContent
            btn.textContent = "コピーしました"
            setTimeout(() => {
              btn.textContent = prev
            }, 1500)
          } catch {
            btn.textContent = "コピー失敗"
          }
        }
        btn.addEventListener("click", onClick)
        window.addCleanup?.(() => btn.removeEventListener("click", onClick))
        list.appendChild(btn)
      }
    })
  })
}

document.addEventListener("nav", () => {
  renderShareButtons()
})
