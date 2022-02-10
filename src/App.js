import { useState,useEffect } from "react";
import { nanoid } from "nanoid";
import "./App.css";
import Form from "./Components/Form/Form";
import ContactsListItem from "./Components/ContactsListItem/ContactsListItem";
import FilterItems from "./Components/FilterItems/FilterItems";
const  App = () => {
  const [contacts,setContacts] = useState( ()=> {
    contacts = JSON.parse(localStorage.getItem('contacts'))
  if(localStorageData){
    setContacts({contacts: localStorageData})
  }})

  const [name,setName] = useState('')
  const [number,setNumber] = useState('')
  const [filter,setFilter] = useState('')
  // state = {
    // contacts: [
    //   { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
    //   { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
    //   { id: "id-3", name: "Eden Clements", number: "645-17-79" },
    //   { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    // ],
  //   name: "",
  //   number: "",
  //   filter: "",
  // };
  // componentDidMount(){
  //   const localStorageData = JSON.parse(localStorage.getItem('contacts'))
  // if(localStorageData){
  //   this.setState({contacts: localStorageData})
  // }
    
  useEffect (()=>{
    // if(prevState.contacts !== this.state.contacts){
      localStorage.setItem('contacts',JSON.stringify(contacts))
    // }
  },[contacts])
// componentDidUpdate(prevProps, prevState, snapshot){
//   if(prevState.contacts !== this.state.contacts){
//     localStorage.setItem('contacts',JSON.stringify(this.state.contacts))
//   }
// }

  const filter = (query) => {
    return contacts.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()) && item);
  };
  const removeName = (name) =>
   setName((prev) => ({
      contacts: prev.filter((el) => el.name !== name),
    }));

  const  onInputValue = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

   const addContact = (contact) => {
    this.setState((prev) => ({ contacts: [...prev.contacts, contact] }));
  };
  onBtnSubmit = (e) => {
    e.preventDefault();
    const newContact = {
      ...this.state,
      name: setName(name),
      id: nanoid(),
      number: setNumber(number),
    };
    const dublicate = contacts.some((el) => el.name.toLowerCase() === this.state.name.toLowerCase());
    if (!dublicate) {
      return addContact(newContact);
    } else {
      alert(`${name} alredy in contacts`);
    }
  };
    return (
      <>
        <h1>PhoneBook</h1>
        <Form onInputValue={onInputValue} onTelValue={onTelValue} onBtnSubmit={onBtnSubmit} />
        <h2>Contacts</h2>
        <FilterItems filter={filter} onInputValue={onInputValue} />
        <ul>
          <ContactsListItem filter={filter(filter)} removeName={removeName} />
        </ul>
      </>
    );

}

export default App;
