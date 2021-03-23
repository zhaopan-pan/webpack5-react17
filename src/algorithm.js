function check(str) {
  if (!str || str.length === 1) return false;
  const strLength = str.length;
  const arr = [];
  for (let i = 0; i < strLength; i++) {
    const element = str[i];
    if (element === "(") {
      arr.push("(");
    } else if (element === "[") {
      arr.push("[");
    } else if (element === "{") {
      arr.push("{");
    } else if (
      (element === ")" && arr[arr.length - 1] === "(") ||
      (element === "]" && arr[arr.length - 1] === "[") ||
      (element === "}" && arr[arr.length - 1] === "{")
    ) {
      arr.pop();
    } else {
      arr.push(element);
    }
  }
  console.log(arr);
  return arr.length === 0;
}

console.log(check("([)]"));
