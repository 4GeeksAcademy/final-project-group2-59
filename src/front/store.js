export const initialStore=()=>{
  return{
    message: null,
    pet: null,
    user: null,
    token: localStorage.getItem('token') || null,
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'set_hello':
      return {
        ...store,
        message: action.payload
      };
      
    case 'add_task':

      const { id,  color } = action.payload

      return {
        ...store,
        todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo))
      };

    case 'SET_PET':
      return {
        ...store,
        pet: action.payload
      };

      case 'SET_TOKEN':
        return {
          ...store,
          token: action.payload,
        }
      

    case 'LOGOUT':
      localStorage.removeItem('token');
      return {
        ...store,
        user: null,
        token: null,
        isAuthenticated: false
      };

    case 'SET_USER':
      return {
        ...store,
        user: action.payload
      };


    default:
      throw Error('Unknown action.');
      
  }    
}
