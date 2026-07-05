import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

export default (() => {
  const ContentLicense: QuartzComponent = ({ displayClass, fileData }: QuartzComponentProps) => {
    if (fileData.slug === "index") return null
    return (
      <p class={`content-license ${displayClass ?? ""}`}>
        © iida-masashi. 本ページの文章・図版の著作権は著者に帰属します。引用・参照の際は出典の明記をお願いします。
      </p>
    )
  }
  return ContentLicense
}) satisfies QuartzComponentConstructor
