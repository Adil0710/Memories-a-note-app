import React from 'react'

function Footer() {
  return (
    <div><footer className="py-6 bg-gray-800 dark:bg-gray-900 text-center text-gray-300">
    <div className="max-w-4xl mx-auto space-y-4">
      <div className="flex justify-center space-x-4">
        <Link to="/about" className="text-lg">About Us</Link>
        <Link to="/privacy" className="text-lg">Privacy Policy</Link>
        <Link to="/terms" className="text-lg">Terms of Service</Link>
      </div>
      <div>
        <p>© {new Date().getFullYear()} Memories. All rights reserved.</p>
        <p>contact@memoriesapp.com | +123 456 7890</p>
        <div className="flex justify-center space-x-4 mt-2">
          {/* Add social media links */}
          <a href="#" className="text-lg">Facebook</a>
          <a href="#" className="text-lg">Twitter</a>
          <a href="#" className="text-lg">Instagram</a>
        </div>
      </div>
    </div>
  </footer></div>
  )
}

export default Footer