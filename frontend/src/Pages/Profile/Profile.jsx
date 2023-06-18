import { React, useState, useEffect } from "react";
import Sidebar from "../../Components/Sidebar";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Profile = () => {

  // const HOST_URL = 'http://192.168.137.250:8000/api/';
  const LOCAL_URL = 'http://localhost:8000/api/';

    const token = localStorage.getItem("token");
    const {id} = useParams();
    const [user, setUser] = useState({});

    useEffect(() => {
        const getUser = async () => {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const { data } = await axios.get(`${LOCAL_URL}settings/profile/${id}`, config);
            
            setUser(data.data);
        }
        getUser();
    }, [id]);



  return (
    <Sidebar>
      <div className="page-heading">
        <h3>Profile</h3>
      </div>
      <div className="page-content">
        <div className="row">
          <div className="col-12">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">Profile Information</h5>
                      <hr />
                      <div className="mb-3">
                        <label htmlFor="name" className="form-label">
                          Name:
                        </label>
                        <input
                          type="text"
                          id="name"
                          className="form-control"
                          value={user.name}
                          readOnly
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                          Email:
                        </label>
                        <input
                          type="email"
                          id="email"
                          className="form-control"
                          value={user.email}
                          readOnly
                        />
                      </div>
                      <div className="mb-3">
                        <Link to={`/profile/edit/${user.id}`}>
                            <button className="btn btn-primary">Edit Profile</button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
    </Sidebar>
  );
};

export default Profile;
