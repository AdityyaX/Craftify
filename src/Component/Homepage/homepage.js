import React, { useState, useEffect } from 'react';
import HeroSection from '../heroSection/HeroSection.jsx';
import Navbart from '../navbar copy/Navbart.jsx';
import { AboutSection } from '../AboutSection/index.jsx';
import ServicesCard from '../Services/index.jsx';
import ProductCard from '../blogCard/BlogCard.jsx';
import Testimonial from '../testimonial/Testimonial.jsx';
import stack from '../contentstack.js';
import Footer from '../footer/Footer.jsx'
export default function Homepage() {
  const [data, setData] = useState(null);
  const [testimonialData, setTestimonialData] = useState([]); 
  const [navbarLinks, setNavbarLinks] = useState({});
  const [heroUrl, setHeroUrl] = useState('');


  useEffect(() => {
    const contentTypeUid = 'homepage';

    stack
      .ContentType(contentTypeUid)
      .Query()
      .toJSON()
      .find()
      .then((result) => {
        console.log('API Response:', result);
        if (result && result.length > 0) {
          setData(result[0][0]);
          setHeroUrl(result[0][0].hero_image.url);

          const navbarData = result[0][0].navbar;
console.log('navbar', navbarData[4]?.signin.single_line);

          if (navbarData && navbarData.length > 0) {
            setNavbarLinks({
              label1: navbarData[0]?.leftnavbar.single_line || 'Default 1',
              label2: navbarData[1]?.rightnavbar.single_line || 'Default 2',
              label3: navbarData[2]?.rightmost.single_line || 'Default 3',
              label5: navbarData[3]?.uibuilder.single_line || 'Default 4',
              label4: navbarData[4]?.signin.single_line || 'Default 4',
            });
          } else {
            console.warn('Navbar data is empty or not formatted correctly.');
          }
        } else {
          console.warn('No entries found for this content type.');
        }
      })
      .catch((error) => {
        console.error('Error fetching entries:', error);
      });
  }, []);


  useEffect(() => {
    const contentTypeUid = 'testimonials';

    stack
      .ContentType(contentTypeUid)
      .Query()
      .toJSON()
      .find()
      .then((result) => {
        setTestimonialData(result);
        console.log('testimonials', testimonials);
        
      })
      .catch((error) => {
        console.error('Error fetching entries:', error);
      });
  }, []);


  if (!data) {
    return <div>Loading...</div>;
  }

  // Check if testimonials exist
  const testimonials = testimonialData.length > 0 ? testimonialData[0][0]?.testimonials : [];

  return (
    <>
      <Navbart
        label1={navbarLinks.label1 || ''}
        label2={navbarLinks.label2 || ''}
        label3={navbarLinks.label3 || ''}
        label5={navbarLinks.label5 || ''}
        label4={navbarLinks.label4 || ''}
      />
      <HeroSection src={heroUrl} />
    
      <ServicesCard data={data.services_section[2]?.cards?.cardsblocks} />
      <ProductCard />
      <Testimonial data={testimonials} />{' '}
      <Footer/>

    </>
  );
}
