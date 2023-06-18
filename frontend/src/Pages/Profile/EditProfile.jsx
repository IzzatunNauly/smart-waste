import { React, useState, useEffect } from "react";
import Sidebar from "../../Components/Sidebar";
import { Link,useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const EditProfile = () => {

  const navigate = useNavigate();

  const {id} = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [user, setUser] = useState({});

  const token = localStorage.getItem("token");

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        `${import.meta.env.VITE_LOCAL_URL}/settings/profile/${id}`,
        {
          name,
          email,
        },
        config
      );
        MySwal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Data berhasil diubah",
        });
        navigate(`/profile/${id}`);

    } catch (error) {
      console.log(error);
      MySwal.fire({
        icon: "error",
        title: "Gagal",
        text: "Data gagal diubah",
      });
    }
  }
    

    useEffect(() => {
        const getUser = async () => {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const { data } = await axios.get(`${HOST_URL}settings/profile/${id}`, config);
            setName(data.data.name);
            setEmail(data.data.email);
            
        }
        getUser();

    }, [])

  return (
    <Sidebar>
      <div className="page-heading">
        <h3>Edit Profile</h3>
        <Link to={`/profile/${id}`}>
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
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <button
                  onClick={handleEdit}
                    type="submit"
                    className="btn btn-primary"
                  >
                    Edit
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

export default EditProfile;
