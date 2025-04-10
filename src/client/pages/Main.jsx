import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@wasp/auth';

const Main = () => {
  const { data: user, isLoading } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl font-bold mb-4">Simplify Teaching with Canvas API</h1>
              <p className="text-xl mb-6">
                APIprofe provides resources, tutorials, and code snippets to help educators leverage the Canvas LMS API for better teaching.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  to="/resources" 
                  className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                >
                  Browse Resources
                </Link>
                {!user && (
                  <Link 
                    to="/signup" 
                    className="bg-transparent border-2 border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
                  >
                    Get Started
                  </Link>
                )}
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="bg-white p-6 rounded-lg shadow-lg text-gray-800">
                <h3 className="text-lg font-semibold mb-3">Example: Get All Courses</h3>
                <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
                  <code>
{`const axios = require('axios');

const getCanvasCourses = async (domain, token) => {
  try {
    const response = await axios.get(
      \`https://\${domain}/api/v1/courses\`,
      { 
        headers: { 'Authorization': \`Bearer \${token}\` }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching courses:', error);
  }
};

// Usage
getCanvasCourses('your-canvas-domain.instructure.com', 'your-token')
  .then(courses => console.log(courses));`}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 container mx-auto px-4 max-w-6xl">
        <h2 className="text-3xl font-bold text-center mb-12">Why Use APIprofe?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-blue-600 text-4xl mb-4">📚</div>
            <h3 className="text-xl font-semibold mb-2">Comprehensive Resources</h3>
            <p className="text-gray-600">
              Access tutorials, guides, and code snippets for common teaching tasks with the Canvas API.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-blue-600 text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold mb-2">Save Time</h3>
            <p className="text-gray-600">
              Automate repetitive tasks and streamline your workflow with ready-to-use Canvas API solutions.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-blue-600 text-4xl mb-4">👨‍👩‍👧‍👦</div>
            <h3 className="text-xl font-semibold mb-2">Community Driven</h3>
            <p className="text-gray-600">
              Join a community of educators sharing their Canvas API knowledge and best practices.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to enhance your teaching with Canvas API?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Join APIprofe today and discover how the Canvas API can transform your educational workflow.
          </p>
          <Link 
            to={user ? "/resources" : "/signup"} 
            className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-block"
          >
            {user ? "Browse Resources" : "Create Account"}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Main;
