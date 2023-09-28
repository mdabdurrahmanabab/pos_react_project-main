import React from 'react';

function Footer() {
  return (
    <footer className="py-2 bg-theme mt-auto">
        <div className="container-fluid px-4">
            <div className="d-flex align-items-center justify-content-between small">
                <div className="text-silver">Copyright &copy; Md. Ismail {new Date().getFullYear()}</div>
                <div>
                    <a href="#">Md. Ismail</a>
                </div>
            </div>
        </div>
    </footer>
  );
}

export default Footer;