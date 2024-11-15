import {Button, Col, Flex, Row} from 'antd';
import {FieldValues, useForm} from 'react-hook-form';
import CustomInput from '../components/CustomInput';
import toastMessage from '../lib/toastMessage';
import {useGetAllBrandsQuery} from '../redux/features/management/brandApi';
import {useGetAllCategoriesQuery} from '../redux/features/management/categoryApi';
import {useCreateNewProductMutation} from '../redux/features/management/productApi';
import {useGetAllSellerQuery} from '../redux/features/management/sellerApi';
import {ICategory} from '../types/product.types';
import CreateSeller from '../components/product/CreateSeller';
import CreateCategory from '../components/product/CreateCategory';
import CreateBrand from '../components/product/CreateBrand';

const CreateProduct = () => {
  const [createNewProduct] = useCreateNewProductMutation();
  const {data: categories} = useGetAllCategoriesQuery(undefined);
  const {data: sellers} = useGetAllSellerQuery(undefined);
  const {data: brands} = useGetAllBrandsQuery(undefined);

  const {
    handleSubmit,
    register,
    formState: {errors},
    reset,
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    const payload = {...data};
    payload.price = Number(data.price);
    payload.stock = Number(data.stock);

    if (payload.size === '') {
      delete payload.size;
    }

    try {
      const res = await createNewProduct(payload).unwrap();
      if (res.statusCode === 201) {
        toastMessage({icon: 'success', text: res.message});
        reset();
      }
    } catch (error: any) {
      console.log(error);

      toastMessage({icon: 'error', text: error.data.message});
    }
  };

  return (
    <>
      <Row
        gutter={30}
        style={{
          height: 'calc(100vh - 6rem)',
          overflow: 'auto',
        }}
      >
        <Col
          xs={{span: 24}}
          lg={{span: 14}}
          style={{
            display: 'flex',
          }}
        >
          <Flex
            vertical
            style={{
              width: '100%',
              padding: '1rem 2rem',
              border: '1px solid #164863',
              borderRadius: '.6rem',
            }}
          >
            
            <div style={{ overflow: 'hidden', width: '650px', backgroundColor: 'blue', borderRadius: '8px',  marginBottom: '.8rem', }}>
      <h2
        style={{
          color: 'white',
          fontSize: '1.5rem',
          whiteSpace: 'nowrap',
          animation: 'moveText 20s linear infinite',
        }}
      >
        Welcome to StockEase 📦
      </h2>

      {/* Inline CSS for keyframes */}
      <style>
        {`
          @keyframes moveText {
            0% {
              transform: translateX(100%);
            }
            100% {
              transform: translateX(-100%);
            }
          }
        `}
      </style>
    </div>
            <h1
              style={{
                marginBottom: '2rem',
                fontWeight: '900',
                textAlign: 'center',
                textTransform: 'uppercase',
              }}
            >
              Add New Item To Store 🛒➕
            </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <CustomInput
                name='name'
                errors={errors}
                label=' Item Name'
                register={register}
                required={true}
              />
              <CustomInput
                errors={errors}
                label='Purchased Price'
                type='number'
                name='price'
                register={register}
                required={true}
              />
              <CustomInput
                errors={errors}
                label='Quantity'
                type='number'
                name='stock'
                register={register}
                required={true}
              />


<Row>
                <Col xs={{span: 23}} lg={{span: 6}}>
                  <label htmlFor='Size' className='label'>
                    Units
                  </label>
                </Col>
                <Col xs={{span: 23}} lg={{span: 18}}>
                  <select className={`input-field`} {...register('units')}>
                    <option value=''>Select Product Units</option>
                    <option value='kg'>Kilogram (kg)</option>
                    <option value='g'>Gram (g)</option>
                    <option value='mg'>Milligram (mg)</option>
                    <option value='l'>Liter (L)</option>
                    <option value='ml'>Milliliter (mL)</option>
                    <option value='g'>Gram (g)</option>
                 
                  </select>
                </Col>
              </Row>
              <Row>
                <Col xs={{span: 23}} lg={{span: 6}}>
                  <label htmlFor='Size' className='label'>
                  Vendor
                  </label>
                </Col>
                <Col xs={{span: 23}} lg={{span: 18}}>
                  <select
                    {...register('seller', {required: true})}
                    className={`input-field ${errors['seller'] ? 'input-field-error' : ''}`}
                  >
                    <option value=''>Select Vendor *</option>
                    {sellers?.data.map((item: ICategory) => (
                      <option value={item._id}>{item.name}</option>
                    ))}
                  </select>
                </Col>
              </Row>

              <Row>
                <Col xs={{span: 23}} lg={{span: 6}}>
                  <label htmlFor='Size' className='label'>
                    Category
                  </label>
                </Col>
                <Col xs={{span: 23}} lg={{span: 18}}>
                  <select
                    {...register('category', {required: true})}
                    className={`input-field ${errors['category'] ? 'input-field-error' : ''}`}
                  >
                    <option value=''>Select Category *</option>
                    {categories?.data.map((item: ICategory) => (
                      <option value={item._id}>{item.name}</option>
                    ))}
                  </select>
                </Col>
              </Row>

              <Row>
                <Col xs={{span: 23}} lg={{span: 6}}>
                  <label htmlFor='Size' className='label'>
                    Brand
                  </label>
                </Col>
                <Col xs={{span: 23}} lg={{span: 18}}>
                  <select
                    {...register('brand')}
                    className={`input-field ${errors['brand'] ? 'input-field-error' : ''}`}
                  >
                    <option value=''>Select brand</option>
                    {brands?.data.map((item: ICategory) => (
                      <option value={item._id}>{item.name}</option>
                    ))}
                  </select>
                </Col>
              </Row>

              <CustomInput type='textarea' label='Description' name='description' register={register} />

              
              <Flex justify='center'>
                <Button
                  htmlType='submit'
                  type='primary'
                  style={{textTransform: 'uppercase', fontWeight: 'bold',backgroundColor: 'blue',}}
                >
                  Add Product
                </Button>
              </Flex>
            </form>
          </Flex>
        </Col>
        <Col xs={{span: 24}} lg={{span: 10}}>
          <Flex
            vertical
            style={{
              width: '100%',
              height: '100%',
              padding: '1rem 2rem',
              border: '1px solid #164863',
              borderRadius: '.6rem',
              justifyContent: 'space-around',
            }}
          >
            <CreateSeller />
            <CreateCategory />
            <CreateBrand />
          </Flex>
        </Col>
      </Row>
    </>
  );
};

export default CreateProduct;
