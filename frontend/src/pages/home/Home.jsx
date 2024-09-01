import React from 'react';
import Slider from '../../components/slider/Slider';
import "./Home.scss";
import HomeInfoBox from './HomeInfoBox';
import { productData } from '../../components/corousel/data';
import CarouselItem from '../../components/corousel/CarouselItem';
import ProductCarousel from '../../components/corousel/Carousel';
import ProductCategory from './ProductCategory';
import FooterLinks from '../../components/footer/FooterLinks';

const PageHeading = ({ heading, btnText }) => (
  <>
    <div className='--flex-between'>
      <h2 className='--fw-thin'>{heading}</h2>
      <button className="--btn adjust">{btnText}</button>
    </div>
    <div className="--hr"></div>
  </>
);

const Home = () => {
  // Map product data to CarouselItem components
  const products = productData.map((item) => (
    <div key={item.id}>
      <CarouselItem 
        name={item.name}
        url={item.imageurl}  // This should match the key in your productData
        price={item.price}
        description={item.description}
      />
    </div>
  ));

  return (
    <>
      <Slider />
      <section>
        <div className='container'>
          <HomeInfoBox />
          <PageHeading heading={"Latest Products"} btnText={"Shop Now >>"} />
          <ProductCarousel products={products} /> {/* Pass products as prop */}
        </div>
      </section>
      <section className='--bt-grey'>
        <div className='container'>
          <h1>Categories</h1>
          <ProductCategory />
          </div>
      </section>
      <FooterLinks />
    </>
  );
};

export default Home;
