import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Bulan Bulan",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "library.pabrikkuatji.com",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Krub",
        body: "Charis SIL",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: '#fffbf0',
          lightgray: "#eeecdf",
          gray: "#b6a5a5",
          darkgray: "#5c4242",
          dark: "#631526",
          secondary: "#f86b72",
          tertiary: "#0c884a",
          highlight: "rgba(199, 94, 125, 0.15)",
          textHighlight: "rgba(247, 232, 34, 0.53)",
        },
        darkMode: {
          light: "#0d1812",
          lightgray: "#2d3a31",
          gray: "#7c7b7b",
          darkgray: "#d2d3c9",
          dark: "#ebebec",
          secondary: "#1ec471",
          tertiary: "#f86b72",
          highlight: "rgba(143, 159, 169, 0.15)",
          textHighlight: "rgba(168, 162, 36, 0.53)",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
