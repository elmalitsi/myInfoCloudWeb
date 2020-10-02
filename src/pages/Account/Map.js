import React from 'react'
import PropTypes from 'prop-types'
import GoogleMapReact from 'google-map-react'
import RoomIcon from '@material-ui/icons/Room';
import CircularProgress from '@material-ui/core/CircularProgress';

const Marker = props => {
  return <RoomIcon style={{ color: 'red' , fontSize: 40 }}/>
}

function Map(props) {
  console.log(props)
  if (props.location){
    const defaultProps = {
        center: {
          lat: Number(props.location[0]),
          lng: Number(props.location[1])
        },
        zoom: 20
      };
        return (

          <div style={{ height: '400px', width: '400px' }}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: 'add-google-key-here' }}
              defaultCenter={defaultProps.center}
              defaultZoom={defaultProps.zoom}
            >
              <Marker  lat={props.location[0]} lng={props.location[1]}/>
            </GoogleMapReact>
          </div>
        );
  }else{
    return <CircularProgress disableShrink />
  }
}
  



Map.propTypes = {

}

export default Map

