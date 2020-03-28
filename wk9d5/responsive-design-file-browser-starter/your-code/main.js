class DirectoryTreeNode {
    constructor(name, type, lastModifiedTime) {
        this.name = name;
        this.type = type;
        this.lastModifiedTime = lastModifiedTime;
        this.children = [];
        this.rootName = '';
    }


    searchTree(name) {
        let visited = new Set();
        let neighborlist = [this];

        while (neighborlist.length) {
            const targetnode = neighborlist.shift();
            if (!visited.has(targetnode)) {
                if (targetnode.name === name) {
                    return targetnode;
                } else {
                    visited.add(targetnode);
                    neighborlist.push(...targetnode.children);
                }
            }
        }

        return null;
    }


    // getIconTypeName returns a 'name' based on the type of file so
    // we can look into the images directory and load the correct image
    // file to display next to our files.

    // Note: This can be smarter. Look at the icons available
    // and perhaps make this better. For example, this
    // will return "png" for PNG files. There is no
    // icon for PNG. However, there is an icon for "image".
    // Those kinds of mappings will improve your UI.
    getIconTypeName() {
        if (this.type === 'directory') {
            return this.name;
        }

        // If it's a file, we parse out the `extension`
        // and use that as our file type
        // Extensions are the bit after the file name such as
        // .jpg .png .txt .js .css
        if (this.type === 'file') {
            const dotIndex = this.name.lastIndexOf('.');
            if (dotIndex >= 0) {
                return this.name.substring(dotIndex + 1).toLowerCase();
            }
            return this.name;
        }

        return '';
    }

    addChild(child) {
        this.children.push(child);
        if (this.name !== '') {
            child.rootName += this.rootName + child.name + '/';
        } else {
            child.rootName += this.name + '/' + child.name + '/';
        }
    }
}



function updateVisualTree(element, directoryTreeNode) {
    const ul = document.createElement('ul');
    ul.classList.add('tree');
    for (let child of directoryTreeNode.children) {
        updateVisualTreeEntry(ul, child);
    }
    element.appendChild(ul);
}

function updateVisualTreeEntry(treeElement, child) {
    const li = document.createElement('li');
    li.classList.add('tree-entry');
    if (child.type === 'file') {
        li.addEventListener("click", async (e) => {
            let extension = child.rootName.slice(child.rootName.indexOf("."));
            let dataSection = document.getElementById("data-section");
            switch (extension) {
                case ".rb/":
                case ".js/":
                case ".css/":
                case ".html/":
                case ".md/":
                case ".text/":
                case ".txt/":
                    let data = await fetchFile(child.rootName);
                    // debugger;
                    let pre = document.createElement("pre");
                    pre.innerHTML = data;
                    dataSection.innerHTML = "";
                    dataSection.appendChild(pre);
                    break;
                default:
                    let image = document.createElement("img");
                    image.src = "http://localhost:3000" + child.rootName.slice(0, child.rootName.length - 1);
                    dataSection.innerHTML = "";
                    dataSection.appendChild(image);
            }
        });
        li.innerHTML = `
        <div class="tree-entry__disclosure tree-entry__disclosure--disabled"></div>
        <img class="tree-entry__icon" src="/icons/file_type_${child.getIconTypeName()}.svg">
        <div class="tree-entry__name">${child.name}</div>
        <div class="tree-entry__time">${child.lastModifiedTime}</div>
      `;
    } else if (child.type === 'directory') {
        li.classList.add("directory");
        li.innerHTML = `
        <div class="tree-entry__disclosure tree-entry__disclosure--closed"></div>
        <img class="tree-entry__icon" src="/icons/folder_type_${child.getIconTypeName()}.svg">
        <div class="tree-entry__name">${child.name}</div>
        <div class="tree-entry__time">${child.lastModifiedTime}</div>
      `;
    }
    treeElement.appendChild(li);
}

async function initialFetch(string = "/") {
    try {
        let res = await fetch(`/api/path${string}`);
        res = await res.json();
        return newRes = res.map(obj => {
            return obj = directoryNodes(obj);
        });
    } catch (error) {
        error = await error.json();
        alert(error.message + " Please refresh.");
    }
}

async function fetchFile(string) {
    try {
        let res = await fetch(`/api/file${string}`);
        res = await res.text();
        return res;
    } catch (error) {
        error = await error.json();
        alert(error.message + " Please refresh.");
    }
}

function directoryNodes(obj) {
    return new DirectoryTreeNode(obj.name, obj.type, obj.lastModifiedTime);
}

window.addEventListener("DOMContentLoaded", async (e) => {
    let root = new DirectoryTreeNode("", "directory", "2020-03-27")
    let resObjs = await initialFetch();
    await setTimeout(() => document.querySelector(".overlay").remove(), 1000);
    let tree = document.getElementById("tree-section");
    resObjs.forEach(obj => {
        root.addChild(obj);
    });
    updateVisualTree(tree, root);

    document.querySelector('.tree-section').addEventListener('click', async (event) => {
        const { target } = event;
        if (target.classList.contains("tree")) return;
        const parentEle = target.parentElement.childNodes;
        const folderName = parentEle[5].innerHTML;
        if (target.classList.contains('tree-entry__disclosure--closed')) {
            target.classList.remove('tree-entry__disclosure--closed');
            target.classList.add('tree-entry__disclosure--opened');
            const newSection = document.createElement('section');
            newSection.setAttribute("id", folderName);
            const parentNode = root.searchTree(folderName);
            const childNodes = await initialFetch(parentNode.rootName);
            childNodes.forEach(obj => {
                parentNode.addChild(obj);
            });
            updateVisualTree(newSection, parentNode);
            target.parentElement.after(newSection);

        } else if (target.classList.contains('tree-entry__disclosure--opened')) {
            document.getElementById(folderName).remove();
            root.searchTree(folderName).children = [];
            target.classList.add('tree-entry__disclosure--closed');
            target.classList.remove('tree-entry__disclosure--opened');
        }
    });

});
