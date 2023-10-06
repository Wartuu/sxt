const schoolURL = "https://zsl.gliwice.pl/planlekcji/tech/plany/o15.html";
const info = document.getElementById("info");

const about = document.getElementById("about");
const school = document.getElementById("school");
const librus = document.getElementById("librus");

about.addEventListener("click", loadAbout)
school.addEventListener("click", loadScrapper)
librus.addEventListener("click", loadLibrus)

loadScrapper(null);

function removeLinksFromTable(table) {
    var links = table.getElementsByTagName("a");
  
    // Remove links in the current table
    for (let i = links.length - 1; i >= 0; i--) {
      var link = links[i];
      link.parentNode.removeChild(link); // Remove the link element
    }
  
    // Recursively remove links in nested tables
    var nestedTables = table.getElementsByTagName("table");
    for (let i = 0; i < nestedTables.length; i++) {
      removeLinksFromTable(nestedTables[i]);
    }
  }

async function loadScrapper(event) {
    let data = await getData();
    let regex = /<table[^>]*>[\s\S]*?<\/table>/g
    var clazz = regex.exec(data)        //todo: data checking (im too tired to think properly right now)
    var lessons = regex.exec(data)
    info.innerHTML = lessons;

    var tables = info.getElementsByTagName("table");
    for (let i = 0; i < tables.length; i++) {
      tables[i].setAttribute("border", "1");
      tables[i].setAttribute("cellspacing", "2");
      tables[i].setAttribute("cellpadding", "5");

      removeLinksFromTable(tables[i]);
    }


    
}


async function loadLibrus(event) {
    console.log("test");
}

async function loadAbout(event) {
    console.log("abc");
}



async function getData() {
    return fetch(schoolURL).then((response)=>response.text()).then((responseText)=>{return responseText});
}