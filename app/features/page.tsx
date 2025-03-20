import Image from 'next/image';

export default function FeaturesPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-canada-red py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              CanScan Features
            </h1>
            <p className="text-xl text-white text-opacity-90">
              Discover all the powerful tools to help you identify and support Canadian products.
            </p>
          </div>
        </div>
      </section>
      
      {/* Main Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
            <div>
              <div className="inline-block text-canada-red mb-4">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold mb-4">Barcode Scanning</h2>
              <p className="text-lg text-gray-700 mb-6">
                Our advanced barcode scanning technology quickly identifies products and tells you:
              </p>
              <ul className="space-y-3">
                <li className="flex">
                  <svg className="w-6 h-6 mr-2 text-canada-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>If the product is made in Canada</span>
                </li>
                <li className="flex">
                  <svg className="w-6 h-6 mr-2 text-canada-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>The specific province of origin</span>
                </li>
                <li className="flex">
                  <svg className="w-6 h-6 mr-2 text-canada-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Information about the manufacturer</span>
                </li>
                <li className="flex">
                  <svg className="w-6 h-6 mr-2 text-canada-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Similar Canadian alternatives if the product is imported</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-100 h-80 rounded-lg flex items-center justify-center">
              <span className="text-gray-500">Barcode Scanning Demo Image</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
            <div className="order-2 md:order-1 bg-gray-100 h-80 rounded-lg flex items-center justify-center">
              <span className="text-gray-500">Image Recognition Demo Image</span>
            </div>
            <div className="order-1 md:order-2">
              <div className="inline-block text-canada-red mb-4">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold mb-4">Image Recognition</h2>
              <p className="text-lg text-gray-700 mb-6">
                For products without barcodes or when browsing online, our image recognition can:
              </p>
              <ul className="space-y-3">
                <li className="flex">
                  <svg className="w-6 h-6 mr-2 text-canada-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Identify products from photos</span>
                </li>
                <li className="flex">
                  <svg className="w-6 h-6 mr-2 text-canada-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Recognize Canadian product packaging</span>
                </li>
                <li className="flex">
                  <svg className="w-6 h-6 mr-2 text-canada-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Detect "Made in Canada" labels and symbols</span>
                </li>
                <li className="flex">
                  <svg className="w-6 h-6 mr-2 text-canada-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Work with screenshots from online shopping</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block text-canada-red mb-4">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold mb-4">Local Business Finder</h2>
              <p className="text-lg text-gray-700 mb-6">
                Discover stores near you that carry Canadian products:
              </p>
              <ul className="space-y-3">
                <li className="flex">
                  <svg className="w-6 h-6 mr-2 text-canada-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Map-based interface showing nearby retailers</span>
                </li>
                <li className="flex">
                  <svg className="w-6 h-6 mr-2 text-canada-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Filter by product category</span>
                </li>
                <li className="flex">
                  <svg className="w-6 h-6 mr-2 text-canada-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>User reviews and ratings of local shops</span>
                </li>
                <li className="flex">
                  <svg className="w-6 h-6 mr-2 text-canada-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Directions to stores with your preferred map app</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-100 h-80 rounded-lg flex items-center justify-center">
              <span className="text-gray-500">Local Business Finder Demo Image</span>
            </div>
          </div>
        </div>
      </section>
      
      {/* Additional Features */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="section-heading text-center mb-12">More Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card">
              <div className="text-canada-red mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Product Database</h3>
              <p className="text-gray-700">
                Browse our extensive database of Canadian products even without scanning. Filter by category, province, or certification type.
              </p>
            </div>
            
            <div className="card">
              <div className="text-canada-red mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Favorites & Lists</h3>
              <p className="text-gray-700">
                Save your favorite Canadian products, create shopping lists, and share them with friends and family.
              </p>
            </div>
            
            <div className="card">
              <div className="text-canada-red mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Personalized Recommendations</h3>
              <p className="text-gray-700">
                Get product suggestions based on your preferences and previous scans. Discover new Canadian brands you'll love.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Technology Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="section-heading">Advanced Technology</h2>
            <p className="text-lg text-gray-700 mb-12">
              CanScan uses cutting-edge technology to provide accurate information about Canadian products.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="text-left p-6 border border-gray-200 rounded-lg">
                <h3 className="text-xl font-bold mb-3">Machine Learning</h3>
                <p className="text-gray-700">
                  Our image recognition system uses advanced machine learning algorithms that continuously improve as more Canadians use the app.
                </p>
              </div>
              
              <div className="text-left p-6 border border-gray-200 rounded-lg">
                <h3 className="text-xl font-bold mb-3">Comprehensive Database</h3>
                <p className="text-gray-700">
                  We maintain one of the largest databases of Canadian products, updated daily with new items and information.
                </p>
              </div>
              
              <div className="text-left p-6 border border-gray-200 rounded-lg">
                <h3 className="text-xl font-bold mb-3">Fast Scanning</h3>
                <p className="text-gray-700">
                  Get instant results even in poor lighting conditions or with damaged barcodes thanks to our optimized scanning technology.
                </p>
              </div>
              
              <div className="text-left p-6 border border-gray-200 rounded-lg">
                <h3 className="text-xl font-bold mb-3">Offline Mode</h3>
                <p className="text-gray-700">
                  The core scanning functionality works without an internet connection, with cached data for the most common Canadian products.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}