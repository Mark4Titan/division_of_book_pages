const addRowButton = document.getElementById("widthHeight");
const itemImg = document.querySelector(".item__img");
const Mdal = document.querySelector(".modal");
let isResizing = false;

addRowButton.addEventListener("click", () => {
  if (!isResizing) {
    isResizing = true;
    addRowButton.style.backgroundColor = "bisque";
    itemImg.style.backgroundColor = "bisque";
    itemImg.style.resize = "both";
    itemImg.style.overflow = "auto";
    itemImg.addEventListener("mouseup", handleMouseUp);
  } else {
    isResizing = false;
    addRowButton.style = "";
    itemImg.style.backgroundColor = "";
    itemImg.style.resize = "none";
    itemImg.style.overflow = "hidden";
    itemImg.removeEventListener("mouseup", handleMouseUp);
  }
});

function handleMouseUp() {
  itemImg.style.border = "none";
  itemImg.style.width = itemImg.clientWidth - 10 + "px";
  itemImg.style.height = itemImg.clientHeight - 10 + "px";
}
function showModal() {
  Mdal.style.display = "flex";
}
const StyledDiv = () => {
  return `width: 100%; height: 100%; background-color: #4472c4;`;
};
const StyledBlock = (data) => {
  return `display: grid; grid-template-columns: repeat(${data}, 1fr); grid-gap: 5px;`;
};
const Patern = {
  li_1: [0, 1, 0],
  li_2: [1, 0, 1],
  li_3: [1, 1, 1],
  li_4: [2, 0, 2],
  li_5: [2, 0, 3],
  li_6: [2, 2, 2],
  li_7: [2, 3, 2],
  li_8: [2, 3, 3],
  li_9: [3, 3, 3],
  li_10: [3, 3, 4],
  li_11: [3, 4, 4],
  li_12: [4, 4, 4],
};

const Render = (val) => {
  document.getElementById("content").innerHTML = "";
  let content = document.getElementById("content");
  for (let i = 0; i < Patern[val].length; i++) {
    if (Patern[val][i] == 0) continue;
    let divBlock = document.createElement("div");
    divBlock.style = StyledBlock(Patern[val][i]);

    for (let j = 0; j < Patern[val][i]; j++) {
      let div = document.createElement("div");      
      div.style = StyledDiv();
      divBlock.appendChild(div);
    }
    content.appendChild(divBlock);
  }
};

document.querySelectorAll(".modal li").forEach((li) => {
  li.addEventListener("click", () => {
    Render(li.id);
    Mdal.style.display = "none";
  });
});
