// BackToTop.tsx
import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { UpOutlined } from '@ant-design/icons';

const BackToTop: React.FC = () => {
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      // Hiển thị nút khi cuộn xuống nhiều hơn 200px và có thanh cuộn
      if (window.scrollY > 200 && document.documentElement.scrollHeight > window.innerHeight) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll); // Thêm sự kiện resize để kiểm tra khi kích thước cửa sổ thay đổi

    // Xóa sự kiện khi component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {showBackToTop && (
        <Button
          className="back-to-top"
          icon={<UpOutlined />}
          onClick={handleBackToTop}
        />
      )}
    </>
  );
};

export default BackToTop;
