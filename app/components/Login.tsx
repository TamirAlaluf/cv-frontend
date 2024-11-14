export default function Login() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Login</h2>
      
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 
              focus:ring-blue-500 focus:border-blue-500 transition-all
              text-gray-800 placeholder-gray-400"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <input
            type="password"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 
              focus:ring-blue-500 focus:border-blue-500 transition-all
              text-gray-800 placeholder-gray-400"
            placeholder="Enter your password"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 bg-blue-600 text-white rounded-md
            hover:bg-blue-700 transition-colors duration-200 font-medium shadow-sm"
        >
          Login
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-600">
        Don't have an account?{' '}
        <button className="text-blue-600 hover:text-blue-700 font-medium">
          Sign up
        </button>
      </p>
    </div>
  )
} 