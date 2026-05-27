export const initialStore = () => ({
  contacts: []
});

export default function storeReducer(store, action) {
  switch (action.type) {

    case "GET_CONTACTS":
      return {
        ...store,
        contacts: action.payload
      };

    default:
      return store;
  }
}