import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div>
        <footer class="bg-gray-800 text-white py-4">
            <div class="container mx-auto text-center">
                <p class="text-sm">&copy; 2024 SpendSmart. All Rights Reserved.</p>
                <div class="mt-2">
                    <Link to="/privacy" class="text-gray-400 hover:text-white mx-2">Privacy Policy</Link>
                    <Link to="/terms" class="text-gray-400 hover:text-white mx-2">Terms of Service</Link>
                    <Link to="/contact" class="text-gray-400 hover:text-white mx-2">Contact Us</Link>
                </div>
                <div class="mt-2">
                    <Link to="#" class="text-gray-400 hover:text-white mx-2">Facebook</Link>
                    <Link to="#" class="text-gray-400 hover:text-white mx-2">Twitter</Link>
                    <Link to="#" class="text-gray-400 hover:text-white mx-2">LinkedIn</Link>
                </div>
            </div>
        </footer>
    </div>
  )
}

export default Footer
