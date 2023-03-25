const addRowButton = document.getElementById("widthHeight");
const itemImg = document.querySelector(".item__img");
const Mdal = document.querySelector(".modal");
let isResizing = false;
let Rows = -1;

const HomePage = (val) => {
  if (val) {
    itemImg.style.backgroundColor = "bisque";
    itemImg.style.resize = "both";
    itemImg.style.overflow = "auto";
    itemImg.addEventListener("mouseup", handleMouseUp);
  } else {
    itemImg.style.backgroundColor = "";
    itemImg.style.resize = "none";
    itemImg.style.overflow = "hidden";
    itemImg.removeEventListener("mouseup", handleMouseUp);
  }
};



const ChildPage = (val) => {
  const divBlocks = document.querySelectorAll('[id^="per_"]');
  // const contentDiv = document.getElementById("content");
  if (val) {
    divBlocks.forEach((itemImg) => {
      itemImg.style.backgroundColor = "bisque";
      itemImg.style.resize = "both";
      itemImg.style.overflow = "auto";
      itemImg.addEventListener("mouseup", handleMouseUp);     
      // contentDiv.style.gridTemplateRows = "auto";
    });
  } else {
    divBlocks.forEach((itemImg) => {
      itemImg.style.backgroundColor = "";
      itemImg.style.resize = "none";
      itemImg.style.overflow = "hidden";
      itemImg.removeEventListener("mouseup", handleMouseUp);
      // contentDiv.style.gridTemplateRows = "0px";
    });
  }
};

addRowButton.addEventListener("click", () => {
  if (!isResizing) {
    isResizing = true;
    addRowButton.style.backgroundColor = "bisque";
    // HomePage(isResizing);
    ChildPage(isResizing);
  } else {
    ClickDefault();
    // addRowButton.style = "";
    // HomePage(isResizing);
    // ChildPage(isResizing);
  }
});

const ClickDefault = () => { 
  isResizing = false;
  addRowButton.style = "";
  // HomePage(isResizing);
  ChildPage(isResizing);
}

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
  return `display: grid; grid-template-columns: repeat(${data}, 1fr); grid-gap: 5px; border: solid 1px #ed7d31;`;
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

const ParseInt = (obj, text) => {
 return parseInt(obj.replace(text, ""));
};

const Converter = (valRows, valHeight, valRow, Obj) => {
  const itemImgHeight = ParseInt(itemImg.style.height, "px");
  const x = `${(valHeight / itemImgHeight) * 100}%`;

  const insertValue = [
    ...valRows.slice(0, valRow),
    x,
    ...valRows.slice(valRow + 1),
  ];


  setTimeout(()=> {
    const insertValueTime = [
      ...valRows.slice(0, valRow),
      "auto",
      ...valRows.slice(valRow + 1),
    ];
    
    const NevIn = insertValueTime.join(" ");
    Obj.gridTemplateRows = NevIn;
  }, 300);

  return insertValue.join(" ");
};


const Render = (val) => {
  ClickDefault();
  document.getElementById("content").innerHTML = "";
  let content = document.getElementById("content");
  const gridRows = [];

  for (let i = 0; i < Patern[val].length; i++) {
    if (Patern[val][i] == 0) continue;

    gridRows.push("1fr");
    let divBlock = document.createElement("div");
    divBlock.style = StyledBlock(Patern[val][i]);
    divBlock.id = `per_${i}`;

    for (let j = 0; j < Patern[val][i]; j++) {
      let div = document.createElement("div");
      div.style = StyledDiv();
      divBlock.appendChild(div);
    }
    divBlock.addEventListener("click", () => {
      const Row = ParseInt(divBlock.id, "per_");
      // const Row = parseInt(divBlock.id.replace("per_", ""));
      const GridContent = content.style.gridTemplateRows.split(" ");
      const HeightBloc = ParseInt(divBlock.style.height, "px");
      const Obj = content.style; 
      // const HeightBloc = parseInt(divBlock.style.height.replace("px", ""));
      // const HeightBloc = divBlock.style.height;
      const MaxWidth =
        ParseInt(divBlock.style.width, "px") > 650
          ? // parseInt(divBlock.style.width.replace("px", "")) > 650
            "650px"
          : divBlock.style.width;
      // const MaxWidth = divBlock.style.width;
      // const MaxWidth = "650px";
      // console.log(MaxWidth);
      content.style.gridTemplateRows = Converter(
        GridContent,
        HeightBloc,
        Row,
        Obj
      );
      
      
      
      // console.log(GridContent.map((i) => "auto").join(" "));
    });
    content.style.gridTemplateRows = gridRows.join(" ");
    content.appendChild(divBlock);
  }
};

document.querySelectorAll(".modal li").forEach((li) => {
  li.addEventListener("click", () => {
    Render(li.id);
    Mdal.style.display = "none";
  });
});
