const dropArea = document.querySelector(".drop-area");
const dragText = document.querySelector("h2");
const button = dropArea.querySelector("button");
const input = dropArea.querySelector("#input-file");
let files;

button.addEventListener("click", (e) => {
  input.click();
});

input.addEventListener("change", (e) => {
  files = input.files;
  dropArea.classList.add("active");
  showFiles(files);
  dropArea.classList.remove("active");
});

dropArea.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropArea.classList.add("active");
  dragText.textContent = "Suelta para cargar los archivos";
});
/* el over es cuando estamos arrastrando elementos   */
dropArea.addEventListener("dragleave", (e) => {
  e.preventDefault();
  dropArea.classList.remove("active");
  dragText.textContent = "arrastra y suelta imagenes";
});
/* el over es cuando estamos arrastrando elementos pero no estemos dentro de la zona  */
dropArea.addEventListener("drop", (e) => {
  e.preventDefault();
  files = e.dataTransfer.files;
  showFiles(files);
  dropArea.classList.remove("active");
  dragText.textContent = "arrastra y suelta imagenes";
});
//cuando soltamos los archivos arrastrados

function showFiles(files) {
  if (files.length == undefined) {
    processFile(files);
  } else {
    for (const file of files) {
      processFile(file);
    }
  }
}

function processFile(file) {
  const docType = file.type;
  const validExtensions = ["image/jpeg", "image/jpg", "image/png", "image/gif"];

  if (validExtensions.includes(docType)) {
    //archivo valido
    const fileReader = new FileReader();
    const id = `file-${Math.random().toString(32).substring(7)}`;

    fileReader.addEventListener("load", (e) => {
      const fileUrl = fileReader.result;
      const image = `
        <div id = "${id}" class = "file-container">
            <img src = "${fileUrl}" alt = "${file.name}" width = "50">
             <div class = "status">
                <span>${file.name}</span>
                <span class = "status-text">
                    Loading...
                </span>
             </div>
         </div>
            `;
      const html = document.querySelector(".preview").innerHTML;
      document.querySelector(".preview").innerHTML = image + html;
    });
    
    fileReader.readAsDataURL(file);
    uploadFile(file, id);
    console.log(file)
  } else {
    alert("NO ES UN ARCHIVO VALIDO");
  }
}

const COUDDINARY = "http://res.cloudinary.com/dj5saeeus",
PRESET = "charlotte";
async function uploadFile(file, id) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", PRESET);
    try {
        const response = await fetch(COUDDINARY,{
            method: "POST",
            body: formData,
        })

        const responseText = await response.json();
        console.log(responseText)
        document.querySelector(`#${id} .status-text`).innerHTML = `<span class = "success">Archivo subido correctamente...</span>`
    } catch (error) {
        document.querySelector(`#${id} .status-text`).innerHTML = `<span class = "failure">Archivo subido incorrectamente...</span>`
    }
}

