import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
import { filterEssentialTag, onlyEssentialTag } from "./quartz/util/functions"

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
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    // Search bar
    Component.MobileOnly(Component.Search()),
    Component.DesktopOnly(Component.Search({
      desktopLayout: true
    })),
    // Change theme
    Component.Darkmode(),
    // Explorer
    Component.DesktopOnly(Component.Explorer({ // List core-tagged posts only
      titleButton: false,
      filterFn: onlyEssentialTag,
    })),
    Component.DesktopOnly(Component.Explorer({
      title: "A-Z",
      filterFn: filterEssentialTag,
    })),
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
    // Search bar
    Component.MobileOnly(Component.Search()),
    Component.DesktopOnly(Component.Search({
      desktopLayout: true
    })),
    Component.Darkmode(),
    Component.DesktopOnly(Component.Explorer({ // List core-tagged posts only
      titleButton: false,
      filterFn: onlyEssentialTag,
    })),
    Component.DesktopOnly(Component.Explorer({
      title: "A-Z",
      filterFn: filterEssentialTag,
    })),
  ],
  right: [],
}
