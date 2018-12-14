"use-strict";

class Query {
  constructor() {
    this.matches = [];
  }
  match(node) {
    this.matches.push(node);
  }
  build() {
    let res = "MERGE";
    res = res.concat(
      this.matches.map((node, i) => encapsulate(i, node)).join(",")
    );
    res = res.concat(" RETURN ");
    res = res.concat(
      this.matches
        .map((_, i) => {
          `(a${i})`;
        })
        .join(",")
    );
    return res;
  }
}

function encapsulate(nodeName, node) {
  return `(a${nodeName}:${node.label} {` + decapsulate(node.params) + `})`;
}

function decapsulate(params) {
  return decapsulateObject(params).join(",");
}

function decapsulateObject(obj) {
  return Object.entries(obj).map(([k, v]) => {
    return k.toString() + ":" + decapsulateRouter(v);
  });
}

function decapsulateRouter(obj) {
  switch (typeof obj) {
    case "number":
      return obj;
      break;
    case "string":
      return `'${obj}'`;
      break;
  }
}

function main() {
  const a = {
    name: "Gonzalo",
    age: 1234
  };
  console.log(Object.entries(a));
  console.log(decapsulate(a));
}

function main2() {
  const a = {
    name: "Gonzalo",
    emptyArr: [],
    arr: [1,2,3],
    arrstr: ["hi", "hello", "hola", "chao"]
  };
  console.log(Object.entries(a));
  console.log(decapsulate(a));
}

main();
console.log("--------");
main2();

module.exports = Query;
