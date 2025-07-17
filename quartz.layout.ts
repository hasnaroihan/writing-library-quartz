import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
//import { filterEssentialTag, filterEssentialTagPlugin, onlyEssentialTagPlugin, sortCreatedDateDesc } from "./quartz/util/functions"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/hasnaroihan/writing-library-quartz",
      "Pabrik Kuatji": "https://pabrik-kuatji.netlify.app",
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
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    // Component.Flex({
    //   components: [
    //     {
    //       Component: Component.MobileOnly(Component.Explorer()),
    //     },
    //     {
    //       Component: Component.Search(),
    //       grow: true,
    //       shrink: false,
    //     },
    //     { Component: Component.Darkmode() },
    //   ],
    // }),
    //Component.DesktopOnly(Component.Explorer()),
    // Component.ExplorerContainer({
    //   components: [
    //     {
    //       Component: Component.Search(),
    //       grow: true,
    //       shrink: false,
    //     },
    //     { Component: Component.Darkmode() },
    //     { Component: Component.ReaderMode() },
    //   ],
    // }),
    //Component.Explorer(),
    Component.FlexExplorer({
      title: "Explore",
      folderDefaultState: "collapsed",
      flexConfig: {
        direction: "row",
        gap: "0.75rem",
        components: [
          {
            Component: Component.SearchButton(),
            grow: true,
            shrink: false,
          },
          {
            Component: Component.Darkmode(),
            grow: false,
            shrink: true,
          },
          {
            Component: Component.ReaderMode(),
            grow: false,
            shrink: true,
          },
        ],
      }
    })
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.FlexExplorer({
      title: "Explore",
      folderDefaultState: "collapsed",
      flexConfig: {
        direction: "row",
        gap: "0.75rem",
        components: [
          {
            Component: Component.SearchButton(),
            grow: true,
            shrink: false,
          },
          {
            Component: Component.Darkmode(),
            grow: false,
            shrink: true,
          },
          {
            Component: Component.ReaderMode(),
            grow: false,
            shrink: true,
          },
        ],
      }
    }),
  ],
  right: [],
}
