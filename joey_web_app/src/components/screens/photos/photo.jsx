import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import Photo from './displayPhotos'
import { database, f, auth  } from '../../../config/config';

export  class PhotosScreen extends React.Component {
    state = {
        photos : [],
        mounted : false, 
        loggedIn : false,
        refresh : 'false'
    }
    componentDidMount (){
        this.getPhotos()
        this.signInCheck()
    }

    signInCheck = () => {
        var that = this;
        f.auth().onAuthStateChanged(function(user){
            if(user){
                // user is logged in 
                that.setState({ loggedIn : true })
            }else {
                 // not logged in 
                that.setState({  loggedIn : false  })
            }
        })

    }
    refresh = () =>{
        this.setState({ refresh: !this.state.refresh})
    }
    getPhotos = () =>{
        var that = this;
        database.ref('photos').once('value').then(function(snapshot) {
            const exists = (snapshot.val() !== null );
            if(exists){
                var photoData = snapshot.val()
                var temptPhotos = that.state.photos
                for(var photoKey in photoData){
                    var photo = photoData[photoKey]        
                    temptPhotos.push({
                            uri : photo,
                            photoId : photoKey // in data as thekey uniqueid 
                        })    
                } 
            }
            that.setState({mounted: true})
        }).catch(err => console.log(err))
    }
    listPhotos= () =>{
        if(this.state.mounted === true){
            return (
                    this.state.photos.map((item) => (
                    <Photo url = {item.uri}  key={item.photoId} photoId = {item.photoId}/>  
                    ))
            );
        }
    }
    render(){
        return (
            <React.Fragment >
                {this.state.mounted === true ?(
                    <section style = {styles.header}>
                        <h1 style= {styles.headerText}> Gallery  </h1>  
                        <div style = {{ display: 'flex', flexWrap:'wrap', flexDirection : 'row', alignItems:'center', justifyContent:'center' }}>
                            {this.listPhotos()}
                        </div>      
                </section>
                ):
                (
                    <p> Loading .... </p>
                )}
                
            </React.Fragment>
        );
        }
}
const styles = {
    headerText :{
        borderBottomColor : 'green',
        textAlign: 'center',
        color : 'red',
        borderBottom: '3px solid green',
        backgroundColor: 'black',
        fontSize : 30
    },
    photos :{
        display: "flex",
        flexDirection : 'row',
        flexWrap : 'wrap',
        overFlowY: 'scroll',
    }, 
    header : {
        backgroundColor: 'hsla(0, 0%, 10%,0.9)',
    }, 
    row : {
        display: "flex",
        flexWrap : 'wrap',
        flexDirection:'row'
    },
}
const settings = {
      dots: true,
      lazyLoad: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      initialSlide: 2
    };