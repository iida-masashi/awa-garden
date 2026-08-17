// @ts-ignore
import script from "./scripts/sidebartoggle.inline"
import style from "./styles/sidebartoggle.scss"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

const SidebarToggleComponent: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
  return (
    <div class={classNames(displayClass, "sidebar-toggles-container")}>
      {/* Floating Left Sidebar Toggle */}
      <button
        type="button"
        class="sidebar-toggle-btn left-toggle desktop-only"
        aria-label="左サイドバーを開閉 (Alt+L)"
        title="左サイドバーを開閉 (Alt+L)"
      >
        <svg class="icon-collapse" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        <svg class="icon-expand" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {/* Floating Right Sidebar Toggle */}
      <button
        type="button"
        class="sidebar-toggle-btn right-toggle desktop-only"
        aria-label="右サイドバーを開閉 (Alt+R)"
        title="右サイドバーを開閉 (Alt+R)"
      >
        <svg class="icon-collapse" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
        <svg class="icon-expand" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
    </div>
  )
}

SidebarToggleComponent.beforeDOMLoaded = script
SidebarToggleComponent.css = style

const WideModeToggleComponent: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
  return (
    <button
      type="button"
      class={classNames(displayClass, "wide-mode-toggle-btn desktop-only")}
      aria-label="ワイド・フル幅表示切替 (Alt+W)"
      title="ワイド・フル幅表示切替 (Alt+W)"
    >
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
      </svg>
    </button>
  )
}

WideModeToggleComponent.beforeDOMLoaded = script
WideModeToggleComponent.css = style

export const WideModeToggle: QuartzComponentConstructor = () => WideModeToggleComponent

export default (() => SidebarToggleComponent) satisfies QuartzComponentConstructor
