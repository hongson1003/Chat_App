import { Button, Result } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import './errorPage.scss';

const ErrorPage = () => {
  return (
    <div className="error-page">
      <Result
        style={{ width: '100%' }}
        status="500"
        title="500 - Something went wrong !"
        subTitle=""
        extra={
          <Button type="primary">
            <Link to="/">Quay lại trang chính</Link>
          </Button>
        }
      />
    </div>
  );
};

export default ErrorPage;
