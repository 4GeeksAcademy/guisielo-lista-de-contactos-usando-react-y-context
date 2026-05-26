// Import necessary hooks and functions from React.
import { useContext, useReducer, createContext, useEffect } from "react";
import storeReducer, { initialStore } from "../store"  // Import the reducer and the initial state.

// Create a context to hold the global state of the application
// We will call this global state the "store" to avoid confusion while using local states
const StoreContext = createContext()
const API_URL = "https://playground.4geeks.com/contact/agendas/guisielo/contacts"

// Define a provider component that encapsulates the store and warps it in a context provider to 
// broadcast the information throught all the app pages and components.
export function StoreProvider({ children }) {
    // Initialize reducer with the initial state.
    const [store, dispatch] = useReducer(storeReducer, initialStore())

    const getContacts = async () => {
        try {

            const response = await fetch(API_URL)

            const data = await response.json()

            dispatch({
                type: "set_contacts",
                payload: data.contacts
            })

        }   
        catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getContacts()
    }, [])

    // Provi       omponents.
    return (
        <StoreContext.Provider value={{ store, dispatch, getContacts}}>
            {children}
        </StoreContext.Provider>
    )}

// Custom hook to access the global state and dispatch function.
export default function useGlobalReducer() {
    const { dispatch, store } = useContext(StoreContext)
    return { dispatch, store };
}