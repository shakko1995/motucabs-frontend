import React from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Disclaimer = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Banner */}
      <div className="relative h-72 md:h-96 w-full">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80"
          alt="Disclaimer Banner"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Logo as colored text */}
        <div className="absolute top-4 left-4 md:top-6 md:left-6 text-3xl font-bold">
          <span className="text-blue-600">Motu</span>
          <span className="text-orange-500">Cab</span>
        </div>

        {/* Title */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
            Disclaimer
          </h1>
          <p className="text-white text-lg mt-2 drop-shadow-md">
            Important Information About This Site
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-2xl p-8 mt-10 mb-16">
        {/* Disclaimer Text */}
        <div className="space-y-6 text-gray-700 leading-relaxed">
          <p>
            The material on this Site may include technical inaccuracies or
            typographical errors. The Company may make changes, modifications, or
            improvements on the Site at any time.
          </p>

          <p>
            The Company does not warrant that the functions contained in this Site
            will be uninterrupted or error-free, that defects will be corrected,
            or that this Site or the servers that make it available are free of
            viruses or other harmful components, but shall endeavour to ensure your
            fullest satisfaction. The Company does not warrant or make any
            representations regarding the use of or the results of the use of the
            material on the Site in terms of their correctness, accuracy,
            reliability, or otherwise, insofar as such material is derived from
            other service providers such as tour operators.
          </p>

          <p>
            You acknowledge that this Site is provided only on the basis set out in
            these terms and conditions. Your uninterrupted access or use of this
            Site may be prevented by certain factors outside our reasonable control,
            including, without limitation, the unavailability, inoperability, or
            interruption of the Internet or other telecommunications services, or
            as a result of any maintenance or other service work carried out on
            this Website. The Company does not accept any responsibility and will
            not be liable for any loss or damage whatsoever arising out of or in
            connection with any ability/inability to access or use the Site.
          </p>

          <p>
            The Company will not be liable to you or to any other person for any
            direct, indirect, incidental, punitive, or consequential loss, damage,
            cost, or expense of any kind whatsoever arising from your use of this
            Site.
          </p>

          <p>
            Through this website, you may link to other websites which are not under
            the control of MotuCab. We have no control over the nature, content, and
            availability of those sites. The inclusion of any links does not
            necessarily imply a recommendation or endorse the views expressed
            within them.
          </p>

          <p className="text-center text-gray-500 mt-10">
            © {new Date().getFullYear()} MotuCab Technologies Pvt. Ltd. All rights
            reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;
