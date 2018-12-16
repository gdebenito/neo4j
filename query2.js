const { Relationship, Node } = require("neo4j-driver/lib/v1/graph-types.js");

class Query {
  constructor() {
    //statements
    this.matches = [];
    this.sets = [];
    this.creates = [];
    this.merges = [];
    this.returns = [];
  }
  // MATCH node or relationship
  match(node) {
    this.matches.push(node);
    return this;
  }
  set(stmt) {
    this.sets.push(stmt);
    return this;
  }
  create(node) {
    this.creates.push(node);
    return this;
  }

  // Merge node or relationship
  merge(node) {
    this.merges.push(node);
    return this;
  }
  return(node) {
    this.returns.push(node);
    return this;
  }

  build() {
    let stmt  = "";
    if (this.matches.length > 0) {
      stmt = stmt.concat(" MATCH ").concat(
        this.matches
          .map(matcher => {
            return matcher.toString();
          })
          .join(",")
      );
    }

    if (this.sets.length > 0) {
      stmt = stmt.concat(" SET ").concat(
        this.sets
          .map(set => {
            return set.toString();
          })
          .join(",")
      );
    }

    if (this.creates.length > 0) {
      stmt = stmt.concat(" CREATE ").concat(
        this.creates
          .map(create => {
            return create.toString();
          })
          .join("\n")
      );
    }

    if (this.merges.length > 0) {
      stmt = stmt.concat(" MERGE ").concat(
        this.merges
          .map(merge => {
            return merge.toString();
          })
          .join("\n")
      );
    }

    if (this.returns.length > 0) {
      stmt = stmt.concat(" RETURN ").concat(
        this.returns
          .map(r => {
            return r.toString();
          })
          .join(",")
      );
    }
    return stmt;
  }
}

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
  .build();
console.log(res);
