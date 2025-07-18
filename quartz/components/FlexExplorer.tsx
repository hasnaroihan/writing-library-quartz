import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/explorer.scss"
// @ts-ignore
import script from "./scripts/explorer.inline"
import { classNames } from "../util/lang"
// import { i18n } from "../i18n"
import { FileTrieNode } from "../util/fileTrie"
import OverflowListFactory from "./OverflowList"
import { concatenateResources } from "../util/resources"
import Flex from "./Flex"
import Search from "./Search"

type OrderEntries = "sort" | "filter" | "map"

export interface Options {
  title?: string
  folderDefaultState: "collapsed" | "open"
  folderClickBehavior: "collapse" | "link"
  useSavedState: boolean
  sortFn: (a: FileTrieNode, b: FileTrieNode) => number
  filterFn: (node: FileTrieNode) => boolean
  mapFn: (node: FileTrieNode) => void
  order: OrderEntries[]
  // New option for Flex configuration
  flexConfig?: {
    components: {
      Component: QuartzComponent
      grow?: boolean
      shrink?: boolean
      basis?: string
      order?: number
      align?: "start" | "end" | "center" | "stretch"
      justify?: "start" | "end" | "center" | "between" | "around"
    }[]
    direction?: "row" | "row-reverse" | "column" | "column-reverse"
    wrap?: "nowrap" | "wrap" | "wrap-reverse"
    gap?: string
    justifyContent?: "flex-start" | "flex-end" | "center"
    alignItems?: "flex-start" | "flex-end" | "center" 
  }
}

const defaultOptions: Options = {
  folderDefaultState: "collapsed",
  folderClickBehavior: "link",
  useSavedState: true,
  mapFn: (node) => {
    return node
  },
  sortFn: (a, b) => {
    // Sort order: folders first, then files. Sort folders and files alphabetically
    if ((!a.isFolder && !b.isFolder) || (a.isFolder && b.isFolder)) {
      // numeric: true: Whether numeric collation should be used, such that "1" < "2" < "10"
      // sensitivity: "base": Only strings that differ in base letters compare as unequal. Examples: a ≠ b, a = á, a = A
      return a.displayName.localeCompare(b.displayName, undefined, {
        numeric: true,
        sensitivity: "base",
      })
    }

    if (!a.isFolder && b.isFolder) {
      return 1
    } else {
      return -1
    }
  },
  filterFn: (node) => node.slugSegment !== "tags",
  order: ["filter", "map", "sort"],
  flexConfig: undefined, // Default to no flex component
}

export type FolderState = {
  path: string
  collapsed: boolean
}

export default ((userOpts?: Partial<Options>) => {
  const opts: Options = { ...defaultOptions, ...userOpts }
  const { OverflowList, overflowListAfterDOMLoaded } = OverflowListFactory()

  // Create Flex component if config is provided
  const FlexComponent = opts.flexConfig ? Flex(opts.flexConfig) : null

  //Create Search component
  const SearchComponent = Search({enablePreview: true,})

  const FlexExplorer: QuartzComponent = (props: QuartzComponentProps) => {
    const { cfg, displayClass } = props
    return (
      <div
        class={classNames(displayClass, "explorer")}
        data-behavior={opts.folderClickBehavior}
        data-collapsed={opts.folderDefaultState}
        data-savestate={opts.useSavedState}
        data-data-fns={JSON.stringify({
          order: opts.order,
          sortFn: opts.sortFn.toString(),
          filterFn: opts.filterFn.toString(),
          mapFn: opts.mapFn.toString(),
        })}
      >
        <button
          type="button"
          class="explorer-toggle mobile-explorer hide-until-loaded"
          data-mobile={true}
          aria-controls="explorer-content"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide-menu"
          >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
        </button>
        {/* <button
          type="button"
          class="title-button explorer-toggle desktop-explorer"
          data-mobile={false}
          aria-expanded={true}
        >
          <h2>{opts.title ?? i18n(cfg.locale).components.explorer.title}</h2>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="5 8 14 8"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="fold"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button> */}
        <div class="explorer-content" aria-expanded={false}>
          {/* Render Flex component above the button if configured */}
          {FlexComponent && <FlexComponent {...props} />}
          <div>
            <OverflowList class="explorer-ul" />
          </div> 
        </div>
        <template id="template-file">
          <li>
            <a href="#"></a>
          </li>
        </template>
        <template id="template-folder">
          <li>
            <div class="folder-container">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="5 8 14 8"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="folder-icon"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
              <div>
                <button class="folder-button">
                  <span class="folder-title"></span>
                </button>
              </div>
            </div>
            <div class="folder-outer">
              <ul class="content"></ul>
            </div>
          </li>
        </template>
        <SearchComponent {...props} />
      </div>
    )
  }

  // Concatenate CSS and scripts from Flex component if it exists
  FlexExplorer.css = FlexComponent 
    ? concatenateResources(style, FlexComponent.css, SearchComponent.css)
    : concatenateResources(style, SearchComponent.css)
  
  FlexExplorer.afterDOMLoaded = FlexComponent
    ? concatenateResources(script, overflowListAfterDOMLoaded, FlexComponent.afterDOMLoaded, SearchComponent.afterDOMLoaded)
    : concatenateResources(script, overflowListAfterDOMLoaded, SearchComponent.afterDOMLoaded)
  
  FlexExplorer.beforeDOMLoaded = FlexComponent?.beforeDOMLoaded

  return FlexExplorer
}) satisfies QuartzComponentConstructor