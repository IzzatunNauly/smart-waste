import { React, useState, useEffect } from "react";
import Sidebar from "../../Components/Sidebar";
import { Link } from "react-router-dom";
import axios from "axios";

const TrashFull = () => {

    const [trashFull, setTrashFull] = useState([]);

    const getTrashFull = async () => {
        try {
            const token = localStorage.getItem("token");
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const { data } = await axios.get(`${import.meta.env.VITE_LOCAL_URL}/trashfull`, config);
            // const { data } = await axios.get(`${LOCAL_URL}trashFull`, config);
            console.log(data.data);
            setTrashFull(data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getTrashFull();
    }, []);

  return (
    <Sidebar>
      <div className="page-heading">
        <h3>Data Trash Full</h3>
      </div>
      <div className="page-content">
        <div className="row">
          <div className="col-12">
            <div className="card p-2">
              <table className="table table-hover">
                <thead className="table-dark">
                  <tr>
                    <th scope="col">No</th>
                    <th scope="col">User</th>
                    <th scope="col">Category</th>
                    <th scope="col">Date</th>
                    <th scope="col">Total</th>
                  </tr>
                </thead>
                <tbody>
                    {trashFull.map((item, index) => (
                  <tr>
                    <th scope="row">{index+1}</th>
                    <td>{item.user.name}</td>
                    <td>{item.rubbish.category}</td>
                    <td>{item.date}</td>
                    <td>{item.total}</td>
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

export default TrashFull;
