declare namespace ECS {
  interface Category {
    id: string;
    title: string;
    label: string;
    description?: string;
    parentId?: number | string;
    productStructureId: string;
  }
}