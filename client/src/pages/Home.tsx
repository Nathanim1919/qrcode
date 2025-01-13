const HomePage: React.FC = () => {
    return (
      <div className="w-screen h-screen bg-gradient-to-br from-pink-500 via-red-400 to-yellow-300 flex flex-col items-center justify-center text-white">
        {/* Header Section */}
        <header className="absolute top-0 left-0 w-full flex justify-between items-center p-6">
          <div className="text-2xl md:text-3xl font-bold tracking-wide">
            <span className="text-yellow-200">YSHI</span>{" "}
            <span className="text-white">Weddings</span>
          </div>
          <a
            href="/login"
            className="bg-yellow-400 text-pink-700 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition-colors"
          >
            Login
          </a>
        </header>
  
        {/* Hero Section */}
        <div className="text-center max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Creating Beautiful Beginnings
          </h1>
          <p className="text-lg md:text-xl text-yellow-100 mb-8 p-4">
            At YSHI Weddings, we specialize in creating unforgettable wedding
            experiences and providing meaningful pre-marriage counseling. Let us
            guide you to a lifetime of happiness.
          </p>
          <a
            href="/login"
            className="bg-yellow-400 text-pink-700 px-6 py-3 rounded-full font-semibold text-lg hover:bg-yellow-300 transition-all"
          >
            Get Started
          </a>
        </div>
  
      </div>
    );
  };
  
  export default HomePage;
  