import { React, useState, useEffect } from "react";
import Sidebar from "../../Components/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const Dashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [weight, setWeight] = useState([]);
  const [rubbish_unfull, setRubbishUnfull] = useState([]);
  const [rubbish_full, setRubbishFull] = useState([]);

  const getData = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      // const { data } = await axios.get(`${import.meta.env.VITE_HOST_URL}/percentage/rubbish`, config);
      const { data } = await axios.get(
        `${import.meta.env.VITE_LOCAL_URL}/percentage/rubbish`,
        config
      );
      console.log(data.data);
      setData(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const belumPenuh = (e, rubbish_id) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
            const response = axios
              .post(
                `${import.meta.env.VITE_LOCAL_URL}/trash/`,
                {
                  rubbish_id: rubbish_id,
                  weight: weight,
                },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              )
              .then((res) => {
                console.log(res);
                console.log(res.data);
              });
            console.log(response);
            MySwal.fire({
              icon: "success",
              title: "Berhasil",
              text: "Berhasil Menambahkan Sampah",
            });
    } catch (error) {
      console.log(error);
      MySwal.fire({
        icon: "error",
        title: "Gagal",
        text: "Gagal Mengosongkan Sampah",
      });
    }
  };

  
  const penuh = (rubbish_id) => {
    try {
      const token = localStorage.getItem("token");
      console.log(rubbish_id);
      const response = axios
        .delete(`${import.meta.env.VITE_LOCAL_URL}/trash/${rubbish_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        console.log(response);
        MySwal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Berhasil Mengososngkan Sampah",
        });
    } catch (error) {
      console.log(error);
      MySwal.fire({
        icon: "error",
        title: "Gagal",
        text: "Gagal Mengosongkan Sampah",
      });
    }
  };

  // session cek
  useEffect(() => {
    const session = JSON.parse(localStorage.getItem("session"));

    if (session) {
      if (session.expiry > Date.now()) {
        localStorage.removeItem("session");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
      } else {
        navigate("/dashboard");
      }
    }
    getData();
  }, []);

  return (
    <Sidebar>
      <div>
        <div className="page-heading">
          <h3>Monitoring</h3>
        </div>
        <div className="page-content">
          <section className="row">
            <div className="col-12 col-lg">
              <div className="row">
                {data.map((item) => (
                  <div className="col-6 col-lg-6 col-md-6">
                    <div className="card">
                      <div className="card-body text-center px-3 py-4-5">
                        <h3>{item.category}</h3>
                        {item.status == "Belum Penuh" ? (
                          <div key={item.rubbish_id}>
                            <div
                              data-bs-toggle="modal"
                              data-bs-target={`#exampleModal_${item.rubbish_id}`}
                            >
                              <svg
                                width="150px"
                                height="150px"
                                viewBox="0 0 32 32"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink"
                              >
                                <defs>
                                  <clipPath id="clip-trash2">
                                    <rect width="32" height="32" />
                                  </clipPath>
                                </defs>
                                <g id="trash2" clip-path="url(#clip-trash2)">
                                  <g
                                    id="Group_1971"
                                    data-name="Group 1971"
                                    transform="translate(-312 -416)"
                                  >
                                    <g id="Group_1931" data-name="Group 1931">
                                      <g id="Group_1930" data-name="Group 1930">
                                        <g
                                          id="Group_1929"
                                          data-name="Group 1929"
                                        >
                                          <g
                                            id="Group_1928"
                                            data-name="Group 1928"
                                          >
                                            <g
                                              id="Group_1927"
                                              data-name="Group 1927"
                                            >
                                              <g
                                                id="Group_1926"
                                                data-name="Group 1926"
                                              >
                                                <g
                                                  id="Group_1925"
                                                  data-name="Group 1925"
                                                >
                                                  <g
                                                    id="Group_1924"
                                                    data-name="Group 1924"
                                                  >
                                                    <g
                                                      id="Group_1923"
                                                      data-name="Group 1923"
                                                    >
                                                      <g
                                                        id="Group_1922"
                                                        data-name="Group 1922"
                                                      >
                                                        <g
                                                          id="Group_1921"
                                                          data-name="Group 1921"
                                                        >
                                                          <g
                                                            id="Group_1920"
                                                            data-name="Group 1920"
                                                          >
                                                            <g
                                                              id="Group_1919"
                                                              data-name="Group 1919"
                                                            >
                                                              <path
                                                                id="Path_3760"
                                                                data-name="Path 3760"
                                                                d="M337.395,419.855h-3.479v-.8a1.412,1.412,0,0,0-1.41-1.41h-9.012a1.412,1.412,0,0,0-1.41,1.41v.8H318.6a2.857,2.857,0,0,0-2.854,2.854v1.707a2,2,0,0,0,2,2v15.938a4,4,0,0,0,4,4h12.5a4,4,0,0,0,4-4V426.416a2,2,0,0,0,2-2v-1.707A2.857,2.857,0,0,0,337.395,419.855Zm-14.311-.8a.41.41,0,0,1,.41-.41h9.012a.41.41,0,0,1,.41.41v.8h-9.832Zm13.166,23.3a2.006,2.006,0,0,1-2,2h-12.5a2.006,2.006,0,0,1-2-2V426.416h16.5Zm2-18.791v.853h-20.5v-1.707a.853.853,0,0,1,.854-.854h18.791a.853.853,0,0,1,.855.854Z"
                                                                fill="#50C878"
                                                              />
                                                            </g>
                                                          </g>
                                                        </g>
                                                      </g>
                                                    </g>
                                                  </g>
                                                </g>
                                              </g>
                                            </g>
                                          </g>
                                        </g>
                                      </g>
                                    </g>
                                    <g id="Group_1944" data-name="Group 1944">
                                      <g id="Group_1943" data-name="Group 1943">
                                        <g
                                          id="Group_1942"
                                          data-name="Group 1942"
                                        >
                                          <g
                                            id="Group_1941"
                                            data-name="Group 1941"
                                          >
                                            <g
                                              id="Group_1940"
                                              data-name="Group 1940"
                                            >
                                              <g
                                                id="Group_1939"
                                                data-name="Group 1939"
                                              >
                                                <g
                                                  id="Group_1938"
                                                  data-name="Group 1938"
                                                >
                                                  <g
                                                    id="Group_1937"
                                                    data-name="Group 1937"
                                                  >
                                                    <g
                                                      id="Group_1936"
                                                      data-name="Group 1936"
                                                    >
                                                      <g
                                                        id="Group_1935"
                                                        data-name="Group 1935"
                                                      >
                                                        <g
                                                          id="Group_1934"
                                                          data-name="Group 1934"
                                                        >
                                                          <g
                                                            id="Group_1933"
                                                            data-name="Group 1933"
                                                          >
                                                            <g
                                                              id="Group_1932"
                                                              data-name="Group 1932"
                                                            >
                                                              <path
                                                                id="Path_3761"
                                                                data-name="Path 3761"
                                                                d="M323.336,435.59a4.432,4.432,0,0,1,4.432-4.379h.413v-.622l1.1,1.1-1.1,1.1v-.714h-.413a3.58,3.58,0,0,0-3.576,3.575c0,.016,0,.031,0,.046l.831.109c0-.052-.007-.1-.007-.155a2.745,2.745,0,0,1,2.335-2.714v.85a.414.414,0,0,0,.706.292l2.093-2.094a.413.413,0,0,0,0-.584l-2.093-2.1a.413.413,0,0,0-.706.292v.814a5.263,5.263,0,0,0-4.847,5.239,5.1,5.1,0,0,0,.038.609A.825.825,0,0,1,323.336,435.59Z"
                                                                fill="#50C878"
                                                              />
                                                            </g>
                                                          </g>
                                                        </g>
                                                      </g>
                                                    </g>
                                                  </g>
                                                </g>
                                              </g>
                                            </g>
                                          </g>
                                        </g>
                                      </g>
                                    </g>
                                    <g id="Group_1957" data-name="Group 1957">
                                      <g id="Group_1956" data-name="Group 1956">
                                        <g
                                          id="Group_1955"
                                          data-name="Group 1955"
                                        >
                                          <g
                                            id="Group_1954"
                                            data-name="Group 1954"
                                          >
                                            <g
                                              id="Group_1953"
                                              data-name="Group 1953"
                                            >
                                              <g
                                                id="Group_1952"
                                                data-name="Group 1952"
                                              >
                                                <g
                                                  id="Group_1951"
                                                  data-name="Group 1951"
                                                >
                                                  <g
                                                    id="Group_1950"
                                                    data-name="Group 1950"
                                                  >
                                                    <g
                                                      id="Group_1949"
                                                      data-name="Group 1949"
                                                    >
                                                      <g
                                                        id="Group_1948"
                                                        data-name="Group 1948"
                                                      >
                                                        <g
                                                          id="Group_1947"
                                                          data-name="Group 1947"
                                                        >
                                                          <g
                                                            id="Group_1946"
                                                            data-name="Group 1946"
                                                          >
                                                            <g
                                                              id="Group_1945"
                                                              data-name="Group 1945"
                                                            >
                                                              <path
                                                                id="Path_3762"
                                                                data-name="Path 3762"
                                                                d="M330.707,437.713l.2-.362a3.576,3.576,0,0,0-.962-4.553l-.6.6a2.742,2.742,0,0,1,1,3.182l-.746-.409a.413.413,0,0,0-.457.04.389.389,0,0,0-.1.123.41.41,0,0,0-.035.315l.83,2.842a.412.412,0,0,0,.512.282l2.843-.829a.413.413,0,0,0,.294-.352.408.408,0,0,0-.211-.406l-.714-.392a5.26,5.26,0,0,0-2.026-6.625.82.82,0,0,1,.01,1.014,4.433,4.433,0,0,1,1.112,5.586l-.2.362.545.3-1.489.434-.435-1.489.447.245Z"
                                                                fill="#50C878"
                                                              />
                                                            </g>
                                                          </g>
                                                        </g>
                                                      </g>
                                                    </g>
                                                  </g>
                                                </g>
                                              </g>
                                            </g>
                                          </g>
                                        </g>
                                      </g>
                                    </g>
                                    <g id="Group_1970" data-name="Group 1970">
                                      <g id="Group_1969" data-name="Group 1969">
                                        <g
                                          id="Group_1968"
                                          data-name="Group 1968"
                                        >
                                          <g
                                            id="Group_1967"
                                            data-name="Group 1967"
                                          >
                                            <g
                                              id="Group_1966"
                                              data-name="Group 1966"
                                            >
                                              <g
                                                id="Group_1965"
                                                data-name="Group 1965"
                                              >
                                                <g
                                                  id="Group_1964"
                                                  data-name="Group 1964"
                                                >
                                                  <g
                                                    id="Group_1963"
                                                    data-name="Group 1963"
                                                  >
                                                    <g
                                                      id="Group_1962"
                                                      data-name="Group 1962"
                                                    >
                                                      <g
                                                        id="Group_1961"
                                                        data-name="Group 1961"
                                                      >
                                                        <g
                                                          id="Group_1960"
                                                          data-name="Group 1960"
                                                        >
                                                          <g
                                                            id="Group_1959"
                                                            data-name="Group 1959"
                                                          >
                                                            <g
                                                              id="Group_1958"
                                                              data-name="Group 1958"
                                                            >
                                                              <path
                                                                id="Path_3763"
                                                                data-name="Path 3763"
                                                                d="M330.235,440.2a.823.823,0,0,1-.729-.463,4.43,4.43,0,0,1-5.254-1.371l-.252-.327-.493.379.2-1.539,1.538.2-.4.311-.161.124.252.327a3.577,3.577,0,0,0,4.308,1.074l-.234-.8a2.748,2.748,0,0,1-3.141-.47l.673-.518a.413.413,0,0,0,.147-.435.426.426,0,0,0-.071-.145.413.413,0,0,0-.274-.157l-2.937-.383a.414.414,0,0,0-.463.356l-.383,2.937a.413.413,0,0,0,.661.381l.645-.5a5.264,5.264,0,0,0,6.627.975l-.025.008A.829.829,0,0,1,330.235,440.2Z"
                                                                fill="#50C878"
                                                              />
                                                            </g>
                                                          </g>
                                                        </g>
                                                      </g>
                                                    </g>
                                                  </g>
                                                </g>
                                              </g>
                                            </g>
                                          </g>
                                        </g>
                                      </g>
                                    </g>
                                  </g>
                                </g>
                              </svg>
                            </div>
                            <div
                              className="modal fade"
                              id={`exampleModal_${item.rubbish_id}`}
                              tabIndex={-1}
                              aria-labelledby="exampleModalLabel"
                              aria-hidden="true"
                            >
                              <div className="modal-dialog">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5
                                      className="modal-title"
                                      id="exampleModalLabel"
                                    >
                                      Input Weight
                                    </h5>
                                    <button
                                      type="button"
                                      className="btn-close"
                                      data-bs-dismiss="modal"
                                      aria-label="Close"
                                    />
                                  </div>
                                  <div className="modal-body">
                                    <div className="mb-3">
                                      <label
                                        htmlFor="exampleFormControlInput1"
                                        className="form-label"
                                      >
                                        Input Weight
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        id="exampleFormControlInput1"
                                        placeholder="weight"
                                        value={weight}
                                        onChange={(e) =>
                                          setWeight(e.target.value)
                                        }
                                      />
                                    </div>
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="btn btn-secondary"
                                      data-bs-dismiss="modal"
                                    >
                                      Batal
                                    </button>
                                    <button
                                      type="button"
                                      className="btn btn-primary"
                                      onClick={(e) =>
                                        belumPenuh(e, item.rubbish_id)
                                      }
                                      data-bs-dismiss="modal"
                                    >
                                      Submit
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div key={item.rubbish_id}>
                            <div
                              data-bs-toggle="modal"
                              data-bs-target={`#modal2_${item.rubbish_id}`}
                            >
                              <svg
                                width="150px"
                                height="150px"
                                viewBox="0 0 32 32"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink"
                              >
                                <defs>
                                  <clipPath id="clip-trash2">
                                    <rect width="32" height="32" />
                                  </clipPath>
                                </defs>
                                <g id="trash2" clip-path="url(#clip-trash2)">
                                  <g
                                    id="Group_1971"
                                    data-name="Group 1971"
                                    transform="translate(-312 -416)"
                                  >
                                    <g id="Group_1931" data-name="Group 1931">
                                      <g id="Group_1930" data-name="Group 1930">
                                        <g
                                          id="Group_1929"
                                          data-name="Group 1929"
                                        >
                                          <g
                                            id="Group_1928"
                                            data-name="Group 1928"
                                          >
                                            <g
                                              id="Group_1927"
                                              data-name="Group 1927"
                                            >
                                              <g
                                                id="Group_1926"
                                                data-name="Group 1926"
                                              >
                                                <g
                                                  id="Group_1925"
                                                  data-name="Group 1925"
                                                >
                                                  <g
                                                    id="Group_1924"
                                                    data-name="Group 1924"
                                                  >
                                                    <g
                                                      id="Group_1923"
                                                      data-name="Group 1923"
                                                    >
                                                      <g
                                                        id="Group_1922"
                                                        data-name="Group 1922"
                                                      >
                                                        <g
                                                          id="Group_1921"
                                                          data-name="Group 1921"
                                                        >
                                                          <g
                                                            id="Group_1920"
                                                            data-name="Group 1920"
                                                          >
                                                            <g
                                                              id="Group_1919"
                                                              data-name="Group 1919"
                                                            >
                                                              <path
                                                                id="Path_3760"
                                                                data-name="Path 3760"
                                                                d="M337.395,419.855h-3.479v-.8a1.412,1.412,0,0,0-1.41-1.41h-9.012a1.412,1.412,0,0,0-1.41,1.41v.8H318.6a2.857,2.857,0,0,0-2.854,2.854v1.707a2,2,0,0,0,2,2v15.938a4,4,0,0,0,4,4h12.5a4,4,0,0,0,4-4V426.416a2,2,0,0,0,2-2v-1.707A2.857,2.857,0,0,0,337.395,419.855Zm-14.311-.8a.41.41,0,0,1,.41-.41h9.012a.41.41,0,0,1,.41.41v.8h-9.832Zm13.166,23.3a2.006,2.006,0,0,1-2,2h-12.5a2.006,2.006,0,0,1-2-2V426.416h16.5Zm2-18.791v.853h-20.5v-1.707a.853.853,0,0,1,.854-.854h18.791a.853.853,0,0,1,.855.854Z"
                                                                fill="#FF0000"
                                                              />
                                                            </g>
                                                          </g>
                                                        </g>
                                                      </g>
                                                    </g>
                                                  </g>
                                                </g>
                                              </g>
                                            </g>
                                          </g>
                                        </g>
                                      </g>
                                    </g>
                                    <g id="Group_1944" data-name="Group 1944">
                                      <g id="Group_1943" data-name="Group 1943">
                                        <g
                                          id="Group_1942"
                                          data-name="Group 1942"
                                        >
                                          <g
                                            id="Group_1941"
                                            data-name="Group 1941"
                                          >
                                            <g
                                              id="Group_1940"
                                              data-name="Group 1940"
                                            >
                                              <g
                                                id="Group_1939"
                                                data-name="Group 1939"
                                              >
                                                <g
                                                  id="Group_1938"
                                                  data-name="Group 1938"
                                                >
                                                  <g
                                                    id="Group_1937"
                                                    data-name="Group 1937"
                                                  >
                                                    <g
                                                      id="Group_1936"
                                                      data-name="Group 1936"
                                                    >
                                                      <g
                                                        id="Group_1935"
                                                        data-name="Group 1935"
                                                      >
                                                        <g
                                                          id="Group_1934"
                                                          data-name="Group 1934"
                                                        >
                                                          <g
                                                            id="Group_1933"
                                                            data-name="Group 1933"
                                                          >
                                                            <g
                                                              id="Group_1932"
                                                              data-name="Group 1932"
                                                            >
                                                              <path
                                                                id="Path_3761"
                                                                data-name="Path 3761"
                                                                d="M323.336,435.59a4.432,4.432,0,0,1,4.432-4.379h.413v-.622l1.1,1.1-1.1,1.1v-.714h-.413a3.58,3.58,0,0,0-3.576,3.575c0,.016,0,.031,0,.046l.831.109c0-.052-.007-.1-.007-.155a2.745,2.745,0,0,1,2.335-2.714v.85a.414.414,0,0,0,.706.292l2.093-2.094a.413.413,0,0,0,0-.584l-2.093-2.1a.413.413,0,0,0-.706.292v.814a5.263,5.263,0,0,0-4.847,5.239,5.1,5.1,0,0,0,.038.609A.825.825,0,0,1,323.336,435.59Z"
                                                                fill="#FF0000"
                                                              />
                                                            </g>
                                                          </g>
                                                        </g>
                                                      </g>
                                                    </g>
                                                  </g>
                                                </g>
                                              </g>
                                            </g>
                                          </g>
                                        </g>
                                      </g>
                                    </g>
                                    <g id="Group_1957" data-name="Group 1957">
                                      <g id="Group_1956" data-name="Group 1956">
                                        <g
                                          id="Group_1955"
                                          data-name="Group 1955"
                                        >
                                          <g
                                            id="Group_1954"
                                            data-name="Group 1954"
                                          >
                                            <g
                                              id="Group_1953"
                                              data-name="Group 1953"
                                            >
                                              <g
                                                id="Group_1952"
                                                data-name="Group 1952"
                                              >
                                                <g
                                                  id="Group_1951"
                                                  data-name="Group 1951"
                                                >
                                                  <g
                                                    id="Group_1950"
                                                    data-name="Group 1950"
                                                  >
                                                    <g
                                                      id="Group_1949"
                                                      data-name="Group 1949"
                                                    >
                                                      <g
                                                        id="Group_1948"
                                                        data-name="Group 1948"
                                                      >
                                                        <g
                                                          id="Group_1947"
                                                          data-name="Group 1947"
                                                        >
                                                          <g
                                                            id="Group_1946"
                                                            data-name="Group 1946"
                                                          >
                                                            <g
                                                              id="Group_1945"
                                                              data-name="Group 1945"
                                                            >
                                                              <path
                                                                id="Path_3762"
                                                                data-name="Path 3762"
                                                                d="M330.707,437.713l.2-.362a3.576,3.576,0,0,0-.962-4.553l-.6.6a2.742,2.742,0,0,1,1,3.182l-.746-.409a.413.413,0,0,0-.457.04.389.389,0,0,0-.1.123.41.41,0,0,0-.035.315l.83,2.842a.412.412,0,0,0,.512.282l2.843-.829a.413.413,0,0,0,.294-.352.408.408,0,0,0-.211-.406l-.714-.392a5.26,5.26,0,0,0-2.026-6.625.82.82,0,0,1,.01,1.014,4.433,4.433,0,0,1,1.112,5.586l-.2.362.545.3-1.489.434-.435-1.489.447.245Z"
                                                                fill="#FF0000"
                                                              />
                                                            </g>
                                                          </g>
                                                        </g>
                                                      </g>
                                                    </g>
                                                  </g>
                                                </g>
                                              </g>
                                            </g>
                                          </g>
                                        </g>
                                      </g>
                                    </g>
                                    <g id="Group_1970" data-name="Group 1970">
                                      <g id="Group_1969" data-name="Group 1969">
                                        <g
                                          id="Group_1968"
                                          data-name="Group 1968"
                                        >
                                          <g
                                            id="Group_1967"
                                            data-name="Group 1967"
                                          >
                                            <g
                                              id="Group_1966"
                                              data-name="Group 1966"
                                            >
                                              <g
                                                id="Group_1965"
                                                data-name="Group 1965"
                                              >
                                                <g
                                                  id="Group_1964"
                                                  data-name="Group 1964"
                                                >
                                                  <g
                                                    id="Group_1963"
                                                    data-name="Group 1963"
                                                  >
                                                    <g
                                                      id="Group_1962"
                                                      data-name="Group 1962"
                                                    >
                                                      <g
                                                        id="Group_1961"
                                                        data-name="Group 1961"
                                                      >
                                                        <g
                                                          id="Group_1960"
                                                          data-name="Group 1960"
                                                        >
                                                          <g
                                                            id="Group_1959"
                                                            data-name="Group 1959"
                                                          >
                                                            <g
                                                              id="Group_1958"
                                                              data-name="Group 1958"
                                                            >
                                                              <path
                                                                id="Path_3763"
                                                                data-name="Path 3763"
                                                                d="M330.235,440.2a.823.823,0,0,1-.729-.463,4.43,4.43,0,0,1-5.254-1.371l-.252-.327-.493.379.2-1.539,1.538.2-.4.311-.161.124.252.327a3.577,3.577,0,0,0,4.308,1.074l-.234-.8a2.748,2.748,0,0,1-3.141-.47l.673-.518a.413.413,0,0,0,.147-.435.426.426,0,0,0-.071-.145.413.413,0,0,0-.274-.157l-2.937-.383a.414.414,0,0,0-.463.356l-.383,2.937a.413.413,0,0,0,.661.381l.645-.5a5.264,5.264,0,0,0,6.627.975l-.025.008A.829.829,0,0,1,330.235,440.2Z"
                                                                fill="#FF0000"
                                                              />
                                                            </g>
                                                          </g>
                                                        </g>
                                                      </g>
                                                    </g>
                                                  </g>
                                                </g>
                                              </g>
                                            </g>
                                          </g>
                                        </g>
                                      </g>
                                    </g>
                                  </g>
                                </g>
                              </svg>
                            </div>
                            <div
                              className="modal fade"
                              id={`modal2_${item.rubbish_id}`}
                              tabIndex={-1}
                              aria-labelledby="modal2Label"
                              aria-hidden="true"
                            >
                              <div className="modal-dialog">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5
                                      className="modal-title"
                                      id="modal2Label"
                                    >
                                      Peringatan!
                                    </h5>
                                    <button
                                      type="button"
                                      className="btn-close"
                                      data-bs-dismiss="modal"
                                      aria-label="Close"
                                    />
                                  </div>
                                  <div className="modal-body">
                                    Anda Yakin Ingin Mengosongkan Tempat Sampah?
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="btn btn-secondary"
                                      data-bs-dismiss="modal"
                                    >
                                      Tidak Yakin
                                    </button>
                                    <button
                                      type="button"
                                      className="btn btn-primary"
                                      onClick={() => {penuh(item.rubbish_id)}}
                                      data-bs-dismiss="modal"
                                    >
                                      Yakin
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        <h5 className="font-semibold text-secondary mt-3">
                          {item.percent.toFixed(1)}%
                        </h5>
                        <p className="font-semibold text-secondary mt-3">
                          Weight {item.weight.toFixed(1)} KG | Max Weight {item.max_weight.toFixed(1)} KG
                        </p>
                        {item.status == "Belum Penuh" ? (
                          <h5 className="font-semibold text-success">
                            Status : {item.status}
                          </h5>
                        ) : (
                          <h5 className="font-semibold text-danger">
                            Status : {item.status}
                          </h5>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </Sidebar>
  );
};

export default Dashboard;
