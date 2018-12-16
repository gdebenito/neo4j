const {Relationship, Node} = require('neo4j-driver/lib/v1/graph-types.js');

const n = new Node("a",["File"],{
    name: "gonzalo"
});

console.log(n.toString());

const r = new Relationship("b","c",["d","g"],"HIDDEN",{obj: "ges"});
console.log(typeof r);
console.log(r.toString());