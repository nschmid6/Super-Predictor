import axios from 'axios';
let config = require('../config');

class ForecastService{

    sendData(data) {
        axios.post(config.backendURL + '/rides/add/post',{
                name:data.name,
                banner:data.banner,
                phone:data.phone,
                email: data.email,
                pickup: data.pickup,
                dropoff: data.dropoff,
                received: data.received,
        })
        .then(res => this.setState({rides: res.data}))
        //     .then(res=> this.setState({id:res.data._id}))
        .catch(err => console.log(err))
    }

    updateData(data, id){
        axios.post(config.backendURL + '/rides/update/'+id, {
            name:data.name,
            banner:data.banner,
            phone:data.phone,
            email: data.email,
            pickup: data.pickup,
            dropoff: data.dropoff,
            dispatched: data.dispatched
        })
        .then(res => this.setState({ rides:res.data}))
        .catch(err => console.log(err))
    }
	
	deleteData(id){
	    axios.get(config.backendURL + '/rides/delete/'+id)
	    .then().catch(err => console.log(err))
	  }

    getCount(){
        axios.get(config.backendURL + '/rides/count')
            .then(res => this.setState({count:res.data}))
            .catch(err => console.log(err))
    }
}

export default ForecastService;
