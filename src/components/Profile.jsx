import api from '../service/api';
import {useState} from 'react'; 
import '../App.css';

const Profile = () => {  
    const [name, setName] = useState("");
    const [avatar, setAvatar] = useState("");
    const [location, setLocation] = useState("");
      
    api.get('/users/sandrotoline').then((resp) => {
      setName(resp.data.name);
      setAvatar(resp.data.avatar_url);
      setLocation(resp.data.location);
    });
    

    return (
            <div className="profile">
                <div className="profile-content">
                    <div className="avatar" style={{ backgroundImage: `url(${avatar})` }}></div>
                    <div className="profile-info">
                        <h2>{name}</h2>
                        <p>{location}</p>
                    </div>
              </div>
            </div>
    )
} 
export default Profile;