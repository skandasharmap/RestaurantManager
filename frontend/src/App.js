import './App.css';
import { useState } from 'react';
import RestaurantTable from './RestaurantTable';
function App(){
const [userName, setUserName] = useState();

//Provide the background image details ..
const myStyle={
backgroundImage: 'url(H1.jpeg)',
backgroundSize : 'cover',
height : '150vh'
}
return(
<div style={myStyle}>
<RestaurantTable />
</div>
);
}
export default App;