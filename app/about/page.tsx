import Image from 'next/image';

export default function AboutPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-canada-red to-red-700 py-16 md:py-24 relative">
        {/* Top border */}
        <div className="w-full border-t-2 border-black absolute top-0 left-0 right-0 z-20"></div>
        {/* Bottom border */}
        <div className="w-full border-b-2 border-black absolute bottom-0 left-0 right-0 z-20"></div>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              About CanScan
            </h1>
            <p className="text-xl text-white text-opacity-90">
              Empowering Canadians to discover and support local products.
            </p>
          </div>
        </div>
      </section>
      
      {/* Mission Section */}
      <section className="py-16 bg-transparent">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="section-heading text-center">Our Mission</h2>
            <p className="text-lg text-gray-700 mb-8">
              At CanScan, we believe in the power of supporting local Canadian businesses and manufacturers. 
              Our mission is to make it easy for Canadians to identify and purchase products made right here 
              in Canada, strengthening our economy and reducing environmental impact through shorter supply chains.
            </p>
            <p className="text-lg text-gray-700 mb-8">
              We developed CanScan to bridge the information gap between consumers who want to support local 
              products and the many excellent Canadian manufacturers who produce high-quality goods. By simply 
              scanning a barcode or taking a picture of a product, CanScan instantly tells you if it&apos;s made in 
              Canada and provides additional information about the company behind it.
            </p>
            <div className="bg-red-50 border-l-4 border-canada-red p-6 rounded-r-lg">
              <p className="text-gray-700 italic">
                &ldquo;We envision a future where Canadians can easily make informed choices to support local 
                businesses, creating a stronger, more sustainable economy for all of us.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="py-16 bg-transparent">
        <div className="container mx-auto px-4">
          <h2 className="section-heading text-center mb-12">Our Team</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Team member cards would go here */}
            <div className="card text-center">
              <div className="w-64 h-64 rounded-full mx-auto mb-4 overflow-hidden">
                <Image src="/images/graham.jpg" alt="Team member" width={256} height={256} quality={100} className="object-cover w-full h-full" />
              </div>
              <h3 className="text-xl font-bold mb-1">Name</h3>
              <p className="text-gray-600 mb-3">Position</p>
              <p className="text-gray-700">Brief description about the team member and their role at CanScan.</p>
            </div>
            
            <div className="card text-center">
              <div className="w-64 h-64 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-gray-500">Photo</span>
              </div>
              <h3 className="text-xl font-bold mb-1">Name</h3>
              <p className="text-gray-600 mb-3">Position</p>
              <p className="text-gray-700">Brief description about the team member and their role at CanScan.</p>
            </div>
            
            <div className="card text-center">
              <div className="w-64 h-64 rounded-full mx-auto mb-4 overflow-hidden">
                <Image src="/images/luna.jpg" alt="Team member" width={256} height={256} quality={100} className="object-cover w-full h-full" />
              </div>
              <h3 className="text-xl font-bold mb-1">Name</h3>
              <p className="text-gray-600 mb-3">Position</p>
              <p className="text-gray-700">Brief description about the team member and their role at CanScan.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Canadian Values Section */}
      <section className="py-16 bg-transparent">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="section-heading text-center">Canadian Values</h2>
            <p className="text-lg text-gray-700 mb-8">
              CanScan is built on core Canadian values that guide everything we do:
            </p>
            
            <div className="space-y-6">
              <div className="flex">
                <div className="flex-shrink-0 mr-4 text-canada-red">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Community Support</h3>
                  <p className="text-gray-700">We believe in strengthening local communities by promoting Canadian businesses and products.</p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 mr-4 text-canada-red">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Sustainability</h3>
                  <p className="text-gray-700">Buying local reduces transportation emissions and supports more sustainable production practices.</p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 mr-4 text-canada-red">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Transparency</h3>
                  <p className="text-gray-700">We provide clear, accurate information about product origins to help consumers make informed choices.</p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 mr-4 text-canada-red">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Innovation</h3>
                  <p className="text-gray-700">We embrace Canadian innovation to create technology that makes a difference in people&apos;s daily lives.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 