import { appConstants } from '@/constants';
import { Button } from 'antd';
import React from 'react';
import './file.upload.scss';

const File = ({ url, name, children, type, size, className }) => {
  return (
    <div className={`file-box ${className}`}>
      {children}
      <div className="description">
        <div className="icon">
          {type === appConstants.FILE_TYPE.PDF ? (
            <i className="fa-regular fa-file-pdf"></i>
          ) : type === appConstants.FILE_TYPE.WORD ? (
            <i className="fa-regular fa-file-word"></i>
          ) : type === appConstants.FILE_TYPE.EXCEL ? (
            <i className="fa-regular fa-file-word"></i>
          ) : type === appConstants.FILE_TYPE.JAR ? (
            <i className="fa-regular fa-file-jar"></i>
          ) : (
            <i className="fa-regular fa-file"></i>
          )}
        </div>
        <div className="detail-file">
          <p>{name}</p>
          <p>{size}</p>
        </div>
        <div className="option-file">
          <Button type="default">
            <a className="download-file" href={url} download={name}>
              Tải xuống
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default File;
