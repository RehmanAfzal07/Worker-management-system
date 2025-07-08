'use client';
import React, { useState } from 'react';
import TopBar from './components/TopBar';
import Home from './Home/page';
import AdminRegistration from './adminRegistration/page';
import EmployeeRegistration from './employeeRegistration/page';
import AdminLogin from './adminLogin/page';
import EmployeeLogin from './employeeLogin/page';
import { PageType } from './types/pages';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageType>('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home setCurrentPage={setCurrentPage} />; // ✅ PASSING PROP
      case 'admin-registration':
        return <AdminRegistration setCurrentPage={setCurrentPage} />; // ✅
      case 'employee-registration':
        return <EmployeeRegistration setCurrentPage={setCurrentPage} />; // ✅
      case 'admin-login':
        return <AdminLogin setCurrentPage={setCurrentPage} />; // ✅
      case 'employee-login':
        return <EmployeeLogin setCurrentPage={setCurrentPage} />; // ✅
      default:
        return <Home setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <>
      <TopBar setCurrentPage={setCurrentPage} />
      <main>{renderPage()}</main>
    </>
  );
};

export default App;









//   "use client"
// import React, { useState } from 'react';
// import TopBar from './components/TopBar';
// import Home from './pages/Home/page';
// import AdminRegistration from './pages/adminRegistration/page';
// import EmployeeRegistration from './pages/employeeRegistration/page';
// import AdminLogin from './pages/adminLogin/page';
// import EmployeeLogin from './pages/employeeLogin/page';
// import { PageType } from './types/pages';

// const App: React.FC = () => {
//   const [currentPage, setCurrentPage] = useState<PageType>('home');

//   const renderPage = () => {
//     switch (currentPage) {
//       case 'home':
//         return <Home setCurrentPage={setCurrentPage} />;
//       case 'admin-registration':
//         return <AdminRegistration />;
//       case 'employee-registration':
//         return <EmployeeRegistration />;
//       case 'admin-login':
//         return <AdminLogin />;
//       case 'employee-login':
//         return <EmployeeLogin />;
//       default:
//         return <Home setCurrentPage={setCurrentPage} />;
//     }
//   };

//   return (
//     <>
//       <TopBar setCurrentPage={setCurrentPage} />
//       <main>{renderPage()}</main>
//     </>
//   );
// };

// export default App;


























// "use client"
// import React, { useState } from 'react';
// import TopBar from './components/TopBar';
// import AdminRegistration from './pages/AdminRegistration';
// import EmployeeRegistration from './pages/EmployeeRegistration';
// import AdminLogin from './pages/AdminLogin';
// import EmployeeLogin from './pages/EmployeeLogin';
// import Home from './pages/Home';




// const App: React.FC = () => {
//   const [currentPage, setCurrentPage] = useState<PageType>('admin-registration');

//   const renderPage = () => {
//     switch (currentPage) {
//       case 'admin-registration':
//         return <AdminRegistration />;
//       case 'employee-registration':
//         return <EmployeeRegistration />;
//       case 'admin-login':
//         return <AdminLogin />;
//       case 'employee-login':
//         return <EmployeeLogin />;
//       default:
//         return <Home setCurrentPage={setCurrentPage} />;
//     }
//   };

//   return (
//     <>
//       <TopBar setCurrentPage={setCurrentPage} />
//       <Home setCurrentPage={setCurrentPage} /> 

//       <main>{renderPage()}</main>
//     </>
//   );
// };

// export default App;
