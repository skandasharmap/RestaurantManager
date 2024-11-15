import { useState, useEffect } from 'react';
import axios from 'axios';

//At the backend ...
//npm install cors.
/*
const cors = require ('cors') ;

var app = express () ;
app. use (cors () );
*/
const RestaurantTable = () => {
    const [restaurants, setRestaurants] = useState ( []) ;
    const [editRecord, setEditRecord] = useState (null);
    const [form, setForm] = useState({ id: 0, name: '', type:'',rating:0,top_food:'',location:''});
    
    //Fetch the data from API.
    useEffect (() => {
    fetchRestaurants ()
    }, []);
    
    //Gets the list of trainers from the backend (Express -- > Mongoose-- > MongoDB)
    const fetchRestaurants = async () => {
    try {
    const response = await
    axios.get("http://localhost:8003/getAllMenus");
    console.log(response.data) ;
    setRestaurants(response.data) ;
    } catch (error) {
        console.error ("Error fetching restaurants .. ", error) ;
    }
    }
//To handle delete operation.
const handleDelete = async (id) => {
await axios.delete ("http://localhost:8003/deleteRecord/" +id);

fetchRestaurants() ;
}
const handleChange = (e) => {
    setForm({ ... form, [e.target.name] : e.target.value } )
}

    //Setting the Edit record field ..
const handleEdit = (form) => {
    setForm(form) ;
    setEditRecord (true);
}
const handleSubmit = async (e) => {
    e.preventDefault () ;
    if (editRecord) {
        await axios.put ("http://localhost:8003/updateRestaurant/"+form.id,form) ;
    }
    else{
        await axios.post ("http://localhost:8003/insertData",form) ;
    }
    setForm({id: 0, name: '', type: '', rating: 0, top_food: '', location: ''});
    setEditRecord(false);
    fetchRestaurants();
}


    return(

        <div>

            <h1> Restaurants Lists</h1>
<           table border={1} cellPadding={10}>

                <thead>

                    <tr>

                        <th> ID </th>
                        <th> Name </th>
                        <th> Type </th>
                        <th> Rating </th>
                        <th> Top Food </th>
                        <th> Location</th>
                        <th> Action</th>

                    </tr>
                    </thead>

                    <tbody>
                        {restaurants.map ((restaurant) => (
                            <tr key={restaurant.id} >
                            <td>{restaurant.id}</td>
                            <td>{restaurant.name}</td>
                            <td>{restaurant. type}</td>
                            <td>{restaurant.rating}</td>
                            <td>{restaurant.top_food}</td>
                            <td>{restaurant.location}</td>
                            <td><button onClick={() =>handleEdit(restaurant)}>Edit</button> &nbsp;
                                <button onClick={() =>handleDelete(restaurant.id)}>Delete</button></td>
                        </tr>
                        ))}

                    </tbody>
                </table>
                <br/><br/>
                <h2>Form to Update or add record</h2>
            <form onSubmit={handleSubmit}>
                Id : <br/> <input name='id' value={ form.id}onChange={handleChange} /> 
                <br /><br />
                Name :<br/><input name='name' value={ form.name}onChange={handleChange} />
                <br /><br />
                Type : <br/><input name='type'value={ form. type} onChange={handleChange} />
                <br /><br />
                Rating :<br/> <input name='rating'value={ form. rating} onChange={handleChange} />
                <br /><br />
                Top_Food : <br/><input name='top_food'value={ form. top_food} onChange={handleChange} />
                <br /><br />
                Location : <br/><input name='location'value={ form. location} onChange={handleChange} /> 
                <br /><br />
                <button type='submit'>{editRecord ? 'Update' : 'Add'} Record </button>

            </form>


                </div>
    );
}

export default RestaurantTable;
    