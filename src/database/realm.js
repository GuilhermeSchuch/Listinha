import Realm from "realm";
import { ListSchema } from "./schemas/ListSchema";

export const getRealm = async () => await Realm.open({
  path: "listinhaDb",
  schema: [ ListSchema ],
})