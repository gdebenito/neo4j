'use-strict';
const { Relationship, Node } = require("neo4j-driver/lib/v1/graph-types.js");
const Query = require('./Query');

const a = new Node("a", ["File"], { name: "gon" });
const b = new Node("b", [], { name: "Bob Esponja" });
console.log(b.toString());

const c = new Node("", ["File"], { name: "gon" });
console.log(c.toString());

const d = new Node("", ["File"], {});
console.log(d.toString());

const f = new Relationship("i", "a", "b", "FRIEND", {});

const q = new Query();

let res = q
  .match(a)
  .match(b)
  .merge(f)
  .return("b")
  .limit(3)
  .offset(10)
  .build();
console.log(res);



const g = new Node("g", ["File"], {});

const q2 = new Query();

let res2 = q2
  .match(g)
  .return("g")
  .limit(3)
  .offset(10)
  .build();
console.log(res2);
