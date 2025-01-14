import { FileNode } from "../components/ExplorerNode"

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

// filter posts tagged "core"
export const filterEssentialTag = (node : FileNode) : boolean => {
    return node.file?.frontmatter?.tags?.includes("essential") !== true
}

// include ony posts tagged "core"
export const onlyEssentialTag = (node : FileNode) : boolean => {
    return node.file?.frontmatter?.tags?.includes("essential") == true
}
