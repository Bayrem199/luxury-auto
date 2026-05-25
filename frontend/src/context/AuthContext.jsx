import React, {
  createContext,
  useContext,
  useState,
  useEffect
} from 'react';

import axios from 'axios';

const AuthContext = createContext(null);

/* =========================
   API URL
========================= */

const API =
  process.env.NODE_ENV === 'production'
    ? 'https://luxury-auto-backend.onrender.com'
    : 'http://localhost:5000';

/* =========================
   AXIOS CONFIG
========================= */

axios.defaults.baseURL = API;

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  const [token, setToken] = useState(
    localStorage.getItem('luxury_token')
  );

  const [loading, setLoading] = useState(true);

  /* =========================
     CHECK AUTH
  ========================= */

  useEffect(() => {

    if (token) {

      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${token}`;

      axios
        .get('/api/auth/me')

        .then((res) => {

          setUser(res.data);

        })

        .catch((err) => {

          console.error(err);

          logout();

        })

        .finally(() => {

          setLoading(false);

        });

    } else {

      setLoading(false);

    }

  }, [token]);

  /* =========================
     LOGIN
  ========================= */

  const login = async (email, password) => {

    try {

      const res = await axios.post(
        '/api/auth/login',
        {
          email,
          password
        }
      );

      const {
        token: newToken,
        user: userData
      } = res.data;

      localStorage.setItem(
        'luxury_token',
        newToken
      );

      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${newToken}`;

      setToken(newToken);

      setUser(userData);

      return userData;

    } catch (err) {

      console.error(
        'LOGIN ERROR:',
        err.response?.data || err.message
      );

      throw err;
    }
  };

  /* =========================
     REGISTER
  ========================= */

  const register = async (data) => {

    try {

      const res = await axios.post(
        '/api/auth/register',
        data
      );

      const {
        token: newToken,
        user: userData
      } = res.data;

      localStorage.setItem(
        'luxury_token',
        newToken
      );

      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${newToken}`;

      setToken(newToken);

      setUser(userData);

      return userData;

    } catch (err) {

      console.error(
        'REGISTER ERROR:',
        err.response?.data || err.message
      );

      throw err;
    }
  };

  /* =========================
     LOGOUT
  ========================= */

  const logout = () => {

    localStorage.removeItem(
      'luxury_token'
    );

    delete axios.defaults.headers.common[
      'Authorization'
    ];

    setToken(null);

    setUser(null);
  };

  return (

    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user
      }}
    >

      {children}

    </AuthContext.Provider>

  );
};

export const useAuth = () => {

  const ctx = useContext(AuthContext);

  if (!ctx) {

    throw new Error(
      'useAuth must be used within AuthProvider'
    );

  }

  return ctx;
};