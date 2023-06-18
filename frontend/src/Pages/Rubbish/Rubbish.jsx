import { React, useState, useEffect } from "react";
import Sidebar from "../../Components/Sidebar";
import { Link } from "react-router-dom";
import axios from "axios";

const Rubbish = () => {

    const [rubbish, setRubbish] = useState([]);

    const getRubbish = async () => {
        try {
            const token = localStorage.getItem("token");
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const { data } = await axios.get(`${import.meta.env.VITE_LOCAL_URL}/rubbish`, config);
            console.log(data.data);
            setRubbish(data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getRubbish();
    }, []);

  return (
    <Sidebar>
      <div className="page-heading">
        <h3>Data Rubbish</h3>
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
                    <th scope="col">Max Weight</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                    {rubbish.map((item, index) => (
                  <tr>
                    <th scope="row">{index+1}</th>
                    <td>{item.category}</td>
                    <td>{item.max_weight} KG</td>
                    <td>
                      <Link to={`/update-rubbish/${item.id}`}>
                        <button className="btn btn-warning">Edit</button>
                      </Link>
                    </td>
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

export default Rubbish;

