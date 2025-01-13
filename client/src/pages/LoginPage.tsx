const LoginPage: React.FC = () => {
  return (
    <div className="w-screen h-screen bg-sky-300 grid place-items-center">
      <div className="bg-white p-4 rounded-lg  w-[80%] md:w-[400px] grid gap-3">
        <h1 className="font-bold text-2xl text-center">Login Page</h1>
        <form className="grid gap-4">
          <div className="flex flex-col">
            <label className="m-0" htmlFor="email">Email</label>
            <input className="bg-gray-200 p-1 text-black border border-gray-300 rounded-md outline-none" placeholder="Enter Email" type="email" name="email" id="email" />
          </div>
          <div className="flex flex-col">
            <label className="m-0" htmlFor="password">Password</label>
            <input className="bg-gray-200 p-1 text-black border border-gray-300 rounded-md outline-none" placeholder="Enter Password" type="password" name="password" id="password" />
          </div>
            <button type="submit"
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            >Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
