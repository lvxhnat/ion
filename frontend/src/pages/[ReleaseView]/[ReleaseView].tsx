import * as React from 'react'
import { useParams } from 'react-router-dom';
import { getReleaseSeries } from './request';
import { ContainerWrapper } from 'components/Wrappers/ContainerWrapper';

export default function ReleaseView() {
    const params = useParams();
    React.useEffect(() => {
        getReleaseSeries(params.releaseId!).then((res) => console.log(res.data))
    }, [])
  return (
    <ContainerWrapper>
        s
    </ContainerWrapper>
  )
}
