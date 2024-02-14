import * as React from 'react'
import * as RS from '../../style'
import EmailSignUp from '../EmailSignUp';

interface EmailButtonProps {
    handleSubmit: () => void
}

export default function EmailButton(props: EmailButtonProps) {

  const [showSignUp, setShowSignUp] = React.useState<boolean>(false);

  const onClick = () => {
    setShowSignUp(true);
  } 

  return (
    showSignUp ? <EmailSignUp /> : <RS.ButtonStyled onClick={onClick}>
    <RS.ButtonState />
    <RS.ButtonContentWrapper>
    <RS.ButtonContents>Sign up with Email</RS.ButtonContents>
    </RS.ButtonContentWrapper>
</RS.ButtonStyled>
  )
}
