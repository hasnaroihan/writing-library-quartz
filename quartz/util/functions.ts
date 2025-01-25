import { FileNode } from "../components/ExplorerNode"
import { QuartzPluginData } from "../plugins/vfile"

// sort files before folders
export const sortFileBFolder = (a: FileNode, b: FileNode) : number => {
    if ((!a.file && !b.file) || (a.file && b.file)) {
      return a.displayName.localeCompare(b.displayName, undefined, {
        numeric: true,
        sensitivity: "base",
      })
    }
  
    if (a.file && !b.file) {
      return -1
    } else {
      return 1
    }
}

// sort most recently created posts
export const sortCreatedDateDesc = (a : FileNode, b: FileNode) : number => {
  var aCreated = a.file?.dates?.created
  var bCreated = b.file?.dates?.created

  if (aCreated && bCreated) {
    if (aCreated >= bCreated) {
      return -1
    } else {
      return 1
    }
  } else if (aCreated && !bCreated) {
    return -1
  } else if (!aCreated && bCreated) {
    return 1
  } else {
    return -1
  }
}

// filter posts tagged "essential"
export const filterEssentialTag = (node : FileNode) : boolean => {
    return node.file?.frontmatter?.tags?.includes("essential") !== true
}

export const filterEssentialTagPlugin = (f : QuartzPluginData) : boolean => {
  return f.frontmatter?.tags?.includes("essential") !== true
}

// include ony posts tagged "essential"
export const onlyEssentialTagPlugin = (f : QuartzPluginData) : boolean => {
    return f.frontmatter?.tags?.includes("essential")  == true && f.frontmatter.title != "Lobby"
}


