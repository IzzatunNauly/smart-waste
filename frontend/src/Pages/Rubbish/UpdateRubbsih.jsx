import { React, useState, useEffect } from "react";
import Sidebar from "../../Components/Sidebar";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const UpdateRubbsih = () => {

    const navigate = useNavigate();
    const {id} = useParams();
    const [category, setCategory] = useState("");
    const [maxWeight, setMaxWeight] = useState("");

    const getRubbish = async () => {
        try {
            const token = localStorage.getItem("token");
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const { data } = await axios.get(`http://localhost:8000/api/rubbish/${id}`, config);
            console.log(data.data);
            setCategory(data.data.category);
            setMaxWeight(data.data.max_weight);
        } catch (error) {
            console.log(error);
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const data = {
                category: category,
                max_weight: maxWeight,
            };
            const response = axios
                .put(`http://localhost:8000/api/rubbish/${id}`, data, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((res) => {
                    MySwal.fire({
                        icon: "success",
                        title: "Success",
                        text: "Data berhasil diupdate",
                    }).then(() => {
                        navigate("/rubbish");
                    });
                })
                .catch((err) => {
                    console.log(err);
                });

        } catch (error) {
            console.log(error);
            MySwal.fire({
                icon: "error",
                title: "Gagal",
                text: "Data gagal ditambahkan",
              });
        }
    }

    useEffect(() => {
        const session = JSON.parse(localStorage.getItem("session"));
    
        if (session) {
          if (session.expiry > Date.now()) {
            localStorage.removeItem("session");
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            navigate("/");
          } else {
            navigate(`/update-rubbish/${id}`);
          }
        }
        getRubbish();   
      }, []);

  return (
    <Sidebar>
        <div className="page-heading">
        <h3>Update Data Rubbish</h3>
        <Link to="/rubbish">
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
                    <label className="form-label">Category</label>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option selected>Open this select menu</option>
                      <option value="organik">Organik</option>
                      <option value="unorganik">Anorganik</option>
                      <option value="unknown">Unknown</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Max Weight (KG)</label>
                    <input
                      type="text"
                      className="form-control"
                      value={maxWeight}
                      onChange={(e) => setMaxWeight(e.target.value)}
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleSubmit}
                  >
                    Update
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

export default UpdateRubbsih