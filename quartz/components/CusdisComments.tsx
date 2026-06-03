import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
// @ts-ignore
import script from "./scripts/cusdis.inline"

type Options = {
  appId: string
  host?: string
  lang?: string
}

export default ((opts: Options) => {
  const Cusdis: QuartzComponent = ({ displayClass, fileData }: QuartzComponentProps) => {
    // frontmatter で comments: false なら非表示
    const disableComment: boolean =
      typeof fileData.frontmatter?.comments !== "undefined" &&
      (!fileData.frontmatter?.comments || fileData.frontmatter?.comments === "false")
    if (disableComment) {
      return <></>
    }

    const pageId = fileData.slug ?? ""
    const pageTitle = fileData.frontmatter?.title ?? pageId

    return (
      <div class={classNames(displayClass, "cusdis-comments")}>
        <h2>コメント</h2>
        <p style="font-size: 0.85em; opacity: 0.7;">
          ログイン不要でコメントできます（お名前・メールは任意）。
        </p>
        <div
          id="cusdis_thread"
          data-host={opts.host ?? "https://cusdis.com"}
          data-app-id={opts.appId}
          data-page-id={pageId}
          data-page-url={pageId}
          data-page-title={pageTitle}
          data-lang={opts.lang ?? "ja"}
        ></div>
      </div>
    )
  }

  Cusdis.afterDOMLoaded = script

  return Cusdis
}) satisfies QuartzComponentConstructor<Options>
