const STORAGE_KEY_LEFT = "quartz_left_sidebar_collapsed"
const STORAGE_KEY_RIGHT = "quartz_right_sidebar_collapsed"

function getStoredState(key: string, defaultValue: boolean): boolean {
  try {
    const val = localStorage.getItem(key)
    return val !== null ? val === "true" : defaultValue
  } catch {
    return defaultValue
  }
}

function setStoredState(key: string, value: boolean) {
  try {
    localStorage.setItem(key, String(value))
  } catch {}
}

let isLeftCollapsed = getStoredState(STORAGE_KEY_LEFT, false)
let isRightCollapsed = getStoredState(STORAGE_KEY_RIGHT, false)

function updateSidebarState() {
  document.documentElement.setAttribute("data-left-collapsed", isLeftCollapsed ? "true" : "false")
  document.documentElement.setAttribute("data-right-collapsed", isRightCollapsed ? "true" : "false")

  // Update button titles and aria attributes
  const leftBtns = document.querySelectorAll(".sidebar-toggle-btn.left-toggle")
  leftBtns.forEach((btn) => {
    btn.setAttribute("aria-expanded", isLeftCollapsed ? "false" : "true")
    btn.setAttribute("title", isLeftCollapsed ? "左サイドバーを開く (Alt+L)" : "左サイドバーを閉じる (Alt+L)")
  })

  const rightBtns = document.querySelectorAll(".sidebar-toggle-btn.right-toggle")
  rightBtns.forEach((btn) => {
    btn.setAttribute("aria-expanded", isRightCollapsed ? "false" : "true")
    btn.setAttribute("title", isRightCollapsed ? "右サイドバーを開く (Alt+R)" : "右サイドバーを閉じる (Alt+R)")
  })

  const wideBtns = document.querySelectorAll(".wide-mode-toggle-btn")
  const isBothCollapsed = isLeftCollapsed && isRightCollapsed
  wideBtns.forEach((btn) => {
    btn.classList.toggle("active", isBothCollapsed)
    btn.setAttribute("title", isBothCollapsed ? "標準幅に戻す (Alt+W)" : "ワイド・フル幅表示 (Alt+W)")
  })

  // Dispatch custom event for resize handling (e.g. mermaid / graphs)
  window.dispatchEvent(new Event("resize"))
}

function toggleLeftSidebar() {
  isLeftCollapsed = !isLeftCollapsed
  setStoredState(STORAGE_KEY_LEFT, isLeftCollapsed)
  updateSidebarState()
}

function toggleRightSidebar() {
  isRightCollapsed = !isRightCollapsed
  setStoredState(STORAGE_KEY_RIGHT, isRightCollapsed)
  updateSidebarState()
}

function toggleWideMode() {
  if (isLeftCollapsed && isRightCollapsed) {
    // Both collapsed -> Expand both
    isLeftCollapsed = false
    isRightCollapsed = false
  } else {
    // Collapse both for wide mode
    isLeftCollapsed = true
    isRightCollapsed = true
  }
  setStoredState(STORAGE_KEY_LEFT, isLeftCollapsed)
  setStoredState(STORAGE_KEY_RIGHT, isRightCollapsed)
  updateSidebarState()
}

document.addEventListener("nav", () => {
  // Apply current state
  updateSidebarState()

  // Left toggle button listener
  const leftBtns = document.querySelectorAll(".sidebar-toggle-btn.left-toggle")
  leftBtns.forEach((btn) => {
    btn.addEventListener("click", toggleLeftSidebar)
    window.addCleanup(() => btn.removeEventListener("click", toggleLeftSidebar))
  })

  // Right toggle button listener
  const rightBtns = document.querySelectorAll(".sidebar-toggle-btn.right-toggle")
  rightBtns.forEach((btn) => {
    btn.addEventListener("click", toggleRightSidebar)
    window.addCleanup(() => btn.removeEventListener("click", toggleRightSidebar))
  })

  // Wide mode toggle button listener
  const wideBtns = document.querySelectorAll(".wide-mode-toggle-btn")
  wideBtns.forEach((btn) => {
    btn.addEventListener("click", toggleWideMode)
    window.addCleanup(() => btn.removeEventListener("click", toggleWideMode))
  })
})

// Keyboard shortcuts (Alt+L, Alt+R, Alt+W)
document.addEventListener("keydown", (e) => {
  // Avoid triggers inside input / textarea
  const target = e.target as HTMLElement | null
  if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)) {
    return
  }

  if (e.altKey && (e.key === "l" || e.key === "L")) {
    e.preventDefault()
    toggleLeftSidebar()
  } else if (e.altKey && (e.key === "r" || e.key === "R")) {
    e.preventDefault()
    toggleRightSidebar()
  } else if (e.altKey && (e.key === "w" || e.key === "W")) {
    e.preventDefault()
    toggleWideMode()
  }
})
