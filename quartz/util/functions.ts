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

export const filterCoreTag = (node : FileNode) : boolean => {
    return node.file?.frontmatter?.tags?.includes("core") !== true
}