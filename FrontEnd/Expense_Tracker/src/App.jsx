import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { AppRoutes } from './routes';

import { Navbar } from "./components/layout/Navbar"; 
import { Spinner } from "./components/common/Spinner"; 

function App() {
  // return (
  //   <BrowserRouter>
  //     <AuthProvider>
  //       <div className="min-h-screen bg-gray-50">
  //         <Navbar />
  //         <main className="container mx-auto px-4 py-8">
  //           <Suspense fallback={<Spinner />}>
  //             <AppRoutes />
  //           </Suspense>
  //         </main>
  //       </div>
  //     </AuthProvider>
  //   </BrowserRouter>
  // );

  
  return <h1>Hello World!</h1>

}

export default App;