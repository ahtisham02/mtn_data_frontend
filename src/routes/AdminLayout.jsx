import { Outlet } from 'react-router-dom';
import Header from '../ui-components/AdminPage/Header';
import MainSidebar from '../ui-components/AdminPage/MainSidebar';

export default function AdminLayout() {
  return (
    <div className="flex flex-col h-screen font-plus-jakarta">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <MainSidebar />
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}