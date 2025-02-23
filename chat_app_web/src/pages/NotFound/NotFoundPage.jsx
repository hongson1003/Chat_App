import { appRoutes } from '@/constants';
import { Button, Result } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import './not-found-page.scss';

const NotFoundPage = () => {
  return (
    <div className="container">
      <Result
        status="404"
        title="404 - Page not found !"
        subTitle="Xin lỗi, trang bạn đang tìm kiếm không tồn tại."
        extra={
          <Button type="primary">
            <Link to={appRoutes.HOME}>Quay lại trang chính</Link>
          </Button>
        }
      />
    </div>
  );
};

export default NotFoundPage;
