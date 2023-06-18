import {React, useState, useEffect} from 'react'
import Sidebar from '../../Components/Sidebar'
import { Link } from 'react-router-dom'
import axios from 'axios'

const UpdatePassword = () => {

    // const HOST_URL = 'http://192.168.137.250:8000/api/';
    const LOCAL_URL = 'http://localhost:8000/api/';

    const user = JSON.parse(localStorage.getItem("user"));
    const {id} = user.id

    const [new_password, setNewPassword] = useState("")
    const [confirm_password, setConfirmPassword] = useState("")

    const onSubmit = async (e) => {
        e.preventDefault()
        if(new_password !== confirm_password){
            alert("Password tidak sama")
        }else{
            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${user.token}`
                }
            }
            // const {data} = await axios.put(`${LOCAL_URL}settings/password/${id}`, {new_password}, config)
            const {data} = await axios.put(`${LOCAL_URL}settings/password/${id}`, {new_password}, config)
            console.log(data)
        }
    }

    useEffect(() => {
        const session = JSON.parse(localStorage.getItem('session'));

        if (session) {
            if (session.expiry > Date.now()) {
                localStorage.removeItem('session');
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                navigate('/');
            } else {
                navigate('/update-password');
            }
        }
    }, [])

  return (
    <Sidebar>
        <div className="page-heading">
            <h3>Update Password</h3>
            <Link to="/profile">
                <button className="btn btn-primary">Kembali</button>
            </Link>
        </div>
        <div className="page-content">
            <div className="row">
                <div className="col-12">
                    <div className="card p-2">
                    <div className="m-4">
                <form>
                  <div className="mb-3">
                    <label className="form-label">New Password:</label>
                    <input type="password" 
                    className="form-control" 
                    value={new_password} 
                    onChange={(e) => setNewPassword(e.target.value)}
                    required/>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Confirm New Password:</label>
                    <input type="password" 
                    className="form-control"
                    value={confirm_password}
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                    required/>
                  </div>
                    <button onClick={onSubmit} type="submit" className="btn btn-primary">
                        Edit Password
                    </button>
                </form>
              </div>
                    </div>
                </div>
            </div>
        </div>
    </Sidebar>
  )
}

export default UpdatePassword