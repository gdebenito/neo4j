how to use:

```shell
npm i neo4j-driver
```

```javascript
const { Relationship, Node } = require("neo4j-driver/lib/v1/graph-types.js");
const Query = require('./Query');

const a = new Node("a", ["File"], { name: "myfile" });
const b = new Node("b", ["User"], { name: "gonzalo" });
const r = new Relationship("r", "a", "b", "HAS_FILE",{});
let   q = new Query();
let stmt = q.match(a).match(b).match(r).return("b").build();
console.log(stmt)
// MATCH (a:File {name:"myfile"}),(b:User {name:"gonzalo"}),(a)-[:HAS_FILE]->(b) RETURN b
```