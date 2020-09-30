module.exports = {
  toTree(data){
    var tree = [];
    data.forEach(item =>{
      if(item.parentId == '0'){
        item.children = getNode(item.id);
        item.extend = false;
        tree.push(item);
      }
    }) 
    function getNode(id){
      const node = [];
      for(const item of data){
        if(item.parentId === id){
          item.extend = false;
          item.children = getNode(item.id);
          node.push(item);
        }  
      }
      if(node.length === 0){ return;}
      return node
    } 
    return tree;   
  }
}