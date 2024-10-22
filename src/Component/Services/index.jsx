import { toast } from 'react-toastify';


function ServicesCard({ data }) {
  console.log('itsdata',data);
  
  return (
    <section className="text-gray-600 body-font flex flex-col justify-center">
      <div className="flex flex-row justify-center">
        <div className="text-black text-[60px] font-[inter]">Our Services</div>
      </div>

        <div className="flex flex-wrap justify-center gap-4">
          {' '}
       
          {data.map((item, index) => {
            const description = item.description.multi_line;
            return (
              <div key={index} className="p-4 drop-shadow-lg">
                <div className="h-full px-4 border-2 hover:shadow-gray-100 hover:shadow-2xl transition-shadow duration-300 ease-in-out border-gray-200 border-opacity-60 rounded-2xl overflow-hidden">
                  <div className="p-4 text-[#00a84c]">
                    <h2 className="title-font text-lg font-medium text-[#1772e6]">
                      Service {index + 1}
                    </h2>
                    <p className="text-sm text-gray-600">{description}</p>
                  </div>
                </div>
              </div>
            );
          })}

      </div>
    </section>
  );
}

export default ServicesCard;
