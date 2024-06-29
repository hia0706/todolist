const ITEMS_CONTAINER = document.getElementById("items");
const ITEMS_TEMPLATE = document.getElementById("itemTemplate");
const ADD_BUTTON = document.getElementById("add");
const RESET_BUTTON = document.getElementById("reset");

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

function resetItem() {
    localStorage.clear();
    window.location.reload();
}

// 업데이트 할일 목록
function updateItem(item, key, value) {
    item[key] = value;

    setItems(items);
    refreshList();
}

// 할 일 제거
function removeItem(index) {
    items.splice(index, 1);
    setItems(items);
    refreshList();
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
    items.forEach((item, index) => {
        const itemElement = ITEMS_TEMPLATE.content.cloneNode(true);
        const descriptionInput = itemElement.querySelector(".item-description");
        const completedInput = itemElement.querySelector(".item-completed");
        const removeButton = itemElement.querySelector(".item-remove");

        descriptionInput.value = item.description;
        completedInput.checked = item.completed;

        descriptionInput.addEventListener("change", () => {
            updateItem(item, "description", descriptionInput.value);
        });

        completedInput.addEventListener("change", () => {
            updateItem(item, "completed", completedInput.checked);
        });

        removeButton.addEventListener("click", () => {
            removeItem(index);
        })

        ITEMS_CONTAINER.append(itemElement);
    });

    // focus 설정
    if (items.length > 0) {
        const firstDescriptionInput = ITEMS_CONTAINER.querySelector(".item-description");
        if (firstDescriptionInput) {
            firstDescriptionInput.focus();
        }
    }
}

ADD_BUTTON.addEventListener("click", () => {
    addItem();
})

RESET_BUTTON.addEventListener("click", () => {
    resetItem();
})

refreshList();