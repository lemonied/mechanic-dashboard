import React, { FC, useCallback, useRef, useState } from 'react';
import { Button } from 'antd';
import { get$, upload$ } from '../../helpers/http';
import { ImageSelect } from '../../components/image-select/ImageSelect';
import './index.scss';

const Recognition: FC = () => {
  const [base64, setBase64] = useState<string>();
  const img1Ref = useRef<File>();
  const img2Ref = useRef<File>();
  const screenshot = useCallback(() => {
    const subscription = get$('/screenshot').subscribe(res => {
      setBase64(`data:image/png;base64,${res.data.base64}`);
    });
    return () => subscription.unsubscribe();
  }, []);
  const compare = useCallback(() => {
    const formData = new FormData();
    formData.append('file1', img1Ref.current!);
    formData.append('file2', img2Ref.current!);
    upload$('/compare?type=radialvariance', formData).subscribe(res => {
      console.log(res);
    });
  }, []);

  return (
    <div className={'recognition'}>
      <Button onClick={screenshot}>截图</Button>
      {
        base64 && (
          <img className={'screenshot'} src={base64} alt="screenshot"/>
        )
      }
      <div className={'compare'}>
        <div>
          <ImageSelect onChange={e => img1Ref.current = e} />
          <ImageSelect onChange={e => img2Ref.current = e} />
        </div>
        <div>
          <Button onClick={compare}>比对</Button>
        </div>
      </div>
    </div>
  );
};

export { Recognition };
