import { Button, Flex } from 'antd';
import { FieldValues, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import toastMessage from '../../lib/toastMessage';
import { useLoginMutation } from '../../redux/features/authApi';
import { useAppDispatch } from '../../redux/hooks';
import { loginUser } from '../../redux/services/authSlice';
import decodeToken from '../../utils/decodeToken';
import { FacebookOutlined, TwitterOutlined, InstagramOutlined, LinkedinOutlined } from '@ant-design/icons';

const LoginPage = () => {
  const [userLogin] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: 'demo@gmail.com',
      password: 'demo@369',
    },
  });

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading('Logging...');
    try {
      const res = await userLogin(data).unwrap();
      if (res.statusCode === 200) {
        const user = decodeToken(res.data.token);
        dispatch(loginUser({ token: res.data.token, user }));
        navigate('/');
        toast.success('Successfully Logged In!', { id: toastId });
      }
    } catch (error: any) {
      toastMessage({ icon: 'error', text: error.data.message });
    }
  };

  return (
    <>
      {/* Header Section */}
      <header style={{ backgroundColor: '#164863', color: '#fff', padding: '1rem 2rem' }}>
        <h1 style={{ margin: 0, fontWeight: 'bold',textAlign:"center" }}>StockEase 📦</h1>
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
            Login to StockEase
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
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
              placeholder="Your Password*"
              {...register('password', { required: true })}
              className={`input-field ${errors['password'] ? 'input-field-error' : ''}`}
              style={{
                width: '100%',
                padding: '0.8rem',
                margin: '0.5rem 0',
                borderRadius: '5px',
                border: '1px solid #ccc',
              }}
            />
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
                Login
              </Button>
            </Flex>
          </form>
          <p style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            Don't have an account? <Link to="/register">Register Now</Link>
          </p>
        </Flex>
      </Flex>

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

export default LoginPage;
