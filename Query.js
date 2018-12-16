'use-strict'
const { Relationship, Node } = require("neo4j-driver/lib/v1/graph-types.js");

class Query {
  constructor() {
    //statements
    this.matches = [];
    this.sets = [];
    this.creates = [];
    this.merges = [];
    this.returns = [];
    this.limitnum;
    this.offsetnum;
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

  limit(lim) {
    if(typeof lim == 'number')
      this.limitnum = lim
    return this;
  }

  offset(off) {
    if(typeof off == 'number')
      this.offsetnum= off
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

    if(this.offsetnum != undefined){
      stmt = stmt.concat(" SKIP ").concat(this.offsetnum.toString());
    }
    
    if(this.limitnum != undefined){
      stmt = stmt.concat(" LIMIT ").concat(this.limitnum.toString());
    }


    return stmt;
  }
}

module.exports = Query;
