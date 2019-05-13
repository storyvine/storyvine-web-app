const downloadLocal = (content: string | any, name = "untitled") => {
  const element = document.createElement("a");
  const codesString = encodeURI(content);
  element.setAttribute("href", `data:text/plain;charset=utf-8,${codesString}`);
  element.setAttribute("download", name);
  element.style.display = "none";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

export default downloadLocal;
