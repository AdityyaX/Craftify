import { useContext } from 'react';

function Testimonial({ data }) {
  console.log('test', data);

  return (
    <div>
      <section className="text-gray-600 body-font mb-10">
        <div className="container px-5 py-10 mx-auto">
          <div className="flex justify-center mb-10">
            <div className="text-black text-[60px] font-[inter]">About Us</div>
          </div>

          <div className="flex flex-wrap justify-center -m-4">
            {data.map((item, index) => {
              const title = item.title?.single_line;
              console.log(item, 'item');

              const description = item.title.description;

              return (
                <div key={index} className="lg:w-1/3 lg:mb-0 mb-6 p-4">
                  <div className="h-full text-center">
                    <img
                      alt="testimonial"
                      className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100"
                      src={item.title.file.url}
                    />
                    <p className="leading-relaxed">{description}</p>
                    <span className="inline-block h-1 w-10 rounded bg-pink-500 mt-6 mb-4" />
                    <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase">
                      {title || 'Anonymous'}
                    </h2>
                    <p className="text-gray-500">Position</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Testimonial;
