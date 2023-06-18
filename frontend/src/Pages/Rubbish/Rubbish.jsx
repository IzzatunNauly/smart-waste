import { React, useState, useEffect } from "react";
import Sidebar from "../../Components/Sidebar";
import { Link } from "react-router-dom";
import axios from "axios";

const Rubbish = () => {

  conLOCAL = 'http://192.168.137.250:8000/api/';
  const LOCAL_URL = 'http://localhost:8000/api/';

    const [rubbish, setRubbish] = useState([]);

    const getRubbish = async () => {
        try {
            const token = localStorage.getItem("token");
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const { data } = await axios.get(`${LOCAL_URL}rubbish`, config);
            // const { data } = await axios.get(`${LOCAL_URL}rubbish`, config);
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
        <Link to="/rubbish/create">
            <button className="btn btn-primary">Tambah Data</button>
        </Link>
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
                  </tr>
                </thead>
                <tbody>
                    {rubbish.map((item, index) => (
                  <tr>
                    <th scope="row">{index+1}</th>
                    <td>{item.category}</td>
                    <td>{item.max_weight}</td>
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

