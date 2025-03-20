import Link from 'next/link';
import Image from 'next/image';

const DownloadCTA = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background gradient with maple leaf pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-canada-red to-red-700 z-0"></div>
      
      {/* Maple leaf pattern overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-10" 
        style={{
          backgroundImage: `url('/images/maple-pattern.svg')`,
          backgroundRepeat: 'repeat',
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <span className="inline-block px-4 py-2 bg-white bg-opacity-20 text-white rounded-full font-semibold text-sm mb-6">
              Ready to Try CanScan?
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Download CanScan Today
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-lg">
              Join thousands of Canadians who use CanScan to discover and support local products. Download the app for free on iOS and Android.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="#" 
                className="bg-white text-canada-red font-bold py-4 px-6 rounded-lg flex items-center justify-center hover:bg-gray-100 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <svg className="w-8 h-8 mr-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.547 9.103 1.519 12.082 1 1.462 2.2 3.105 3.773 3.045 1.513-.054 2.09-.98 3.925-.98 1.834 0 2.359.98 3.96.946 1.645-.026 2.691-1.495 3.688-2.96 1.156-1.688 1.636-3.32 1.662-3.4-.036-.014-3.182-1.225-3.22-4.857-.026-3.04 2.48-4.494 2.598-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.594 1.09z" fill="#000"/>
                  <path d="M15.53 3.083c.843-1.021 1.41-2.435 1.245-3.83-1.207.054-2.662.803-3.532 1.812-.775.894-1.452 2.338-1.273 3.714 1.338.104 2.716-.684 3.559-1.696z" fill="#000"/>
                </svg>
                <div>
                  <div className="text-xs">Download on the</div>
                  <div className="text-xl font-bold">App Store</div>
                </div>
              </Link>
              <Link 
                href="#" 
                className="bg-white text-canada-red font-bold py-4 px-6 rounded-lg flex items-center justify-center hover:bg-gray-100 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <svg className="w-8 h-8 mr-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 20.069V3.931C3 3.4 3.247 2.965 3.701 2.674l8.932 8.708L3.7 20.326A1.494 1.494 0 013 20.07z" fill="#000"/>
                  <path d="M3.701 2.674A1.495 1.495 0 015 2.068l.004-.001 11.648 6.815-3.018 2.94L3.7 2.673z" fill="#000"/>
                  <path d="M16.652 8.882l2.92 1.709a1.495 1.495 0 010 2.818l-2.92 1.709-3.341-3.118 3.341-3.118z" fill="#000"/>
                  <path d="M16.652 15.118L5 21.934a1.5 1.5 0 01-1.299-.608l8.933-8.944 4.018 2.736z" fill="#000"/>
                </svg>
                <div>
                  <div className="text-xs">GET IT ON</div>
                  <div className="text-xl font-bold">Google Play</div>
                </div>
              </Link>
            </div>
            
            {/* User testimonial */}
            <div className="mt-12 bg-white bg-opacity-10 p-6 rounded-xl backdrop-filter backdrop-blur-sm">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-canada-red mr-4 flex-shrink-0">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <div className="flex mb-2">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-white italic mb-2">"CanScan has completely changed how I shop. Now I can easily find and support Canadian businesses with just a quick scan!"</p>
                  <p className="text-white text-sm font-medium">— Sarah from Toronto</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center lg:justify-end relative">
            {/* Phone mockup with glow effect */}
            <div className="relative">
              <div className="absolute -inset-4 bg-white rounded-full blur-xl opacity-20"></div>
              <div className="relative h-[500px] w-[250px] transform perspective-1000 rotate-y-3 hover:rotate-y-0 transition-all duration-500">
                <Image 
                  src="/images/phone-mockup.svg" 
                  alt="CanScan App" 
                  fill
                  style={{ objectFit: 'contain' }}
                  className="relative z-10"
                />
              </div>
              
              {/* Decorative maple leaves */}
              <div className="absolute top-10 -left-20 text-white animate-float opacity-30">
                <svg width="60" height="60" viewBox="0 0 512 512" fill="currentColor">
                  <path d="M256,0c-23.357,0-42.297,18.932-42.297,42.288c0,13.928,6.726,26.264,17.151,33.963
                  c-10.24,12.777-26.569,21.489-26.569,21.489s20.075-0.908,30.911-3.024c-7.523,12.304-24.333,26.233-24.333,26.233
                  s19.339-3.75,32.499-13.716c-9.889,31.974-34.542,40.623-34.542,40.623s23.535,5.094,43.083-9.343
                  c-8.156,21.051-33.971,35.223-33.971,35.223s21.479-1.26,46.815-19.057c7.068,29.653-16.304,60.369-16.304,60.369
                  s37.073-15.38,47.446-61.123c4.056,8.48,28.236,18.395,28.236,18.395s-15.659-21.823-18.417-31.863
                  c13.891,10.814,40.173,16.52,40.173,16.52s-31.968-26.02-35.906-39.185c13.829,5.46,39.155,6.787,39.155,6.787
                  s-28.785-20.012-33.952-30.44c23.389,5.414,57.274-0.463,57.274-0.463s-59.873-10.183-64.693-24.354
                  c19.293,0.312,34.218-6.318,34.218-6.318s-24.427-5.779-33.187-13.341c10.424-7.699,17.151-20.035,17.151-33.963
                  C298.297,18.932,279.357,0,256,0z"/>
                </svg>
              </div>
              
              <div className="absolute bottom-20 -right-10 text-white animate-float-delay opacity-30">
                <svg width="40" height="40" viewBox="0 0 512 512" fill="currentColor">
                  <path d="M256,0c-23.357,0-42.297,18.932-42.297,42.288c0,13.928,6.726,26.264,17.151,33.963
                  c-10.24,12.777-26.569,21.489-26.569,21.489s20.075-0.908,30.911-3.024c-7.523,12.304-24.333,26.233-24.333,26.233
                  s19.339-3.75,32.499-13.716c-9.889,31.974-34.542,40.623-34.542,40.623s23.535,5.094,43.083-9.343
                  c-8.156,21.051-33.971,35.223-33.971,35.223s21.479-1.26,46.815-19.057c7.068,29.653-16.304,60.369-16.304,60.369
                  s37.073-15.38,47.446-61.123c4.056,8.48,28.236,18.395,28.236,18.395s-15.659-21.823-18.417-31.863
                  c13.891,10.814,40.173,16.52,40.173,16.52s-31.968-26.02-35.906-39.185c13.829,5.46,39.155,6.787,39.155,6.787
                  s-28.785-20.012-33.952-30.44c23.389,5.414,57.274-0.463,57.274-0.463s-59.873-10.183-64.693-24.354
                  c19.293,0.312,34.218-6.318,34.218-6.318s-24.427-5.779-33.187-13.341c10.424-7.699,17.151-20.035,17.151-33.963
                  C298.297,18.932,279.357,0,256,0z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadCTA;