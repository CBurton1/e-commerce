export function createTree(categories: any): any {
  const shopCategoryId = categories.find((category: ECS.Category) => category.title === "Shop").id;
  const resultTree: any = [];

  categories.forEach((category: any) => {
    // create new root parent category if category does not have any parent
    if (category.parentId === shopCategoryId) {
      category.route = `shop/${category.label.toLowerCase()}`;
      resultTree.push(category);
    }
    // else search for existing parent and attach child to it
    else {
      search_and_attach_child(resultTree, categories);
    }
  });

  return resultTree;
}

export function search_and_attach_child(tree: any, categories: ECS.Category[]): any {
  if (!tree) {
    return;
  }

  tree.forEach((parentCategory: any) => {
    const category: any = categories.find((category: ECS.Category) => category.parentId === parentCategory.id);

    if (category) {
      category.route = `${parentCategory.route.toLowerCase()}/${category.label.toLowerCase()}`;
      parentCategory.children ? parentCategory.children.push(category) : parentCategory.children = [category];
    } else {
      search_and_attach_child(parentCategory.children, categories);
    }
  });
}
