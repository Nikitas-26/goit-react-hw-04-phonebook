import { useState,useEffect } from "react";
import { nanoid } from "nanoid";
import "./App.css";
import Form from "./Components/Form/Form";
import ContactsListItem from "./Components/ContactsListItem/ContactsListItem";
import FilterItems from "./Components/FilterItems/FilterItems";
const  App = () => {
  const [contacts,setContacts] = useState( ()=> {
 const  localStorageData = JSON.parse(localStorage.getItem('contacts'))
  if(localStorageData){
  return localStorageData
  }else{
    return [];
  }
})
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

  const filterItems = (query) => {
    console.log(contacts);
    return contacts.filter(item =>  item.name.toLowerCase().includes(query.toLowerCase()) && item);
    
  };
  const removeName = (name) =>
   setContacts(contacts.filter(el => el.name.toLowerCase() !== name.toLowerCase() )
   );

  const  onInputValue = (e) => {
    const { name, value } = e.target;
    // this.setState({ [name]: value });
    switch (name){
      case 'name' :
      setName(value)
      break;
      case 'number' :
        setNumber(value)
        break;
        case 'filter' :
          setFilter(value)
        break;
        default :
        return;
    }

  };

   const addContact = (contact) => {
    setContacts((prev) => ([...prev, contact]));
  };
const  onBtnSubmit = (e) => {
    e.preventDefault();
    const newContact = {
     name,
      id: nanoid(),
      number,
    };
    const dublicate = contacts.some((el) => el.name.toLowerCase() === name.toLowerCase());
    if (!dublicate) {
      return addContact(newContact);
    } else {
      alert(`${name} alredy in contacts`);
    }
  };
    return (
      <>
        <h1>PhoneBook</h1>
        <Form onInputValue={onInputValue} onBtnSubmit={onBtnSubmit} />
        <h2>Contacts</h2>
        <FilterItems filter={filter} onInputValue={onInputValue} />
        <ul>
          <ContactsListItem filter={filterItems(filter)} removeName={removeName} />
        </ul>
      </>
    );

}

export default App;
