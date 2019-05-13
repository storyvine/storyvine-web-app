const print = (content: string | any) => {
  const w = window.open();
  if (!!w) {
    w.document.write(content);
    w.print();
  } else {
    console.warn('Unable to print in window! Falling back to console...');
    console.log(content);
  }
};

export default print;
