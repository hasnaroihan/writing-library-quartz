import { concatenateResources } from "../util/resources"
import { classNames } from "../util/lang"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

type FlexConfig = {
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
  marginLeft?: "auto"
  padding?: string
}

export default ((config: FlexConfig) => {
  const Flex: QuartzComponent = (props: QuartzComponentProps) => {
    const direction = config.direction ?? "row"
    const wrap = config.wrap ?? "nowrap"
    const gap = config.gap ?? "1rem"
    const marginLeft = config.marginLeft ?? "none"
    const padding = config.padding ?? "0"
    // const alignItems = config.alignItems ?? "center"
    // const justifyContent = config.justifyContent ?? "center"

    return (
      <div
        class={classNames(props.displayClass, "flex-component")}
        style={`flex-direction: ${direction};
        flex-wrap: ${wrap};gap: ${gap};
        margin-left: ${marginLeft}; padding: ${padding}`}
      >
        {config.components.map((c) => {
          const grow = c.grow ? 1 : 0
          const shrink = (c.shrink ?? true) ? 1 : 0
          const basis = c.basis ?? "auto"
          const order = c.order ?? 0
          const align = c.align ?? "center"
          const justify = c.justify ?? "center"


          return (
            <div
              style={`display: flex;
                flex-grow: ${grow};
                flex-shrink: ${shrink};
                flex-basis: ${basis}; order: ${order};
                align-items: ${align}; justify-content: ${justify};`}
            >
              <c.Component {...props} />
            </div>
          )
        })}
      </div>
    )
  }

  Flex.afterDOMLoaded = concatenateResources(
    ...config.components.map((c) => c.Component.afterDOMLoaded),
  )
  Flex.beforeDOMLoaded = concatenateResources(
    ...config.components.map((c) => c.Component.beforeDOMLoaded),
  )
  Flex.css = concatenateResources(...config.components.map((c) => c.Component.css))
  return Flex
}) satisfies QuartzComponentConstructor<FlexConfig>
