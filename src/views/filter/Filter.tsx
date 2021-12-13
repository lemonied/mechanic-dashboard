import React, { FC, useCallback, useRef, useState } from 'react';
import { upload$ } from '../../helpers/http';
import { ImageSelect } from '../../components/image-select/ImageSelect';
import { Button, Slider, Row, Col, InputNumber } from 'antd';

const Filter: FC = () => {
  const [bilateralResult, setBilateralResult] = useState<string>();
  const [diameter, setDiameter] = useState<number>(20);
  const [sigmaColor, setSigmaColor] = useState<number>(150);
  const [sigmaSpace, setSigmaSpace] = useState<number>(150);
  const imgRef = useRef<File>();
  const onDiameterChange = useCallback((value: number) => {
    setDiameter(value);
  }, []);
  const onSigmaColorChange = useCallback((value: number) => {
    setSigmaColor(value);
  }, []);
  const onSigmaSpaceChange = useCallback((value: number) => {
    setSigmaSpace(value);
  }, []);
  const bilateral = useCallback(() => {
    const formData = new FormData();
    formData.append('file', imgRef.current!);
    upload$(`/bilateral?diameter=${diameter}&sigmaColor=${sigmaColor}&sigmaSpace=${sigmaSpace}`, formData).subscribe(res => {
      setBilateralResult(`data:image/png;base64,${res.data}`);
      console.log(res);
    });
  }, [diameter, sigmaColor, sigmaSpace]);

  return (
    <div>
      <div>
        <ImageSelect onChange={e => imgRef.current = e} />
      </div>
      <div>
        {
          bilateralResult && (
            <img className={'screenshot'} src={bilateralResult} alt="screenshot"/>
          )
        }
        <div>
          <h2>双边滤波</h2>
          <Row>
            <Col style={{width: 80}}>
              <span>diameter</span>
            </Col>
            <Col span={12}>
              <Slider
                min={1}
                max={500}
                onChange={onDiameterChange}
                value={diameter}
              />
            </Col>
            <Col>
              <InputNumber
                min={1}
                max={500}
                style={{ margin: '0 16px' }}
                value={diameter}
                onChange={onDiameterChange}
              />
            </Col>
          </Row>
          <Row>
            <Col style={{width: 80}}>
              <span>sigmaColor</span>
            </Col>
            <Col span={12}>
              <Slider
                min={1}
                max={500}
                onChange={onSigmaColorChange}
                value={sigmaColor}
              />
            </Col>
            <Col>
              <InputNumber
                min={1}
                max={500}
                style={{ margin: '0 16px' }}
                value={sigmaColor}
                onChange={onSigmaColorChange}
              />
            </Col>
          </Row>
          <Row>
            <Col style={{width: 80}}>
              <span>sigmaSpace</span>
            </Col>
            <Col span={12}>
              <Slider
                min={1}
                max={500}
                onChange={onSigmaSpaceChange}
                value={sigmaSpace}
              />
            </Col>
            <Col>
              <InputNumber
                min={1}
                max={500}
                style={{ margin: '0 16px' }}
                value={sigmaSpace}
                onChange={onSigmaSpaceChange}
              />
            </Col>
          </Row>
        </div>
        <div>
          <Button onClick={bilateral}>双边滤波</Button>
        </div>
      </div>
    </div>
  );
};

export { Filter };
