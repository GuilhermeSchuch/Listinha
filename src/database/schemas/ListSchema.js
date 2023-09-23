export const ListSchema = {
  name: "List",
  properties: {
    _id: "string",
    name: "string",
    items: "array",
    created_at: "date",
  },
  primaryKey: "_id",
}