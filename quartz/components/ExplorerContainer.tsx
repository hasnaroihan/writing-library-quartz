// @ts-ignore
import script from "./scripts/explorer.inline"
import { classNames } from "../util/lang"
import { concatenateResources } from "../util/resources"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/explorer.scss"

type ExplorerContainerConfig = {
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
}

export type FolderState = {
  path: string
  collapsed: boolean
}

export default ((config: ExplorerContainerConfig) => {
  const ExplorerContainer: QuartzComponent = (props: QuartzComponentProps) => {
    // const direction = config.direction ?? "column"
    // const wrap = config.wrap ?? "nowrap"
    // const gap = config.gap ?? "1rem"
    const folderDefaultState = "collapsed"
    

    return (
      <div class={classNames(props.displayClass, "explorer")}
      data-collapsed={folderDefaultState}>
      {/* {`display: flex; flex-direction: ${direction}; flex-wrap: ${wrap}; gap: ${gap};`}> */}
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
        <div class="explorer-content" aria-expanded={false}>
        {config.components.map((c) => {
          const grow = c.grow ? 1 : 0
          const shrink = (c.shrink ?? true) ? 1 : 0
          const basis = c.basis ?? "auto"
          const order = c.order ?? 0
          const align = c.align ?? "center"
          const justify = c.justify ?? "center"

          return (
            <div
              style={`flex-grow: ${grow}; flex-shrink: ${shrink}; flex-basis: ${basis}; order: ${order}; align-self: ${align}; justify-self: ${justify};`}
            >
              <c.Component {...props} />
            </div>
          )
        })}
        </div>
        
      </div>
    )
  }

  ExplorerContainer.afterDOMLoaded = concatenateResources(
    ...config.components.map((c) => c.Component.afterDOMLoaded),
    script
  )
  ExplorerContainer.beforeDOMLoaded = concatenateResources(
    ...config.components.map((c) => c.Component.beforeDOMLoaded),
  )
  ExplorerContainer.css = concatenateResources(...config.components.map((c) => c.Component.css), style)
  return ExplorerContainer
}) satisfies QuartzComponentConstructor<ExplorerContainerConfig>
