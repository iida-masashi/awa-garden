import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
// @ts-ignore
import script from "./scripts/shareButtons.inline"
import style from "./styles/shareButtons.scss"

type Options = {
  // 表示するSNS（順序通りに並ぶ）
  networks?: Array<"x" | "facebook" | "line" | "copy">
}

const defaultOptions: Options = {
  networks: ["x", "facebook", "line", "copy"],
}

export default ((userOpts?: Options) => {
  const opts = { ...defaultOptions, ...userOpts }

  const ShareButtons: QuartzComponent = ({ displayClass, fileData }: QuartzComponentProps) => {
    // frontmatter で comments:false 等のページは共有も出さない（コメントと同基準）
    const disabled =
      typeof fileData.frontmatter?.comments !== "undefined" &&
      (!fileData.frontmatter?.comments || fileData.frontmatter?.comments === "false")
    if (disabled) {
      return <></>
    }

    return (
      <div class={classNames(displayClass, "share-buttons")} data-networks={opts.networks!.join(",")}>
        <span class="share-label">シェア</span>
        <div class="share-list"></div>
      </div>
    )
  }

  ShareButtons.afterDOMLoaded = script
  ShareButtons.css = style

  return ShareButtons
}) satisfies QuartzComponentConstructor<Options>
