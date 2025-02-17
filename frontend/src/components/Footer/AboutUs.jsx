import url from "../../assets/aboutus.jpg";

const AboutUs = () => {


  return (
    <section className="bg-green-100 py-12 px-6 md:px-16 ">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-green-700 mb-7">About Us</h2>
        <p className="text-gray-700 w-5/6 m-auto font-semibold text-wrap md:text-2xl mb-7">
          Our platform connects farmers directly with consumers, ensuring fresh
          and high-quality products reach your doorstep. By eliminating
          middlemen, we empower farmers with fair pricing and provide customers
          with farm-to-table goodness.
        </p>
        <div className="flex justify-center mt-10 mb-8">
          <img
            src={url}
            alt=""
            className="rounded-full w-full max-w-xs md:max-w-md h-auto border-4 border-white shadow-xl"
          />
        </div>
      </div>
      <div className="mt-10 flex  flex-row flex-wrap justify-center gap-8">
        <div className="bg-white shadow-lg p-6 rounded-lg w-full max-w-sm">
          <h3 className="text-lg md:text-xl font-semibold text-green-600">
            For Farmers
          </h3>
          <p className="text-gray-600 mt-2">
            Easily list and sell your products to a wide range of consumers
            without hassle.
          </p>
        </div>
        <div className="bg-white shadow-lg p-6 rounded-lg w-full max-w-sm">
          <h3 className="text-lg md:text-xl font-semibold text-green-600">
            For Consumers
          </h3>
          <p className="text-gray-600 mt-2">
            Get fresh, locally sourced products directly from farmers,
            supporting sustainable agriculture.
          </p>
        </div>
      </div>
    </section>
  );
}

export default AboutUs