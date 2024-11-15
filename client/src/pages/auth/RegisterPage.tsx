import { useState } from 'react';
import { Button, Flex, Modal } from 'antd';
import { FieldValues, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import toastMessage from '../../lib/toastMessage';
import { useRegisterMutation } from '../../redux/features/authApi';
import { useAppDispatch } from '../../redux/hooks';
import { loginUser } from '../../redux/services/authSlice';
import decodeToken from '../../utils/decodeToken';
import { toast } from 'sonner';
import { FacebookOutlined, TwitterOutlined, InstagramOutlined, LinkedinOutlined } from '@ant-design/icons';

const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [userRegistration] = useRegisterMutation();
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    if (!termsAccepted) {
      toastMessage({ icon: 'error', text: 'You must accept the Terms and Conditions to register.' });
      return;
    }

    const toastId = toast.loading('Registering new account!');
    try {
      if (data.password !== data.confirmPassword) {
        toastMessage({ icon: 'error', text: 'Password and confirm password must be the same!' });
        return;
      }
      const res = await userRegistration(data).unwrap();
      if (res.statusCode === 201) {
        const user = decodeToken(res.data.token);
        dispatch(loginUser({ token: res.data.token, user }));
        navigate('/');
        toast.success(res.message, { id: toastId });
      }
    } catch (error: any) {
      toastMessage({ icon: 'error', text: error.data.message });
    }
  };

  const showTermsModal = () => {
    setIsModalVisible(true);
  };

  const handleAcceptTerms = () => {
    setTermsAccepted(true);
    setIsModalVisible(false);
  };

  const handleDeclineTerms = () => {
    setTermsAccepted(false);
    setIsModalVisible(false);
  };

  return (
    <>
      {/* Header Section */}
      <header style={{ backgroundColor: '#164863', color: '#fff', padding: '1rem 2rem' }}>
        <h1 style={{ margin: 0, fontWeight: 'bold', textAlign: 'center' }}>StockEase 📦</h1>
      </header>

      {/* Hero Section */}
      <Flex
        justify="center"
        align="center"
        style={{ height: '80vh', backgroundColor: '#e8f1f5', padding: '2rem' }}
      >
        <Flex
          vertical
          style={{
            width: '400px',
            padding: '3rem',
            border: '1px solid #164863',
            borderRadius: '.6rem',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#fff',
          }}
        >
          <h2 style={{ marginBottom: '1.5rem', textAlign: 'center', color: '#164863' }}>
            Register for StockEase
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              {...register('name', { required: true })}
              placeholder="Your Name*"
              className={`input-field ${errors['name'] ? 'input-field-error' : ''}`}
              style={{
                width: '100%',
                padding: '0.8rem',
                margin: '0.5rem 0',
                borderRadius: '5px',
                border: '1px solid #ccc',
              }}
            />
            <input
              type="text"
              {...register('email', { required: true })}
              placeholder="Your Email*"
              className={`input-field ${errors['email'] ? 'input-field-error' : ''}`}
              style={{
                width: '100%',
                padding: '0.8rem',
                margin: '0.5rem 0',
                borderRadius: '5px',
                border: '1px solid #ccc',
              }}
            />
            <input
              type="password"
              {...register('password', { required: true })}
              placeholder="Your Password*"
              className={`input-field ${errors['password'] ? 'input-field-error' : ''}`}
              style={{
                width: '100%',
                padding: '0.8rem',
                margin: '0.5rem 0',
                borderRadius: '5px',
                border: '1px solid #ccc',
              }}
            />
            <input
              type="password"
              {...register('confirmPassword', { required: true })}
              placeholder="Confirm Password*"
              className={`input-field ${errors['confirmPassword'] ? 'input-field-error' : ''}`}
              style={{
                width: '100%',
                padding: '0.8rem',
                margin: '0.5rem 0',
                borderRadius: '5px',
                border: '1px solid #ccc',
              }}
            />
            <div style={{  textAlign:"center" }}>
              <Button type="link" onClick={showTermsModal} style={{ padding: 0 }}>
                View Terms and Conditions
              </Button>
            </div>
            <Flex justify="center">
              <Button
                htmlType="submit"
                type="primary"
                style={{
                  textTransform: 'uppercase',
                  fontWeight: 'bold',
                  marginTop: '1rem',
                  backgroundColor: '#164863',
                  color: '#fff',
                }}
              >
                Register
              </Button>
            </Flex>
          </form>
          <p style={{ marginTop: '1rem', textAlign: 'center' }}>
            Already have an account? <Link to="/login">Login Here</Link>
          </p>
        </Flex>
      </Flex>

      {/* Terms and Conditions Modal */}
      <Modal
        title="Terms and Conditions"
        visible={isModalVisible}
        onOk={handleAcceptTerms}
        onCancel={handleDeclineTerms}
        okText="Accept"
        cancelText="Decline"
      >
       <div >
  
  <p>By registering and using the StockEase Store Management System, you agree to the following terms and conditions:</p>

  <ol>
    <li>
      <strong>Account Responsibility:</strong>
      You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
    </li>
    <li>
      <strong>Data Accuracy:</strong>
      You agree to provide accurate, complete, and up-to-date information when using the application. Any false or misleading information provided may result in account suspension or termination.
    </li>
    <li>
      <strong>Usage Restrictions:</strong>
      You shall not misuse the application by introducing viruses, malware, or any harmful code. You also agree not to use the system for unauthorized or illegal purposes.
    </li>
    <li>
      <strong>Data Privacy:</strong>
      We prioritize your privacy and ensure that your data is handled securely and in accordance with our Privacy Policy. We do not share your data with third parties without your consent unless required by law.
    </li>
    <li>
      <strong>Intellectual Property:</strong>
      All content, features, and functionalities of the application, including but not limited to software, design, and graphics, are owned by StockEase and are protected by copyright and trademark laws.
    </li>
   
   
    
  </ol>
</div>

      </Modal>

      {/* Footer Section */}
      <footer
        style={{
          backgroundColor: '#164863',
          color: '#fff',
          padding: '1rem 2rem',
          textAlign: 'center',
        }}
      >
        <p>Connect with us:</p>
        <div>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#fff', margin: '0 0.5rem' }}
          >
            <FacebookOutlined />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#fff', margin: '0 0.5rem' }}
          >
            <TwitterOutlined />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#fff', margin: '0 0.5rem' }}
          >
            <InstagramOutlined />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#fff', margin: '0 0.5rem' }}
          >
            <LinkedinOutlined />
          </a>
        </div>
        <p style={{ marginTop: '0.5rem' }}>© 2024 StockEase. All rights reserved.</p>
      </footer>
    </>
  );
};

export default RegisterPage;
