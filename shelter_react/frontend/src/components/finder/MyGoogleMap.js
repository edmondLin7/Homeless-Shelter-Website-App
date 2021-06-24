// MyGoogleMaps.js
import React, { Component, useEffect, useState } from 'react';
import Axios from "axios";
import  { Redirect } from 'react-router-dom'

import GoogleMapReact from 'google-map-react';

import styled from 'styled-components';

import AutoComplete from './Autocomplete';
import Marker from './Marker';
import Marker2 from './Marker2';

// import ShelterAPI from './ShelterAPI';



const Wrapper = styled.main`
  width: 80%;
  height: 80%;
`;

class MyGoogleMap extends Component {
    state = {
        mapApiLoaded: false,
        mapInstance: null,
        mapApi: null,
        geoCoder: null,
        places: [],
        center: [],
        zoom: 12,
        address: '',
        draggable: true,
        lat: null,
        lng: null,
        shelters: [],
    };

    componentWillMount() {
        this.setCurrentLocation();
    }
    


    onMarkerInteraction = (childKey, childProps, mouse) => {
        this.setState({
            draggable: false,
            // lat: mouse.lat,
            // lng: mouse.lng
        });
        window.location.href = "https://www.google.com/maps/search/?api=1&query="+mouse.lat+","+mouse.lng
    }
    onMarkerInteractionMouseUp = (childKey, childProps, mouse) => {
        this.setState({ draggable: false });
        this._generateAddress();
    }

    _onChange = ({ center, zoom }) => {
        this.setState({
            center: center,
            zoom: zoom,
        });

    }

    _onClick = (value) => {
        // this.setState({
        //     lat: value.lat,
        //     lng: value.lngd
        // });
    }
    _onChildClick = (childKey, childProps, mouse) => {
        this.setState({
            draggable: false,
            // lat: mouse.lat,
            // lng: mouse.lng
        });
        // window.location.href = "https://www.google.com/maps/search/?api=1&query="+mouse.lat+","+mouse.lng
        // this.setState({
        //     lat: value.lat,
        //     lng: value.lng
        // });
    }
    

    apiHasLoaded = (map, maps) => {
        this.setState({
            mapApiLoaded: true,
            mapInstance: map,
            mapApi: maps,
        });

        this._generateAddress();
    };

    addPlace = (place) => {
        this.setState({
            places: [place],
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
        });
        this._generateAddress()
    };

    _generateAddress() {
        const {
            mapApi
        } = this.state;

        const geocoder = new mapApi.Geocoder();

        geocoder.geocode({ 'location': { lat: this.state.lat, lng: this.state.lng } }, (results, status) => {
            console.log(results);
            console.log(status);
            if (status === 'OK') {
                if (results[0]) {
                    this.zoom = 12;
                    this.setState({ address: results[0].formatted_address });
                } else {
                    window.alert('No results found');
                }
            } else {
                window.alert('Geocoder failed due to: ' + status);
            }

        });
    }

    // Get Current Location Coordinates
    setCurrentLocation() {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.setState({
                    center: [position.coords.latitude, position.coords.longitude],
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
            });
        }
    }
    componentDidMount() {
        fetch("http://localhost:5000/api/shelters")
          .then(res => res.json())
          .then(result => {
            this.setState({
              shelters: result
            });
          });
      }


    render() {
        const {
            places, mapApiLoaded, mapInstance, mapApi,shelters,
        } = this.state;

        return (
            <Wrapper>
                {mapApiLoaded && (
                    <div>
                        <AutoComplete map={mapInstance} mapApi={mapApi} addplace={this.addPlace} />
                    </div>
                )}
                
                <GoogleMapReact
                    center={this.state.center}
                    zoom={this.state.zoom}
                    draggable={this.state.draggable}
                    onChange={this._onChange}
                    onChildMouseDown={this.onMarkerInteraction}
                    onChildMouseUp={this.onMarkerInteractionMouseUp}
                    onChildMouseMove={this.onMarkerInteraction}
                    onChildClick={this._onChildClick}
                    onClick={this._onClick}
                    bootstrapURLKeys={{
                        key: 'AIzaSyC4QzJoyABoeaVC-H90GIk5BBVBC9wI9zI',
                        libraries: ['places', 'geometry'],
                    }}
                    yesIWantToUseGoogleMapApiInternals
                    onGoogleApiLoaded={({ map, maps }) => this.apiHasLoaded(map, maps)}
                >
                    <Marker
                        href={this.state.address}
                        text={this.state.address}
                        lat={this.state.lat}
                        lng={this.state.lng}
                    />
                    
                   {shelters.map(shelter =>
                //    <a href="http://localhost:5000/api/shelters">
                   <Marker2
                   text={shelter.address}
                   lat={shelter.latitude}
                   lng={shelter.longitude}
                  />
                //   </a>
                 )}
                 
                    
                    
                    
                    


                </GoogleMapReact>

                <div className="info-wrapper">
                    <div className="map-details">Latitude: <span>{this.state.lat}</span>, Longitude: <span>{this.state.lng}</span></div>
                    <div className="map-details">Zoom: <span>{this.state.zoom}</span></div>
                    <div className="map-details">Address: <span>{this.state.address}</span></div>
                </div>


            </Wrapper >
        );
    }
}

export default MyGoogleMap;