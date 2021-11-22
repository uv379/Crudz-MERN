import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  // For (Post-Method) add(input) items and submitt
  const [item, setItem] = useState({
    title: "",
    description: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setItem((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
    // console.log(item);
  }

  function addItem(event) {
    event.preventDefault();
    const newItem = {
      title: item.title,
      description: item.description,
    };

    axios.post("/newitem", newItem);
    console.log(newItem);
    alert("item added");

    setItem({
      title: "",
      description: "",
    });
  }
  // End (Post-Method) add input

  // For (get-method) Getting data and show display
  const [items, setItems] = useState([
    {
      title: "",
      description: "",
      _id: "", //// for map keys error
    },
  ]);

  useEffect(() => {
    fetch("/items")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((jsonRes) => setItems(jsonRes))
      .catch((err) => console.log(err));
  }, [items]);

  // end (get-Method) 

  // start delete method
  function deleteItem(id) {
    axios.delete("/delete/" + id);
    alert("item deleted");
    console.log(`Deleted item with id ${id}`);
  }
  // end delete methodh

// start Put Or Update methodh
  const [isPut, setIsPut] = useState(false);
  const [updatedItem, setUpdatedItem] = useState({
    title: "",
    description: "",
    id: "",
  });

  function openUpdate(id) {
    setIsPut(true);
    setUpdatedItem((prevInput) => {
      return {
        ...prevInput,
        id: id,
      };
    });
  }

  function updateItem(id) {
    axios.put("/put/" + id, updatedItem);
    alert("item updated");
    console.log(`item with id ${id} updated`);
  }

  function handleUpdate(event) {
    const { name, value } = event.target;
    setUpdatedItem((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
    console.log(updatedItem);
  }

  // update method end
  return (
    <div className="App">
      {!isPut ? (
        <div className="main">
          <input
            onChange={handleChange}
            name="title"
            value={item.title}
            placeholder="title"
          ></input>
          <input
            onChange={handleChange}
            name="description"
            value={item.description}
            placeholder="description"
          ></input>
          <button onClick={addItem}>ADD ITEM</button>
        </div>
      ) : (
        <div className="main">
          <input
            onChange={handleUpdate}
            name="title"
            value={updatedItem.title}
            placeholder="title"
          ></input>
          <input
            onChange={handleUpdate}
            name="description"
            value={updatedItem.description}
            placeholder="description"
          ></input>
          <button onClick={() => updateItem(updatedItem.id)}>
            UPDATE ITEM
          </button>
        </div>
      )}
      {/* for mapping */}
      {items.map((item) => {
        return (
          <div
            key={item._id}
            style={{ background: "pink", width: "40%", margin: "auto auto" }}
          >
            <p>{item.title}</p>
            <p>{item.description}</p>
            <button onClick={() => deleteItem(item._id)}>DELETE</button>
            <button onClick={() => openUpdate(item._id)}>UPDATE</button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
