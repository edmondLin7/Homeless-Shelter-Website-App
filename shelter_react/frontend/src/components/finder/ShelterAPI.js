import React, { Component } from 'react';
import ReactDOM from "react-dom";
import Marker from './Marker';



const shelterAPI = "http://localhost:5000/api/shelters";

class ShelterAPI extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shelters: [],
        };
      }
      componentDidMount() {
        fetch(shelterAPI)
          .then(res => res.json())
          .then(result => {
            this.setState({
              shelters: result
            });
          });
      }
    render() {
        const { shelters } = this.state;
         return (
             <div>
                   
                 {shelters.map(shelter =>
                 
                 <Marker
                 text={shelter.address}
                 lat={shelter.latitude}
                 lng={shelter.longitude}
                />
                
               )}
               </div>
         );
                 
     }
 }
 export default ShelterAPI;
 ReactDOM.render(<ShelterAPI />, document.getElementById("root"));