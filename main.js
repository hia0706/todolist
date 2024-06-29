const ITEMS_CONTAINER = document.getElementById("items");
const ITEMS_TEMPLATE = document.getElementById("itemTemplate");
const ADD_BUTTON = document.getElementById("add");
const DELETE_BUTTON = document.getElementById("delete");

let items = getItems();

// 할일 목록 보여주기
function getItems() {
    const value = localStorage.getItem("todo") || "[]";

    return JSON.parse(value);
}

// 로컬스토리지에 저장
function setItems(items) {
    const itemsJson = JSON.stringify(items);

    localStorage.setItem("todo", itemsJson);
}

// 할일 목록 기본값
function addItem() {
    items.unshift({
        description: "",
        completed: false
    });

    setItems(items);
    refreshList();
}

// 업데이트 할일 목록
function updateItem(item, key, value) {
    item[key] = value;

    setItems(items);
    refreshList();
}

function deleteItem(item, key, value) {
    item[key] = value;


}

function refreshList() {
    // 할일 목록 정렬
    items.sort((a, b) => {
        if (a.completed) {
            return 1;
        }

        if (b.completed) {
            return -1;
        }

        return a.description < b.description ? -1 : 1;
    })

    ITEMS_CONTAINER.innerText = "";

    // 할일 목록
    for (const item of items) {
        const itemElement = ITEMS_TEMPLATE.content.cloneNode(true);
        const descriptionInput = itemElement.querySelector(".item-description");
        const completedInput = itemElement.querySelector(".item-completed");

        descriptionInput.value = item.description;
        completedInput.checked = item.completed;

        descriptionInput.addEventListener("change", () => {
            updateItem(item, "description", descriptionInput.value);
        });

        completedInput.addEventListener("change", () => {
            updateItem(item, "completed", completedInput.checked);
        });

        ITEMS_CONTAINER.append(itemElement);
    }
}

ADD_BUTTON.addEventListener("click", () => {
    addItem();
})

DELETE_BUTTON.addEventListener("click", () => {
})

refreshList();