import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [
    // 左右サイドバーの折りたたみトグルボタン（フローティング）
    Component.SidebarToggle(),
    // SNSシェアボタン（X / Facebook / LINE / URLコピー）。トップページにも表示
    Component.ShareButtons(),
    Component.ConditionalRender({
      // ログイン不要のコメント機能（Cusdis）
      component: Component.CusdisComments({
        appId: "96449c4e-4680-4d58-8195-b6f795ecdfac",
        host: "https://cusdis.com",
        lang: "ja",
      }),
      // トップページ（index）にはコメント欄を表示しない
      condition: (page) => page.fileData.slug !== "index",
    }),
    // コンテンツの著作権表示（トップページ以外の全ページ末尾）
    Component.ContentLicense(),
  ],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/jackyzha0/quartz",
      "Discord Community": "https://discord.gg/cRFFHYye7t",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
    // 記事タイトル直下のSNSシェアボタン。トップページにも表示
    Component.ShareButtons(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
        { Component: Component.WideModeToggle() },
        { Component: Component.ReaderMode() },
      ],
    }),
    Component.Explorer(),
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
    Component.RecentNotes({ title: "最近のノート", limit: 20 }),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
        { Component: Component.WideModeToggle() },
      ],
    }),
    Component.Explorer(),
  ],
  right: [],
}
