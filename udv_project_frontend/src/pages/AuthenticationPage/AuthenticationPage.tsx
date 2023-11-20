import React, { useState } from 'react';
import { Button, Form, Modal, Image } from 'react-bootstrap';
import './CastomButtons.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/contextes/AuthContext/useAuth';

export const AuthenticationPage: React.FC = () => {


  const [userDetail, setUserDetail] = useState({ username: "", password: "" });
  const [validatedForm, setValidatedForm] = useState<boolean | undefined>(undefined);
  const navigate = useNavigate();
  const location = useLocation();
  const {signIn} = useAuth();

  const fromPage = location.state?.from?.pathname || '/';

  const onSubmitData = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("called", userDetail);
    setValidatedForm(true);
    if(event.currentTarget.checkValidity()){
      signIn(`${userDetail.username} ${userDetail.password}`, navigate("/hr"))
    }
  };

  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserDetail({ ...userDetail, [e.target.name]: e.target.value });
    // setValidatedForm(true);
  };

  return (
    <div>
      <div
        className="modal show"
        style={{ display: 'block', position: 'initial' }}>
        <Modal.Dialog >

          <Modal.Header className="border-bottom-0 p-0">
            <Modal.Title id="contained-modal-title-vcenter">
              <Image
                width={263}
                height={114}
                src="./src/assets/udv_logo.svg" />
            </Modal.Title>
          </Modal.Header>

          <Form method="post" noValidate validated={validatedForm} onSubmit={onSubmitData}>
            <Modal.Body className='p-4 pb-0'>
              <Form.Group className="mb-3" controlId="login">
                <Form.Label>Логин</Form.Label>
                <Form.Control value={userDetail.username}
                  type="email"
                  required
                  onChange={onValueChange}
                  name="username" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Пароль</Form.Label>
                <Form.Control value={userDetail.password}
                  type="password"
                  minLength={8}
                  maxLength={12}
                  required
                  name="password"
                  onChange={onValueChange} />
              </Form.Group>
            </Modal.Body>

            <Modal.Footer className="border-top-0 justify-content-start p-4">
              <Button type='submit' variant='bd-primary' size="lg">Войти</Button>
            </Modal.Footer>
          </Form>

        </Modal.Dialog>
      </div>
    </div>
  );
};
