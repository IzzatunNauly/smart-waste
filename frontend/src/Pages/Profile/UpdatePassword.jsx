import { React, useState, useEffect } from 'react';
import Sidebar from '../../Components/Sidebar';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const UpdatePassword = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [current_password, setCurrentPassword] = useState('');
  const [new_password, setNewPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        `${import.meta.env.VITE_LOCAL_URL}/settings/password/${id}`,
        {
          old_password: current_password,
          password: new_password,
          password_confirmation: confirm_password,
        },
        config
      );
      console.log(data);
      MySwal.fire({
        icon: 'success',
        title: 'Berhasil',
        text: 'Password berhasil diubah',
      });
      navigate(`/profile/${id}`);
    } catch (error) {
      console.log(error);
      MySwal.fire({
        icon: 'error',
        title: 'Gagal',
        text: 'Password gagal diubah',
      });
    }
  };

  return (
    <Sidebar>
      <div className="page-heading">
        <h3>Update Password</h3>
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
                    <label className="form-label">Current Password:</label>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="form-control"
                      value={current_password}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">New Password:</label>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="form-control"
                      value={new_password}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Confirm New Password:</label>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="form-control"
                      value={confirm_password}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3 form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="showPassword"
                      checked={showPassword}
                      onChange={togglePasswordVisibility}
                    />
                    <label className="form-check-label" htmlFor="showPassword">
                      Show Password
                    </label>
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
  );
};

export default UpdatePassword;
