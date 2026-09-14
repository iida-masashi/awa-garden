import { QuartzEmitterPlugin } from "../types"
import { write } from "./helpers"
import { FullSlug } from "../../util/path"

// Serves Google Search Console's HTML file verification at the site root.
// The filename itself is the verification token issued by Search Console.
const VERIFICATION_FILENAME = "google6b4ac541b27dd26c"
const VERIFICATION_CONTENT = "google-site-verification: google6b4ac541b27dd26c.html"

export const GoogleVerification: QuartzEmitterPlugin = () => ({
  name: "GoogleVerification",
  async emit(ctx) {
    const path = await write({
      ctx,
      content: VERIFICATION_CONTENT,
      slug: VERIFICATION_FILENAME as FullSlug,
      ext: ".html",
    })
    return [path]
  },
  async *partialEmit() {},
})
