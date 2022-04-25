import React, { useContext } from 'react'
// import { Col, Form, Row } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext'

export const UserProfileScreen = () => {

  const { user } = useContext(AuthContext);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <h1 className="animate__animated animate__fadeInDown">Perfil de Usuario</h1>
            <hr />
            {
              (!user)
                ?
                ("Loading")
                :
                (
                  <>
                    <h2>{user.displayName}</h2>
                    <h3>{user.email}</h3>
                  </>
                )
            }
          </div>

          {/* SKILLS */}
          <div className="col">
            {/* {JSON.stringify(user, null, 3)} */}
          </div>
        </div>
      </div>
    </>
  )
}
