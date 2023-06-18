import { React, useState, useEffect } from "react";
import Sidebar from "../../Components/Sidebar";
import axios from "axios";

const Trash = () => {


  const HOST_URL = 'http://192.168.137.250:8000/api/';
  const LOCAL_URL = 'http://localhost:8000/api/';

    const [trash, setTrash] = useState([]);

    const getTrash = async () => {
        try {
            const token = localStorage.getItem("token");
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const { data } = await axios.get(`${LOCAL_URL}trash`, config);
            // const { data } = await axios.get(`${LOCAL_URL}trash`, config);
            setTrash(data.data);
            
        } catch (error) {
            console.log(error);
        }

    };

  
    useEffect(() => {
        getTrash();
    }, []);

  return (
    <Sidebar>
      <div className="page-heading">
        <h3>Data Trash</h3>
      </div>
      <div className="page-content">
        <div className="row">
          <div className="col-12">
            <div className="card p-2">
              <table className="table table-hover">
                <thead className="table-dark">
                  <tr>
                    <th scope="col">No</th>
                    <th scope="col">Category</th>
                    <th scope="col">Date</th>
                    <th scope="col">Weight</th>
                  </tr>
                </thead>
                <tbody>
                    {trash.map((item, index) => (
                  <tr>
                    <th scope="row">{index+1}</th>
                    <td>{item.rubbish.category}</td>
                    <td>{item.date}</td>
                    <td>{item.weight}</td>
                  </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Sidebar>
  );
};

export default Trash;
