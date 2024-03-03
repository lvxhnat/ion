import * as React from 'react'
import { ContainerWrapper } from 'components/Wrappers/ContainerWrapper'
import PortfolioPopup from './PortfolioPopup'
import { useFirebaseUserStore } from 'store/user/user'
import { getUserPortfolios } from './requests'

export default function Portfolio() {
  const user = useFirebaseUserStore(state => state.user)

  React.useEffect(() => {
    if (user) getUserPortfolios(user.user_id).then(res => console.log(res))
  }, [user])

  return (
    <ContainerWrapper>
      <PortfolioPopup />
    </ContainerWrapper>
  )
}
