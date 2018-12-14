"use-strict";

class Node {
  constructor(label, properties) {
    this.label = label;
    this.properties = properties;
  }
  property(prop){
    return this.properties[prop];
  }
  properties(){
    return this.properties;
  }
  label(){
    return this.label;
  }
}

module.exports = Node;
