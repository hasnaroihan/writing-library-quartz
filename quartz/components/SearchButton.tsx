import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types";
import style from "./styles/searchButton.scss";
// @ts-ignore
import script from "./scripts/searchButton.inline";
import { classNames } from "../util/lang";
import { i18n } from "../i18n";

export default (() => {
    const SearchButton: QuartzComponent = ({displayClass, cfg}: QuartzComponentProps) => {
        return (
            <div class={classNames(displayClass, "search")}>
                <button class="search-button">
                    <p>{i18n(cfg.locale).components.search.title}</p>
                    <svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.9 19.7">
                      <title>Search</title>
                      <g class="search-path" fill="none">
                        <path stroke-linecap="square" d="M18.5 18.3l-5.4-5.4" />
                        <circle cx="8" cy="8" r="7" />
                      </g>
                    </svg>
                </button>
            </div>
        )
    }

    SearchButton.afterDOMLoaded = script
    SearchButton.css = style

    return SearchButton
}) satisfies QuartzComponentConstructor