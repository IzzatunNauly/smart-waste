import { React, useState, useEffect } from "react";
import Sidebar from "../../Components/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const CreateRubbish = () => {

  const navigate = useNavigate();
  const [category, setCategory] = useState("");
  const [maxWeight, setMaxWeight] = useState("");
  const [uniqId, setUniqId] = useState("");

  const generateRandomString = () => {
    const length = 10;
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }

    return result;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = axios.post(
        `${import.meta.env.VITE_LOCAL_URL}/rubbish`,
        {
          uniq_id: uniqId,
          category: category,
          max_weight: maxWeight,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      MySwal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Data berhasil ditambahkan",
      });
      navigate("/rubbish");

    } catch (error) {
      console.log(error);
      MySwal.fire({
        icon: "error",
        title: "Gagal",
        text: "Data gagal ditambahkan",
      });
    }
  };

  useEffect(() => {
    const session = JSON.parse(localStorage.getItem("session"));

    if (session) {
      if (session.expiry > Date.now()) {
        localStorage.removeItem("session");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
      } else {
        navigate("/rubbish/create");
      }
    }

    const randomString = generateRandomString();
    setUniqId(randomString);
  }, []);

  return (
    <Sidebar>
      <div className="page-heading">
        <h3>Tambah Data Rubbish</h3>
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
                    <label className="form-label">Uniq ID</label>
                    <input
                      type="text"
                      className="form-control"
                      value={uniqId}
                      onChange={(e) => setUniqId(e.target.value)}
                      readOnly
                    />
                  </div>
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
                    <label className="form-label">Max Weight</label>
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
                    Tambah
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Sidebar>
  );
};

export default CreateRubbish;
