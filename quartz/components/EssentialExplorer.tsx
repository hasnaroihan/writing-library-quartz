import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { FullSlug, SimpleSlug, resolveRelative } from "../util/path"
import { QuartzPluginData } from "../plugins/vfile"
import { byDateAndAlphabetical } from "./PageList"
import style from "./styles/essentialExplorer.scss"
import { Date, getDate } from "./Date"
import { GlobalConfiguration } from "../cfg"
import { i18n } from "../i18n"
import { classNames } from "../util/lang"

interface Options {
  title?: string
  // limit: number
  // linkToMore: SimpleSlug | false
  // showTags: boolean
  filter: (f: QuartzPluginData) => boolean
  sort: (f1: QuartzPluginData, f2: QuartzPluginData) => number
}

const defaultOptions = (cfg: GlobalConfiguration): Options => ({
  // limit: 3,
  // linkToMore: false,
  // showTags: true,
  filter: () => true,
  sort: byDateAndAlphabetical(cfg),
})

export default ((userOpts?: Partial<Options>) => {
  const EssentialExplorer: QuartzComponent = ({
    allFiles,
    fileData,
    displayClass,
    cfg,
  }: QuartzComponentProps) => {
    const opts = { ...defaultOptions(cfg), ...userOpts }
    const pages = allFiles.filter(opts.filter).sort(opts.sort)
    // const remaining = Math.max(0, pages.length - opts.limit)
    return (
      <div class={classNames(displayClass, "essential-explorer")}>
        {/* <h3>{opts.title ?? i18n(cfg.locale).components.recentNotes.title}</h3> */}
        <ul class="essential-ul">
          {pages.slice(0, pages.length).map((page) => {
            const title = page.frontmatter?.title ?? i18n(cfg.locale).propertyDefaults.title
            // const tags = page.frontmatter?.tags ?? []

            return (
              <li class="essential-li">
                <div class="section">
                  <div class="desc">
                      <a href={resolveRelative(fileData.slug!, page.slug!)}>
                        {title}
                      </a>
                  </div>
                  {/* {page.dates && (
                    <p class="meta">
                      <Date date={getDate(cfg, page)!} locale={cfg.locale} />
                    </p>
                  )} */}
                  {/* {opts.showTags && (
                    <ul class="tags">
                      {tags.map((tag) => (
                        <li>
                          <a
                            class="internal tag-link"
                            href={resolveRelative(fileData.slug!, `tags/${tag}` as FullSlug)}
                          >
                            {tag}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )} */}
                </div>
              </li>
            )
          })}
        </ul>
        {/* {opts.linkToMore && remaining > 0 && (
          <p>
            <a href={resolveRelative(fileData.slug!, opts.linkToMore)}>
              {i18n(cfg.locale).components.recentNotes.seeRemainingMore({ remaining })}
            </a>
          </p>
        )} */}
      </div>
    )
  }

  EssentialExplorer.css = style
  return EssentialExplorer
}) satisfies QuartzComponentConstructor