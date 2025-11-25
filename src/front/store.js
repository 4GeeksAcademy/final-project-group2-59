export const initialStore = () => {
  return {
    message: null,
    pet: null,
    user: null,
    token: localStorage.getItem("token") || null,
    favorites: [],
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "set_hello":
      return {
        ...store,
        message: action.payload,
      };

    case "add_task":
      const { id, color } = action.payload;

      return {
        ...store,
        todos: store.todos.map((todo) =>
          todo.id === id ? { ...todo, background: color } : todo
        ),
      };

    case "SET_PET":
      return {
        ...store,
        pet: action.payload,
      };

    case "SET_TOKEN":
      return {
        ...store,
        token: action.payload,
      };

    case "LOGOUT":
      localStorage.removeItem("token");
      return {
        ...store,
        user: null,
        token: null,
        favorites: [],
        isAuthenticated: false,
      };

    case "SET_USER":
      return {
        ...store,
        user: action.payload,
      };

    case "SET_FAVORITES":
      return {
        ...store,
        favorites: action.payload,
      };

    case "ADD_FAVORITE":
      return {
        ...store,
        favorites: [...store.favorites, action.payload],
      };

    case "REMOVE_FAVORITE":
      return {
        ...store,
        favorites: store.favorites.filter((id) => id !== action.payload),
      };

    default:
      throw Error("Unknown action.");
  }
}
