document.addEventListener("nav", async (e:CustomEventMap["nav"]) => {
    const searchButton = document.querySelector(".search-button") as HTMLButtonElement
    if (!searchButton) return

    function showSearch(searchType: "basic" | "tags" = "basic") {
        const container = document.querySelector(".search-container") as HTMLElement
        if (!container) return

        const sidebar = container.closest(".sidebar") as HTMLElement | null
        if (sidebar) sidebar.style.zIndex = "1"

        container.classList.add("active")

        const searchBar = document.querySelector(".search-bar") as HTMLInputElement
        if (searchBar) searchBar.focus()

        if (searchType === "tags") {
            searchBar.value = ""
        } else {
            searchBar.value = ""
        }
    }

    const clickHandler = () => showSearch("basic")
    searchButton.addEventListener("click", clickHandler)
    window.addCleanup(() => searchButton.removeEventListener("click", clickHandler))
})