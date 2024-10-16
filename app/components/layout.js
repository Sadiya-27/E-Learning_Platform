import Header from './header';

function Layout({ children }) {
    return (
        <div className='bg-indigo-100 h-full'>
            <Header />
            
        <main>{children}</main>
        {/* <Footer /> */}
        </div>
    );
}

export default Layout;

// Layout.js


