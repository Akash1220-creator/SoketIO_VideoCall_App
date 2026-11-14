interface LoginProps {
  mode?: string;
}

export const Login = ({ mode }: LoginProps) => {
  return (
    <div>Login {mode}</div>
  )
}

export default Login
