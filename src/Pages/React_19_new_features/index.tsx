import React from 'react';
import { Link } from 'react-router-dom';

export default function React19FeaturesIndex() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            React 19 New Features
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore the revolutionary new features that make React 19 the most powerful and developer-friendly version yet
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Actions Feature */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Actions</h3>
            <p className="text-gray-600 mb-4">
              Revolutionary form handling with automatic state management, optimistic updates, and built-in loading states.
            </p>
            <div className="space-y-2">
              <Link 
                to="/react-19-actions"
                className="block w-full bg-blue-600 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                View Examples
              </Link>
              <Link 
                to="/react-19-simple-demo"
                className="block w-full bg-blue-100 text-blue-700 text-center py-2 px-4 rounded-lg hover:bg-blue-200 transition-colors"
              >
                Simple Demo
              </Link>
            </div>
          </div>

          {/* Documentation */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Documentation</h3>
            <p className="text-gray-600 mb-4">
              Comprehensive guides, examples, and best practices for React 19 Actions and other new features.
            </p>
            <a 
              href="/src/Pages/React_19_new_features/README.md"
              className="block w-full bg-green-600 text-white text-center py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
            >
              Read Docs
            </a>
          </div>

          {/* Coming Soon */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">More Features</h3>
            <p className="text-gray-600 mb-4">
              Additional React 19 features including improved hooks, performance enhancements, and new patterns.
            </p>
            <span className="block w-full bg-purple-100 text-purple-700 text-center py-2 px-4 rounded-lg">
              Coming Soon
            </span>
          </div>
        </div>

        {/* Quick Start Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Start with Actions</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">1. Basic Setup</h3>
              <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
{`import { useActionState } from 'react';

const [state, formAction] = useActionState(
  async (prevState, formData) => {
    // Your action logic here
    return { success: 'Done!' };
  },
  { success: '' }
);`}
              </pre>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">2. Use in Form</h3>
              <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
{`<form action={formAction}>
  <input name="title" />
  <button type="submit">Submit</button>
</form>

{state.success && <div>{state.success}</div>}`}
              </pre>
            </div>
          </div>
        </div>

        {/* Key Benefits */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl shadow-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-6">Why React 19 Actions?</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Simpler Code</h3>
              <p className="text-blue-100 text-sm">No more manual event handlers or state management</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Better Performance</h3>
              <p className="text-blue-100 text-sm">Automatic batching and optimistic updates</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Type Safe</h3>
              <p className="text-blue-100 text-sm">Full TypeScript support with compile-time checking</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Server Ready</h3>
              <p className="text-blue-100 text-sm">Built for React Server Components and modern APIs</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-600 mt-12">
          <p>Ready to revolutionize your React development? Start exploring Actions today!</p>
        </div>
      </div>
    </div>
  );
}
