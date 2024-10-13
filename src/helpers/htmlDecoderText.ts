export function decodeHTMLEntities(text: string) {
  const textArea = document.createElement("textarea");
  textArea.innerHTML = text;
  return textArea.value;
}
